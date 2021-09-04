function eliminar(){
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
          notificacionBorrar.fire('Eliminado', '', 'success')
        } 
    
    })    
}
