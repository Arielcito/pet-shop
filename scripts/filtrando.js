
const cards = document.getElementById('cards')
const tipo = document.title.indexOf('Farmacia') > -1 ? 'Medicamento' : 'Juguete'

let API_URL ="https://apipetshop.herokuapp.com/api/articulos"
let init = {
  method: "GET"
}
fetch(API_URL,init)
              .then(res => res.json())
              .then(data => {
                let articulos = data.response
                console.log(articulos)
                const dataFiltradaSorteada = articulos
                  .filter(x => x.tipo === tipo)
                  .filter(x => x.precio >= rangeFilter().minPrice)
                  .filter(x => x.precio <= rangeFilter().maxPrice)
                  .sort((a, b) => a.stock - b.stock)

                drawCards(dataFiltradaSorteada)
                rangeFilter(dataFiltradaSorteada)
                return articulos
              })
              .catch(err => err.message)

function drawCards (array) {
  cards.innerHTML = ''

  array.forEach(producto => {
    if (producto.precio >= rangeFilter().minPrice && producto.precio <= rangeFilter().maxPrice) {
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
  })
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

  maxPrice.addEventListener('change', drawCards)
  minPrice.addEventListener('change', drawCards)

  const pricesObj = {
    minPrice: minPrice.value,
    maxPrice: maxPrice.value
  }
  return pricesObj
}