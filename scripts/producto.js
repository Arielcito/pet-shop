const container = document.querySelector(".container")
fetch(API_URL, init)
  .then(res => res.json())
  .then(data => {
    const articulos = data.response

    let URLsearch = window.location.search
    let id = URLsearch.slice(4)
    cargarInterfaz(articulos,id)
    manageCarrito()
    // pModal(articulos, id)
    return articulos
  })
  .catch(err => err.message)

function cargarInterfaz(array, id) {
  let producto = array.find(array => array["_id"] == id)
  if(container){

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
          
          <div class="d-flex flex-row ">
            <h2>Cantidad: </h2>
            <div class="ms-3">
            <button onclick="restar()">-</button>
            <span id="contador">1</span>
              <button onclick="sumar('${producto.stock}')">+</button>
             </div>
          </div>
          <button  class="btn btn-primary bottom-0 end-0 cart bg-danger buy" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Anadir a la canasta </button>
        </div>
      </div>
      `
  }
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

