# AutoWheels - Car Accessories E-Commerce Store

A modern, responsive e-commerce website for car accessories built with HTML, CSS, and vanilla JavaScript.

## Features

✨ **Responsive Design** - Works on desktop, tablet, and mobile devices

🛒 **Shopping Cart** - Add/remove items, update quantities, persistent storage

🔍 **Search Functionality** - Search products by name or category

📂 **Category Filtering** - Browse products by categories (Interior, Exterior, Lighting, etc.)

🎠 **Product Carousel** - Smooth navigation through featured products

💾 **Local Storage** - Cart persists across browser sessions

⭐ **Product Ratings** - Visual rating display for each product

📱 **Mobile Optimized** - Touch-friendly interface

## Project Structure

```
car-accessories-ecommerce/
├── index.html       # Main HTML file
├── styles.css       # CSS styles with responsive design
├── script.js        # JavaScript functionality
└── README.md        # This file
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/YoungDoc004/car-accessories-ecommerce.git
   ```

2. Open `index.html` in your web browser

3. Start shopping!

## Sections

### Header/Navigation
- Logo with brand name
- Navigation links
- Shopping cart icon with item count

### Hero Section
- Eye-catching banner with tagline "Upgrade Your Ride"
- Shop Now button for quick navigation

### Search Bar
- Full-width search for products
- Real-time filtering

### Categories
- 7 browsable categories:
  - Interior
  - Exterior
  - Car Electronics
  - Lighting
  - Seat Covers
  - Phone Holder
  - Cleaning Kits

### Featured Products
- Carousel slider for smooth browsing
- Product cards with images, prices, and ratings
- Add to cart functionality

### Brands
- Showcase of partner brands

### Shopping Cart
- Slide-out modal
- View all items
- Update quantities
- Remove items
- Total price calculation

### Footer
- Company information
- Quick links
- Contact details

## JavaScript Features

### Cart Management
- `addToCart(productId)` - Add products to cart
- `removeFromCart(productId)` - Remove products
- `updateQuantity(productId, amount)` - Adjust quantities
- `toggleCart()` - Open/close cart modal

### Product Functions
- `renderProducts()` - Display all products
- `searchProducts(e)` - Search functionality
- `filterByCategory(category)` - Category filtering

### Carousel
- `moveCarousel(direction)` - Navigate through products

### Utilities
- `scrollToSection(sectionId)` - Smooth scrolling
- `showNotification(message)` - Toast notifications
- LocalStorage integration for persistent cart

## Customization

### Adding Products
Edit the `products` array in `script.js`:

```javascript
const products = [
    {
        id: 1,
        name: "Product Name",
        price: 99.99,
        image: "image-url",
        rating: 4.5,
        category: "Category Name"
    },
    // ... more products
];
```

### Changing Colors
Modify color variables in `styles.css`:
- Primary color: `#ff6b35` (orange)
- Dark color: `#1a1a1a` (dark)
- Accent colors can be adjusted throughout the CSS

### Adding Categories
Edit the categories grid in `index.html` and ensure products have matching category names.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Backend integration with database
- [ ] User authentication
- [ ] Payment gateway integration
- [ ] Order tracking
- [ ] Product reviews and comments
- [ ] Wishlist functionality
- [ ] Product filtering by price range
- [ ] Discount codes

## License

MIT License - Feel free to use this project for personal or commercial use.

## Author

YoungDoc004

## Contact

For questions or suggestions, please reach out:
- Email: info@autowheels.com
- Phone: (555) 123-4567

---

**Happy Shopping! 🎉**
