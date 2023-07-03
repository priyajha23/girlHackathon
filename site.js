// You can add any necessary JavaScript functionality here
// such as incrementing/decrementing the quantity or handling the "Add to Cart" button click event.
// This code is just a sample to show the structure and basic functionality.

document.addEventListener('DOMContentLoaded', function() {
    const minusButtons = document.querySelectorAll('.minus-btn');
    const plusButtons = document.querySelectorAll('.plus-btn');
  
    minusButtons.forEach(button => {
      button.addEventListener('click', function() {
        const quantityInput = this.parentNode.querySelector('input[type="text"]');
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
          quantity--;
          quantityInput.value = quantity;
        }
      });
    });
  
    plusButtons.forEach(button => {
      button.addEventListener('click', function() {
        const quantityInput = this.parentNode.querySelector('input[type="text"]');
        let quantity = parseInt(quantityInput.value);
        quantity++;
        quantityInput.value = quantity;
      });
    });
  });
  