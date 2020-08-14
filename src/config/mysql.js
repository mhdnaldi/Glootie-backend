const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
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