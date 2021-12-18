var idUsuario = sessionStorage.getItem("idUsuario");
//Creamos la instancia
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
//Accedemos a los valores
var id = urlParams.get("id");
var Reg = document.getElementById("ev1");
var noReg = document.getElementById("ev2");
var btnEditar = document.getElementById("btnEditarRegistro");
var btnAgregar = document.getElementById("btnAgregarRegistro");
var btnEditarMonitoreo = document.getElementById("btnEditMonitoreo");
var btnVerHistorial = document.getElementById("btnVerHistorial");
var contador = 1;
// console.log("EL ID DE ESTA PLANTA ES: ", id)
document.onload = muestraDetalles(id);
document.onload = muestraMonitoreo(id);
btnVerHistorial.addEventListener('click', ()=>{
  window.location.href= `./historialMonitoreo.html?id=${id}`;
})
/*################# MOSTRAR DETALLES DEL REGISTRO #################### */
function muestraDetalles(id) {
    // console.log(id);
    var planta = db.collection("plantas").doc(id);
    var titulo = document.getElementById("nombrePlantaTitulo");
    var modalInfo = document.getElementById("infoPlanta");
    var imagenes = document.getElementById("imagenesInfo");
    // color #278650
    planta
        .get()
        .then((doc) => {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
                titulo.innerHTML="";
                titulo.innerHTML=`
                <h1 class="animate__animated animate__pulse" style="color: #278650">
                    ${doc.data().tipo}
                </h1>
                `;
                modalInfo.innerHTML = "";
                modalInfo.innerHTML += `
            <div class="col-md-6">
                <br>
                <div id="modalInfo">
                    <!--<h3>${doc.data().tipo}</h3>-->
                    <p style="font-size: small"><label style="font-size: medium; color:#278650 ; font-weight: bold;">Especie:</label> ${doc.data().especie}</p>
                        <div>
                            <p style="font-size: small"><label style="font-size: medium; color: #278650; font-weight: bold;">Descripcion de la planta:</label> ${doc.data().descripcion}</p>
                        </div>
                        <div>
                            <p style="font-size: small"><label style="font-size: medium; color: #278650; font-weight: bold;">Lugar de plantación:</label> ${doc.data().lugar}</p>
                        </div>
                        <div>
                            <p style="font-size: small"><label style="font-size: medium; color: #278650; font-weight: bold;">Temporada:</label> ${doc.data().temp}</p>
                        </div>
                        <div>
                            <p style="font-size: small"><label style="font-size: medium; color: #278650; font-weight: bold;">Usos:</label> ${doc.data().usos}</p>
                        </div>
                        <div>
                            <p style="font-size: small"><label style="font-size: medium; color: #278650; font-weight: bold;">Fecha en que fue plantada: </label> ${doc.data().fechaPlantacion}</p>
                        </div>
                        <div>
                            <p style="font-size: small">
                            <label style="font-size: medium; color: #278650; font-weight: bold;">Notas sobre el cuidado de la planta:</label>
                            ${doc.data().notas}
                            </p>
                        </div> 
                </div>
            
            </div>
            <a onclick="editarPlanta('${doc.id}')" data-bs-toggle="modal" data-bs-target="#modificarPlantaModal">
                <img src="img/editar.svg" style=" position: absolute; bottom: 0px; right: 0px; margin: 10px; margin-right: 50px;" class="iconos-tam" />
            </a>
        
            <a><img style="position: absolute; bottom: 0px; right: 0px; margin: 10px" src="img/eliminar.svg" class="iconos-tam" onclick="eliminar('${doc.id}')" /></a>
            

            <div style="display:flex; margin-left:40%">
                <div id="imagenesInfo" class="sidebar">
                    <img id="img1" style="width: 40%" class="img-fluid d-block small-preview" src="${doc.data().img1}" />
                </div>  
            </div>
                 `   
          
            } else {
                // doc.data() will be undefined in this case
                console.log("No hay registros de plantas");
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
  }

  

/*#######################  EDITAR PLANTAS #####################################*/

function editarPlanta(id) {
    // console.log(id);
    var modalE = document.getElementById("modificarPlantaModal");
    var planta = db.collection("plantas").doc(id);
    var formEditar = document.getElementById("modalEditarInfo");
    var btnEditar = document.getElementById("btnEditarPlanta");
    var tipo = document.getElementById("tipo");
    var especie = document.getElementById("especie");
    var lugar = document.getElementById("lugar");
    var temporada = document.getElementById("temporada");
    var usos = document.getElementById("usos");
    var ubicacion = document.getElementById("ubicacion");
    var fecha = document.getElementById("fecha");
    var descripcion = document.getElementById("descripcion");
    var notas = document.getElementById("notas");
    var img1;
  
    planta
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          tipo.value = doc.data().tipo;
          especie.value = doc.data().especie;
          lugar.value = doc.data().lugar;
          temporada.value = doc.data().temp;
          usos.value = doc.data().usos;
          ubicacion.value = doc.data().ubicacion;
          fecha.value = doc.data().fechaPlantacion;
          descripcion.value = doc.data().descripcion;
          notas.value = doc.data().notas;
          db.collection("areas")
            .where("idUsuarioRef", "==", idUsuario)
            .get()
            .then((querySnapshot) => {
              ubicacion.innerHTML = "";
              ubicacion.innerHTML = `
                  <option value="">Selecciona el area donde se encuentra la planta</option>
                  `;
              querySnapshot.forEach((doc) => {
                doc.id = id;
                ubicacion.innerHTML += `
                      <option>${doc.data().nombre}</option>
                      `;
              });
            });
          formEditar.addEventListener("submit", async (e) => {
            e.preventDefault();
            return planta
              .update({
                tipo: tipo.value,
                especie: especie.value,
                lugar: lugar.value,
                temp: temporada.value,
                usos: usos.value,
                ubicacion: ubicacion.value,
                fechaPlantacion: fecha.value,
                descripcion: descripcion.value,
                notas: notas.value,
              })
              .then(() => {
                // console.log("Document successfully updated!");
                mensajeExito("Datos de la planta actualizados");
              })
              .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
              });
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
  
  /*########################### BORRRAR REGISTRO ############# */
  function borrarPlanta(id) {
    db.collection("plantas")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

async function muestraMonitoreo(id){

    monitoreo = await db.collection("monitoreo").where("plantaReferencia", "==", id);
    contador=1;
    monitoreo.get().then((querySnapshot) => {
            // console.log(querySnapshot);
            if (querySnapshot.size > 0) { 
              evaluarPlanta(id, monitoreo);
              noReg.style.display = 'none';
              Reg.style.display = 'block';
              btnEditar.style.display = 'block';
              btnAgregar.style.display = 'none'
              if(contador == 1){
                btnEditarMonitoreo.addEventListener('click', ()=>{
                    editarMonitoreo(monitoreo);
                })
              }
            } else {
                // doc.data() will be undefined in this case
                noReg.style.display = 'block';
                Reg.style.display = 'none';
                btnEditar.style.display = 'none';
                btnAgregar.style.display = 'block'
                console.log("No such document!")
            }
            contador++;
        }
        )
        .catch((error) => {
            console.log("Error getting document:", error);
        });
        btnAgregar.addEventListener('click',()=>{
        agregarMonitoreo(id);
        });
        btnEditar.addEventListener('click',()=>{
        console.log("UIERE EDITAR");
        });

}

async function agregarMonitoreo(id){
    var frecuencia = document.getElementById('frecuencia').value;
    var altura = document.getElementById('altura').value;
    var rangoManchas = document.getElementById('rangoManchas').value;
    var tierra = document.getElementById('tierra').value;
    var sustratoTierra = document.getElementById('sustratoTierra').value;
    var idFecha = Date.now();
    db.collection("monitoreo").doc(String(idFecha)).set({
        frecuenciaRiego: frecuencia,
        altura: altura,
        manchas: rangoManchas,
        tierra: tierra,
        sustratoTierra: sustratoTierra,
        plantaReferencia: id,
        idDuenio: idUsuario,
        momentoAgregado: idFecha
      })
      .then((docRef) => {
          console.log("Monitoreo registrado con ID: ", docRef.id);
      })
      .catch((error) => {
          console.error("Error al agregar los datoss de monitoreo: ", error);
      });
       await mensajeExito('Registro de datos para monitoreo exitoso');
      //  setTimeout("redireccionar('./consultar.html')", 1500);
};
    
async function editarMonitoreo(monitoreo){
  var modal = document.getElementById("agregarRegistroModal");
  var existenCambios = false;
  var frecuencia = document.getElementById('frecuencia');
  var altura = document.getElementById('altura');
  var rangoManchas = document.getElementById('rangoManchas');
  var tierra = document.getElementById('tierra');
  var sustratoTierra = document.getElementById('sustratoTierra');
  var doc, tiempoAgregado = 0;
  monitoreo.get().then((querySnapshot)=>{
    // console.log(querySnapshot.docs.length)
    querySnapshot.forEach((docReciente)=>{
      if(parseInt(docReciente.data().momentoAgregado, 10) > tiempoAgregado){
        // console.log("MAYOR => ", docReciente.data().momentoAgregado, tiempoAgregado, " <= MENOR")
        doc = docReciente;
        tiempoAgregado = parseInt(docReciente.data().momentoAgregado);
      }
      else{
        // console.log("MAYOR => ", docReciente.data().momentoAgregado, tiempoAgregado, " <= MENOR")
      }
    });
    frecuencia.value = doc.data().frecuenciaRiego; 
    altura.value = doc.data().altura;
    rangoManchas.value = doc.data().manchas;
    tierra.value = doc.data().tierra;
    sustratoTierra.value = doc.data().sustratoTierra;
    btnEditar.addEventListener('click', ()=>{
      (frecuencia.value != doc.data().frecuenciaRiego) ||
      (altura.value != doc.data().altura) ||
      (rangoManchas.value != doc.data().manchas) ||
      (tierra.value != doc.data().tierra) || 
      (sustratoTierra.value != doc.data().sustratoTierra)?existenCambios = true:existenCambios=false; 
      if(existenCambios){
        agregarMonitoreo(doc.data().plantaReferencia);
      }
      else{
        mensajeError('No existen cambios, no se ha modificado nada');
        
        // setTimeout("redireccionar('./consultar.html')", 1500);
      }
  })
})
}


function evaluarPlanta(id, monitoreo){
  var estadoHojasDiv = document.getElementById("estadoHojas");
  var frecuenciaRiegoDiv = document.getElementById("frecuenciaRiego");
  var iluminacionDiv = document.getElementById("iluminacion");
  var tamanioErrorDiv = document.getElementById("tamanioError");
  var tamanioBienDiv  = document.getElementById("tamanioBien");
  var consejosDiv = document.getElementById("consejos");
  var evaluacionDiv = document.getElementById("evaluacion");
  var textoNota = document.getElementById("textoNota");
  
  var planta = db.collection("plantas").doc(id), area;
  var plantaEvaluarTipo, plantaEvaluarEspecie, plantaAux, plantaEvaluar;
  var existePlantaEnAPI = false;
  // Variabless para  factores de la evaluacion
  var estadoHojasFactor, frecRiegoFactor, iluminacionFactor, tamanioFactor;
  var estadoHojas, frecRiego, iluminacion, tamanio, aux, auxTipoIluminacion;



  planta.get().then((doc)=>{
    // console.log(doc.data());
    plantaEvaluarTipo = doc.data().tipo;
    plantaEvaluarEspecie = doc.data().especie;
    for(i=0; i<plantasAPI.length; i++){
      if(plantasAPI[i].tipo == plantaEvaluarTipo && plantasAPI[i].especie == plantaEvaluarEspecie){
       plantaAux = plantasAPI[i];
       existePlantaEnAPI = true;
       console.log("LA PLANTA: ", plantaAux, existePlantaEnAPI);
       break;
      }
      else{
        console.log("NO :c")
        existePlantaEnAPI = false
      }
    }
    plantaEvaluar = doc.data();
    area = db.collection("areas").where("nombre","==", plantaEvaluar.ubicacion).where("idUsuarioRef","==",idUsuario);
    
    if(!existePlantaEnAPI){
      consejosDiv.innerHTML="";
      evaluacionDiv.innerHTML="";
      evaluacionDiv.innerHTML=`
      <div class="flex-columnas2">
      <p class="negritas">No podemos evaluar tu planta, ya que aun no contamos con información sobre ella.</p>
      </div>
      <div class="flex-columnas2">
        <p class="negritas">Pronto nos actualizaremos para poder evaluar tu planta de la mejor manera.  </p>
      </div>
      `
      textoNota.textContent = "";
    }
  })
  
  var doc, tiempoAgregado = 0;
  monitoreo.get()
  .then((querySnapshot)=>{
    // console.log(querySnapshot.docs.length)
    querySnapshot.forEach((docReciente)=>{
      if(parseInt(docReciente.data().momentoAgregado, 10) > tiempoAgregado){
        // console.log("MAYOR => ", docReciente.data().momentoAgregado, tiempoAgregado, " <= MENOR")
        doc = docReciente;
        tiempoAgregado = parseInt(docReciente.data().momentoAgregado);
      }
      else{
        // console.log("MAYOR => ", docReciente.data().momentoAgregado, tiempoAgregado, " <= MENOR")
      }
    })
    frecRiegoFactor = parseFloat(plantaAux.frecuenciaRiegoDias)/5;
    console.log(frecRiegoFactor);
    // Validamos la evaluacion de riego para mucha frecuencia
    if(parseInt(doc.data().frecuenciaRiego) < parseInt(plantaAux.frecuenciaRiegoDias)){
        frecRiego = Math.round(parseFloat(doc.data().frecuenciaRiego)/parseFloat(frecRiegoFactor));
        if(frecRiego == 0){frecRiego=1;}
        consejosDiv.innerHTML="";
        consejosDiv.innerHTML=`
        <div class="carousel-item active">
                    <p class="text-dark animate__animated animate__zoomIn">
                      No riegues tan seguido tu planta.
                    </p>
        </div>
                    
        </div>
        <div class="carousel-item">
                    <p class="text-dark animate__animated animate__zoomIn">
                      Recuerda que tu planta debe regarse cada ${plantaAux.frecuenciaRiegoDias} dias
                    </p>
        </div>
        `
        console.log("ESTRELLAS: ", frecRiego);
    }
    // Valiadmos la evaluacion de riego para poca frecuencia
    else{
      consejosDiv.innerHTML="";
      consejosDiv.innerHTML=`
      <div class="carousel-item active">
                  <p class="text-dark animate__animated animate__zoomIn">
                  <div class="carousel-item active">
                  <p class="text-dark animate__animated animate__zoomIn">
                    No olvides regar tu planta.
                  </p>
      </div>
      </div>
      <div class="carousel-item">
                  <p class="text-dark animate__animated animate__zoomIn">
                    Recuerda que tu planta debe regarse cada ${plantaAux.frecuenciaRiegoDias} dias.
                  </p>
      </div>
      `
        aux = parseInt(doc.data().frecuenciaRiego) - parseInt(plantaAux.frecuenciaRiegoDias);
        if(aux <= parseInt(plantaAux.frecuenciaRiegoDias)){
          frecRiego = 5 - Math.round(aux/parseFloat(frecRiegoFactor));
          console.log("ESTRELLAS: ", frecRiego);
        }
        else{
          frecRiego = 1;
        }
    }
    frecuenciaRiegoDiv.innerHTML="";
    for(i=0; i<frecRiego;i++){
      frecuenciaRiegoDiv.innerHTML+=`
      <img src="./img/gota.png" alt="gota" class="indicadores" />
    `
    }

    // Hacemos la validacion deel factor de iluminacion
    plantaAux.iluminacion == "sombra"?iluminacionFactor = 1/5:
    plantaAux.iluminacion == "resolana"?iluminacionFactor = 2/5:
    plantaAux.iluminacion == "indirecta"?iluminacionFactor = 3/5:
    plantaAux.iluminacion == "directa"?iluminacionFactor = 4/5:iluminacionFactor=0;

    // Obtenemos el tipo e iluminacion que tiene la planta en un area
    area.get().then((doc)=>{
      console.log(doc);
      if(doc.size > 0){
        doc.docs[0].data().tipoIluminacion == "Sombra"?auxTipoIluminacion = 1:
        doc.docs[0].data().tipoIluminacion == "Resolana"?auxTipoIluminacion = 2:
        doc.docs[0].data().tipoIluminacion == "Indirecta"?auxTipoIluminacion = 3:
        doc.docs[0].data().tipoIluminacion == "Directa"?auxTipoIluminacion = 4:auxTipoIluminacion=0;
        aux = parseFloat(auxTipoIluminacion)/parseFloat(iluminacionFactor);
        if(aux <= 5){
          iluminacion = Math.round(aux);
        }else{
          aux = Math.round(aux/5);
          iluminacion = 5 - aux;
        }
        console.log("ESTRELLAS ILUMINACION: ", iluminacion);
        iluminacionDiv.innerHTML="";
        for(i=0; i<iluminacion;i++){
          iluminacionDiv.innerHTML+=`
          <img src="./img/sol.png" alt="sol" class="indicadores" />
        `
        }
      }
      else{
        console.log("NO ESTA EN UN AREA");
          iluminacionDiv.innerHTML="";
          iluminacionDiv.innerHTML=`
          
          <p  id="textoAlerta">
            Tu planta no esta registrada en un area.
          </p>
        `
        consejosDiv.innerHTML+=`
        <div class="carousel-item">
                    <p class="text-dark animate__animated animate__zoomIn">
                      Coloca tu planta en un area con la iluminacion adecuada.
                    </p>
        </div>
        `
      }
    })

    // Hacemos la validacion del factor tamaño
    if(parseFloat(doc.data().altura) >= parseFloat(plantaAux.tamanioMincm) && parseFloat(doc.data().altura) <= parseFloat(plantaAux.tamanioMaxcm)){
      tamanio = true;
      tamanioBienDiv.style.display = 'block';
      tamanioErrorDiv.style.display = 'none';
    }
    else if(parseFloat(doc.data().altura) < parseFloat(plantaAux.tamanioMincm)){
      tamanio = false;
      tamanioBienDiv.style.display = 'none';
      tamanioErrorDiv.style.display = 'block';
    }

    doc.data().manchas == "10" || doc.data().manchas == "9"?estadoHojas = 1:
    doc.data().manchas == "8" || doc.data().manchas == "7"?estadoHojas = 2:
    doc.data().manchas == "6"|| doc.data().manchas == "5"?estadoHojas = 3:
    doc.data().manchas == "4"|| doc.data().manchas == "3"?estadoHojas = 3:
    doc.data().manchas == "2"|| doc.data().manchas == "1"?estadoHojas = 4:
    doc.data().manchas == "0"?estadoHojas = 5:estadoHojas=0;
    estadoHojasDiv.innerHTML="";
    for(i=0; i<estadoHojas;i++){
      estadoHojasDiv.innerHTML+=`
    <img src="./img/hoja.png" alt="hoja" class="indicadores" />
    `
    }
    console.log(estadoHojas)

  });

  
 
    



  


}
