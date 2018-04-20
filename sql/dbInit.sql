DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;


# ---------------------------------------------------------------------------
# Department Table
# ---------------------------------------------------------------------------
CREATE TABLE departments (
  department_id INT UNSIGNED AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  over_head_costs DECIMAL(20, 2) NOT NULL,
  PRIMARY KEY(department_id)
);

INSERT INTO departments (department_name, over_head_costs) VALUES ('Grocery', 20000.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Automotive', 20000.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Electronics & Office', 20000.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Clothing & Shoes', 20000.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Home, Furniture & Appliances', 20000.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Home Improvement', 20000.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Baby & Toddler', 20000.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Toys & Games', 20000.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Sport & Fitness', 20000.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Sewing & Crafts', 20000.00);


# ---------------------------------------------------------------------------
# Products Table
# ---------------------------------------------------------------------------
CREATE TABLE products (
  item_id INT UNSIGNED AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_id INT UNSIGNED,
  price DECIMAL(20, 2) NOT NULL,
  stock_qty INT NOT NULL,
  PRIMARY KEY(item_id),
  FOREIGN KEY(department_id) REFERENCES departments(department_id)
);

INSERT INTO products (product_name, department_id, price, stock_qty)
VALUES ('Chips', 1, 2.20, 12);

INSERT INTO products (product_name, department_id, price, stock_qty)
VALUES ('Slippers', 4, 11.50, 2);

INSERT INTO products (product_name, department_id, price, stock_qty)
VALUES ('TV', 3, 499.99, 3);

INSERT INTO products (product_name, department_id, price, stock_qty)
VALUES ('Headphones', 3, 22.99, 10);

INSERT INTO products (product_name, department_id, price, stock_qty)
VALUES ('Ice Cream', 1, 1.99, 25);

INSERT INTO products (product_name, department_id, price, stock_qty)
VALUES ('Milk', 1, 3.50, 13);

INSERT INTO products (product_name, department_id, price, stock_qty)
VALUES ('Shirt', 4, 8.99, 10);

INSERT INTO products (product_name, department_id, price, stock_qty)
VALUES ('Pants', 4, 10.99, 15);

INSERT INTO products (product_name, department_id, price, stock_qty)
VALUES ('DVD', 3, 21.99, 22);

INSERT INTO products (product_name, department_id, price, stock_qty)
VALUES ('Wiper Fluid', 2, 12.99, 14);