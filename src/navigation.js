const route = require('express').Router()
const menuItems = require('./routes/menuItems')
const category = require('./routes/category')
const history = require('./routes/history')

route.use('/menu', menuItems)
route.use('/category',  category)
route.use('/history', history)

module.exports = route