var seccion = document.getElementById('seccionAreas');
var idUsuario = sessionStorage.getItem('idUsuario');
var id;
let ubiAreas = document.getElementById('ubicacionArea');
let espAreas = document.getElementById('espacioArea');
// const db = firebase.firestore();
/*###########################################################################*/
/*Consultar tabla de plantas*/
document.onload = muestraRegistros();

function muestraRegistros(){
    db.collection('areas').where("idUsuarioRef", "==",idUsuario).get().then((querySnapshot)=>{
        seccion.innerHTML = ''
        querySnapshot.forEach((doc)=> {
            console.log(`${doc.id} => ${doc.data().tipo}`);
            doc.id = id;
            var nombreAreaParam = doc.data().nombre;
            seccion.innerHTML+=`
            <div class="area">
            <div class="imgArea">
              <a href="consultarPlantasAreas.html?id=${nombreAreaParam}"><img src="img/regadera.png" alt="regadera" /></a>
            </div>
            <div class="opcionesArea">
              <p class="nombreArea">${doc.data().nombre}</p>
              <div class="botonesArea">
                <div>
                  <a data-bs-toggle="modal" data-bs-target="#modificarPlantaModal"><img src="img/editar.svg"
                      class="iconos-tam" id ="editBtn" onclick="editarArea('${doc.id}')"/>
                  </a>
                </div>
                <div>
                  <img src="img/eliminar.svg" class="iconos-tam" onclick="eliminar('${doc.id}')" />
                </div>
              </div>
            </div>
          </div>
         `
        })
        seccion.innerHTML+=`
        <!--Div para agregar más áreas-->
        <div>
          <div class="centrado row-2">
            <a href="agregarArea.html" class="mx-2">
              <img src="img/icono-mas.png" alt="mas" class="masTam" />
            </a>
            <p>Agregar area</p>
          </div>
          
        </div>
        `
    })
}




/*#######################  EDITAR AREAS #####################################*/

function editarArea(id){
    var area = db.collection("areas").doc(id);
    console.log(id);
    var nombreArea = document.getElementById('nombreArea')
    var ubicacionArea = document.getElementById('ubicacionArea');
    var espacioArea = document.getElementById('espacioArea');
    var altoArea = document.getElementById('altoArea');
    var anchoArea = document.getElementById('anchoArea');
    var tipoIluminacion = document.getElementById('iluminacion');
    var formularioAreas = document.getElementById("form_addAreas");

    area.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());

            nombreArea.value = doc.data().nombre;
            ubicacionArea.value = doc.data().ubicacion;
            altoArea.value = doc.data().alto;
            anchoArea.value = doc.data().ancho;
            tipoIluminacion.value = doc.data().tipoIluminacion;
            if (ubiAreas.value == 'Exterior'){
                espacioArea.value = doc.data().espacio;
                espAreas.length = 0;
                espacioArea.value = doc.data().espacio;
                espAreas[0] = new Option('Selecciona el tipo de espacio', "")
                espAreas[1] = new Option('Zotehuela')
                espAreas[2] = new Option('Terraza')
                espAreas[3] = new Option('Jardín')
                espAreas[4] = new Option('Patio')
                espAreas[5] = new Option('Balcón')
            }
            if (ubiAreas.value == 'Interior'){
                espAreas.length = 0;
                espacioArea.value = doc.data().espacio;
                espAreas[0] = new Option('Selecciona el tipo de espacio', "")
                espAreas[1] = new Option('Cuarto')
                espAreas[2] = new Option('Cuarto de baño')
                espAreas[3] = new Option('Vestibulo')
                espAreas[4] = new Option('Cocina')
                espAreas[5] = new Option('Sala')
                espAreas[6] = new Option('Oficina')
            }

            formularioAreas.addEventListener('submit', async(e) =>
            {
                e.preventDefault();
                area.update({
                    nombre: nombreArea.value,
                    ubicacion: ubicacionArea.value,
                    espacio: espacioArea.value,
                    alto: altoArea.value,
                    ancho: anchoArea.value,
                    tipoIluminacion: tipoIluminacion.value
                }).then(() => {
                    console.log("Document successfully updated!");
                    mensajeExito('Datos del area actualizados');
                   
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        }).catch((error) => {
        console.log("Error getting document:", error);
        });

}


/*########################### BORRRAR REGISTRO ############# */
function borrarPlanta(id){    
    db.collection("areas").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}


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
    if (ubiAreas.value == 'Interior'){
        espAreas.length = 0;
        espAreas[0] = new Option('Selecciona el tipo de espacio', "")
        espAreas[1] = new Option('Habitación')
    }
});




