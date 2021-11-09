const cards = document.getElementById('cards')
const tipo = document.title.indexOf('Farmacia') > -1
  ? 'Medicamento'
  : 'Juguete'

    .filter(x => x.tipo === tipo)
    .sort((a, b) => a.stock - b.stock)

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
    rangeFilter(dataFiltradaSorteada)

    return (articulos, dataFiltradaSorteada)
  })
  .catch(err => err.message)

function drawCards (array) {
  cards.innerHTML = ''

  array.forEach(producto => {
    cards.innerHTML +=
    `<div class="col">
      <div class="card h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <small class="text-muted">${producto.stock > 5 ? 'Stock disponible!' : 'Ultimas unidades!'}</small>
          <small class="text-muted">$${producto.precio}</small>
        </div>
      </div>
    </div>`
  }
  )
}

function rangeFilter (array) {
  const maxPrice = document.getElementById('maxPrice')
  const minPrice = document.getElementById('minPrice')
  const slideMax = document.querySelector('.slideMax')
  const slideMin = document.querySelector('.slideMin')
  const precios = array.map(a => a.precio).sort((a, b) => a.precio - b.precio)

  minPrice.oninput = () => {
    const value = minPrice.value
    slideMin.textContent = value
    drawCards(array.filter(x => x.precio >= minPrice.value && x.precio <= maxPrice.value))
  }
  maxPrice.oninput = () => {
    const value = maxPrice.value
    slideMax.textContent = value
    drawCards(array.filter(x => x.precio >= minPrice.value && x.precio <= maxPrice.value))
  }

  minPrice.setAttribute('max', precios.slice(precios.length - 1, precios.length))
  minPrice.setAttribute('min', precios[0])
  minPrice.setAttribute('value', precios[0])

  maxPrice.setAttribute('max', precios.slice(precios.length - 1, precios.length))
  maxPrice.setAttribute('min', precios[0])
  maxPrice.setAttribute('value', precios.slice(precios.length - 1, precios.length))
}
