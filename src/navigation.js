const route = require('express').Router()
const menuItems = require('./routes/menuItems')
const category = require('./routes/category')

route.use('/menu', menuItems)
route.use('/category',  category)

module.exports = route