// Definir los productos con toda su información
const productData = [
    {
      id: 1,
      title: "Modern Light Clothes",
      price: "$212.99",
      image: "../imagenes/modern.png",
      rating: "5.0",
      reviews: "782",
      description: "Its simple and elegant shape makes it perfect for those of you who like minimalist clothes",
      category: "modern light clothes",
    },
    {
      id: 2,
      title: "Light Dress Bless",
      price: "$162.99",
      image: "../imagenes/DressL.png",
      rating: "5.0",
      reviews: "782",
      description: "Its simple and elegant shape makes it perfect for those of you who like minimalist clothes",
      category: "dress",
    },
    {
      id: 3,
      title: "Winter Clothes",
      price: "$775.99",
      image: "../imagenes/winter.png",
      rating: "4.8",
      reviews: "450",
      description: "Perfect for cold weather, these winter clothes will keep you warm and stylish all season long",
      category: "winter",
    },
    {
      id: 4,
      title: "Summer T-Shirt",
      price: "$129.99",
      image: "../imagenes/summer.png",
      rating: "4.9",
      reviews: "620",
      description: "Light and comfortable, this summer t-shirt is perfect for hot days and casual outings",
      category: "tshirt",
    },
  ]
  
  // Almacenar los productos originales para poder restaurarlos después de una búsqueda
  let allProducts = []
  
  // Función para inicializar la página
  document.addEventListener("DOMContentLoaded", () => {
    // Guardar todos los productos al cargar la página
    const productCards = document.querySelectorAll(".product-card")
    allProducts = Array.from(productCards).map((card) => {
      return {
        element: card,
        title: card.querySelector("h4").textContent.toLowerCase(),
        category: card.getAttribute("data-category") ? card.getAttribute("data-category").toLowerCase() : "",
        id: card.getAttribute("data-id"),
        displayCategory: card.querySelector(".product-category")
          ? card.querySelector(".product-category").textContent.toLowerCase()
          : "",
      }
    })
  
    // Inicializar favoritos desde localStorage
    initializeFavorites()
  
    // Configurar eventos para categorías
    setupCategoryEvents()
  
    // Configurar eventos para búsqueda
    setupSearchEvents()
  
    // Configurar eventos para favoritos
    setupFavoriteEvents()
  
    // Configurar eventos para navegación
    setupNavigationEvents()
  })
  
  // Configurar eventos para categorías
  function setupCategoryEvents() {
    document.querySelectorAll(".category-tab").forEach((tab) => {
      tab.addEventListener("click", function () {
        // Eliminar la clase active de todas las categorías
        document.querySelectorAll(".category-tab").forEach((t) => {
          t.classList.remove("active")
        })
        // Añadir la clase active a la categoría seleccionada
        this.classList.add("active")
  
        // Filtrar productos por categoría
        const category = this.getAttribute("data-category")
        filterProductsByCategory(category)
      })
    })
  }
  
  // Configurar eventos para búsqueda
  function setupSearchEvents() {
    const searchInput = document.querySelector(".search-box input")
    const searchIcon = document.querySelector(".search-box i")
  
    if (searchInput) {
      // Buscar al presionar Enter
      searchInput.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
          searchProducts(this.value)
        } else if (this.value === "") {
          // Si el campo está vacío, mostrar todos los productos
          resetProductDisplay()
        }
      })
    }
  
    if (searchIcon) {
      // Buscar al hacer clic en el ícono de búsqueda
      searchIcon.addEventListener("click", () => {
        if (searchInput) {
          searchProducts(searchInput.value)
        }
      })
    }
  }
  
  // Configurar eventos para favoritos
  function setupFavoriteEvents() {
    document.querySelectorAll(".favorite-btn").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault()
        e.stopPropagation()
  
        const productCard = this.closest(".product-card")
        const productId = productCard.getAttribute("data-id")
        const productTitle = productCard.querySelector("h4").textContent
        const productImage = productCard.querySelector("img").src
        const productPrice = productCard.querySelector(".product-price").textContent
        const icon = this.querySelector("i")
  
        // Cambiar el estado visual del botón de favoritos
        if (icon.classList.contains("far")) {
          icon.classList.remove("far")
          icon.classList.add("fas")
          // Guardar en favoritos
          addToFavorites(productId, productTitle, productImage, productPrice)
        } else {
          icon.classList.remove("fas")
          icon.classList.add("far")
          // Quitar de favoritos
          removeFromFavorites(productId)
        }
      })
    })
  }
  
  // Configurar eventos para navegación
  function setupNavigationEvents() {
    // Funcionalidad para los productos (redirección a la página de detalle)
    document.querySelectorAll(".product-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        // No redirigir si se hace clic en el botón de favoritos
        if (!e.target.closest(".favorite-btn")) {
          const productId = card.getAttribute("data-id")
          // Guardar el ID del producto seleccionado en localStorage
          localStorage.setItem("selectedProductId", productId)
          window.location.href = "views/detail.html"
        }
      })
    })
  
    // Navegación a la página de favoritos
    const favoritesLink = document.querySelector(".mobile-menu .menu-item:nth-child(3)")
    if (favoritesLink) {
      favoritesLink.addEventListener("click", (e) => {
        e.preventDefault()
        window.location.href = "views/favorites.html"
      })
    }
  }
  
  // Función para buscar productos
  function searchProducts(query) {
    if (!query || !query.trim()) {
      resetProductDisplay()
      return
    }
  
    query = query.toLowerCase()
  
    // Ocultar todos los productos primero
    allProducts.forEach((product) => {
      product.element.style.display = "none"
    })
  
    // Mostrar solo los productos que coinciden con la búsqueda
    let foundProducts = false
    allProducts.forEach((product) => {
      if (product.title.includes(query) || product.category.includes(query) || product.displayCategory.includes(query)) {
        product.element.style.display = "block"
        foundProducts = true
      }
    })
  
    // Mostrar mensaje si no hay resultados
    const productsContainer = document.querySelector(".product-grid")
  
    if (!foundProducts && productsContainer) {
      // Si no existe, crear el mensaje de no resultados
      let noResults = document.querySelector(".no-results")
      if (!noResults) {
        noResults = document.createElement("div")
        noResults.className = "no-results"
        noResults.textContent = "No se encontraron productos que coincidan con tu búsqueda."
        productsContainer.appendChild(noResults)
      }
    } else {
      // Si existe, eliminar el mensaje de no resultados
      const noResults = document.querySelector(".no-results")
      if (noResults) {
        noResults.remove()
      }
    }
  }
  
  // Función para restablecer la visualización de productos
  function resetProductDisplay() {
    allProducts.forEach((product) => {
      product.element.style.display = "block"
    })
  
    // Eliminar mensaje de no resultados si existe
    const noResults = document.querySelector(".no-results")
    if (noResults) {
      noResults.remove()
    }
  }
  
  // Función para filtrar productos por categoría
  function filterProductsByCategory(category) {
    // Si es "all", mostrar todos los productos
    if (category === "all") {
      resetProductDisplay()
      return
    }
  
    // Ocultar todos los productos primero
    allProducts.forEach((product) => {
      product.element.style.display = "none"
    })
  
    // Mostrar solo los productos que coinciden con la categoría
    let foundProducts = false
    allProducts.forEach((product) => {
      if (product.category.includes(category)) {
        product.element.style.display = "block"
        foundProducts = true
      }
    })
  
    // Mostrar mensaje si no hay resultados
    const productsContainer = document.querySelector(".product-grid")
  
    if (!foundProducts && productsContainer) {
      // Si no existe, crear el mensaje de no resultados
      let noResults = document.querySelector(".no-results")
      if (!noResults) {
        noResults = document.createElement("div")
        noResults.className = "no-results"
        noResults.textContent = "No se encontraron productos en esta categoría."
        productsContainer.appendChild(noResults)
      }
    } else {
      // Si existe, eliminar el mensaje de no resultados
      const noResults = document.querySelector(".no-results")
      if (noResults) {
        noResults.remove()
      }
    }
  }
  
  // Sistema de favoritos
  function addToFavorites(id, title, image, price) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []
  
    // Verificar si el producto ya está en favoritos
    if (!favorites.some((item) => item.id === id)) {
      favorites.push({
        id: id,
        title: title,
        image: image,
        price: price,
      })
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  }
  
  function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []
    favorites = favorites.filter((item) => item.id !== id)
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }
  
  function initializeFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []
  
    // Marcar los productos que ya están en favoritos
    document.querySelectorAll(".product-card").forEach((card) => {
      const id = card.getAttribute("data-id")
      const favoriteBtn = card.querySelector(".favorite-btn i")
  
      if (favorites.some((item) => item.id === id)) {
        favoriteBtn.classList.remove("far")
        favoriteBtn.classList.add("fas")
      }
    })
  }
  