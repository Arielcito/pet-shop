

  function cantidadCompra (stock){
    let unidadesDeseadas = 0;
    let sumar = document.querySelector(".sumar");
    let contador = document.querySelector("#cuenta");
    let restar = document.querySelector(".restar");
    
      sumar.addEventListener("click", sumo);
      restar.addEventListener("click", resto);
      console.log("sumar");
      
      function sumo() {
        contador.innerHTML = unidadesDeseadas++;
        if (unidadesDeseadas> response.stock ){
    
        }
    
      }
      function resto() {
        contador.innerHTML = unidadesDeseadas--;
        if(unidadesDeseadas<=0){
          unidadesDeseadas=0;
        }
      }
  }