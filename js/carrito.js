let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const carritoVacio = document.querySelector("#carrito-vacio");
let contenedorProductos = document.querySelector("#carrito-productos");
let acciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const total = document.querySelector("#total");
const botonComprar = document.querySelector(".carrito-acciones-comprar");

function cargarProductosCarrito(){

    if(productosEnCarrito && productosEnCarrito.length > 0){

        carritoVacio.classList.add("disabled");
        contenedorProductos.classList.remove("disabled");
        acciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");

        contenedorProductos.innerHTML = "";

        productosEnCarrito.forEach(prod => {
        
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${prod.img}" alt="${prod.title}">
            <div class="carrito-producto-title">
                <small>titulo</small>
                <h3>${prod.title}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>cantidad</small>
                <p>${prod.cantidad}</p>
            </div>
            <div class="carrito-producto-price">
                <small>precio</small>
                <p>$${prod.price}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>subtotal</small>
                <p>$${prod.price  * prod.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${prod.id}"><i class="bi bi-trash"></i></button>
        `

        contenedorProductos.append(div);
        })
    }else{

        carritoVacio.classList.remove("disabled");
        contenedorProductos.classList.add("disabled");
        acciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();


function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){
    Toastify({
        text: "Producto eliminado",
        duration: 1500,
        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, #9b9a9a, #282828)",
            borderRadius:"5px",
            fontFamily: "DIN Neuzeit Grotesk",
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
          },
        onClick: function(){} 
    }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex((prod)=>prod.id === idBoton);
    productosEnCarrito.splice(index,1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click",vaciarCarrito);

function vaciarCarrito(){

    Swal.fire({
        title: '¿Estás seguro?',
        html: "Se borraran todos tus productos",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#282828',
        cancelButtonColor: '#747373',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    })
}

function actualizarTotal(){
    let totalCalculado = productosEnCarrito.reduce((acc,prod) => acc + (prod.cantidad * prod.price),0)
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click",botonCarritoComprar);

function botonCarritoComprar(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compra realizada con exito',
        showConfirmButton: false,
        timer: 1500
    })
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));

    carritoVacio.classList.add("disabled");
    contenedorProductos.classList.add("disabled");
    acciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled");
}

/*MENU*/

const menu = document.querySelector("#menu-hamburguer");
const open = document.querySelector("#open");
const close = document.querySelector("#close");
let header = document.querySelector(".content_prod");
const body = document.body;
let contentLogo = document.querySelector(".content_header");


open.addEventListener("click", () => {
    menu.classList.remove("disabled");
    menu.classList.add("nav-menu-hamburguer");
    body.style.overflowY = "hidden";
    contentLogo.style.pointerEvents = "none";
    contenedorProductos = document.querySelector("#carrito-productos").style.pointerEvents = "none";
    acciones.style.pointerEvents = "none";
});

close.addEventListener("click", () => {
    menu.classList.add("disabled");
    menu.classList.remove("nav-menu-hamburguer");
    body.style.overflowY = "visible";
    contentLogo.style.pointerEvents = "auto";
    contenedorProductos = document.querySelector("#carrito-productos").style.pointerEvents = "auto";
    acciones.style.pointerEvents = "auto";
})

window.addEventListener("scroll",scroll);
    function scroll(){
        header = document.querySelector(".content_prod");
        header.classList.toggle("below", window.scrollY>0);
};