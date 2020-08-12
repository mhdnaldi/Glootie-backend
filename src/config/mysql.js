const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'week4_database'
})

connection.connect(err => {
  if(err) {
    throw err
  } else {
    console.log(`You're connected`);
  }
})

module.exports = connection