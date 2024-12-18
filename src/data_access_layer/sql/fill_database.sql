DELETE FROM sourdough_portal.users;
ALTER TABLE sourdough_portal.users AUTO_INCREMENT = 1;

INSERT INTO sourdough_portal.users (username, email, hashed_password) VALUES
('kovaszmester', 'kovaszmester@example.com', 'hashed_password1'),
('buborekfan', 'buborekfan@example.com', 'hashed_password2'),
('kenyerkirály', 'kenyerkiraly@example.com', 'hashed_password3');

DELETE FROM sourdough_portal.sourdough_logs;
ALTER TABLE sourdough_portal.sourdough_logs AUTO_INCREMENT = 1;

INSERT INTO sourdough_portal.sourdough_logs (user_id, starter_name, hydration_level, last_fed, position) VALUES
(1, 'Kovászka', 100, '2024-06-16 08:00:00', 'pult'),
(1, 'Madre', 75, '2024-06-15 20:00:00', 'hűtő'),
(2, 'Buborék', 80, '2024-06-16 10:00:00', 'pult'),
(3, 'Kovi', 90, '2024-06-14 18:00:00', 'hűtő');

DELETE FROM sourdough_portal.posts;
ALTER TABLE sourdough_portal.posts AUTO_INCREMENT = 1;

INSERT INTO sourdough_portal.posts (user_id, content) VALUES
(1, 'Végre sikerült egy tökéletes kenyér! Az állaga puha, a héja ropogós.'),
(2, 'Van valakinek tapasztalata 50% hidratáltságú kovásszal?'),
(3, 'Tippek a kovász felfrissítésére? Az enyém egy ideje gyengélkedik.'),
(1, 'Hogyan lehet hosszú ideig tárolni a kovászt a hűtőben?');

DELETE FROM sourdough_portal.comments;
ALTER TABLE sourdough_portal.comments AUTO_INCREMENT = 1;

INSERT INTO sourdough_portal.comments (post_id, user_id, content) VALUES
(1, 2, 'Gratulálok! Milyen lisztet használtál?'),
(1, 3, 'Megosztod a receptet?'),
(2, 1, 'Próbáld ki lassú etetéssel, az segíthet.'),
(3, 2, 'Érdemes szobahőmérsékleten hagyni etetés előtt pár órára.'),
(4, 3, 'Heti egyszeri etetéssel jól bírja a hűtőben.');
