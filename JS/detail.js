// Datos de los productos
const productData = [
    {
      id: "1",
      title: "Modern Light Clothes",
      price: "$212.99",
      originalPrice: "$299.99",
      image: "../imagenes/modern.png",
      rating: "5.0",
      reviews: "782",
      description: "Its simple and elegant shape makes it perfect for those of you who like minimalist clothes",
      category: "modern light clothes",
    },
    {
      id: "2",
      title: "Light Dress Bless",
      price: "$162.99",
      originalPrice: "$199.99",
      image: "../imagenes/DressL.png",
      rating: "5.0",
      reviews: "782",
      description: "Its simple and elegant shape makes it perfect for those of you who like minimalist clothes",
      category: "dress",
    },
    {
      id: "3",
      title: "Winter Clothes",
      price: "$775.99",
      originalPrice: "$899.99",
      image: "../imagenes/winter.png",
      rating: "4.8",
      reviews: "450",
      description: "Perfect for cold weather, these winter clothes will keep you warm and stylish all season long",
      category: "winter",
    },
    {
      id: "4",
      title: "Summer T-Shirt",
      price: "$129.99",
      originalPrice: "$159.99",
      image: "../imagenes/summer.png",
      rating: "4.9",
      reviews: "620",
      description: "Light and comfortable, this summer t-shirt is perfect for hot days and casual outings",
      category: "tshirt",
    },
  ]
  
  document.addEventListener("DOMContentLoaded", () => {
    // Cargar los detalles del producto seleccionado
    loadProductDetails()
  
    // Configurar eventos para los botones de cantidad
    setupQuantityButtons()
  
    // Configurar eventos para el botón de favoritos
    setupFavoriteButton()
  
    // Configurar eventos para los botones de tamaño
    setupSizeButtons()
  
    // Configurar eventos para los botones de color
    setupColorButtons()
  
    // Configurar eventos para el botón "Read More"
    setupReadMoreButton()
  
    // Configurar eventos para el botón de compra
    setupBuyButton()
  
    // Configurar eventos para el botón de volver
    setupBackButton()
  })
  
  // Cargar los detalles del producto seleccionado
  function loadProductDetails() {
    const selectedProductId = localStorage.getItem("selectedProductId")
  
    if (!selectedProductId) {
      console.error("No se encontró el ID del producto seleccionado")
      return
    }
  
    const product = productData.find((p) => p.id === selectedProductId)
  
    if (!product) {
      console.error("No se encontró el producto con ID:", selectedProductId)
      return
    }
  
    // Actualizar la imagen del producto
    const productImage = document.querySelector(".product-image img")
    if (productImage) {
      productImage.src = product.image
      productImage.alt = product.title
    }
  
    // Actualizar el título del producto
    const productTitle = document.querySelector(".product-title")
    if (productTitle) {
      productTitle.textContent = product.title
    }
  
    // Actualizar la calificación del producto
    const ratingValue = document.querySelector(".rating")
    const reviewsCount = document.querySelector(".reviews")
    if (ratingValue) {
      ratingValue.textContent = product.rating
    }
    if (reviewsCount) {
      reviewsCount.textContent = `(${product.reviews} reviews)`
    }
  
    // Actualizar la descripción del producto
    const productDescription = document.querySelector(".product-description")
    if (productDescription) {
      productDescription.innerHTML = `${product.description} <a href="#" class="read-more">Read More...</a>`
    }
  
    // Actualizar el precio del producto
    const addToCartBtn = document.querySelector(".add-to-cart-btn")
    if (addToCartBtn) {
      addToCartBtn.innerHTML = `
        <i class="fas fa-shopping-cart"></i>
        Add to Cart | ${product.price}
        <span class="original-price">${product.originalPrice}</span>
      `
    }
  
    // Verificar si el producto está en favoritos
    checkFavoriteStatus(product.id)
  }
  
  // Configurar eventos para los botones de cantidad
  function setupQuantityButtons() {
    const minusBtn = document.querySelector(".quantity-btn.minus")
    const plusBtn = document.querySelector(".quantity-btn.plus")
    const quantitySpan = document.querySelector(".quantity")
  
    if (minusBtn && plusBtn && quantitySpan) {
      // Botón de disminuir cantidad
      minusBtn.addEventListener("click", () => {
        let quantity = Number.parseInt(quantitySpan.textContent)
        if (quantity > 1) {
          quantity--
          quantitySpan.textContent = quantity
        }
      })
  
      // Botón de aumentar cantidad
      plusBtn.addEventListener("click", () => {
        let quantity = Number.parseInt(quantitySpan.textContent)
        quantity++
        quantitySpan.textContent = quantity
      })
    }
  }
  
  // Configurar eventos para el botón de favoritos
  function setupFavoriteButton() {
    const favoriteBtn = document.querySelector(".favorite-btn")
  
    if (favoriteBtn) {
      favoriteBtn.addEventListener("click", function () {
        const icon = this.querySelector("i")
        const selectedProductId = localStorage.getItem("selectedProductId")
        const product = productData.find((p) => p.id === selectedProductId)
  
        if (!product) {
          console.error("No se encontró el producto seleccionado")
          return
        }
  
        if (icon.classList.contains("far")) {
          icon.classList.remove("far")
          icon.classList.add("fas")
          // Guardar en favoritos
          addToFavorites(product.id, product.title, product.image, product.price)
        } else {
          icon.classList.remove("fas")
          icon.classList.add("far")
          // Quitar de favoritos
          removeFromFavorites(product.id)
        }
      })
    }
  }
  
  // Configurar eventos para los botones de tamaño
  function setupSizeButtons() {
    document.querySelectorAll(".size-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".size-btn").forEach((b) => {
          b.classList.remove("active")
        })
        this.classList.add("active")
      })
    })
  }
  
  // Configurar eventos para los botones de color
  function setupColorButtons() {
    document.querySelectorAll(".color-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".color-btn").forEach((b) => {
          b.classList.remove("active")
        })
        this.classList.add("active")
      })
    })
  }
  
  // Configurar eventos para el botón "Read More"
  function setupReadMoreButton() {
    const readMoreBtn = document.querySelector(".read-more")
  
    if (readMoreBtn) {
      readMoreBtn.addEventListener("click", (e) => {
        e.preventDefault()
        const selectedProductId = localStorage.getItem("selectedProductId")
        const product = productData.find((p) => p.id === selectedProductId)
  
        if (product) {
          alert(`Descripción completa: ${product.description}`)
        }
      })
    }
  }
  
  // Configurar eventos para el botón de compra
  function setupBuyButton() {
    const addToCartBtn = document.querySelector(".add-to-cart-btn")
  
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", () => {
        window.location.href = "checkout.html"
      })
    }
  }
  
  // Configurar eventos para el botón de volver
  function setupBackButton() {
    const backBtn = document.querySelector(".back-btn")
  
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        window.location.href = "../index.html"
      })
    }
  }
  
  // Verificar si el producto está en favoritos al cargar la página
  function checkFavoriteStatus(productId) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []
    const favoriteBtn = document.querySelector(".favorite-btn i")
  
    if (favoriteBtn && favorites.some((item) => item.id === productId)) {
      favoriteBtn.classList.remove("far")
      favoriteBtn.classList.add("fas")
    }
  }
  
  // Funciones para gestionar favoritos
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
  