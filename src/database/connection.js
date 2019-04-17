// Importar el módulo de mongoose
var mongoose = require ('mongoose');

// Configurar la conexión de mangosta por defecto
var mongoDB = 'mongodb://127.0.0.1:27017/company';
mongoose.connect (mongoDB);
// Consigue que Mongoose use la biblioteca de promesa global
mongoose.Promise = global.Promise;
// Obtener la conexión por defecto
var db = mongoose.connection;

// Vincular la conexión al evento de error (para obtener notificación de
// errores de conexión)
db.on ('error', console.error.bind (console, 'Error de conexión MongoDB:'));

module.exports = db
