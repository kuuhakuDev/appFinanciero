// 1- Destructuring del obj mongoose
// 2- Creo el Schema del User
// 3- se crea el modelo y se exporta
const { model, Schema } = require('mongoose'),
 
userSchema = 
  new Schema({
    name: String,
    lastname: String,
    email: String,
    pwd: String
  }), 
  
User = model('User', userSchema);

module.export = User;