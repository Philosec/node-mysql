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

const questionBank = {
  menu: {
    question: {
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View Products for Sale',
        'View Low Inventory',
        'Add to Inventory',
        'Add New Product',
        'Exit'
      ]
    }
  },
  addItem: {
    questions: [
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
    ]
  }
}

const queries = {
  allInvQuery: `SELECT p.item_id ID, p.product_name Name, p.price Price, p.stock_qty Quantity FROM products p`,
  lowInvQuery: `SELECT p.item_id ID, p.product_name Name, p.price Price, p.stock_qty Quantity FROM products p WHERE p.stock_qty < 5`
}

let runMenu = () => {
  console.log('')

  inquirer.prompt(questionBank.menu.question).then(answer => {
    switch (answer.action) {
      case questionBank.menu.question.choices[0]:
        displayQueryAsTable(queries.allInvQuery).then(() => runMenu()).catch(err => console.log(err))
        break
      case questionBank.menu.question.choices[1]:
        displayQueryAsTable(queries.lowInvQuery).then(() => runMenu()).catch(err => console.log(err))
        break
      case questionBank.menu.question.choices[2]:
        addInventory()
        break
      case questionBank.menu.question.choices[3]:
        //do something
        break
      case questionBank.menu.question.choices[4]:
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
    inquirer.prompt(questionBank.addItem.questions).then(answer => {
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