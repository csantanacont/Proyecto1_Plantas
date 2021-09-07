// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCUXLZ0z1-Jz1F3WLOj5Y1xLhlfEK3E5sg",
  authDomain: "crud-ac820.firebaseapp.com",
  projectId: "crud-ac820",
});

var db = firebase.firestore();

// consultar
var user = document.getElementById("emaiLogin");
var pass = document.getElementById("passwordLogin");
document
  .getElementById("loginbtn")
  .addEventListener("click", function comprobar(user, pass) {
    //TODO cambiar los mensajes del login jaja
    db.collection("users")
      .where("Correo", "==", user)
      .where("pass", "==", pass)
      .exists()
      .then((doc) => {
        if (doc.exists) {
          /*
          // Convert to City object
          var city = doc.data();
          // Use a City instance method
          console.log(city.toString());
          */
          alert("...");
        } else {
          alert("No such document!");
        }
      })
      .catch((error) => {
        alert("Error getting document:", error);
      });
    //TODO iniciar la sesion con ese usuario
  });
