DROP TABLE IF EXISTS user;

CREATE TABLE user(
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rol_id INT NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (rol_id) REFERENCES rol(rol_id)
);

INSERT INTO user(username, password, rol_id, status) VALUES('admin', '$2a$10$RQJma3G0KlX17QmoSp2H1Ocj53GuZfqbRI/bE/zv/gBAt3ch82znC', 1, 1); /* password = 12345678 */
INSERT INTO user(username, password, rol_id, status) VALUES('customer', '$2a$10$EQLFHwyT6S0TtTen2oYd7Owr0qmFd4YBUYS90iXphsOj1/88HAIFq', 2, 1); /* password = 87654321 */

SELECT * FROM user;