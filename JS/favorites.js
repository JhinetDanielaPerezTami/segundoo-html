document.addEventListener("DOMContentLoaded", () => {
    loadFavorites()
  
    // Configurar eventos para el botón de volver
    const backBtn = document.querySelector(".back-btn")
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        window.location.href = "../index.html"
      })
    }
  
    // Configurar eventos para el menú móvil
    setupMobileMenu()
  })
  
  // Configurar eventos para el menú móvil
  function setupMobileMenu() {
    document.querySelectorAll(".mobile-menu .menu-item").forEach((item) => {
      item.addEventListener("click", function (e) {
        if (this.getAttribute("href") === "#") {
          e.preventDefault()
        }
      })
    })
  
    // Evento específico para el botón de inicio
    const homeBtn = document.querySelector(".mobile-menu .menu-item:first-child")
    if (homeBtn) {
      homeBtn.addEventListener("click", () => {
        window.location.href = "../index.html"
      })
    }
  }
  
  // Cargar productos favoritos desde localStorage
  function loadFavorites() {
    const favoritesContainer = document.getElementById("favorites-container")
    const noFavoritesMessage = document.querySelector(".no-favorites-message")
  
    if (!favoritesContainer || !noFavoritesMessage) {
      console.error("No se encontraron elementos necesarios en el DOM")
      return
    }
  
    // Obtener favoritos del localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []
  
    // Mostrar mensaje si no hay favoritos
    if (favorites.length === 0) {
      noFavoritesMessage.style.display = "flex"
      return
    }
  
    // Ocultar mensaje si hay favoritos
    noFavoritesMessage.style.display = "none"
  
    // Limpiar el contenedor antes de agregar los productos
    // (excepto el mensaje de no favoritos)
    const productCards = favoritesContainer.querySelectorAll(".product-card")
    productCards.forEach((card) => card.remove())
  
    // Agregar cada producto favorito al contenedor
    favorites.forEach((product) => {
      const productCard = createProductCard(product)
      favoritesContainer.appendChild(productCard)
    })
  }
  
  // Crear tarjeta de producto para favoritos
  function createProductCard(product) {
    const card = document.createElement("div")
    card.className = "product-card"
    card.setAttribute("data-id", product.id)
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
        <button class="remove-favorite-btn" data-id="${product.id}">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <h4>${product.title}</h4>
        <p class="product-price">${product.price}</p>
      </div>
    `
  
    // Agregar evento para ver detalle del producto
    card.addEventListener("click", (e) => {
      if (!e.target.closest(".remove-favorite-btn")) {
        // Guardar el ID del producto seleccionado en localStorage
        localStorage.setItem("selectedProductId", product.id)
        window.location.href = "detail.html"
      }
    })
  
    // Agregar evento para eliminar de favoritos
    const removeBtn = card.querySelector(".remove-favorite-btn")
    if (removeBtn) {
      removeBtn.addEventListener("click", function (e) {
        e.preventDefault()
        e.stopPropagation()
  
        const id = this.getAttribute("data-id")
        removeFromFavorites(id)
        card.remove()
  
        // Verificar si quedan favoritos
        const favorites = JSON.parse(localStorage.getItem("favorites")) || []
        if (favorites.length === 0) {
          const noFavoritesMessage = document.querySelector(".no-favorites-message")
          if (noFavoritesMessage) {
            noFavoritesMessage.style.display = "flex"
          }
        }
      })
    }
  
    return card
  }
  
  // Eliminar producto de favoritos
  function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []
    favorites = favorites.filter((item) => item.id !== id)
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }
  