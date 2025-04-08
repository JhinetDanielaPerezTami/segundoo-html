document.addEventListener("DOMContentLoaded", () => {
    // Configurar eventos para los selectores de cantidad
    setupQuantitySelectors()
  
    // Configurar eventos para las opciones de producto
    setupProductOptions()
  
    // Configurar eventos para el selector de tarjeta
    setupCardSelector()
  
    // Configurar eventos para el botón de pago
    setupPayButton()
  
    // Inicializar el resumen de la orden
    updateOrderSummary()
  })
  
  // Configurar eventos para los selectores de cantidad
  function setupQuantitySelectors() {
    document.querySelectorAll(".item-quantity").forEach((selector) => {
      const minusBtn = selector.querySelector(".minus")
      const plusBtn = selector.querySelector(".plus")
      const quantitySpan = selector.querySelector(".quantity")
  
      if (minusBtn && plusBtn && quantitySpan) {
        minusBtn.addEventListener("click", () => {
          let quantity = Number.parseInt(quantitySpan.textContent)
          if (quantity > 1) {
            quantity--
            quantitySpan.textContent = quantity
            updateOrderSummary()
          }
        })
  
        plusBtn.addEventListener("click", () => {
          let quantity = Number.parseInt(quantitySpan.textContent)
          quantity++
          quantitySpan.textContent = quantity
          updateOrderSummary()
        })
      }
    })
  }
  
  // Configurar eventos para las opciones de producto
  function setupProductOptions() {
    document.querySelectorAll(".item-options").forEach((btn) => {
      btn.addEventListener("click", () => {
        alert("Opciones del producto: Eliminar, Guardar para después, etc.")
      })
    })
  }
  
  // Configurar eventos para el selector de tarjeta
  function setupCardSelector() {
    const changeCardBtn = document.querySelector(".change-card")
  
    if (changeCardBtn) {
      changeCardBtn.addEventListener("click", () => {
        alert("Cambiar método de pago")
      })
    }
  }
  
  // Configurar eventos para el botón de pago
  function setupPayButton() {
    const payBtn = document.querySelector(".pay-btn")
  
    if (payBtn) {
      payBtn.addEventListener("click", () => {
        alert("¡Pago realizado con éxito!")
        setTimeout(() => {
          window.location.href = "../index.html"
        }, 1500)
      })
    }
  }
  
  // Actualizar el resumen de la orden
  function updateOrderSummary() {
    // Obtener todos los productos y sus cantidades
    const cartItems = document.querySelectorAll(".cart-item")
    let totalProducts = 0
    let subtotal = 0
  
    cartItems.forEach((item) => {
      const priceText = item.querySelector(".item-price").textContent
      const price = Number.parseFloat(priceText.replace("$", "").replace(",", ""))
      const quantity = Number.parseInt(item.querySelector(".quantity").textContent)
  
      if (!isNaN(price) && !isNaN(quantity)) {
        totalProducts += quantity
        subtotal += price * quantity
      }
    })
  
    // Actualizar el número de productos y subtotal
    const totalItemsElement = document.querySelector(".summary-row:first-child span:first-child")
    const subtotalElement = document.querySelector(".summary-row:first-child span:last-child")
  
    if (totalItemsElement) {
      totalItemsElement.textContent = `Total (${totalProducts} items)`
    }
  
    if (subtotalElement) {
      subtotalElement.textContent = `$${subtotal.toFixed(2)}`
    }
  
    // Calcular el total
    const shipping = 0.0 // Envío gratuito
    const discount = 0.0 // Sin descuento
    const total = subtotal + shipping - discount
  
    // Actualizar el total
    const totalElement = document.querySelector(".summary-row.total span:last-child")
  
    if (totalElement) {
      totalElement.textContent = `$${total.toFixed(2)}`
    }
  }
     
   