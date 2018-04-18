'use strict'

let asTable = require('as-table')

exports = console.logAsTable = data => {
  console.log(
    asTable.configure({delimiter: ' | '})(data)
  )
}