
const cartProducts = [];

// Function to handle adding to cart

function addToCart(event) {
  const productElement = event.target.closest('.product');
  const productId = productElement.id;

  // Retrieve the sustainability rating for the current product
  const ratingElement = productElement.querySelector('.sustainability-rating');
  const pointsElement = ratingElement.querySelector('.sustainability-points');
  const sustainabilityPoints = pointsElement.textContent.replace('Points: ', '');
  const points= parseInt(sustainabilityPoints);
  // Update the green points in the popup
  chrome.runtime.sendMessage({ message: 'updateGreenPoints',  rating: sustainabilityPoints });

  // Add the product ID to the cartProducts array
  cartProducts.push(productId);
}




function extractProductData() {
  const productElements = document.querySelectorAll('.product'); // Update this selector based on your website's structure

  const products = [];

  productElements.forEach((element) => {
    const companyName = element.querySelector('.company-name').textContent; // Update with the appropriate selector
    const modelNumber = element.querySelector('.model-number').textContent; // Update with the appropriate selector
    const fromCity = element.querySelector('.from-city').textContent; // Update with the appropriate selector
    const toCity = element.querySelector('.to-city').textContent; // Update with the appropriate selector
    const productCategory = element.querySelector('.product-category').textContent; // Update with the appropriate selector

    const product = [
      productCategory,
      fromCity,
      toCity,
      companyName
    ];

    products.push(product);
  });

  return products;
}
//function to get rankings on each element in array
function getRankings(originalArray) {
  const sortedArray = [...originalArray].sort((a, b) => b - a);

  const rankings = originalArray.map(element => sortedArray.indexOf(element) + 1);

  return rankings;
}
// Function to display the sustainability ratings on the webpage
function displaySustainabilityRatings(ratings) {
  const productElements = document.querySelectorAll('.product'); 
  const rankings = getRankings(ratings);
  
  productElements.forEach((element, index) => {
    const ratingElement = document.createElement('div');
    ratingElement.classList.add('sustainability-rating');
    
    const emissionElement = document.createElement('div');
    emissionElement.classList.add('sustainability-emission');
    emissionElement.textContent = `Emission: ${ratings[index]}`;
    
    const pointsElement = document.createElement('div');
    pointsElement.classList.add('sustainability-points');
    pointsElement.textContent = `Points: ${rankings[index]}`;
    
    ratingElement.appendChild(emissionElement);
    ratingElement.appendChild(pointsElement);
    
    element.appendChild(ratingElement);
  });
}


// Main execution logic
function main() {
 
  // Extract product data from the webpage
  const products = extractProductData();
  
  // Send the product data to the background script to retrieve sustainability ratings
  chrome.runtime.sendMessage({ message: 'getSustainabilityRatings', products }, (response) => {
    if (chrome.runtime.lastError) {
      // Handle the error from the background script
      console.error(chrome.runtime.lastError);
      return;
    }
    else{
      
    console.log('Received sustainability ratings:', response);

    // Display the sustainability ratings on the webpage
    displaySustainabilityRatings(response.ratings);
    }
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach((button) => {
      button.addEventListener('click', addToCart);
    });
  });
}



// Execute the content script when the DOM is ready
window.onload = main;
