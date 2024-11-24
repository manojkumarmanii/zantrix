// Get cart items from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.getElementById('cart-container');

if (cart.length === 0) {
    cartContainer.innerHTML = '<p>No items in the cart</p>';
} else {
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>
        </div>
    `).join('');
}

// Remove from Cart functionality
cartContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-from-cart')) {
        const id = e.target.getAttribute('data-id');
        const updatedCart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        location.reload(); // Refresh the page
    }
});
