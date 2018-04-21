# Node Store App
### [Video Demonstration](https://youtu.be/n2hVPJ7r8Ak)

## Tech Stack
- Node.JS
- MySQL
- [Inquirer](https://www.npmjs.com/package/inquirer)

## Setup
### Create a .env file in the root with the following information
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
```

## Use
- Run `bamazonCustomer` to purchase items as a customer.
- Run `bamazonManager` to view all products for sale, view low inventory, increase inventory for a product or create a new product.
- Run `bamazonSupervisor` to view all sales by department or create a new department.