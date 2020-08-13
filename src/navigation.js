const route = require('express').Router()
const menuItems = require('./routes/menuItems')
const category = require('./routes/category')
const history = require('./routes/history')
const order = require('./routes/order')

route.use('/menu', menuItems)
route.use('/category',  category)
route.use('/history', history)
route.use('/order', order)

module.exports = route