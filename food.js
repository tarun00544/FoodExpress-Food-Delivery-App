/* food.js */
    let cart = [];
    let cartTotal = 0;

    function filterMenu(category) {
      const items = document.querySelectorAll('.menu-item');
      const buttons = document.querySelectorAll('.filter-btn');

      // Update active button
      buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Show/hide items based on category
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
    function addToCart(name, price, image) {
      const existingItem = cart.find(item => item.name === name);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          name: name,
          price: price,
          image: image,
          quantity: 1
        });
      }
      
      updateCartUI();
      showToast(`${name} added to cart!`);
    }

    function removeFromCart(index) {
      cart.splice(index, 1);
      updateCartUI();
      showToast('Item removed from cart');
    }

    function updateQuantity(index, change) {
      cart[index].quantity += change;
      
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      
      updateCartUI();
    }

    function updateCartUI() {
      const cartCount = document.getElementById('cartCount');
      const cartItems = document.getElementById('cartItems');
      const cartSummary = document.getElementById('cartSummary');
      const subtotal = document.getElementById('subtotal');
      const total = document.getElementById('total');
      
      // Update cart count
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
      
      // Update cart items
      if (cart.length === 0) {
        cartItems.innerHTML = `
          <div class="text-center py-5">
            <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
            <p class="text-muted">Your cart is empty</p>
          </div>
        `;
        cartSummary.style.display = 'none';
      } else {
        let cartHTML = '';
        let subtotalAmount = 0;
        
        cart.forEach((item, index) => {
          const itemTotal = item.price * item.quantity;
          subtotalAmount += itemTotal;
          
          cartHTML += `
            <div class="cart-item mb-3 pb-3 border-bottom">
              <div class="row align-items-center">
                <div class="col-3">
                  <img src="${item.image}" class="img-fluid rounded" alt="${item.name}">
                </div>
                <div class="col-6">
                  <h6 class="mb-1">${item.name}</h6>
                  <p class="text-muted mb-1">₹${item.price}</p>
                </div>
                <div class="col-3">
                  <div class="d-flex flex-column align-items-end">
                    <div class="btn-group-sm mb-2">
                      <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, -1)">-</button>
                      <span class="px-2">${item.quantity}</span>
                      <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <small class="text-danger" onclick="removeFromCart(${index})" style="cursor: pointer;">
                      <i class="fas fa-trash"></i> Remove
                    </small>
                  </div>
                </div>
              </div>
            </div>
          `;
        });
        
        cartItems.innerHTML = cartHTML;
        subtotal.textContent = `₹${subtotalAmount}`;
        total.textContent = `₹${subtotalAmount + 29}`;
        cartSummary.style.display = 'block';
      }
    }

    function toggleCart() {
      const sidebar = document.getElementById('cartSidebar');
      const overlay = document.querySelector('.cart-overlay');
      
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    }

    function proceedToCheckout() {
      if (cart.length === 0) {
        showToast('Your cart is empty!', 'warning');
        return;
      }
      
      showToast('Redirecting to checkout...', 'success');
      // Here you would typically redirect to checkout page
      setTimeout(() => {
        alert('Checkout functionality would be implemented here!');
      }, 1000);
    }
    function showToast(message, type = 'success') {
      const toastContainer = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = `toast align-items-center text-white bg-${type} border-0 position-fixed`;
      toast.style.cssText = 'top: 100px; right: 20px; z-index: 1055; min-width: 200px;';
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'assertive');
      toast.setAttribute('aria-atomic', 'true');
      toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white ms-2" onclick="this.closest('.toast').remove()"></button>
        </div>
      `;
      toastContainer.appendChild(toast);
      const toastInstance = new bootstrap.Toast(toast);
      toastInstance.show();
    }