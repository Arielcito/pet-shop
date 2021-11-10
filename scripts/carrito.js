let productoCarrito = document.querySelector(".dropdown-menu")

function agregarCarrito(){
    productoCarrito.innerHTML = `
                                <li class="d-inline"><button type="button" class="btn-close d-inline" aria-label="Close"></button></li>
                                <li class="d-inline "><h2 class="d-inline fs-6"> Carrito de compras</h2></li>
                                <li>
                                    <img src="./assets/contactoperro.png" alt="" class="w-25">
                                    <h3 class="fs-6 d-inline">Articulo perruno</h3>
                                    <span class="material-icons text-end">
                                    delete
                                    </span>
                                </li>
                                <li class="d-inline">Subtotal(sin enío):</li>
    `
}
agregarCarrito()