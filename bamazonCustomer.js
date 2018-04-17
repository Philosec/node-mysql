'use strict'

let mysql = require('promise-mysql');
let inquirer = require('inquirer');
let asTable = require('as-table')
let keys = require('./keys.js');

let connection = {}

mysql.createConnection({
  host: keys.db.host,
  port: keys.db.port,
  user: keys.db.user,
  password: keys.db.pass,
  database: 'bamazon'
}).then(conn => {
  connection = conn;
  showAllProducts()
})

let showAllProducts = () => {
  connection.query('SELECT * FROM products')
    .then(result => {
      console.log(asTable.configure({delimiter: ' | ', right:true})(result))
      connection.end()
    })
    .catch(err => {
      console.log(err)
    })
}