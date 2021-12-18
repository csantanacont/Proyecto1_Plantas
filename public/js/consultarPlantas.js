var galeria = document.getElementById("galeria");
var idUsuario = sessionStorage.getItem("idUsuario");
var id;
var cont = 0;
// const db = firebase.firestore();
/*###########################################################################*/
/*Consultar tabla de plantas*/
document.onload = muestraRegistros();

function muestraRegistros() {
  db.collection("plantas").where("idDuenio", "==", idUsuario).get().then((querySnapshot) => {
      galeria.innerHTML = "";
      querySnapshot.forEach((doc) => {
        cont++;
        console.log(`${doc.id} => ${doc.data().tipo}`);
        doc.id = id;
        galeria.innerHTML += `
                <div class="grid-gallery__item">
                  <a  href="verPlanta.html?id=${doc.id}" >
                    <img class="grid-gallery__image" src="${doc.data().img1}"> 
                  </a> 
                  <div class="info"><br/><br/><p style="font-weight: bold">${doc.data().especie}</p><p>${doc.data().tipo}</p></div>   
                </div>
            `;
      });
    });
}




