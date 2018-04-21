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

INSERT INTO departments (department_name, over_head_costs) VALUES ('Grocery', 200.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Automotive', 1500.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Electronics & Office', 400.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Clothing & Shoes', 320.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Home, Furniture & Appliances', 350.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Home Improvement', 180.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Baby & Toddler', 120.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Toys & Games', 200.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Sport & Fitness', 100.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Sewing & Crafts', 80.00);


# ---------------------------------------------------------------------------
# Products Table
# ---------------------------------------------------------------------------
CREATE TABLE products (
  item_id INT UNSIGNED AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_id INT UNSIGNED,
  price DECIMAL(20, 2) NOT NULL,
  stock_qty INT NOT NULL,
  product_sales DECIMAL(20, 2),
  PRIMARY KEY(item_id),
  FOREIGN KEY(department_id) REFERENCES departments(department_id)
);

INSERT INTO products (product_name, department_id, price, stock_qty, product_sales)
VALUES ('Chips', 1, 2.20, 12, 0.00);

INSERT INTO products (product_name, department_id, price, stock_qty, product_sales)
VALUES ('Slippers', 4, 11.50, 2, 0.00);

INSERT INTO products (product_name, department_id, price, stock_qty, product_sales)
VALUES ('TV', 3, 499.99, 3, 0.00);

INSERT INTO products (product_name, department_id, price, stock_qty, product_sales)
VALUES ('Headphones', 3, 22.99, 10, 0.00);

INSERT INTO products (product_name, department_id, price, stock_qty, product_sales)
VALUES ('Ice Cream', 1, 1.99, 25, 0.00);

INSERT INTO products (product_name, department_id, price, stock_qty, product_sales)
VALUES ('Milk', 1, 3.50, 13, 0.00);

INSERT INTO products (product_name, department_id, price, stock_qty, product_sales)
VALUES ('Shirt', 4, 8.99, 10, 0.00);

INSERT INTO products (product_name, department_id, price, stock_qty, product_sales)
VALUES ('Pants', 4, 10.99, 15, 0.00);

INSERT INTO products (product_name, department_id, price, stock_qty, product_sales)
VALUES ('DVD', 3, 21.99, 22, 0.00);

INSERT INTO products (product_name, department_id, price, stock_qty, product_sales)
VALUES ('Wiper Fluid', 2, 12.99, 14, 0.00);