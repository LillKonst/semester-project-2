import { getListingSpecific } from "../modules/api.js";

function getListingIdFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

// Example usage:
const listingId = getListingIdFromQuery();
console.log("Listing ID:", listingId);





// function getListingIdFromQuery() {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get("id");
// }

// async function loadListingData() {
//     const listingId = getListingIdFromQuery();
//     const errorContainer = document.querySelector(".postData-error");

//     if (!listingId) {
//         errorContainer.textContent = "We are unable to find the requested listing. Please check the URL or go back to the homepage to continue browsing.";
//         return;
//     }

//     try {
//         const listing = await getListingSpecific(listingId);
//         displayListing(listing);
//     } catch (error) {
//         console.error("Error fetching listing details:", error);
//         errorContainer.textContent = "There seems to be an issue loading the listing details.";
//     }
// }

// function displayListing(listing) {
//     const titleElement = document.getElementById("title");
//     const authorElement = document.getElementById("author");

//     titleElement.textContent = listing.title || "No Title";
//     authorElement.textContent = listing.author && listing.author.name ? listing.author.name : "Unknown";

//     authorElement.style.cursor = "pointer";
//     authorElement.addEventListener("click", function () {
//         // Redirect user to the profile page
//         const userProfileUrl = `/html/profile/index.html?username=${listing.author.name}`;
//         window.location.href = userProfileUrl;
//     });
// }

// // Load listing data when the DOM is loaded
// document.addEventListener("DOMContentLoaded", loadListingData);
