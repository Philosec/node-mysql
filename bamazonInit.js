'use strict'

const fs = require('fs-extra')
const mysql = require('promise-mysql')
const keys = require('./keys.js')

mysql.createConnection({
  host: keys.db.host,
  port: keys.db.port,
  user: keys.db.user,
  password: keys.db.pass,
  database: 'bamazon'
}).then(conn => {
  fs.readFile(`${__dirname}/sql/dbInit.sql`, 'utf8').then(sql => {
    conn.query(sql).then(result => {
      console.log(result)
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
})