var id;
async function eliminar(id){
    const notificacionBorrar = Swal.mixin({
        customClass: {
          confirmButton:'btn btn-success',
          cancelButton: 'btn btn-secondary mr-2',
          denyButton: 'btn btn-danger',
        },
        buttonsStyling: false,
      })
    notificacionBorrar.fire({
        title: '¿Desea eliminar el registro?',
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: `Eliminar`,
        cancelButtonText: `Cancelar`,
        showConfirmButton: false,
        reverseButtons:true,    
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isDenied) {
          borrarPlanta(id);
          notificacionBorrar.fire('Eliminado', '', 'success').then(() => {
            muestraRegistros();
          })
        } 
    
    })    

    
}


function guardarCambios(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Los cambios han sido guardados',
    showConfirmButton: false,
    timer: 1500
  })
}

function registrarPlanta(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Tu planta ha sido registrada',
    showConfirmButton: false,
    timer: 1500
  })

}


async function mensajeError ( mensaje ) {
  Swal.fire({
      position: 'center',
      icon: 'warning',
      title: mensaje,
      showConfirmButton: false,
      timer: 1000
  })
}

async function mensajeExito(mensaje){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: mensaje,
    showConfirmButton: false,
    timer: 1500
  }).then(()=>{
    location.reload();
    muestraRegistros();
  })
}

async function mensajeExitoEditar(mensaje){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: mensaje,
    showConfirmButton: false,
    timer: 1500
  }).then(()=>{
    setTimeout("redireccionar('./consultar.html')", 1000);
  })
}

function redireccionar(ubicacion){
  window.location=ubicacion;
}