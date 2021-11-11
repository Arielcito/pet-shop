function addToFav (e) {
  const producto = e.target.parentElement.parentElement.parentElement
  const nombre = producto.querySelector('').textContent
  const precio = producto.querySelector('').textContent
  const imagen = producto.querySelector('').src
  const stock = producto.querySelector('').textContent
  const id = producto.querySelector('').textContent

  const fav = JSON.parse(localStorage.getItem('')) || []
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

 
  fav.forEach(producto => {
    const card = document.querySelector(`[data-id="${producto.id}"]`)
    card.querySelector('.fav').textContent = 'Añadido'
    card.querySelector('.fav').disabled = true
  })
}
