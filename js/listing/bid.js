import { listingBid, getListingSpecific } from "../modules/api.js";

document.addEventListener("elementsReady", async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('id');

    const bidBtn = document.getElementById("bidBtn");
    const bidInput = document.getElementById("bidInput");

    bidBtn.addEventListener("click", async () => {
      try {
        const bidAmount = parseFloat(bidInput.value);

        const listingData = await getListingSpecific(listingId);

        const currentBidAmount = listingData._count.bids;

        if (bidAmount <= currentBidAmount + 1) {
          throw new Error('Bid amount must be at least 1 credit bigger than the current bid');
        }

        const bidData = { amount: bidAmount };

        const response = await listingBid(listingId, bidData);

        if (!response.ok) {
          throw new Error('Failed to place bid');
        }

        const data = await response.json();
        console.log('Bid placed successfully', data);
      } catch (error) {
        console.error('Error placing bid:', error);
      }
    });
  } catch (error) {
    console.error('Error initializing bid functionality:', error.message);
  }
});
