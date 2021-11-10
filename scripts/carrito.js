let productoCarrito = document.querySelector(".dropdown-menu")

function agregarCarrito(){
    productoCarrito.innerHTML = `
                                <li class="d-inline"><button type="button" class="btn-close d-inline" aria-label="Close"></button></li>
                                <li class="d-inline "><h2 class="d-inline fs-5"> Carrito de compras</h2></li>
                                <li>
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-10">
                                            <img src="./assets/contactoperro.png" alt="" class="w-25">
                                            <h3 class="fs-6 d-inline">Articulo perruno</h3>
                                            <h3 class="fs-6">Cantidad</h3>
                                            </div>
                                            <div class="col-2">
                                            <span class="material-icons text-end">
                                            delete
                                            </span>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-8"> 
                                                <h4 class="d-inline fs-6">Subtotal(sin envío):</h4>
                                            </div>
                                            <div class="col-4">
                                                <p>$10000</p>
                                            </div>
                                            <div class="col">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-8"> 
                                                <h4 class="d-inline fs-4">Total(sin envío):</h4>
                                            </div>
                                            <div class="col-4">
                                                <p>$10000</p>
                                            </div>
                                            <div class="col">
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="d-inline"></li>
    `
}
agregarCarrito()