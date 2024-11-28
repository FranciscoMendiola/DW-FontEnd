DROP TABLE IF EXISTS product;

CREATE TABLE product(
    product_id INT NOT NULL AUTO_INCREMENT,
    gtin CHAR(13) UNIQUE NOT NULL,
    product VARCHAR(100) NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    stock INT NOT NULL,
    category_id INT NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (product_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

SELECT * FROM product;