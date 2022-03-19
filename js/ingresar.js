let datoCorreo = [];
let datoClave = [];

function valida (valor) {
    let datoCorreo = document.getElementById("email").value;
    let datoClave = document.getElementById("password").value;

    if ((datoCorreo == "") || (datoClave == "")) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los campos no deben estar vacíos',
            footer: '<a href="">Cómo solucionar problema?</a>'
          })
        } else {
            sessionStorage.setItem('item', JSON.stringify(datoCorreo, datoClave))        
            }
        return;
}

let datosLocals = document.getElementById("recordar");

datosLocals.addEventListener('click', registrarDatos);
    
function registrarDatos () {
    let datoCorreo = document.getElementById("email").value;
    let datoClave = document.getElementById("password").value;
    
    localStorage.setItem ('correo_sesion', JSON.stringify (datoCorreo));
    localStorage.setItem ('clave_sesion', JSON.stringify(datoClave));
};
