const router = require('express').Router()
const {getAllOrder, getOrderId, postOrder, patchOrder} = require('../model/order')


router.get('/', getAllOrder)

router.get('/:id', getOrderId)

// router.post('/', postOrder)

// router.patch('/:id',patchOrder)

module.exports = router