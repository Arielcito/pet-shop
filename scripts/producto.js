const container = document.querySelector(".container")
const API_URL = 'https://apipetshop.herokuapp.com/api/articulos'
const init = {
  method: 'GET'
}

fetch(API_URL, init)
  .then(res => res.json())
  .then(data => {
    const articulos = data.response
    
    let URLsearch = window.location.search
    let id = URLsearch.slice(4)
 
    cargarInterfaz(articulos,id)
    return articulos
  })
  .catch(err => err.message)

function cargarInterfaz(array,id){
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
        <button type="button" class="btn btn-primary m-1 buy">Añadir a la canasta</button>
      </div>
    </div>
    `
}