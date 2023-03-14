const btnCart = document.querySelector('.container-cart-icon')
const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

/***********************************************************************************/

const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector('.row-product')
const totalValue = document.querySelector('.total-pagar')
const countProduct = document.querySelector('#contador-productos')

// lista de contenedores de productos
const productsList = document.querySelector('.container-items')

// arrglo de productos
let allProducts = []




productsList.addEventListener('click', (e) => {
    
    if(e.target.classList.contains('btn-add-cart')){
        const product = e.target.parentElement

        const infoProduct = {
            quantity : 1,
            title : product.querySelector('h2').textContent,
            price : product.querySelector('p').textContent
        }

        const exits = allProducts.some(product => product.title === infoProduct.title)

        if(exits){
            const products = allProducts.map(product =>{
                if(product.title === infoProduct.title){
                    product.quantity++
                }
                return product
            })
            allProducts = [...products]
        }else{
            allProducts = [...allProducts, infoProduct]
        }


        showHtml()
    }

})

rowProduct.addEventListener('click', e =>{
    if(e.target.classList.contains('icon-close')){
        const product = e.target.parentElement
        const title = product.querySelector('p').textContent

        allProducts = allProducts.filter(
            product => product.title !== title
        )

        showHtml()
    }
})

// mostrar productos en el html
const showHtml = () => {

    if(!allProducts.length){
        containerCartProducts.innerHTML = `
        <p class="cart-empty">El carrito esta vacio</p>
        `
    }



    // limpiar html
    rowProduct.innerHTML = ''

    let total = 0
    let totalOfProducts = 0

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `

        rowProduct.append(containerProduct)

        total = total + parseInt(product.quantity * product.price.slice(1))
        totalOfProducts = totalOfProducts + product.quantity
    })

    totalValue.innerText = `$${total}`
    countProduct.innerText = totalOfProducts
}



// efecto menu
$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
    });

    // toggle menu/navbar script

    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
});