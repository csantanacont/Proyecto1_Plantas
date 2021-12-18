var tabla = document.getElementById("tabla");
var idUsuario = sessionStorage.getItem("idUsuario");
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
//Accedemos a los valores
var idPlanta = urlParams.get("id");
var cont = 0;
// const db = firebase.firestore();
var btnRegresar = document.getElementById("btnRegresar");
btnRegresar.addEventListener('click', ()=>{
  window.location.href= `./verPlanta.html?id=${idPlanta}`;
})
/*###########################################################################*/
/*Consultar tabla de plantas*/
document.onload = muestraHistorial();
function muestraHistorial() {
  db.collection("monitoreo").where("plantaReferencia", "==", idPlanta).get().then((querySnapshot) => {
      tabla.innerHTML = "";
      querySnapshot.forEach((doc) => {
        fecha = new Date(parseInt(doc.data().momentoAgregado)).toLocaleString();
        cont++;
        console.log(`${doc.id} => ${doc.data().tipo}`);
        doc.id = id;
        tabla.innerHTML += `
        <tr>
        <td>${fecha}</td>
        <td>${doc.data().frecuenciaRiego}</td>
        <td>${doc.data().altura}</td>
        <td>
            ${doc.data().manchas}
        </td>
        <td>
            ${doc.data().tierra}
        </td>
        <td>
            ${doc.data().sustratoTierra}
        </td>
      </tr>
            `;
      });
    });
}
