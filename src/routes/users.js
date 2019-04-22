const router = require('express').Router()
    , { configLoginPassport, configRegisterPassport } = require('../utils/utils')
    , passport = require('passport')

router
// Registro
  .get('/register', (req, res) => {
    res.render('users/register')
  })
  .post('/register', passport.authenticate('local-register', configRegisterPassport))
// Login
  .get('/login', (req, res) => {
    res.render('users/login')
  })
  .post('/login', passport.authenticate('local-login', configLoginPassport))
  // Deslogueo
  .get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

module.exports = router
