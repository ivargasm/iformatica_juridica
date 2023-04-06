const nombre = document.querySelector('#nombre')
const email = document.querySelector('#correo')
const direccion = document.querySelector('#direccion')
const telefono = document.querySelector('#telefono')
const actualizar = document.querySelector('#actualizar_dp')
const eliminar = document.querySelector('#eliminar_dp')

// Buscar correo en link
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let correo = getParameterByName('correo');
console.log(correo)


// recuperar localStorage
let datosPersonalesLS = localStorage.getItem('dp')
datosPersonalesLS = JSON.parse(datosPersonalesLS)
console.log(datosPersonalesLS)

// buscar informacion del correo
const datos = datosPersonalesLS.find(dato => dato.correo === correo)
console.log(datos)

nombre.value = datos.nombre
email.value = datos.correo
direccion.value = datos.direccion
telefono.value = datos.telefono


// Actualizar informacion
actualizar.addEventListener('click', actualizarDP)

function actualizarDP(e){
	e.preventDefault()

	const formulario = document.datos_personales
	const nombre = document.datos_personales.nombre.value.toLowerCase()
	const correo = document.datos_personales.correo.value.toLowerCase()
	const direccion = document.datos_personales.direccion.value.toLowerCase()
	const telefono = document.datos_personales.telefono.value.toLowerCase()

	const newDP = {
		nombre,
		correo,
		direccion,
		telefono
	}
	console.log(newDP)

	if(datosPersonalesLS.some(dato => dato.correo === correo)){ // verificamos si el producto ya se añadio al carrito
        const index = datosPersonalesLS.findIndex(dato => dato.correo === correo) // se busca el idice del producto
        datosPersonalesLS[index].nombre = nombre
        datosPersonalesLS[index].correo = correo
        datosPersonalesLS[index].direccion = direccion
        datosPersonalesLS[index].telefono = telefono
    }

    console.log(datosPersonalesLS)
    localStorage.setItem('dp', JSON.stringify(datosPersonalesLS))

}

// Eliminar informacion
eliminar.addEventListener('click', eliminarDP)

function eliminarDP(e) {
	e.preventDefault()

	console.log(datosPersonalesLS)
	const index = datosPersonalesLS.findIndex(dato => dato.correo === correo)
	datosPersonalesLS.splice(index, 1)
	console.log(datosPersonalesLS)
	nombre.value = ''
	email.value = ''
	direccion.value = ''
	telefono.value = ''

	localStorage.setItem('dp', JSON.stringify(datosPersonalesLS))

	window.location.href = "/informatica_juridica";
}