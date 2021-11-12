const container = document.querySelector(".container")



// addProducto.addEventListener('click', renderCarrito)
// console.log(API_URL);
const API_URL = 'https://apipetshop.herokuapp.com/api/articulos'
let cont = 1

const init = {
  method: 'GET'
}

fetch(API_URL, init)
  .then(res => res.json())
  .then(data => {
    const articulos = data.response

    let URLsearch = window.location.search
    let id = URLsearch.slice(4)
    cargarInterfaz(articulos, id)
    manageCarrito(articulos, id)

    // pModal(articulos, id)
    return articulos
  })
  .catch(err => err.message)

function cargarInterfaz(array, id) {
  let producto = array.find(array => array["_id"] == id)

  container.innerHTML = `
    <div class="row m-4">
      <div class="col m-auto">
       <img src="${producto.imagen}" class="w-100 m-auto">
      </div>
      <div class="col">
        <h2 class="mt-5 fst-italic" >${producto.nombre}</h2>
        <h3 class="fw-light">&#36;${producto.precio}<h3>
        <p class="fs-5 fw-light" style="text-indent:20px;">${producto.descripcion}</p>
        <small>Cantidad disponible : ${producto.stock}<small>
        <button id="ad-carrito" class="btn btn-primary bottom-0 end-0 cart" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Anadir a la canasta </button>
        <div class="d-flex flex-column">
          <h2>Cantidad: <span id="contador">1</span></h2>
          <div>
            <button onclick="sumar('${producto.stock}')">+</button>
            <button onclick="restar()">-</button>
           </div>
        </div>
      </div>
    </div>
    `
}
function sumar(stock) {
  const contador = document.querySelector('#contador')
  cont < stock ? (cont++, contador.innerHTML = cont) : exceso()
}
function restar() {
  cont > 1 && (cont--, contador.innerHTML = cont)
}

function exceso() {
  const btnmodal = document.getElementById('btnmodal')
  btnmodal.click()
}

const array = []

function manageCarrito(productos, id) {
  let productoById = productos.find(producto => producto["_id"] == id)
  const cantidad = document.querySelector('#contador')
  const dModal = document.querySelector("#tabla-modal tbody")
  const addProducto = document.querySelector('#ad-carrito')
  const getLocal = getLocalStorage()


  addProducto.addEventListener('click', renderCarrito)
  // let result = getLocal.filter((item, index) => {
  //   return getLocal.indexOf(item._id) === index;
  // })
  function renderCarrito() {
    const obj = {
      id: productoById._id,
      total: Number(cantidad.innerText * productoById.precio),
      precio: productoById.precio,
      imagen: productoById.imagen,
      stock: productoById.stock
    }
    array.push(obj, ...getLocal)

    setLocalStorage(array)

    array.forEach(element => {
      dModal.innerHTML += `
      <tr>
          <td><img class="w-100" src="${element.imagen}" /></td>  
          <td id="contadorCarrito">${cantidad.innerText}</td>  
          <td>${element.precio}</td>  
          <td id="set-total">${element.total}</td>  
          <td>
         </td>
      </tr>
      `
    })

    // console.log(productoById);
  }
}


function sumarCarrito(stock, precio, id) {
  console.log(id);
  const setTotal = document.querySelector('#set-total')
  const contadorCarrito = document.querySelector('#contadorCarrito')
  // console.log(contadorCarrito);
  cont < stock ? (cont++, contadorCarrito.innerHTML = cont, setTotal.innerHTML = cont * precio) : exceso()

}

function restarCarrito(precio) {
  const setTotal = document.querySelector('#set-total')
  cont > 1 && (cont--, contadorCarrito.innerHTML = cont, setTotal.innerHTML = cont * precio)
}

function eliminarElemento(id) {
  // localStorage.getItem('car')
}

function getLocalStorage() {
  const arrayCart = localStorage.getItem('cart') ? localStorage.getItem('cart') : '[]'
  // console.log(arrayCar);
  return JSON.parse(arrayCart)
}

function setLocalStorage(item) {
  localStorage.setItem('cart', JSON.stringify(item))
}