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
  run()
})

let run = () => {
  let actions = [
    'View Products for Sale',
    'View Low Inventory',
    'Add to Inventory',
    'Add New Product',
    'Exit'
  ]

  console.log('')

  let query = ''
  inquirer.prompt({
    name: 'action',
    type: 'rawlist',
    message: 'What would you like to do?',
    choices: actions
  }).then(answer => {
    switch (answer.action) {
      case actions[0]:
        query = `SELECT p.item_id ID, p.product_name Name, p.price Price, p.stock_qty Quantity FROM products p`
        console.log(query)
        displayQueryAsTable(query).then(() => run())
        break
      case actions[1]:
        query = `SELECT p.item_id ID, p.product_name Name, p.price Price, p.stock_qty Quantity FROM products p WHERE p.stock_qty < 5`
        displayQueryAsTable(query).then(() => run())
        break
      case actions[2]:
        //do something
        break
      case actions[3]:
        //do something
        break
      case actions[4]:
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
      console.log(err)
      reject()
    })
  })
}