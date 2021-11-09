//filtros
let fav = document.querySelector(".fav")
const cards = document.getElementById('cards')
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
    return (articulos, dataFiltradaSorteada)
  })
  .catch(err => err.message)

function drawCards (array) {
  cards.innerHTML = ''
  array.forEach(producto => {
    cards.innerHTML +=
    `<div class="container d-flex">
      <div class="card h-100 carta w-75">
        <img src="${producto.imagen}" class="card-img-top imgSize w-75" alt="...">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
        </div>
        <div class="card-footer d-flex justify-content-around">
        <ul class="list-group">
        <li class="list-group-item ">
        <small class="text-muted">${producto.stock > 5 ? 'Stock disponible!' : 'Ultimas unidades!'} </small>
        </li>
        <li class="list-group-item">
        <small class="text-muted">Stock diponible: ${producto.stock}</small>
        </li>
        <li class="list-group-item">
        <small class="text-muted">$${producto.precio}</small>
        </li>
        </ul>
        </div>
        <div class="d-flex justify-content-between">
        <button type="button" class="btn btn-primary m-1 buy">Añadir a la canasta</button>
        <button type="button" class="btn btn-primary m-1 fav">Añadir a favoritos</button>
        </div>
      </div>
    </div>`
  }
  )
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
    drawCards(sortFilter(rangeFilter(array)))
  }
  maxPrice.oninput = () => {
    const value = maxPrice.value
    slideMax.textContent = value
    drawCards(sortFilter(rangeFilter(array)))
  }

  select.oninput = () => {
    const value = select.value
    slideMax.textContent = value
    drawCards(sortFilter(rangeFilter(array)))
  }
}

//localstorage


fav.onclick() =() =>{
  console.log("hola")
}

