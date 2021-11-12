const cards = document.getElementById('cards')

const fav = JSON.parse(localStorage.getItem('favs')) === null ? [] : JSON.parse(localStorage.getItem('favs'))
const inputBuscar = document.getElementById('buscador')
const tipo = document.title.indexOf('Farmacia') > -1
  ? 'Medicamento'
  : document.title.indexOf('Juguetes') > -1
    ? 'Juguete'
    : 'Favoritos'

const API_URL = 'https://apipetshop.herokuapp.com/api/articulos'
const init = {
  method: 'GET'
}
fetch(API_URL, init)
  .then(res => res.json())
  .then(data => {
    const articulos = data.response
    let dataFiltradaSorteada = articulos
    if (tipo !== 'Favoritos') {
      dataFiltradaSorteada = articulos
        .filter(x => x.tipo === tipo)
        .sort((a, b) => a.stock - b.stock)
      drawCards(dataFiltradaSorteada)
      sortFilter(rangeFilter(dataFiltradaSorteada))
      rangeFilter(dataFiltradaSorteada)
      filtroCombinado(dataFiltradaSorteada)
      favoButton()
    } else {
      drawCards(JSON.parse(localStorage.getItem('favs')))
    }

    eventos(articulos)
    return (articulos, dataFiltradaSorteada)
  })
  .catch(err => err)

function eventos (array) {
  const favBtn = document.getElementsByClassName('favo')
  for (let i = 0; i < favBtn.length; i++) {
    favBtn[i].addEventListener('click', function (e) {
      getId(e, array)
    })
  }
}

function favoButton(){
  let close = document.querySelectorAll(".close")
  close.forEach(element =>{
    element.addEventListener('click', (e) =>{
      let close = e.target
      e.preventDefault()
      if(close.innerText === "favorite_border"){
        close.innerText = "favorite"
      }else{
        close.innerText = "favorite_border"
      }
    })
  })
}

function drawCards (array) {
  cards.innerHTML = ''

  if (array.length > 0) {
    array.forEach(producto => {
      cards.innerHTML +=
    `<div class= "col-lg-3 col-md-4 col-sm-6" id="${producto._id}">
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
        <small class=" text-danger fs-3">${producto.stock > 5 ? 'Stock disponible!' : 'Ultimas unidades!'} </small>
        </li>
        <li class="list-group-item">
        <small class="text-muted fs-4">$${producto.precio}</small>
        </li>
        </ul>
        </div>
        <div class="form-check d-flex justify-content-around">
          <button type="button" class="btn btn-primary m-1 buy ">Comprar!</button>
          </div>
        <div class="form-check d-flex justify-content-around position-absolute end-0 mt-1">
            <span class="material-icons close favo user-select-none" id="${producto._id}">
            ${tipo === "Favoritos"?"favorite":"favorite_border"}
            </span>
            </span>
            </label>
          </div>
      </div>
    </div> `
    })
  } else {
    cards.innerHTML = `
  <div class="alert alert-danger text-center" role="alert">
  ¡Ups! ..Busqueda sin resultados. 
</div>
  `
  }
  if (tipo === 'Favoritos') {
    eventos(array)
  }
}

function getId (e, array) {
  const id = e.target.id
  array.filter(x => x._id === e.target.id).forEach(producto => {
    if (producto.nombre !== undefined) {
      GuardarFavorito(producto._id, producto.nombre, producto.imagen, producto.precio, producto.stock, id)
    }
  })
}

function GuardarFavorito (_id, nombre, imagen, precio, stock, id) {
  const producto = {
    _id: _id,
    nombre: nombre,
    imagen: imagen,
    precio: precio,
    stock: stock

  }

  const si = fav.findIndex(e => e._id === id)

  fav.findIndex(e => e._id === id) > -1 ? fav.splice(si, 1) : fav.push(producto)

  localStorage.setItem('favs', JSON.stringify(fav))
  pintarFavs()
}

function pintarFavs () {
  if (tipo === 'Favoritos') {
    drawCards(JSON.parse(localStorage.getItem('favs')))
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