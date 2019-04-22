const passport = require('passport')
    , { Strategy } = require('passport-local')
    , User = require('../models/User')

let configPassport

// Configuracion de Strategies de Passport
configPassport = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}

// Serializar 
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserealizar
passport.deserializeUser(async (id, done) => {
  const user = await User.findById( id );
  done(null, user);
});

// Registrar el usuario
passport.use('local-register', new Strategy(configPassport, 
  async (req, email, password, done) => {
    const user = await User.findOne({ email: email })
    // Verifico que no exista el correo
    if ( user ) {
      return done(null, false, req.flash('registerMessage', 'El correo ya existe'))
    } else {
      const { name, lastname } = req.body
          , user = new User()

      user.name = name
      user.lastname = lastname
      user.email = email
      user.password = user.encryptPassword(password)

      // guardo el nuevo usuario
      await user.save()
      // retorno una respuesta
      done(null, user)
    }

  }))

// Logueo de usuario
passport.use('local-login', new Strategy(configPassport, 
  async (req, email, password, done) => {

  const user = await User.findOne({ email: email })

  if ( !user ) {
    return done(null, false, req.flash('local-login', 'El usuario no existe'))
  }

  if ( !user.comparePassword(password)) {
    return done(null, false, { message: 'Las contraseñas no coinciden'})
  }

  done(null, user)
 
}));

