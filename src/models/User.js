// 1- Destructuring del obj mongoose
// 2- Creo el Schema del User
// 3- se crea el modelo y se exporta
const { model, Schema } = require('mongoose')
    , { genSaltSync, compareSync, hashSync } = require('bcrypt')

let userSchema, userModel

userSchema = new Schema({
    name: String
  , lastname: String
  , email: String
  , password: String
})

// Metodos
userSchema.methods.encryptPassword = password => {
  // retorna la contraseña encryptada
  return hashSync(password, genSaltSync(10))
}

// Se usa function() para poder hacer referencia a "this" de userschema
userSchema.methods.comparePassword = function( password ) {
  // "this.password" accede a la contraseña
  // que esta en el obj
  return compareSync(password, this.password)
}

userModel = model('User', userSchema)

module.exports = userModel;