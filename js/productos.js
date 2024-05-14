let divProduct = document.querySelector(".products_img");
const botonesCategorias = document.querySelectorAll(".botones_categorias");
const titleProducts = document.querySelector("#title_products");

const productos = [
    {
        id:"overside-black",
        img:"./images/overside_thr.png",
        title:"Overside",
        price: 6000,
        categories:{
            nombre:"Overside Black",
            id:"men"
        }
    },
    {
        id:"top-grey",
        img:"./images/img15_prod.webp",
        title:"Grey Top",
        price: 5000,
        categories:{
            nombre:"Top Grey",
            id:"women"
        }
    },
    {
        id:"bag-black",
        img:"./images/img9_prod.webp",
        title:"Black Bag",
        price: 4500,
        categories:{
            nombre:"Bag Black",
            id:"accesories"
        }
    },
    {
        id:"overside-white",
        img:"./images/overside_one.jpg",
        title:"Overside",
        price: 6000,
        categories:{
            nombre:"Overside White",
            id:"men"
        }
    },
    {
        id:"top-black",
        img:"./images/img25_prod.webp",
        title:"Black Top",
        price: 5000,
        categories:{
            nombre:"Top Black",
            id:"women"
        }
    },
    {
        id:"overside-cream",
        img:"./images/overside_two.jpg",
        title:"Overside",
        price: 6000,
        categories:{
            nombre:"overside cream",
            id:"men"
        }
    }
];

let botonAgregar = document.querySelectorAll(".agregar");

function cargarProductos(productos){
    divProduct.innerHTML = "";
    productos.forEach((prod)=>{
        const div = document.createElement("div");
        div.classList.add("products_info");
        div.innerHTML = `
                <img src="${prod.img}" alt="${prod.title}">
                <h2>${prod.title}</h2>
                <p>$${prod.price}</p>
                <button class="agregar" id=${prod.id}>add to cart</button>
            `
        divProduct.appendChild(div);
    })
    actualizarBotonesAgregar();
}
cargarProductos(productos);


botonesCategorias.forEach((boton)=>{
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach((boton)=> boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "shop_now"){
            const titleContainerProducts = productos.find((prod)=>prod.categories.id === e.currentTarget.id);
            titleProducts.innerText = titleContainerProducts.categories.id;

            const productosFiltrados = productos.filter((prod) => prod.categories.id === e.currentTarget.id);
            cargarProductos(productosFiltrados);
        }else{
            titleProducts.innerText = 'Products';
            cargarProductos(productos);
        }
    })
})

function actualizarBotonesAgregar(){
    botonAgregar = document.querySelectorAll(".agregar");

    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarProductos);
    });
}

let ProductosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
if(productosEnCarritoLS){
    ProductosEnCarrito = JSON.parse(productosEnCarritoLS);
}else{
    ProductosEnCarrito = [];
}


function agregarProductos(e){

    Toastify({
        text: "Product added",
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
    const productoAgregado = productos.find(prod => prod.id === idBoton);

    if(ProductosEnCarrito.some(prod => prod.id === idBoton)){
        const index = ProductosEnCarrito.findIndex(prod => prod.id === idBoton);
        ProductosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        ProductosEnCarrito.push(productoAgregado);
    }
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(ProductosEnCarrito));
}


/*MENU*/

const menu = document.querySelector("#menu-hamburguer");
const open = document.querySelector("#open");
const close = document.querySelector("#close");
const body = document.body;
let carritoIcon = document.querySelector(".content_icons_carrito_padre");
let contentCategories = document.querySelector(".content_categories");


open.addEventListener("click", () => {
    menu.classList.remove("disabled");
    menu.classList.add("nav-menu-hamburguer");
    body.style.overflowY = "hidden";
    carritoIcon.style.pointerEvents = "none";
    contentCategories.style.pointerEvents = "none";
    divProduct.style.pointerEvents = "none";
});

close.addEventListener("click", () => {
    menu.classList.add("disabled");
    menu.classList.remove("nav-menu-hamburguer");
    body.style.overflowY = "visible";
    carritoIcon.style.pointerEvents = "auto";
    contentCategories.style.pointerEvents = "auto";
    divProduct.style.pointerEvents = "auto";
})


window.addEventListener("scroll",scroll);
    function scroll(){
        let header = document.querySelector(".content_prod");
        header.classList.toggle("below", window.scrollY>0);
};
