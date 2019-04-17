const router = require('express').Router()
const db = require('../database/register.js')

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
    signin(req.body) //signin
  })

module.exports = router

//signin
function signin(body) {

  db.register(body);

}
