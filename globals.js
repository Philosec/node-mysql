'use strict'

exports.deptNames = []

exports.updateDeptNames = dbConnection => {
  return new Promise((resolve, reject) => {
    let query = `SELECT d.department_id, d.department_name FROM departments d ORDER BY d.department_id`
    dbConnection.query(query).then(result => {
      exports.deptNames = result.map(obj => {return obj.department_name})
      resolve()
    }).catch(err => {
      console.log(err)
      reject()
    })
  })
}