// Function to add item to wishlist
function addToWishlist(id, name, price, image) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const newItem = { id, name, price, image };

    // Check if the item already exists in the wishlist
    if (!wishlist.some(item => item.id === id)) {
        wishlist.push(newItem);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert("Item added to wishlist!");
    } else {
        alert("Item is already in the wishlist.");
    }
}

// Attach event listeners to all 'Add to Wishlist' buttons
document.querySelectorAll('.add-to-wishlist').forEach(button => {
    button.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');
        const image = this.getAttribute('data-image');

        addToWishlist(id, name, price, image);
    });
});

// Function to display wishlist items on wishlist.html page
function displayWishlist() {
    const wishlistContainer = document.getElementById('wishlist-items');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    wishlistContainer.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
        return;
    }

    wishlist.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('wishlist-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:100px;height:100px;">
            <h2>${item.name}</h2>
            <p>Price: $${item.price}</p>
            <button class="remove-button" data-id="${item.id}">Remove</button>
        `;
        wishlistContainer.appendChild(itemElement);
    });

    // Attach event listeners to remove buttons after rendering wishlist
    attachRemoveButtonListeners();
}

// Function to attach event listeners to all remove buttons
function attachRemoveButtonListeners() {
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            removeFromWishlist(id);
        });
    });
}

// Function to remove item from wishlist
function removeFromWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Refresh the wishlist display after removing an item
    displayWishlist();
}

// Check if we're on the wishlist page and display items
if (window.location.pathname.includes('wishlist.html')) {
    displayWishlist();
}
