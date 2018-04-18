'use strict'

require('./utils.js')

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
  displayAllProducts()
  processOrder('Chips', 1)
})

let displayAllProducts = () => {
  let query = `SELECT p.item_id ID, p.product_name Name, p.price Price FROM products p`
  connection.query(query).then(result => {
    console.log('')
    console.logAsTable(result)
  }).catch(err => {
    console.log(err)
  })
}

let processOrder = (itemName, qtyRequested) => {
  let sQuery = `SELECT p.stock_qty, p.price FROM products p WHERE p.product_name LIKE ?`
  itemName = `%${itemName}%`
  connection.query(sQuery, itemName).then(sResult => {
    if (sResult[0].stock_qty >= qtyRequested) {
      let uQuery = `UPDATE products SET stock_qty = stock_qty - ? WHERE product_name LIKE ?`
      connection.query(uQuery, [qtyRequested, itemName]).then(uResult => {
        let totalPrice = (qtyRequested * sResult[0].price).toFixed(2)
        console.log(`\nProcessed order for a total of $${totalPrice}`)
      }).catch(err => {
        console.log(err)
      })
    } else {
      console.log(`\nInsufficient quantity.`)
    }
  }).catch(err => {
    console.log(err)
  })
}