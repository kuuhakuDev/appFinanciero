const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , User = require('../models/User')

passport.use('local-login', new LocalStrategy({
  usernameField: 'user',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {

  const user = await User.findOne({email: email})

  if ( !user ) {
    return done(null, false, {message: 'Usuario no encontrado'})
  }

  if ( user.password !== password ) {
    return done(null, false, { message: 'Las contraseñas no coinciden'})
  }

}));

// Serializar la contraseña
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById( id );
  done(null, user);
});