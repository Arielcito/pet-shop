const deck = document.getElementById('card-deck')
const starredDeck = document.getElementById('starred-deck')

const starred = []

function selectData () {
  const params = new URLSearchParams(document.location.search.substring(1))
  const house = params.get('house')
  const filteredCharacters = characters.filter((characters) => characters.house === house || house === 'Everyone')
  document.getElementById('house-title') && (document.getElementById('house-title').innerText = house)
  return starredDeck
    ? characters.filter((characters) => starred.includes(character.name))
    : filteredCharacters
}

let pepito = ['5f205432bf2ede0017e48508', '5f204f86bf2ede0017e48507', '5f205469bf2ede0017e4850c', '5f205462bf2ede0017e4850b']
function guardar (array) {
  localStorage.setItem('favs', JSON.stringify(array))
}

function obtener (array) {
  pepito = JSON.parse(localStorage.getItem('favs'))
  drawCards(array)
}
function esta (array) {
  const listo = []
  for (let i = 0; i < pepito.length; i++) {
    listo.push(array.filter(x => x._id === pepito[i])[0])
  }console.log(listo)
}

function toggleFav (item) {
  pepito.includes(item) ? pepito.splice(pepito.indexOf(item), 1) : pepito.push(item)

  console.log(pepito)
} function eliminarMensaje (e) {
  if (e.target.innerText === 'caca') {
    e.target.innerText = 'x'
  } else {
    e.target.innerText = 'caca'
  }
  const id = e.target.id
  toggleFav(id)
}
for (let i = 0; i < wall.length; i++) {
  wall[i].addEventListener('click', eliminarMensaje)
}
const wall = document.getElementsByClassName('favo')
function favoritos (array) {
  drawCards(array)

  const wall = document.getElementsByClassName('favo')
  for (let i = 0; i < wall.length; i++) {
    wall[i].addEventListener('click', eliminarMensaje)
  }
  function eliminarMensaje (e) {
    if (e.target.innerText === 'caca') {
      e.target.innerText = 'x'
    } else {
      e.target.innerText = 'caca'
    }
    const id = e.target.id
    guardar(id)
  }
  function guardar (algo) {
    console.log(algo)
  }
}
? fav.splice(fav.indexOf(indice), 1)
    : fav.push(producto)