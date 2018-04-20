USE bamazon;

SELECT p.item_id ID, p.product_name Name, p.price Price, p.stock_qty Quantity FROM products p;

SELECT p.item_id, p.product_name, p.price, p.stock_qty, d.department_name FROM products p LEFT JOIN departments d ON p.department_id = d.department_id;

SELECT a.item_id ID, a.product_name Name, a.price Price, a.stock_qty Qty FROM products a;

SELECT p.product_name, p.stock_qty FROM products p WHERE p.product_name LIKE '%Chips%';

UPDATE products SET stock_qty = 4 WHERE product_name LIKE '%Chips%';

SELECT p.item_id ID, p.product_name Name, p.price Price, p.stock_qty Quantity FROM products p WHERE p.stock_qty < 5;

UPDATE products SET stock_qty = stock_qty + ? WHERE item_id = ?;

INSERT INTO products (product_name, department_id, price, stock_qty)
VALUES ('Chips', 1, 2.20, 12);