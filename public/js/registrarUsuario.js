var formularioRegistro = document.getElementById('form_registro');
var correoRegistrado = false;


                                     /* Registrar un nuevo usuario*/
/*###################################################################################################*/

formularioRegistro.addEventListener('submit', async (e) => {
  e.preventDefault();
  var nombreUsuario = document.getElementById('nombreInput').value;
  var apellidoPaterno = document.getElementById('aPaternoInput').value;
  var apellidoMaterno = document.getElementById('aMaternoInput').value;
  var fechaNacimiento = document.getElementById('fechaNacimientoInput').value;
  var correo = document.getElementById('emailInput').value;
  var password = document.getElementById('passwordInput').value;

  if(correoRegistrado == true)
  {
    mensajeError("El correo que ingresaste ya se encuentra registrado");
    return;
  }
  if (correoRegistrado == false){
    db.collection("usuarios").add({
      nombre: nombreUsuario,
      aPaterno: apellidoPaterno,
      aMaterno: apellidoMaterno,
      fechaNacimiento: fechaNacimiento,
      email: correo,
      pass: password
    })
    .then((docRef) => {
        console.log("Usuario registrado con ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error al agregar usuario: ", error);
    });
    await mensajeExito('Registro exitoso');
    setTimeout("redireccionar('./login.html')", 1500);
  }
});
  
// Verifica que el correo ingresado no este registrado
formularioRegistro.addEventListener('input', async (e) => {
  correoRegistrado = false;

  db.collection("usuarios").where("email", "==", document.getElementById('emailInput').value)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              correoRegistrado = true;
          })
      }).catch((error) => {
          console.log("Error getting documents: ", error);
      })
});
/*###################################################################################################*/

