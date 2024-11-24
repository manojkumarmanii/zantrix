const cartButtons = document.querySelectorAll('.add-to-cart');

const cartBadge = document.getElementById('cart-badge');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

cartBadge.textContent = cart.length;

cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        
        const id = product.dataset.id;
        const name = product.dataset.name;
        const price = product.dataset.price;
        const image = product.dataset.image;

        if (!id || !name || !price || !image) {
            console.error('Product details are missing:', { id, name, price, image });
            alert('Product details are incomplete!');
            return;
        }
        const cartItem = { id, name, price, image };
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        cartBadge.textContent = cart.length;

        alert('Item added to cart!');
    });
});
