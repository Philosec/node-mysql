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
    console.log("")
    console.logAsTable(result)
    conn.end()
  })
})

let showAllProducts = () => {
  return new Promise((resolve, reject) => {
    let query = `SELECT a.item_id ID, a.product_name Name, a.price Price FROM products a`
    connection.query(query)
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}