const router = require('express').Router()
const {getCategoryItem, getCategoryId} = require('../controller/category')

router.get('/', getCategoryItem)

router.get('/:id', getCategoryId)

module.exports = router