
window.onload = editarUsuario();
function editarUsuario(){
    var id = sessionStorage.getItem('idUsuario');
    console.log(id);
    var usuario = db.collection('usuarios').doc(id);
    var btn = document.getElementById('btnEditarUsuario');
    

    var nombreUsuario = document.getElementById('nombreInput');
    var apellidoPaterno = document.getElementById('aPaternoInput');
    var apellidoMaterno = document.getElementById('aMaternoInput');
    var fechaNacimiento = document.getElementById('fechaNacimientoInput');
    var correo = document.getElementById('emailInput');
    var password = document.getElementById('passwordInput');



    usuario.get().then((doc) => {
        console.log("Document data:", doc.data());
        nombreUsuario.value = doc.data().nombre;
        apellidoPaterno.value = doc.data().aPaterno;
        apellidoMaterno.value = doc.data().aMaterno;
        fechaNacimiento.value = doc.data().fechaNacimiento;
        correo.value = doc.data().email;
        password.value = doc.data().pass;

        btn.addEventListener('click', async(e) =>
        {
            return usuario.update({
                nombre: nombreUsuario.value,
                aPaterno: apellidoPaterno.value,
                aMaterno: apellidoMaterno.value,
                fechaNacimiento: fechaNacimiento.value,
                email: correo.value,
                pass: password.value
            })
            .then(() => {
                console.log("Document successfully updated!");
                mensajeExitoEditar('Datos de usuario actualizados');
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        })
        
    });

}
