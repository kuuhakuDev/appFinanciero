const mongoose = require('mongoose')
    , mongoLocation = 'mongodb://127.0.0.1:27017/company'
    , mongoConfig = {
          useNewUrlParser: true
        , useFindAndModify: true
      }

// conecto a la base de datos.
mongoose.connect(mongoLocation, mongoConfig)
// Devuelve una promesa, devuelve un mensaje por consola si se conecta
// satisfactoriamente a la base de datos
  .then( db => console.log('Se ha conectado la base de datos'))
// si existe un error lo arroja a la consola
  .catch( err => console.log(err))

module.exports = mongoose;