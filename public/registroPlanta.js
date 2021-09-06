// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCUXLZ0z1-Jz1F3WLOj5Y1xLhlfEK3E5sg",
  authDomain: "crud-ac820.firebaseapp.com",
  projectId: "crud-ac820",
});

var db = firebase.firestore();

//agregar;
//TODO validacion de campos vacios para habilitar boton de alta
document
  .getElementById("formsub")
  .addEventListener("click", function guardar() {
    var tipo = document.getElementById("tipo").value;
    var especie = document.getElementById("especie").value;
    var lugar = document.getElementById("lugar").value;
    //var FechaNacimiento = document.getElementById("FechaNacimiento").value;
    var temporada = document.getElementById("llenar_escuela_cliente").value;
    var usos = document.getElementById("usos").value;
    var ubicacion = document.getElementById("ubicacion").value;
    var fecha = document.getElementById("fecha").value;
    var descripcion = document.getElementById("descripcion").value;
    var notas = document.getElementById("notas").value;
    db.collection("plants/").add({
      //TODO debe tener una variable usuario para generar la asociacion planta-usuario
      type: tipo,
      species: especie,
      planting: lugar,
      //born: FechaNacimiento,
      season: temporada,
      use: usos,
      placement: ubicacion,
      pdate: fecha,
      desc: descripcion,
      notes: notas,
    });
    //TODO validar cuantas imagenes se subiran y subirlas
    /*
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          document.getElementById("nombre").value = "";
          document.getElementById("apellidoPaterno").value = "";
          document.getElementById("ApellidoMaterno").value = "";
          document.getElementById("FechaNacimiento").value = "";
          document.getElementById("Correo").value = "";
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
        */
    alert("Planta dada de alta");
  });
