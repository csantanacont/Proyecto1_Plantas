
var formularioPlantas = document.getElementById('form_addPlantas');
let idUsuario = sessionStorage.getItem('idUsuario');


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
    
    var imagen1 = document.getElementById("img1").files[0];

    // subirImagen({
    //     img1: imagen1;
    // })

      
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
        img1: sessionStorage.getItem('urlImg')
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


const subirImagen = async({imagen1}) => {
    let storageRef = firebase.storage().ref().child(`images/${imagen1.name}`);
    await storageRef.put(imagen1);
    return storageRef;
}




