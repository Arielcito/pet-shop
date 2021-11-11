const container = document.querySelector(".container")
const API_URL = 'https://apipetshop.herokuapp.com/api/articulos'
let cont = 0


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
    return articulos
  })
  .catch(err => err.message)

function cargarInterfaz(array, id) {
  let producto = array.find(array => array["_id"] == id)
  
  volverAtras.innerHTML = `
<a href="${producto.tipo == 'Medicamento'?"farmacia.html":"juguetes.html"}">Volver a ${producto.tipo == 'Medicamento'? 'Farmacia':'Juguetes'}</a>

  `

  container.innerHTML = `
    <div class="row m-4">
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Alerta!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <p>
        No hay mas unidades
      </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
      <div class="col-lg-6 m-auto">
       <img src="${producto.imagen}" class="w-75 m-auto">
      </div>
      <div class="col-lg-6">
        <h2 class="mt-5 fst-italic" >${producto.nombre}</h2>
        <h3 >&#36;${producto.precio}<h3>
        <p class="fs-5 fw-light" style="text-indent:20px;">${producto.descripcion}</p>
        <small>Cantidad disponible : ${producto.stock}<small>
        <div class="d-flex flex-row">
          <h2>Cantidad:</h2>
          <div>
          <button onclick="restar()">-</button>
          <span id="contador">0</span>
          <button onclick="sumar('${producto.stock}')">+</button>
           </div>
        </div>
        <button type="button" class="btn btn-primary m-1 buy">Añadir a la canasta</button>
      </div>
    </div>
    <button id="btnmodal" hidden type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">sd</button>
    
    `
}

function sumar(stock) {

  const contador = document.querySelector('#contador')

  cont < stock ? (cont++, contador.innerHTML = cont) : exceso()
}
function restar() {
  cont > 0 && (cont--, contador.innerHTML = cont)
}

function exceso() {
  const btnmodal = document.getElementById('btnmodal')
  btnmodal.click()
}


const volverAtras = document.querySelector("#volverA")

// console.log(volverAtras);