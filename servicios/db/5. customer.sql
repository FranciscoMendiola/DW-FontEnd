DROP TABLE IF EXISTS customer;

CREATE TABLE customer(
    customer_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    rfc VARCHAR(13) UNIQUE NOT NULL,
    mail VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(255),
    user_id INT NOT NULL,
    region_id INT NOT NULL,
    customer_image_id INT NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (customer_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (region_id) REFERENCES region(region_id),
    FOREIGN KEY (customer_image_id) REFERENCES customer_image(customer_image_id)
);

INSERT INTO customer(name, surname, rfc, mail, address, user_id, region_id, customer_image_id, status) VALUES('Carlos', 'López', 'CALO920101A01', 'carlos.lopez@ciencias.unam.mx', 'Periférico Sur 1400', 2, 1, 1, 1);

SELECT * FROM customer;