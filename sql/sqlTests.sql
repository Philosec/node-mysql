USE bamazon;

SELECT a.item_id ID, a.product_name Name, a.price Price FROM products a;

SELECT a.item_id ID, a.product_name Name, a.price Price, a.stock_qty Qty FROM products a;

SELECT p.product_name, p.stock_qty FROM products p WHERE p.product_name LIKE '%Chips%';

UPDATE products SET stock_qty = 12 WHERE product_name LIKE '%Chips%'