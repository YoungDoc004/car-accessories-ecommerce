// Product Data
const products = [
    {
        id: 1,
        name: "LED Headlight Kit",
        price: 89.99,
        image: "https://via.placeholder.com/200x200?text=LED+Headlights",
        rating: 4.5,
        category: "Lighting"
    },
    {
        id: 2,
        name: "Premium Seat Covers",
        price: 59.99,
        image: "https://via.placeholder.com/200x200?text=Seat+Covers",
        rating: 4.8,
        category: "Seat Covers"
    },
    {
        id: 3,
        name: "Dashboard Camera",
        price: 129.99,
        image: "https://via.placeholder.com/200x200?text=Dashboard+Camera",
        rating: 4.6,
        category: "Car Electronics"
    },
    {
        id: 4,
        name: "Phone Holder Pro",
        price: 24.99,
        image: "https://via.placeholder.com/200x200?text=Phone+Holder",
        rating: 4.4,
        category: "Phone Holder"
    },
    {
        id: 5,
        name: "Car Cleaning Kit",
        price: 39.99,
        image: "https://via.placeholder.com/200x200?text=Cleaning+Kit",
        rating: 4.7,
        category: "Cleaning Kits"
    },
    {
        id: 6,
        name: "Ambient Interior Lights",
        price: 49.99,
        image: "https://via.placeholder.com/200x200?text=Ambient+Lights",
        rating: 4.5,
        category: "Interior"
    },
    {
        id: 7,
        name: "Carbon Fiber Spoiler",
        price: 199.99,
        image: "https://via.placeholder.com/200x200?text=Carbon+Spoiler",
        rating: 4.9,
        category: "Exterior"
    },
    {
        id: 8,
        name: "GPS Navigator",
        price: 79.99,
        image: "https://via.placeholder.com/200x200?text=GPS+Navigator",
        rating: 4.3,
        category: "Car Electronics"
    }
];

// Cart State
let cart = [];
let carouselIndex = 0;

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
    loadCartFromLocalStorage();
});

// Render Featured Products
function renderProducts() {
    const wrapper = document.querySelector('.products-wrapper');
    wrapper.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        wrapper.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-rating">
                ${'⭐'.repeat(Math.floor(product.rating))} ${product.rating}
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
    return card;
}

// Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Cart Quantity
function updateQuantity(productId, amount) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Update Cart Display and Storage
function updateCart() {
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Render cart items
    renderCartItems();
    
    // Save to localStorage
    saveCartToLocalStorage();
}

// Render Cart Items
function renderCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        document.getElementById('cartTotal').textContent = '0.00';
        return;
    }
    
    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
    
    // Calculate and display total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// Toggle Cart Modal
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart icon click
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.addEventListener('click', toggleCart);
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', searchProducts);
    
    // Category cards click
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h3').textContent;
            filterByCategory(category);
        });
    });
}

// Search Products
function searchProducts(e) {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
    );
    
    const wrapper = document.querySelector('.products-wrapper');
    wrapper.innerHTML = '';
    
    if (filtered.length === 0) {
        wrapper.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found</p>';
        return;
    }
    
    filtered.forEach(product => {
        const productCard = createProductCard(product);
        wrapper.appendChild(productCard);
    });
}

// Filter by Category
function filterByCategory(category) {
    const filtered = products.filter(product => product.category === category);
    const wrapper = document.querySelector('.products-wrapper');
    wrapper.innerHTML = '';
    
    if (filtered.length === 0) {
        wrapper.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products in this category</p>';
        return;
    }
    
    filtered.forEach(product => {
        const productCard = createProductCard(product);
        wrapper.appendChild(productCard);
    });
    
    // Scroll to featured section
    scrollToSection('featured');
}

// Carousel Functions
function moveCarousel(direction) {
    const wrapper = document.querySelector('.products-wrapper');
    const cards = wrapper.querySelectorAll('.product-card');
    const cardWidth = cards[0].offsetWidth + 16; // 16px for margin
    
    carouselIndex += direction;
    
    // Prevent scrolling beyond boundaries
    const maxIndex = Math.max(0, cards.length - 4);
    if (carouselIndex < 0) carouselIndex = 0;
    if (carouselIndex > maxIndex) carouselIndex = maxIndex;
    
    wrapper.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
}

// Scroll to Section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4caf50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// LocalStorage Functions
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}