const router = require('express').Router()
const {getAllHistory, getHistoryId, postHistory} = require('../controller/history')

router.get('/', getAllHistory)

router.get('/:id', getHistoryId)

router.post('/', postHistory)

module.exports = router