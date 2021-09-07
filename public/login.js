// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCUXLZ0z1-Jz1F3WLOj5Y1xLhlfEK3E5sg",
  authDomain: "crud-ac820.firebaseapp.com",
  projectId: "crud-ac820",
});

var db = firebase.firestore();

// consultar

document
  .getElementById("loginbtn")
  .addEventListener("click", function comprobar() {
    //TODO cambiar los mensajes del login jaja
    var user = document.getElementById("emaiLogin").value;
    var pass = document.getElementById("passwordLogin").value;

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.where("Correo", "==", user) == true) {
            alert("Si hay registros");
          }
        });
      })
      .catch((error) => {
        console.log("Error al traer los documentos:", error);
      });
    alert("Busqueda Finalziada");
    //TODO iniciar la sesion con ese usuario
  });
