const router = require('express').Router()
const {getAllHistory, getHistoryId, postHistory} = require('../controller/history')
const {postOrder} = require('../controller/order')


router.get('/', getAllHistory)

router.get('/:id', getHistoryId)

router.post('/', postHistory)

router.patch('/:id', postOrder)

module.exports = router