USE bamazon;

SELECT p.item_id ID, p.product_name Name, p.price Price, p.stock_qty Quantity FROM products p;

SELECT p.item_id, p.product_name, p.price, p.stock_qty, d.department_name, p.product_sales FROM products p LEFT JOIN departments d ON p.department_id = d.department_id;

SELECT a.item_id ID, a.product_name Name, a.price Price, a.stock_qty Qty FROM products a;

SELECT p.product_name, p.stock_qty FROM products p WHERE p.product_name LIKE '%Chips%';

UPDATE products SET stock_qty = 4 WHERE product_name LIKE '%Chips%';

SELECT p.item_id ID, p.product_name Name, p.price Price, p.stock_qty Quantity FROM products p WHERE p.stock_qty < 5;

UPDATE products SET stock_qty = stock_qty + ? WHERE item_id = ?;

UPDATE products SET stock_qty = stock_qty - ?, product_sales = product_sales + (price * ?) WHERE item_id = ?;

SELECT d.department_id, d.department_name FROM departments d ORDER BY d.department_id;

SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) dept_sales, SUM(p.product_sales) - d.over_head_costs dept_total_profit FROM departments d LEFT JOIN products p ON d.department_id = p.department_id;

SELECT
  d.department_id,
  d.department_name,
  d.over_head_costs,
  CONVERT(IFNULL(SUM(p.product_sales), 0.00), DECIMAL(10, 2))                  dept_sales,
  CONVERT(IFNULL(SUM(p.product_sales), 0) - d.over_head_costs, DECIMAL(10, 2)) dept_total_profit
FROM departments d LEFT JOIN products p ON d.department_id = p.department_id
GROUP BY d.department_id, d.department_name, d.over_head_costs;

INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?);

INSERT INTO products (product_name, department_id, price, stock_qty)
VALUES ('Chips', 1, 2.20, 12);

SELECT p.item_id, p.product_name, p.price, p.stock_qty, d.department_name, p.product_sales FROM products p LEFT JOIN departments d ON p.department_id = d.department_id;

SELECT *
FROM departments;