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
  placeOrder()
})

let placeOrder = () => {
  displayAllProducts().then(() => {
    console.log('')
    inquirer.prompt([
      {
        name: 'id',
        type: 'input',
        message: 'What product id would you like to purchase?',
        validate: value => {
          return isNaN(value) === false
        }
      },
      {
        name: 'qty',
        type: 'input',
        message: 'How many would you like?',
        validate: value => {
          return isNaN(value) === false
        }
      }
    ]).then(answers => {
      processOrder(answers.id, answers.qty).then(() => {
        placeOrder()
      }).catch(() => {
        placeOrder()
      })
    })
  })
}

let displayAllProducts = () => {
  return new Promise((resolve, reject) => {
    let query = `SELECT p.item_id ID, p.product_name Name, p.price Price FROM products p`
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

let processOrder = (productId, qtyRequested) => {
  return new Promise((resolve, reject) => {
    let sQuery = `SELECT p.stock_qty, p.price FROM products p WHERE p.item_id = ?`
    connection.query(sQuery, productId).then(sResult => {
      if (sResult[0].stock_qty >= qtyRequested) {
        let uQuery = `UPDATE products SET stock_qty = stock_qty - ?, product_sales = product_sales + (price * ?) WHERE item_id = ?`
        connection.query(uQuery, [qtyRequested, qtyRequested, productId]).then(uResult => {
          let totalPrice = (qtyRequested * sResult[0].price).toFixed(2)
          console.log(`\nProcessed order for a total of $${totalPrice}`)
          resolve()
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      } else {
        console.log(`\nInsufficient quantity.`)
        reject()
      }
    }).catch(err => {
      console.log(err)
      reject()
    })
  })
}