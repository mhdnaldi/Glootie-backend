const router = require('express').Router()
const {getCategoryItem, getCategoryId, postCategory, patchCategory, deleteCategory} = require('../controller/category')


router.get('/', getCategoryItem)

router.get('/:id', getCategoryId)

router.post('/', postCategory)

router.patch('/:id', patchCategory)

router.delete('/:id', deleteCategory)
module.exports = router