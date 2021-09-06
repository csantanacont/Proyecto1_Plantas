// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCUXLZ0z1-Jz1F3WLOj5Y1xLhlfEK3E5sg",
  authDomain: "crud-ac820.firebaseapp.com",
  projectId: "crud-ac820",
});

var db = firebase.firestore();

//agregar;
document
  .getElementById("formsub")
  .addEventListener("click", function guardar() {
    var nombre = document.getElementById("nombreInput").value;
    var ApellidoPaterno = document.getElementById("aPaternoInput").value;
    var ApellidoMaterno = document.getElementById("aMaternoInput").value;
    //var FechaNacimiento = document.getElementById("FechaNacimiento").value;
    var Correo = document.getElementById("emailnput").value;
    var clave = document.getElementById("passwordInput").value;
    var claveconfirm = document.getElementById("password2Input").value;
    if (clave == claveconfirm) {
      db.collection("users/").add({
        first: nombre,
        last1: ApellidoPaterno,
        last2: ApellidoMaterno,
        //born: FechaNacimiento,
        Correo: Correo,
        pass: clave,
      });
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
      alert("Dado de alta");
    } else {
      alert("Las claves no coinciden");
    }
  });

/*
// consultar
var tabla = document.getElementById("tabla");
db.collection("users").onSnapshot((querySnapshot) => {
  tabla.innerHTML = "";
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().first}`);
    tabla.innerHTML += `
        
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last1}</td>
        <td>${doc.data().last2}</td>
        <td>${doc.data().born}</td>
        <td>${doc.data().Correo}</td>
        <td><button class ="btn btn-danger" onclick= "borrar('${
          doc.id
        }')" >Borrar<button></td>
        <td><button class ="btn btn-warning" onclick= "editar('${doc.id}','${
      doc.data().first
    }','${doc.data().last1}','${doc.data().last2}','${doc.data().born}','${
      doc.data().Correo
    }')" >Editar<button></td>
      </tr>

        `;
  });
});

//borrar iteraciones o usuarios o plantas :v
function borrar(id) {
  db.collection("users")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

// editar
function editar(
  id,
  nombre,
  ApellidoPaterno,
  ApellidoMaterno,
  FechaNacimiento,
  Correo
) {
  document.getElementById("nombre").value = nombre;
  document.getElementById("apellidoPaterno").value = ApellidoPaterno;
  document.getElementById("ApellidoMaterno").value = ApellidoMaterno;
  document.getElementById("FechaNacimiento").value = FechaNacimiento;
  document.getElementById("Correo").value = Correo;
  var boton = document.getElementById("boton");
  boton.innerHTML = "Editar";

  boton.onclick = function () {
    var washingtonRef = db.collection("users").doc(id);

    var nombre = document.getElementById("nombre").value;
    var ApellidoPaterno = document.getElementById("apellidoPaterno").value;
    var ApellidoMaterno = document.getElementById("ApellidoMaterno").value;
    var FechaNacimiento = document.getElementById("FechaNacimiento").value;
    var Correo = document.getElementById("Correo").value;

    // Set the "capital" field of the city 'DC'
    return washingtonRef
      .update({
        first: nombre,
        last1: ApellidoPaterno,
        last2: ApellidoMaterno,
        born: FechaNacimiento,
        Correo: Correo,
      })
      .then(() => {
        console.log("Document successfully updated!");
        boton.innerHTML = "Guardar";

        document.getElementById("nombre").value = "";
        document.getElementById("apellidoPaterno").value = "";
        document.getElementById("ApellidoMaterno").value = "";
        document.getElementById("FechaNacimiento").value = "";
        document.getElementById("Correo").value = "";
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}
*/
