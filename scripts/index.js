if (document.title === "PetShop Franco"){
    let botonRead = document.querySelector("#readMore")
    botonRead.addEventListener("click", ()=> {
      if (botonRead.innerText === "Leer Más") {
        botonRead.innerText = "Leer Menos"
      }else{
        botonRead.innerText = "Leer Más"
      }
    })
  }