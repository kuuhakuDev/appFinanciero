

var formulario = document.getElementById('id'),
    user = formulario.name,
    lastname = formulario.lastname,
    email = formulario.email,
    password = formulario.password,
    conf_password = formulario.conf_password,
    error = document.getElementById('error');

function checkName(e) {

  if(user.value.trim() == '' || user.value == null){
    console.log("Ingrese el nombre.");
    error.innerHTML += '<li id="warning">Por favor introduzca su nombre.</li>';

    e.preventDefault();
  }
}

function checkLastname(e) {

  if(lastname.value.trim() == '' || lastname.value == null){
    console.log("Ingrese el apellido.");
    error.innerHTML += '<li id="warning">Por favor introduzca su apellido.</li>';

    e.preventDefault();
  }
}

function checkEmail(e) {

  if(email.value.trim() == '' || email.value == null){
    console.log("Ingrese la direccion de correo.");
    error.innerHTML += '<li id="warning">Por favor introduzca su Email.</li>';

    e.preventDefault();
  }
}

function checkPassword(e) {

  if(password.value.trim() == '' || password.value == null){
    console.log("Ingrese el apellido.");
    error.innerHTML += '<li id="warning">Por favor introduzca una contraseña.</li>';

    e.preventDefault();
  } else if (password.value != conf_password.value) {
    console.log("Las claves no coinciden.");
    error.innerHTML += '<li id="warning">Las contraseñas no coinciden.</li>';

    e.preventDefault();
  }
}

function checkForm(e){
  while (error.firstChild) {
    error.removeChild(error.firstChild);
  }

  checkName(e);
  checkLastname(e);
  checkEmail(e);
  checkPassword(e);
}

formulario.addEventListener('submit', checkForm);
