const {dataAccessLayer} = require("../dataAccess.js");
const catchAsync = require('../utils/catchAsync');
const path = require('path');
const bcrypt = require('bcryptjs');

exports.getRegistrationPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/registration.html'));
};

exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/login.html'));
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await dataAccessLayer.getAllUsers();

        res.status(200).json({
            status: 'success',
            data: {
                users,
            },
        });
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error',
        });
    }
};

exports.getUserByID = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await dataAccessLayer.getUserById(id);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: user.username,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error',
        });
    }
};

exports.getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await dataAccessLayer.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error',
        });
    }
};

exports.addUser = async (req, res) => {
    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Hiányzó kötelező mezők: username, email, vagy password.',
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await dataAccessLayer.createUser(
            username,
            email,
            hashedPassword,
            isAdmin || false,
        );

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
            },
        });
    } catch (error) {
        console.error('Hiba az új felhasználó hozzáadása közben:', error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                status: 'fail',
                message: 'Felhasználónév vagy email már létezik.',
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Hiba történt a felhasználó hozzáadása közben.',
        });
    }
};

exports.registerUser = catchAsync(async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (username.length === 0 || email.length === 0){
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide all required fields.',
            });
        }

        if (password.length < 8){
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide a password with minimum 8 characters!',
            });
        }

        const existingUsername = await dataAccessLayer.getUserByUsername(username);
        if (existingUsername) {
            return res.status(400).json({
                status: 'fail',
                message: 'This username already exists.',
            });
        }

        const existingEmail = await dataAccessLayer.getUserByEmail(email);
        if (existingEmail) {
            return res.status(400).json({
                status: 'fail',
                message: 'The given e-mail address is already in use.',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await dataAccessLayer.createUser(
            username,
            email,
            hashedPassword,
            false,
        );

        return res.status(200).json({
            status: 'success',
            data: newUser,
        })

    } catch (error) {
        next(error);
    }
});

exports.loginUser = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password ) {
        return next(res.status(400).json({
            status: 'fail',
            message: 'Please provide username and password!',
        }))
    }

    const user = await dataAccessLayer.getUserByUsername(username);
    if (!user) {
        return next(res.status(401).json({
            status: 'fail',
            message: 'Incorrect username or password',
        }))
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.hashed_password);

    if (!isPasswordCorrect) {
        return next(res.status(401).json({
            status: 'fail',
            message: 'Incorrect username or password',
        }))
    }

    return res.status(200).json({
        status: 'success',
        data: user,
    })
});

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!id || !Object.keys(updates).length) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing user ID or update data',
        });
    }

    if (updates.hashed_password) {
        const salt = await bcrypt.genSalt(12);
        updates.hashed_password = await bcrypt.hash(updates.hashed_password, salt);
    }

    const updatedUser = await dataAccessLayer.updateUser(id, updates);

    if (!updatedUser) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found',
        });
    }

    res.status(200).json({
        status: 'success',
        data: updatedUser,
    });
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing user ID',
        });
    }

    const user = await dataAccessLayer.getUserById(id);
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found',
        });
    }

    await dataAccessLayer.deleteUser(id);

    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

