const router = require('express').Router()
const {getMenuItem, getMenuId, postMenu, patchMenu, deleteItem} = require('../controller/menuItems')

// data menu_items
router.get('/', getMenuItem)
// id menu_items
router.get('/:id', getMenuId)

router.post('/', postMenu)

router.patch('/:id', patchMenu)

router.delete('/:id', deleteItem)

module.exports = router