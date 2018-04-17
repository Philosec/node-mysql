DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT UNSIGNED AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(20, 2) NOT NULL,
  stock_qty INT NOT NULL,
  PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('Chips', 'Grocery', 2.20, 12);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('Slippers', 'Shoe', 11.50, 5);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('TV', 'Electronics', 499.99, 3);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('Headphones', 'Electronics', 22.99, 10);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('Ice Cream', 'Grocery', 1.99, 25);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('Milk', 'Grocery', 3.50, 13);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('Shirt', 'Clothing', 8.99, 10);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('Pants', 'Clothing', 10.99, 15);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('DVD', 'Electronics', 21.99, 22);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('Wiper Fluid', 'Automotive', 12.99, 14);