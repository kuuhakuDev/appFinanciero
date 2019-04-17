/*const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const user = encodeURIComponent('kuudev');
const password = encodeURIComponent('1234');
const authMechanism = 'DEFAULT';

// Connection URL
const url = `mongodb://${user}:${password}@localhost:27017/?authMechanism=${authMechanism}`;

// Database Name
const dbName = 'company';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);

  createCollated(db, function() {
    client.close();
  });
});

//Falta modificar
//Investigar como crear colecciones
function createCollated(db, callback) {
  db.createCollection('users',
    function(err, results) {
      console.log("Collection created.");
      callback();
    }
  );
};

module.exports = db;
*/

// Requerir mongoose
var mongoose = require ('mongoose');
var db = require('./connection.js')

// Definir un esquema
var schema = mongoose.Schema;

var usersSchema = schema({
  name: String,
  lastname: String,
  email: String,
  pwd: String
});

var users  = mongoose.model('users', usersSchema);

function register(body){

  var user = new users({
    name: body['name'],
    lastname: body['lastname'],
    email: body['email'],
    pwd: body['password']
  });

  user.save(function (err) {
    if (err) return handleError(err);
    console.log("Se ha registrado correctamente.");
  });

}

module.exports.register = register;
