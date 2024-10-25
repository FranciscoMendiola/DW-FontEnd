DROP TABLE IF EXISTS item;

CREATE TABLE item(
	item_id INT NOT NULL AUTO_INCREMENT,
    invoice_id INT NOT NULL,
    gtin CHAR(13) NOT NULL,
    quantity INT NOT NULL,
	unit_price FLOAT NOT NULL,
	subtotal FLOAT NOT NULL,
	taxes FLOAT NOT NULL,
	total FLOAT NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (item_id),
    FOREIGN KEY (invoice_id) REFERENCES invoice(invoice_id)
);

SELECT * FROM item;