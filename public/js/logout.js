
function logout(){
    sessionStorage.setItem('estadoCuenta', false);
    sessionStorage.removeItem('idUsuario');
    setTimeout("redireccionar('./index.html')", 1500);
}

