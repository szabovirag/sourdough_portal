const mysql = require('mysql2/promise');

class DataAccessLayer {
    constructor() {
        this._connection = null;
    }

    async initConnection(dbUser, dbPassword, dbHost, dbPort, dbName) {
        const connectionOptions = {
            user: dbUser,
            password: dbPassword,
            host: dbHost,
            port: dbPort,
            database: dbName,
        };

        this._connection = await mysql.createConnection(connectionOptions);
    }

    async endConnection(){
        await this._connection.end();
    }

    //#region Users
    async createUser(username, email, hashedPassword, isAdmin = false) {
        try {
            const query = `
            INSERT INTO users (username, email, hashed_password, isAdmin) 
            VALUES (?, ?, ?, ?)
            `;
            const [result] = await this._connection.query(query, [username, email, hashedPassword, isAdmin]);
            return result.insertId;
        } catch (e) {
            console.log(e);
        }
    }

    async getUserById(userId) {
        const query = `SELECT * FROM users WHERE id = ?`;
        const [rows] = await this._connection.query(query, [userId]);
        return rows[0] || null;
    }

    async getUserByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await this._connection.query(query, [username]);
        return rows[0] || null;
    }

    async getUserByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await this._connection.query(query, [email]);
        return rows[0] || null;
    }

    async getAllUsers() {
        const query = `SELECT * FROM users`;
        const [rows] = await this._connection.query(query);
        return rows;
    }

    async updateUser(userId, updates) {
        try {
            const fields = Object.keys(updates)
                .map(key => `${key} = ?`)
                .join(', ');

            const values = Object.values(updates);

            const query = `UPDATE users SET ${fields} WHERE id = ?`;
            const [result] = await this._connection.query(query, [...values, userId]);

            if (result.affectedRows === 0) {
                return null;
            }

            return { userId, ...updates };
        } catch (e) {
            console.log(e);
        }
    }

    async deleteUser(userId) {
        try {
            const query = `DELETE FROM users WHERE id = ?`;
            const [result] = await this._connection.query(query, [userId]);
            return result.affectedRows;
        } catch (e) {
            console.log(e);
        }
    }
    //#endregion

    //#region Sourdough Logs
    async createSourdoughLog(userId, starterName, hydrationLevel, position = 'pult', last_fed) {
        try {
            const query = `
            INSERT INTO sourdough_logs (user_id, starter_name, hydration_level, position, last_fed) 
            VALUES (?, ?, ?, ?, ?)
            `;
            const [result] = await this._connection.query(query, [userId, starterName, hydrationLevel, position, last_fed]);
            return result.insertId;
        } catch (e) {
            console.log(e);
        }
    }

    async getAllSourdoughs() {
        try {
            const query = `SELECT * FROM sourdough_logs`;
            const [rows] = await this._connection.query(query);
            return rows;
        } catch (e) {
            console.log(e);
        }
    }

    async getSourdoughLogById(logId) {
        try {
            const query = `SELECT * FROM sourdough_logs WHERE id = ?`;
            const [rows] = await this._connection.query(query, [logId]);
            return rows[0];
        } catch (e) {
            console.log(e);
        }
    }

    async getAllSourdoughLogsByUser(userId) {
        const query = `SELECT * FROM sourdough_logs WHERE user_id = ?`;
        const [rows] = await this._connection.query(query, [userId]);
        return rows;
    }

    async updateSourdoughLog(logId, starterName, hydrationLevel, position, last_fed) {
        try {
            const query = `
            UPDATE sourdough_logs 
            SET starter_name = ?, hydration_level = ?, position = ? , last_fed = ?
            WHERE id = ?
            `;
            const [result] = await this._connection.query(query, [starterName, hydrationLevel, position, last_fed, logId]);
            return result.affectedRows;
        } catch (e) {
            console.log(e);
        }
    }

    async deleteSourdoughLog(logId) {
        try {
            const query = `DELETE FROM sourdough_logs WHERE id = ?`;
            const [result] = await this._connection.query(query, [logId]);
            return result.affectedRows;
        } catch (e) {
            console.log(e);
        }

    }
    //#endregion

    //#region Posts
    async createPost(userId, content) {
        try {
            const query = `
            INSERT INTO posts (user_id, content) 
            VALUES (?, ?)
            `;
            const [result] = await this._connection.query(query, [userId, content]);
            return result.insertId;
        } catch (e) {
            console.log(e);
        }
    }

    async getPostById(postId) {
        try {
            const query = `SELECT * FROM posts WHERE id = ?`;
            const [rows] = await this._connection.query(query, [postId]);
            return rows[0];
        } catch (e) {
            console.log(e);
        }
    }

    async getAllPosts() {
        const query = `SELECT * FROM posts`;
        const [rows] = await this._connection.query(query);
        return rows;
    }

    async updatePost(postId, content) {
        try {
            const query = `
            UPDATE posts 
            SET content = ? 
            WHERE id = ?
            `;
            const [result] = await this._connection.query(query, [content, postId]);
            return result.affectedRows;
        } catch (e) {
            console.log(e);
        }
    }

    async deletePost(postId) {
        try {
            const query = `DELETE FROM posts WHERE id = ?`;
            const [result] = await this._connection.query(query, [postId]);
            return result.affectedRows;
        } catch (e) {
            console.log(e);
        }
    }
    //#endregion

    //#region Comments
    async createComment(postId, userId, content) {
        try {
            const query = `
            INSERT INTO comments (post_id, user_id, content) 
            VALUES (?, ?, ?)
            `;
            const [result] = await this._connection.query(query, [postId, userId, content]);
            return result.insertId;
        } catch (e) {
            console.log(e);
        }
    }

    async getCommentById(commentId) {
        try {
            const query = `SELECT * FROM comments WHERE id = ?`;
            const [rows] = await this._connection.query(query, [commentId]);
            return rows[0];
        } catch (e) {
            console.log(e);
        }
    }

    async getAllCommentsByPost(postId) {
        const query = `SELECT * FROM comments WHERE post_id = ?`;
        const [rows] = await this._connection.query(query, [postId]);
        return rows;
    }

    async updateComment(commentId, content) {
        try {
            const query = `
            UPDATE comments 
            SET content = ? 
            WHERE id = ?
            `;
            const [result] = await this._connection.query(query, [content, commentId]);
            return result.affectedRows;
        } catch (e) {
            console.log(e);
        }
    }

    async deleteComment(commentId) {
        try {
            const query = `DELETE FROM comments WHERE id = ?`;
            const [result] = await this._connection.query(query, [commentId]);
            return result.affectedRows;
        } catch (e) {
            console.log(e);
        }
    }
    //#endregion
}

module.exports = { DataAccessLayer };