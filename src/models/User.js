const { model, Schema } = require('mongoose'),

userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  pwd: String
}),

User = model('User', userSchema);

module.export = User;