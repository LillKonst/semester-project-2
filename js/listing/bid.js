import { listingBid, getListingSpecific } from "../modules/api.js";

document.addEventListener("elementsReady", async () => {
  try {
    // Get the listingId from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('id');
    console.log("listing id: ", listingId);
    const bidBtn = document.getElementById("bidBtn");

    console.log("Button: ", bidBtn);

    // Get the bid input field
    const bidInput = document.getElementById("bidInput");
    console.log("Bid input: ", bidInput);

    // Create a click event listener for the submit button
    bidBtn.addEventListener("click", async () => {
      try {
        console.log("Button clicked");
        // Get the bid amount from the input field
        const bidAmount = parseFloat(bidInput.value);
        console.log("Bid amount:", bidAmount);

        // Call the getListingSpecific function to fetch the listing data
        const listingData = await getListingSpecific(listingId);
        console.log("Listing data:", listingData);

        // Fetch the current bid amount for the listing
        const currentBidAmount = listingData._count.bids;
        console.log("Current bid amount:", currentBidAmount);

        // Check if the new bid amount is at least 1 credit bigger than the current bid
        if (bidAmount <= currentBidAmount + 1) {
          throw new Error('Bid amount must be at least 1 credit bigger than the current bid');
        }

        // Update bidData with the bid amount
        const bidData = { amount: bidAmount };

        // Call the listingBid function from the api module
        await listingBid(listingId, bidData)
          .then(response => {
            console.log("Response received:", response);

            // Log the response status for debugging
            console.log("Response status:", response.status);

            // Check if the request was successful
            if (!response.ok) {
              throw new Error('Failed to place bid');
            }

            // Return the response data
            return response.json();
          })
          .then(data => {
            // Handle the response data if needed
            console.log('Bid placed successfully', data);
          })
          .catch(error => {
            // Handle any errors
            console.error('Error placing bid:', error);
            throw error; // Rethrow the error to be caught by the outer catch block
          });
      } catch (error) {
        // Handle any errors in the inner try block
        console.error('Error placing bid:', error);
      }
    });
  } catch (error) {
    // Handle any errors in the outer try block
    console.error('Error initializing bid functionality:', error.message);
  }
});
