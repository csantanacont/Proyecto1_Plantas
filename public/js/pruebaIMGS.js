/*SCRIPT PARA SUBIR ARCHIVOS A FIREBASE (STORAGE) Y ALMACENAR LA URL DEL ARCHIVO SUBIDO EN EL ALMACENAMIENTO DE SESION

SE DEBE AGREGAR EL SIGUIENTE SCRIPT EN EL FORMULARIO DONDE SE DESEA SUBIR EL ARCHIVO:
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>

*/

let formulario = document.getElementById('form_addPlantas');
let img1  = document.getElementById('img1');
let idUsuario = sessionStorage.getItem('idUsuario');
formulario.addEventListener('submit', async(e)=>{
    e.preventDefault();
    await subirImagen();
})


subirImagen = function () {
    archivo = img1.files[0];
    if(!img1){
        return;
    }else{
    console.log(archivo.name);
    var storageRef = defaultStorage.ref('/plantas/'+idUsuario+'/'+archivo.name);
    var uploadTask = storageRef.put(archivo);
    uploadTask.on('state-changed', function(snapshot) {
    }, function (error) {
        console.log(error)
    }, function (){
        storageRef.getDownloadURL().then((url) =>{
            sessionStorage.setItem('urlImg1', url);
        });
    });
}
};