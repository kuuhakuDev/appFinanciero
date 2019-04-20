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
