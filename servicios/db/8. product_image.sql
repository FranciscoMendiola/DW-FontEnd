DROP TABLE IF EXISTS product_image;

CREATE TABLE product_image(
	product_image_id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    image TEXT NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (product_image_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

SELECT * FROM product_image;