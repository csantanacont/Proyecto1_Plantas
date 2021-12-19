
var formularioPlantas = document.getElementById('form_addPlantas');
var btnAgregarPlanta = document.getElementById('btnRegistrarPlanta');
let idUsuario = sessionStorage.getItem('idUsuario');
let ubicacion = document.getElementById('ubicacion');
var img1 = document.getElementById("img1");
var urlImagen;
// Maximizamos la fecha
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
today = yyyy+'-'+mm+'-'+dd;
document.getElementById("fecha").setAttribute("max", today);

db.collection('areas').where("idUsuarioRef", "==",idUsuario).get().then((querySnapshot)=>{
    ubicacion.innerHTML = ''
    ubicacion.innerHTML =`
    <option value="">Selecciona el area donde se encuentra la planta</option>
    `
    querySnapshot.forEach((doc)=> {
        doc.id = id;
        ubicacion.innerHTML+=`
        <option>${doc.data().nombre}</option>
        `
    })
})

                                     /* Registrar un nueva planta*/
/*###################################################################################################*/

formularioPlantas.addEventListener('submit', async (e) => {
    e.preventDefault();
    var tipo = document.getElementById('tipo').value;
    var especie = document.getElementById('especie').value;
    var lugar = document.getElementById('lugar').value;
    var temporada = document.getElementById('temporada').value;
    var usos = document.getElementById('usos').value;
    var ubicacion = document.getElementById('ubicacion').value;
    var fecha = document.getElementById('fecha').value;
    var descripcion = document.getElementById('descripcion').value;
    var notas = document.getElementById('notas').value;
    
    
    await subirImagen();
  db.collection("plantas").add({
        tipo: tipo,
        especie: especie,
        lugar: lugar,
        temp: temporada,
        usos: usos,
        ubicacion: ubicacion,
        fechaPlantacion: fecha,
        descripcion: descripcion,
        notas: notas,
        idDuenio: idUsuario,
        img1: urlImagen
      })
      .then((docRef) => {
          console.log("Planta registrada con ID: ", docRef.id);
      })
      .catch((error) => {
          console.error("Error al agregar planta: ", error);
      });
       await mensajeExito('Registro de planta exitoso');
       setTimeout("redireccionar('./consultar.html')", 1500);
});


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
            urlImagen = url;
            setTimeout(8000);
        });
    });
}
};




