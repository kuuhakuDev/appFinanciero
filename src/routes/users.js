const router = require('express').Router()

router
  .get('/login', (req, res) => {
    res.render('users/login')
  })
  .post('/verify', (req, res) => {
    console.log(req.body)
    res.send('Received')
  })
  .get('/signin', (req, res) => {
    res.render('users/signin')
  })
  .post('/register', (req, res) => {
    console.log(req.body)
    res.send('Received')
  })

module.exports = router