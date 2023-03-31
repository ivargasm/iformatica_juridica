let productosEnCarrito = localStorage.getItem('carrito')
productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.querySelector('.empty-car')
const contenedorCarritoProductos = document.querySelector('.cart-products')
const contenedorCarritoAcciones = document.querySelector('.cart-actions')
const contenedorCarritoComprado = document.querySelector('.cart-bought')
const botonVaciar = document.querySelector('#cart-empty-actions')
const botonComprar = document.querySelector('#cart-buy-actions')
const contenedorTotal = document.querySelector('#total')
let botonesEliminar = document.querySelectorAll('.cart-product-delete')

function cargarProductosCarrilo(){
	if(productosEnCarrito && productosEnCarrito.length > 0){

		contenedorCarritoVacio.classList.add('disabled')
		contenedorCarritoProductos.classList.remove('disabled')
		contenedorCarritoAcciones.classList.remove('disabled')
		contenedorCarritoComprado.classList.add('disabled')

		contenedorCarritoProductos.innerHTML = ''

		productosEnCarrito.forEach(producto => {
			const div = document.createElement('div')
			div.classList.add('cart-product')
			div.innerHTML = `
				<img class='cart-product-img' src="${producto.imagen}" alt="${producto.titulo}">
				<div class="cart-product-title">
					<small>Titulo</small>
					<p>${producto.titulo}</p>
				</div>
				<div class="cart-product-qty">
					<small>Cantidad</small>
					<p>${producto.cantidad}</p>
				</div>
				<div class="cart-product-price">
					<small>Precio</small>
					<p>$${producto.precio}</p>
				</div>
				<div class="cart-product-subtotal">
					<small>Subtotal</small>
					<p>$${producto.precio * producto.cantidad}</p>
				</div>
				<button class="cart-product-delete" id="${producto.id}"><i class="bi bi-trash"></i></button>
			`
			contenedorCarritoProductos.append(div)
		})
	}else{
		contenedorCarritoVacio.classList.remove('disabled')
		contenedorCarritoProductos.classList.add('disabled')
		contenedorCarritoAcciones.classList.add('disabled')
		contenedorCarritoComprado.classList.add('disabled')
	}	
	actualizarBotonesEliminar()
	actualizarTotal()
}

cargarProductosCarrilo()


// Actualizamos el listado de botones cuando se cargan los productos
function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll('.cart-product-delete')

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e){
	const idBoton = e.currentTarget.id
	
	const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
	productosEnCarrito.splice(index, 1)

	cargarProductosCarrilo()

	localStorage.setItem('carrito', JSON.stringify(productosEnCarrito))

}

botonVaciar.addEventListener('click', vaciarCarrito)

function vaciarCarrito (){
	productosEnCarrito.length = 0
	localStorage.setItem('carrito', productosEnCarrito)
	cargarProductosCarrilo()
}

function actualizarTotal(){

	const totalCalculado = productosEnCarrito.reduce((acc, producto)=>acc + (producto.cantidad * producto.precio), 0)
	contenedorTotal.innerHTML = `$${totalCalculado}`
}

botonComprar.addEventListener('click', comprarCarrito)

function comprarCarrito (){
	productosEnCarrito.length = 0
	localStorage.setItem('carrito', productosEnCarrito)

	contenedorCarritoVacio.classList.add('disabled')
	contenedorCarritoProductos.classList.add('disabled')
	contenedorCarritoAcciones.classList.add('disabled')
	contenedorCarritoComprado.classList.remove('disabled')
	
}


