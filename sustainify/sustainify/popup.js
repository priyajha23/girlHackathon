

// Update the green points when the popup is opened
document.addEventListener('DOMContentLoaded', () => {
  // Function to update the green points in the popup
  function updateGreenPoints(points) {
    const greenPointsContainer = document.getElementById('greenPointsContainer');
    greenPointsContainer.textContent += ` ${points || 0}`;
  }

  // Fetch the green points from the background script
  chrome.runtime.sendMessage({ message: 'getGreenPoints' }, (response) => {
    if (chrome.runtime.lastError) {
      // Handle the error from the background script
      console.error(chrome.runtime.lastError);
      return;
    }

    if (response && response.points !== undefined) {
      const { points } = response;
      updateGreenPoints(points);
    } else {
      // Handle the error or set a default value for green points
      updateGreenPoints(0);
    }
  });
});

