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
      'View Products Sales by Department',
      'Create New Department',
      'Exit'
    ]
  }
}

const queries = {
  allInvQuery: `SELECT p.item_id ID, p.product_name Name, p.price Price, p.stock_qty Quantity FROM products p`,
  lowInvQuery: `SELECT p.item_id ID, p.product_name Name, p.price Price, p.stock_qty Quantity FROM products p WHERE p.stock_qty < 5`
}