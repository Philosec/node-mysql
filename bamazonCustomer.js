'use strict'

let mysql = require('promise-mysql');
let inquirer = require('inquirer');
let utils = require('./utils.js')
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
  showAllProducts().then(result => {
    console.logAsTable(result)
    conn.end()
  })
})

let showAllProducts = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM products')
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}

