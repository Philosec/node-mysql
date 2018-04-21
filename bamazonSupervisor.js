'use strict'

require('./utils')

const mysql = require('promise-mysql')
const inquirer = require('inquirer')
const keys = require('./keys.js')
const g = require('./globals.js')

let connection = {}

mysql.createConnection({
  host: keys.db.host,
  port: keys.db.port,
  user: keys.db.user,
  password: keys.db.pass,
  database: 'bamazon'
}).then(conn => {
  connection = conn
  g.updateDeptNames(conn).then(() => runMenu())
})

const queries = {
  allInvQuery: `SELECT p.item_id ID, p.product_name Name, p.price Price, p.stock_qty Quantity FROM products p`,
  lowInvQuery: `SELECT p.item_id ID, p.product_name Name, p.price Price, p.stock_qty Quantity FROM products p WHERE p.stock_qty < 5`
}

let runMenu = () => {
  console.log('')

  const question = {
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View Products Sales by Department',
      'Create New Department',
      'Exit'
    ]
  }

  inquirer.prompt(question).then(answer => {
    switch (answer.action) {
      case question.choices[0]:
        displayProductSalesByDept().then(() => runMenu()).catch(err => console.log(err))
        break
      case question.choices[1]:
        createNewDepartment().then(() => runMenu()).catch(err => console.log(err))
        break
      case question.choices[2]:
        connection.end()
        process.exit()
        break
    }
  })
}

let displayProductSalesByDept = () => {
  return new Promise((resolve, reject) => {
    const query =`SELECT
                    d.department_id,
                    d.department_name,
                    d.over_head_costs,
                    CONVERT(IFNULL(SUM(p.product_sales), 0.00), DECIMAL(10, 2))                  dept_sales,
                    CONVERT(IFNULL(SUM(p.product_sales), 0) - d.over_head_costs, DECIMAL(10, 2)) dept_total_profit
                  FROM departments d LEFT JOIN products p ON d.department_id = p.department_id
                  GROUP BY d.department_id, d.department_name, d.over_head_costs`

    connection.query(query).then(result => {
      console.log('')
      console.logAsTable(result)
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}

let createNewDepartment = () => {
  return new Promise((resolve, reject) => {
    const question = [
      {
        name: 'name',
        type: 'input',
        message: 'What is the name of the new department?'
      },
      {
        name: 'cost',
        type: 'input',
        message: 'What are the overhead costs for the department?'
      }
    ]

    inquirer.prompt(question).then(answer => {
      const name = answer.name
      const cost = parseFloat(answer.cost)
      const query = `INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)`

      connection.query(query, [name, cost]).then(result => {
        resolve()
      }).catch(err => {
        console.log(err)
        reject()
      })
    })
  })
}