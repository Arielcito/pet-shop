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
      <small class="text-muted">${producto.stock > 5 ? 'Stock disponible!' : 'Ultimas unidades!'}</small>
      <small class="text-muted">$${producto.precio}</small>
      </div>
      <div class="d-flex container-fluid ">
      <p>Cantidad: <span id="cuenta-${producto._id}">${0}</span> </p>
      <button type="button" onclick="restar1('cuenta-${producto._id}')" class="bg-light text-dark btn-sm btn-primary m-1">-</button>
      
      <button type="button" onclick="sumar1('cuenta-${producto._id}', ${array})" class="bg-light text-dark btn-sm btn-primary m-1">+</button>
      </div>
      <div class="d-flex justify-content-between">
      <button type="button" class="restar btn btn-primary m-1">Añadir a la canasta</button>
      <button type="button" class="sumar btn btn-primary m-1">Añadir a favoritos</button>
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
  
  function sumar1(id, array){
    let contador = document.getElementById(id);
    console.log(contador);
    console.log(contador.innerText);
    let numeroInterno = parseInt(contador.innerText) + 1; 
    contador.innerText= numeroInterno;
    console.log(numeroInterno);
    // console.log(array.producto.stock);

  }
  

  function restar1(id){
    let contador = document.getElementById(id);
    console.log(contador);
    console.log(contador.innerText);
    let numeroInterno = parseInt(contador.innerText) - 1; 
    contador.innerText= numeroInterno;
    console.log(numeroInterno);
    // (0 > numeroInterno)?  
  }

  //
  // function cantidadCompra (articulos){
  //     let sumar = document.querySelector(".sumar");
  //     let contador = document.querySelector("#cuenta");
  //     let restar = document.querySelector(".restar");
    
  //       sumar.addEventListener("click", sumo);
  //       restar.addEventListener("click", resto);
  //       console.log("sumar");
    
    //     function sumo() {
    //         contador.innerHTML = unidadesDeseadas++;
    //         if (unidadesDeseadas> response.stock ){
        
    //           }
        
    //         }
    //         function resto("") {
    //             contador.innerHTML = unidadesDeseadas--;
    //             if(unidadesDeseadas<=0){
    //     unidadesDeseadas=0;
    //   }
    // }
// }