// filtros
let fav = document.querySelector('.fav')
const info = document.getElementsByClassName('card-title')
const cards = document.getElementById('cards')
const inputBuscar = document.getElementById('buscador')
const tipo = document.title.indexOf('Farmacia') > -1
  ? 'Medicamento'
  : 'Juguete'

const API_URL = 'https://apipetshop.herokuapp.com/api/articulos'
const init = {
  method: 'GET'
}
fetch(API_URL, init)
  .then(res => res.json())
  .then(data => {
    const articulos = data.response
    const dataFiltradaSorteada = articulos
      .filter(x => x.tipo === tipo)
      .sort((a, b) => a.stock - b.stock)
    drawCards(dataFiltradaSorteada)
    sortFilter(rangeFilter(dataFiltradaSorteada))
    rangeFilter(dataFiltradaSorteada)
    filtroCombinado(dataFiltradaSorteada)
    // filtroBusqueda(dataFiltradaSorteada)

    return (articulos, dataFiltradaSorteada)
  })
  .catch(err => err.message)

function drawCards (array) {
/*   let local = localStorage.getItem("favoritos")
 */ cards.innerHTML = ''
  if (array.length > 0) {
    array.forEach(producto => {
      cards.innerHTML +=
     `<div class=" col-lg-3 col-md-4 col-sm-6 id="${producto._id}">
       <div class="card-back card h-100 carta shadow-lg mb-5 mt-3 rounded">
         <img src="${producto.imagen}" class=" d-block mx-auto card-img-top imgSize w-75" alt="...">
         <div class="card-body">
           <a href="producto.html?id=${producto._id}" class="productoAnchor">
           <h6 class="card-title">${producto.nombre}</h6>
           </div>
           </a>
         <div class="card-footer d-flex justify-content-around">
         <ul class="list-group">
         <li class="list-group-item ">
         <small class=" ${producto.stock < 5 ? 'text-danger fs-3' : 'fs-5'} ">${producto.stock > 5 ? 'Stock disponible!' : 'Ultimas unidades!'} </small>
         </li>
         <li class="list-group-item">
         <small class="text-muted fs-4">$${producto.precio}</small>
         </li>
         </ul>
         </div>
         <div class="form-check d-flex justify-content-around">
            <button type="button" class="btn btn-primary buy w-100 bg-danger me-3">Comprar!</button>
            <button type="button" class="btn btn-primary buy w-100 bg-danger me-3">Agregar al carrito</button>
          </div>
         <div class="form-check d-flex justify-content-around position-absolute end-0 mt-1">
            <input class="form-check-input fav hidden" type="checkbox" value="" id="${producto._id}" >
            <label class="form-check-label" for="${producto._id}">
            <span class="material-icons">
              favorite
            </span>
            </label>
          </div>
       </div>
     </div>`
    }
    )
  } else {
    cards.innerHTML = `
  <div class="alert alert-danger text-center" role="alert">
  ¡Upss! Tu busequeda no tiene resultados. 
</div>
  `
  }
}

function rangeFilter (array) {
  const maxPrice = document.getElementById('maxPrice')
  const minPrice = document.getElementById('minPrice')

  const precios = array.sort((a, b) => a.precio - b.precio).map(a => a.precio)

  minPrice.setAttribute('max', precios.slice(precios.length - 1, precios.length))
  minPrice.setAttribute('min', precios[0])
  minPrice.setAttribute('value', precios[0])

  maxPrice.setAttribute('max', precios.slice(precios.length - 1, precios.length))
  maxPrice.setAttribute('min', precios[0])
  maxPrice.setAttribute('value', precios.slice(precios.length - 1, precios.length))

  return array
    .filter(x => x.precio >= minPrice.value && x.precio <= maxPrice.value)
}

function sortFilter (array) {
  const select = document.getElementById('sortSelect')

  if (select.value === '0') {
    return array.sort((a, b) => a.stock - b.stock)
  } else if (select.value === '1') {
    return array.sort((a, b) => a.precio - b.precio)
  } else {
    return array.sort((a, b) => b.precio - a.precio)
  }
}

function filtroCombinado (array) {
  const maxPrice = document.getElementById('maxPrice')
  const minPrice = document.getElementById('minPrice')
  const slideMax = document.querySelector('.slideMax')
  const slideMin = document.querySelector('.slideMin')
  const select = document.getElementById('sortSelect')

  minPrice.oninput = () => {
    const value = minPrice.value
    slideMin.textContent = value
    drawCards(filtroBusqueda(sortFilter(rangeFilter(array))))
  }
  maxPrice.oninput = () => {
    const value = maxPrice.value
    slideMax.textContent = value
    drawCards(filtroBusqueda(sortFilter(rangeFilter(array))))
  }

  select.oninput = () => {
    drawCards(filtroBusqueda(sortFilter(rangeFilter(array))))
  }
  inputBuscar.oninput = () => {
    drawCards(filtroBusqueda(sortFilter(rangeFilter(array))))
  }
}

// localstorage agregar articulos  añadir a favoritos

function agregarFavoritos (id) {
  let local = localStorage.getItem('favoritos')
  if (local === null) {
    localStorage.setItem('favoritos', id)
  } else {
    local = local + ',' + id
    localStorage.setItem('favoritos', local)
  }
}

function eliminarFavoritos (id) {
  let local = localStorage.getItem('favoritos')
  local = local.replace(id, '')
  localStorage.setItem('favoritos', local)
}

function isFavorito (id) {
  let local = localStorage.getItem('favoritos')
  if (local === null) {
    return false
  } else {
    return local.includes(id)
  }
}

function filtroBusqueda (productos) {
  const texto = inputBuscar.value.toLowerCase()
  const arrayBuscado = []
  for (const producto of productos) {
    const nombre = producto.nombre.toLowerCase()
    if (nombre.indexOf(texto) !== -1) {
      arrayBuscado.push(producto)
    }
  }
  return arrayBuscado
}
