let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const productContainer = document.querySelector('#product-container')
const categoryButtons = document.querySelectorAll('.category-button')
const mainTitle = document.querySelector('#main-title')
let buttonAdd = document.querySelectorAll('.product-add')
const totalCar = document.querySelector('#total-car')


// Insertar prodductos en el HTML
function cargarProductos(productosElegidos){
    // vaciar el html para cargar lo elegido
    productContainer.innerHTML = ""

    productosElegidos.forEach(producto => {
        const div =document.createElement('div')
        div.classList.add('product')
        div.innerHTML=`
            <img src="${producto.imagen}" alt="" class="product-img">
            <div class="product-detail">
                <h3 class="product-title">${producto.titulo}</h3>
                <p class="product-price">$${producto.precio}</p>
                <button class="product-add" id="${producto.id}">Agregar</button>                        
            </div>
        `

        productContainer.append(div)
    })
    actualizarBotonesAgregar()
}

cargarProductos(productos)


// agregar o quitar calse active a los botones
categoryButtons.forEach(boton => {
    boton.addEventListener('click', e => {
        categoryButtons.forEach(boton=>boton.classList.remove('active'))
        e.currentTarget.classList.add('active')

        // cargar productos del boton
        if(e.currentTarget.id != 'todos'){
            const categoryName = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            mainTitle.innerHTML = categoryName.categoria.nombre

            const productBotton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productBotton)            
        }else{
            mainTitle.innerHTML = 'Todos los productos'
            cargarProductos(productos)
        }
    })
})

// Actualizamos el listado de botones cuando se cargan los productos
function actualizarBotonesAgregar(){
    buttonAdd = document.querySelectorAll('.product-add')

    buttonAdd.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito)
    })
}

// Agregar elementos al carrito
let productosEnCarrito

let productosEnCarritoLS = localStorage.getItem('carrito') //recuperamos los productos que esten en el LS
if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS)
    actualizarCarrito() // se actualiza el contador de carrito
}else{
    productosEnCarrito = []
}

function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === idBoton) // se agrega el producto al carrito

    if(productosEnCarrito.some(producto => producto.id === idBoton)){ // verificamos si el producto ya se añadio al carrito
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton) // se busca el idice del producto
        productosEnCarrito[index].cantidad++
    }else{
        productoAgregado.cantidad = 1
        productosEnCarrito.push(productoAgregado)
    }
    
    actualizarCarrito()

    localStorage.setItem('carrito', JSON.stringify(productosEnCarrito))
}

function actualizarCarrito(){
    let totalCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0) // asi sumamos las cantidades de cada producto
    totalCar.innerText = totalCarrito
}