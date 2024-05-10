import { listingBid } from "../modules/api";

const bidBtn = document.getElementById("bidBtn");

// Create a click event listener for the submit button
bidBtn.addEventListener("click", function() {
    // Get the bid amount from the input field
    const bidAmount = bidInput.value;

    // Create a bid object with the bid amount
    const bidData = {
        amount: bidAmount
    };

    // Call the listingBid function from the api module
    listingBid(listingId, bidData)
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Failed to place bid');
            }
            // Handle the response data if needed
            return response.json(); // Assuming the response data is in JSON format
        })
        .then(data => {
            // Handle the response data if needed
            console.log('Bid placed successfully', data);
        })
        .catch(error => {
            // Handle any errors
            console.error('Error placing bid:', error.message);
        });
});