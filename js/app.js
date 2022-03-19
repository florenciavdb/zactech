const lista = document.getElementById("lista");
const URL = "../project.json";
fetch (URL)
.then (respuesta => respuesta.json ())
.then (productos => {
    productos.forEach(producto => {
        const li = document.createElement("li");
        mostrarProductos (productos);
        li.innerHTML =`${producto.nombre}
        <p>${producto.precio}</p>
        <p>${producto.id}</p>`;

        lista.append(li);
        //console.log(li);
    });
});


let carritoCompras = []
const contenedorProductos = document.querySelector('.contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
const selecTipos = document.getElementById('selecTipos')

selecTipos.addEventListener('change', ()=> {
    //console.log(selecTipos.value)
    if(selecTipos.value == "todos") {
        mostrarProductos(productos)
    }
    else {
        seleccion = productos.filter(elemento => elemento.tipo.toLowerCase() === selecTipos.value.toLowerCase())
        mostrarProductos(seleccion)
    }
})

//CARDS
mostrarProductos(productos);
function mostrarProductos (productosfiltrados) {
    contenedorProductos.innerHTML="";
    productosfiltrados.forEach ( function (producto) { 
        const divProducto = document.createElement ("div");
        divProducto.classList.add ("card");

        const imagenProducto = document.createElement("img");
        imagenProducto.classList.add ("imagen-producto")
        imagenProducto.src = producto.img;

        const tituloProducto = document.createElement ("h3");
        tituloProducto.textContent = producto.nombre;

        const precioProducto = document.createElement ("h4");
        precioProducto.innerHTML= `$ ${producto.precio}`;

        const btnAgregar = document.createElement ("button");
        btnAgregar.classList.add ("btn-agregar");
        btnAgregar.textContent = "Agregar";
        btnAgregar.addEventListener('click', () =>{
            agregarAlCarrito(producto.id)
        })

        divProducto.appendChild(imagenProducto);
        divProducto.appendChild(tituloProducto);
        divProducto.appendChild(precioProducto);
        divProducto.appendChild(btnAgregar);
        contenedorProductos.appendChild(divProducto);
    })
}

//CARRITO
function agregarAlCarrito (id) {
    let repetido = carritoCompras.find (buscar => buscar.id == id)
    if (repetido) {
        repetido.cantidad = repetido.cantidad + 1
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id="cantidad${repetido.id}">Cantidad:${repetido.cantidad}</p>`
        actualizarCarrito()
    }
    else {
    let productoAgregar = productos.find(elemento => elemento.id == id)
    //console.log(productoAgregar)
    carritoCompras.push(productoAgregar)
    actualizarCarrito ()
    let div = document.createElement('div')
    div.className = 'productoEnCarrito'
    div.innerHTML = `
                    <p>${productoAgregar.nombre}</p>
                    <p>$${productoAgregar.precio}</p>
                    <p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                    <button id="btnEliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                    `
    contenedorCarrito.appendChild(div)
    let btnEliminar = document.getElementById(`btnEliminar${productoAgregar.id}`)
    btnEliminar.addEventListener('click',()=>{
    if (productoAgregar.cantidad == 1) {
        btnEliminar.parentElement.remove()
        //console.log(productoAgregar.id)
        carritoCompras = carritoCompras.filter (item => item.id != productoAgregar.id)
        actualizarCarrito()
        localStorage.setItem('carrito', JSON.stringify(carritoCompras))
    }
    else {
        document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p>`
        productoAgregar.cantidad = productoAgregar.cantidad - 1
    actualizarCarrito()
    localStorage.setItem('carrito', JSON.stringify(carritoCompras))
    }
    })
    }
    localStorage.setItem('carrito', JSON.stringify(carritoCompras))
}

function actualizarCarrito () {
   contadorCarrito.innerText = carritoCompras.reduce ((acc,el) => acc + el.cantidad, 0)
   precioTotal.innerText = carritoCompras.reduce ((acc,el) => acc + (el.precio * el.cantidad), 0)
}

function recuperar() {
        let recuperarLS = JSON.parse(localStorage.getItem('carrito'))
        //console.log(recuperarLS)
        if(recuperarLS){
            recuperarLS.forEach(element => {
                agregarAlCarrito(element.id)
            });
        }
}

recuperar ()

//carritoCompras.length === 0 && console.log('carrito vacío');