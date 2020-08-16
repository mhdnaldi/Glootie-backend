const router = require('express').Router()
const {getAllOrder, getOrderId, postOrder} = require('../controller/order')


router.get('/', getAllOrder)

router.get('/:id', getOrderId)

router.post('/', postOrder)


module.exports = router