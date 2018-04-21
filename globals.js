'use strict'

require('./utils')

let mysql = require('promise-mysql')
let keys = require('./keys.js')

exports.departments = {
  update: dbConnection => {
    let query = `SELECT d.department_id, d.department_name FROM departments d ORDER BY d.department_id`
    dbConnection.query(query).then(result => {
      result.forEach(item => { console.log(item.department_id)})
    })
  }
}