DROP TABLE IF EXISTS rol;

CREATE TABLE rol(
	rol_id INT NOT NULL AUTO_INCREMENT,
    rol VARCHAR(100) UNIQUE NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (rol_id)
);

INSERT INTO rol(rol,status) VALUES("ADMIN",1);
INSERT INTO rol(rol,status) VALUES("USER",1);

SELECT * FROM rol;