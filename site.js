// Function to extract product data
 function extractProductData() {
    const productElements = document.querySelectorAll('.product');

    const products = [];

    productElements.forEach((element) => {
        const companyName = element.querySelector('.company-name').textContent;
        const modelNumber = element.querySelector('.model-number').textContent;
        const fromCity = element.querySelector('.from-city').textContent;
        const toCity = element.querySelector('.to-city').textContent;
        const productCategory = element.querySelector('.product-category').textContent;

        const product = {
            companyName,
            modelNumber,
            fromCity,
            toCity,
            productCategory
        };

        products.push(product);
    });

    return products;
}

// Function to handle adding to cart
function addToCart(event) {
    const productElement = event.target.closest('.product');
    const companyName = productElement.querySelector('.company-name').textContent;
    const modelNumber = productElement.querySelector('.model-number').textContent;

    const cartItem = document.createElement('li');
    cartItem.textContent = `${companyName} - ${modelNumber}`;

    const cartItems = document.querySelector('.cart-items');
    cartItems.appendChild(cartItem);
}

// Main execution logic
function main() {
    // Extract product data from the webpage
    const products = extractProductData();

    // Add event listeners to the "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', addToCart);
    });
}

// Execute the content script when the DOM is ready
window.addEventListener('DOMContentLoaded', main);
