const router = require('express').Router()

router
  .get('/', (req, res) => {
    res.send('Im App')
  })

module.exports = router;