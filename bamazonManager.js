'use strict'

require('./utils')

let mysql = require('promise-mysql')
let inquirer = require('inquirer')
let keys = require('./keys.js')

let connection = {}

mysql.createConnection({
  host: keys.db.host,
  port: keys.db.port,
  user: keys.db.user,
  password: keys.db.pass,
  database: 'bamazon'
}).then(conn => {
  connection = conn
  runMenu()
})

const departments = [
  'Grocery',
  'Automotive',
  'Electronics & Office',
  'Clothing & Shoes',
  'Home, Furniture & Appliances',
  'Home Improvement',
  `Baby & Toddler`,
  `Toys & Games`,
  `Sport & Fitness`,
  `Sewing & Crafts`,
]

const questionBank = {
  menu: {
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View Products for Sale',
      'View Low Inventory',
      'Increase Product Inventory',
      'Add New Product',
      'Exit'
    ]
  },
  increaseItemInv: [
    {
      name: 'id',
      type: 'input',
      message: 'What product id would you like to increase inventory for?',
      validate: value => {
        return isNaN(value) === false
      }
    },
    {
      name: 'amount',
      type: 'input',
      message: 'How many would you like to add?',
      validate: value => {
        return isNaN(value) === false
      }
    }
  ],
  addNewItem: [
    {
      name: 'name',
      type: 'input',
      message: 'What is the items name?'
    },
    {
      name: 'dept',
      type: 'list',
      message: 'What department is the item located in?',
      choices: departments
    },
    {
      name: 'price',
      type: 'input',
      message: 'What is the price of the product?',
      validate: value => {
        return isNaN(value) === false
      }
    },
    {
      name: 'amt',
      type: 'input',
      message: 'What is the initial stock quantity?',
      validate: value => {
        return isNaN(value) === false
      }
    }
  ]
}

const queries = {
  allInvQuery: `SELECT p.item_id ID, p.product_name Name, p.price Price, p.stock_qty Quantity FROM products p`,
  lowInvQuery: `SELECT p.item_id ID, p.product_name Name, p.price Price, p.stock_qty Quantity FROM products p WHERE p.stock_qty < 5`
}

let runMenu = () => {
  console.log('')

  inquirer.prompt(questionBank.menu).then(answer => {
    switch (answer.action) {
      case questionBank.menu.choices[0]:
        displayQueryAsTable(queries.allInvQuery).then(() => runMenu()).catch(err => console.log(err))
        break
      case questionBank.menu.choices[1]:
        displayQueryAsTable(queries.lowInvQuery).then(() => runMenu()).catch(err => console.log(err))
        break
      case questionBank.menu.choices[2]:
        addInventory()
        break
      case questionBank.menu.choices[3]:
        addNewProduct()
        break
      case questionBank.menu.choices[4]:
        connection.end()
        process.exit()
        break
    }
  })
}

let displayQueryAsTable = query => {
  return new Promise((resolve, reject) => {
    connection.query(query).then(result => {
      console.log('')
      console.logAsTable(result)
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}

let addInventory = () => {
  displayQueryAsTable(queries.allInvQuery).then(() => {
    console.log()
    inquirer.prompt(questionBank.increaseItemInv).then(answer => {
      const id = parseInt(answer.id)
      const amt = parseInt(answer.amount)
      const query = `UPDATE products SET stock_qty = stock_qty + ? WHERE item_id = ?`
      connection.query(query, [amt, id]).then(result => {
        displayQueryAsTable(queries.allInvQuery).then(() => runMenu()).catch(err => console.log(err))
      }).catch(err => {
        console.log(err)
      })
    })
  }).catch(err => console.log(err))
}

let addNewProduct = () => {
  inquirer.prompt(questionBank.addNewItem).then(answer => {
    const name = answer.name
    const deptId = departments.indexOf(answer.dept) + 1 //add one to index since foreign key is 1 based
    const price = parseFloat(answer.price)
    const amt = parseInt(answer.amt)
    const query = `INSERT INTO products (product_name, department_id, price, stock_qty)
                   VALUES (?, ?, ?, ?)`
    connection.query(query, [name, deptId, price, amt]).then(result => {
      displayQueryAsTable(queries.allInvQuery).then(() => runMenu()).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
}