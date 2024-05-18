
import { listingBid, getListingSpecific } from "../modules/api.js";

document.addEventListener("elementsReady", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('id');

    const bidBtn = document.getElementById("bidBtn");
    const bidInput = document.getElementById("bidInput");
    const bidError = document.getElementById("bidError");

    bidBtn.addEventListener("click", handleBid);

    async function handleBid() {
        try {
            const bidAmount = getBidAmount();
            console.log('Bid amount:', bidAmount);

            const currentBidAmount = await getCurrentBidAmount();
            console.log('Current bid amount:', currentBidAmount);

            console.log('Validating bid amount...');
            validateBidAmount(bidAmount, currentBidAmount);

            await placeBid(bidAmount);
            console.log('Bid placed successfully');

            console.log('Reloading page...');
            window.location.reload();
        } catch (error) {
            handleError(error);
        }
    }

    function getBidAmount() {
        const amount = parseFloat(bidInput.value);
        if (isNaN(amount)) {
            throw new Error('Bid amount must be a valid number');
        }
        return amount;
    }

    async function getCurrentBidAmount() {
        const listingData = await getListingSpecific(listingId);
        return listingData._count.bids;
    }

    function validateBidAmount(bidAmount, currentBidAmount) {
        if (bidAmount <= currentBidAmount + 1) {
            throw new Error('Bid amount must be at least 1 credit bigger than the current bid');
        }
    }

    async function placeBid(bidAmount) {
        try {
            const bidData = { amount: bidAmount };
            const response = await listingBid(listingId, bidData);
            console.log('Bid response:', response);
        } catch(error) {
            console.log('An error occured:', error);
        }
    }

    function handleError(error) {
        console.error('Error placing bid:', error);
        bidError.textContent = 'Failed to place bid, please try again';
        bidError.style.color = 'red';
    }
});
