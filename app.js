require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const routerNavigation = require('./src/navigation')
const cors = require('cors')

app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
  next()
})

// MIDDLEWARE
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))

app.use('/', routerNavigation)

app.use('*',(req, res) => {
  res.send('404 Page not found!').status(404)
})


app.listen(3000,()=> {
  console.log('Listening for request on port 3000');
})