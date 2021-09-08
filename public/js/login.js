
const form = document.getElementById('form_login');
var idUsuario;


form.addEventListener('keyup', async (e) => {
    sessionStorage.setItem('estadoCuenta', false);
    db.collection("usuarios").where("email", "==", document.getElementById('emailLogin').value)
        .where("pass", "==", document.getElementById('passwordLogin').value)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                idUsuario = doc.id;
                sessionStorage.setItem('estadoCuenta', true);
                console.log("el estado de la sesion es"+sessionStorage.getItem('estadoCuenta'));
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
});

document.getElementById('loginBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    login();
});

async function login() {
    if (sessionStorage.getItem('estadoCuenta') == 'true') {
        sessionStorage.setItem('idUsuario', idUsuario);
        await mensajeExito('Inicio de sesion exitoso');
        setTimeout("redireccionar('./consultar.html')", 1500);
    } else {
       mensajeError( 'Los datos que ingresaste son incorrectos' );
       return;
    }
}

