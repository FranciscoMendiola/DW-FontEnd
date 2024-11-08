DROP TABLE IF EXISTS cart;

CREATE TABLE cart(
	cart_id INT NOT NULL AUTO_INCREMENT,
    rfc VARCHAR(13) NOT NULL,
    gtin CHAR(13) NOT NULL,
	quantity INT NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (cart_id),
    FOREIGN KEY (rfc) REFERENCES customer(rfc),
    FOREIGN KEY (gtin) REFERENCES product(gtin)
);

SELECT * FROM cart;