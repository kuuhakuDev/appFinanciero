// Variables
const express = require('express')
    , morgan = require('morgan')
    , sassMiddleware = require('node-sass-middleware')
    , path = require('path')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , passport = require('passport')

    , port = process.env.PORT || 3000
    , srcPath = __dirname + '/assets'
    , destPath = __dirname + '/public'

    , mainRoutes = require('./routes/main')
    , usersRoutes = require('./routes/users')
    , appRoutes = require('./routes/app')

// Inicializaciones
app = express()
require('./config/passport');
  // Base de datos
require('./database/connection');

// Configuraciones
app
  .set('view engine', 'pug')
  .set('views', path.join(__dirname, '/views'))

// middlewares
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(morgan('dev'))
  .use(session({
      secret: 'company'
    , resave: true
    , saveUninitialized: true
  }))
  .use(sassMiddleware({
      src: srcPath
    , dest: destPath
    , debug: true
    , outputStyle: 'nested'
  }))
  .use(passport.initialize())
  .use(passport.session())

// rutas
app
  .use('/', mainRoutes)
  .use('/users', usersRoutes)
  .use('/app', appRoutes)

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

// iniciar servidor
app
  .listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`))
