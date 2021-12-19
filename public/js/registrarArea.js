
var formularioAreas = document.getElementById('form_addAreas');
let idUsuario = sessionStorage.getItem('idUsuario');
let ubiAreas = document.getElementById('ubicacionArea');
let espAreas = document.getElementById('espacioArea');


/*Se modifican las opciones del tipo del tipo de espacio dependiendo si escoge un espacio interior o
exterior */
ubiAreas.addEventListener('change', async(e)=>{
    if (ubiAreas.value == 'Exterior'){
        espAreas.length = 0;
        espAreas[0] = new Option('Selecciona el tipo de espacio', "")
        espAreas[1] = new Option('Zotehuela')
        espAreas[2] = new Option('Terraza')
        espAreas[3] = new Option('Jardín')
        espAreas[4] = new Option('Patio')
        espAreas[5] = new Option('Balcón')
    }
    else{
        espAreas.length = 0;
        espAreas[0] = new Option('Selecciona el tipo de espacio', "")
        espAreas[1] = new Option('Cuarto')
        espAreas[2] = new Option('Cuarto de baño')
        espAreas[3] = new Option('Vestibulo')
        espAreas[4] = new Option('Cocina')
        espAreas[5] = new Option('Sala')
        espAreas[6] = new Option('Oficina')
    }
});

                                     /* Registrar un nueva area*/
/*###################################################################################################*/

formularioAreas.addEventListener('submit', async (e) => {
    e.preventDefault();
    var nombreArea = document.getElementById('nombreArea').value;
    var ubicacionArea = document.getElementById('ubicacionArea').value;
    var espacioArea = document.getElementById('espacioArea').value;
    var altoArea = document.getElementById('altoArea').value;
    var anchoArea = document.getElementById('anchoArea').value;
    var tipoIluminacion = document.getElementById('iluminacion').value;

  db.collection("areas").add({
        idUsuarioRef: idUsuario,
        nombre: nombreArea,
        ubicacion: ubicacionArea,
        espacio: espacioArea,
        alto: altoArea,
        ancho: anchoArea,
        tipoIluminacion: tipoIluminacion
      })
      .then((docRef) => {
          console.log("Area registrada con ID: ", docRef.id);
      })
      .catch((error) => {
          console.error("Error al agregar area: ", error);
      });
       await mensajeExito('Registro de area exitoso');
       setTimeout("redireccionar('./misAreas.html')", 1500);
});




