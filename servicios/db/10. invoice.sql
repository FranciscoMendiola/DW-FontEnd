DROP TABLE IF EXISTS invoice;

CREATE TABLE invoice(
	invoice_id INT NOT NULL AUTO_INCREMENT,
    rfc VARCHAR(13) NOT NULL,
	subtotal FLOAT NOT NULL,
	taxes FLOAT NOT NULL,
	total FLOAT NOT NULL,
    created_at DATE NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (invoice_id),
    FOREIGN KEY (rfc) REFERENCES customer(rfc)
);

SELECT * FROM invoice;