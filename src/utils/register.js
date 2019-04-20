// importamos el modelo user
const User = require('../models/User')

// Registra el usuario en la base de datos
// y retonra un mensaje
// Funcion con async await
async function register(body) {

  // Destructuring de los datos pasados por parametros
  const { name, lastname, email, password } = body;

  const user = await new User({ name, lastname, email, pwd: password });

  if ( user ) {
    console.log('Se ha registrado correctamente');
  } else {
    console.log('Ha habido un error');
  }

}

module.exports.register = register;
