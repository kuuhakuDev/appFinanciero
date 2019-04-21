const router = require('express').Router()
    , db = require('../utils/register')
    , passport = require('passport')

router
  .get('/login', (req, res) => {
    res.render('users/login')
  })
  .post('/login', passport.authenticate('local-login', {
      successRedirect: '/dashboard'
    , failureRedirect: '/users/login'
    , passReqToCallback: true
  }))
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
