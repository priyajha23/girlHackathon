

function calculateGreenPoints(points) {
  // Retrieve the current total green points from storage
  chrome.storage.local.get('totalGreenPoints', ({ totalGreenPoints }) => {
    // Convert the total green points to a number
    const currentGreenPoints = Number(totalGreenPoints);

    // Convert the sustainability rating to a number
    const numberPoints = Number(points);

    // If the total green points value exists, add the sustainability rating to it
    // Otherwise, set the initial value to the sustainability rating
    const newGreenPoints = currentGreenPoints ? currentGreenPoints + numberPoints : numberPoints;

    // Store the updated total green points in storage
    chrome.storage.local.set({ totalGreenPoints: newGreenPoints }, () => {
      // Log the updated green points
      console.log(`Green Points: ${newGreenPoints}`);
    });
  });
}


async function fetchEmissions(products) {
  console.log(JSON.stringify(products));
  const response = await fetch('http://co2emsission.pythonanywhere.com/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(products)
  });
  console.log(products);
  if (response.ok) {
    const data = await response.json();
    const outputData = data.predicted_emissions;
    //making an array of emissions
    const emissions = outputData.map(element => element.emission);
    return emissions;
  } else {
    throw new Error('Failed to fetch sustainability ratings');
  }
}

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'getSustainabilityRatings') {
    // Call API to fetch the sustainability ratings for the current products
    fetchEmissions(request.products)
     .then(emissions => {
      // Send the sustainability ratings back to the content script
     sendResponse({ ratings: emissions });
   })
     .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error(error);
});

  } else if (request.message === 'getGreenPoints') {
    // Retrieve the total green points from storage
    chrome.storage.local.get('totalGreenPoints', ({ totalGreenPoints }) => {
      // Send the total green points to the popup
      sendResponse({ points: totalGreenPoints || 0 });
    });
  } else if (request.message === 'updateGreenPoints') {
    const points = request.rating;
    calculateGreenPoints(points);
    sendResponse({});
  }

  // Return true to indicate that a response will be sent asynchronously
  return true;
});

console.log('Background script is running.');
