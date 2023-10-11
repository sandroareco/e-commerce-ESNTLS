const menu = document.querySelector("#menu-hamburguer");
const open = document.querySelector("#open");
const close = document.querySelector("#close");
let header = document.querySelector(".content");
let carritoIcon = document.querySelector(".content_icons_carrito_padre");
let contentLogo = document.querySelector(".content_header");
const body = document.body;
const containerCarrousel = document.querySelector("#container_carrousel");
let punto = document.querySelectorAll(".punto");
let puntoscarrousel = document.querySelector(".container_arrow_carrousel");
let btnView = document.querySelector(".btn_view_all");
let footer = document.querySelector(".footer");

window.addEventListener("scroll",scroll);
    function scroll(){
        header = document.querySelector(".content");
        header.classList.toggle("below", window.scrollY>0);
};

open.addEventListener("click", () => {
    menu.classList.remove("disabled");
    menu.classList.add("nav-menu-hamburguer");
    body.style.overflowY = "hidden";
    carritoIcon.style.pointerEvents = "none";
    contentLogo.style.pointerEvents = "none";
    btnView.style.pointerEvents = "none";
    puntoscarrousel.style.pointerEvents = "none";
    footer.style.pointerEvents = "none";
});

close.addEventListener("click", () => {
    menu.classList.add("disabled");
    menu.classList.remove("nav-menu-hamburguer");
    body.style.overflowY = "visible";
    carritoIcon.style.pointerEvents = "auto";
    contentLogo.style.pointerEvents = "auto";
    btnView.style.pointerEvents = "auto";
    puntoscarrousel.style.pointerEvents = "auto";
    footer.style.pointerEvents = "auto";
})

punto.forEach((cadapun ,i)=>{
    punto[i].addEventListener("click", () => {
        let posicion = i;
        let operacion = posicion * -40;

        containerCarrousel.style.transform = `translateX(${operacion}%`
        punto.forEach((cadapun,i)=>{
            punto[i].classList.remove("active");
        })
        punto[i].classList.add("active");
    })
})





