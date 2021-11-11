// filtros
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
 if(array.length > 0){

   array.forEach(producto => {
     cards.innerHTML +=
     `<div class="col-lg-3 col-md-4 col-sm-6 id="${producto._id}">
       <div class="card h-100 carta shadow-lg mb-5 mt-3 rounded">
         <img src="${producto.imagen}" class=" d-block mx-auto card-img-top imgSize w-75" alt="...">
         <div class="card-body">
           <a href="producto.html?id=${producto._id}" class="productoAnchor">
           <h6 class="card-title">${producto.nombre}</h6>
           </div>
           </a>
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
           <button type="button" class="btn btn-primary m-1 fav ">Añadir a favoritos</button>
         </div>
       </div>
     </div>`
   }
   )
 }else{
  cards.innerHTML = `
  <div class="alert alert-danger text-center" role="alert">
  ¡Upss! Sin resultados en búsqueda realizada 
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

// localstorage agregar articulos a la canasta y añadir a favoritos

function addToCart (e) {
  const producto = e.target.parentElement.parentElement.parentElement
  const nombre = producto.querySelector('.card-title').textContent
  const precio = producto.querySelector('.card-footer small:nth-child(3)').textContent
  const imagen = producto.querySelector('.card-img-top').src
  const stock = producto.querySelector('.card-footer small:nth-child(2)').textContent
  const id = producto.querySelector('.card-footer small:nth-child(1)').textContent

  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const newItem = {
    nombre,
    precio,
    imagen,
    stock,
    id
  }
  cart.push(newItem)
  localStorage.setItem('cart', JSON.stringify(cart))
  alert('Producto agregado a la canasta')
}

function addToFav (e) {
  const producto = e.target.parentElement.parentElement.parentElement
  const nombre = producto.querySelector('.card-title').textContent
  const precio = producto.querySelector('.card-footer small:nth-child(3)').textContent
  const imagen = producto.querySelector('.card-img-top').src
  const stock = producto.querySelector('.card-footer small:nth-child(2)').textContent
  const id = producto.querySelector('.card-footer small:nth-child(1)').textContent

  const fav = JSON.parse(localStorage.getItem('fav')) || []
  const newItem = {
    nombre,
    precio,
    imagen,
    stock,
    id
  }
  fav.push(newItem)
  localStorage.setItem('fav', JSON.stringify(fav))
  alert('Producto agregado a favoritos')
}

// LocalStorage

function guardarLocalStorage (array) {
  localStorage.setItem('fav', JSON.stringify(array))
}

function obtenerLocalStorage () {
  const array = JSON.parse(localStorage.getItem('fav'))

  fav = JSON.parse(localStorage.getItem('favs'))
}

function localStorage () {
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const fav = JSON.parse(localStorage.getItem('fav')) || []

  cart.forEach(producto => {
    const card = document.querySelector(`[data-id="${producto.id}"]`)
    card.querySelector('.buy').textContent = 'Añadido'
    card.querySelector('.buy').disabled = true
  })

  fav.forEach(producto => {
    const card = document.querySelector(`[data-id="${producto.id}"]`)
    card.querySelector('.fav').textContent = 'Añadido'
    card.querySelector('.fav').disabled = true
  })
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