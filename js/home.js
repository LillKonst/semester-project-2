import { getAllListings } from "./modules/api.js";

export const MAX_TEXT_LENGTH = 20; // Maximum number of characters to display

// document.getElementById("listings-container"); 

// async function displayListings(listings) {
//     try { 
//         const listings = await getAllListings();
//         const allListingsContainer = document.getElementById("listings-container");
//         allListingsContainer.innerHTML = "";

//         listings.forEach(listing => {
//             //const listing = listings[i];

//             const listingCard = document.createElement("div");
//             listingCard.classList.add("col-4", "m-2")
//             listingCard.addEventListener("click", () => {
//                 window.location.href = `/html/listing/index.html?id=${listing.id}&title=${listing.title.rendered}`;
//             });
//             allListingsContainer.appendChild(listingCard);
//             listingCard.style.cursor = "pointer";
 
//             const cardInner = document.createElement("div");
//             cardInner.classList.add("card", "card-body", "mx-auto");
//             listingCard.appendChild(cardInner);

//             const image = document.createElement("img");
//             image.setAttribute("src", listing.media.url);
//             image.setAttribute("alt", listing.media.alt);
//             image.classList.add("card-img");
//             cardInner.appendChild(image); 

//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//       displayListings();
//   });


// document.getElementById("listings-container"); 


// document.addEventListener("DOMContentLoaded", async () => {
//     try {
//         await displayListings();
//     } catch (error) {
//         console.error(error);
//     }
// });


// async function displayListings() {
//     try { 
//         const listings = await getAllListings();
//         const allListingsContainer = document.getElementById("listings-container");
//         if (!allListingsContainer) {
//             throw new Error("Listings container not found in DOM");
//         }
//         allListingsContainer.innerHTML = "";

//         listings.forEach(listing => {
//             const listingCard = document.createElement("div");
//             listingCard.classList.add("col-4", "m-2")
//             listingCard.addEventListener("click", () => {
//                 window.location.href = `/html/listing/index.html?id=${listing.id}&title=${listing.title.rendered}`;
//             });
//             allListingsContainer.appendChild(listingCard);
//             listingCard.style.cursor = "pointer";
 
//             const cardInner = document.createElement("div");
//             cardInner.classList.add("card", "card-body", "mx-auto");
//             listingCard.appendChild(cardInner);

//             const image = document.createElement("img");
//             image.setAttribute("src", listing.media.url);
//             image.setAttribute("alt", listing.media.alt);
//             image.classList.add("card-img");
//             cardInner.appendChild(image); 
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }


console.log("Getting reference to listings container...");
document.getElementById("listings-container"); 

console.log("Adding event listener for DOMContentLoaded event...");
document.addEventListener("DOMContentLoaded", async () => {
    try {
        console.log("DOMContentLoaded event triggered. Calling displayListings()...");
        await displayListings();
    } catch (error) {
        console.error(error);
    }
});

async function displayListings() {
    try { 
        console.log("Fetching listings...");
        const listings = await getAllListings();
        console.log("Listings fetched successfully.");

        console.log("Getting reference to listings container...");
        const allListingsContainer = document.getElementById("listings-container");
        if (!allListingsContainer) {
            throw new Error("Listings container not found in DOM");
        }
        console.log("Listings container found in DOM.");

        console.log("Clearing listings container...");
        allListingsContainer.innerHTML = "";

        console.log("Populating listings...");
        listings.forEach(listing => {
            const listingCard = document.createElement("div");
            listingCard.classList.add("col-md-4", "col-sm-10", "p-2", "card-custom")
            listingCard.addEventListener("click", () => {
                window.location.href = `/html/listing/index.html?id=${listing.id}&title=${listing.title.rendered}`;
            });
            allListingsContainer.appendChild(listingCard);
            listingCard.style.cursor = "pointer";
            
            const cardInner = document.createElement("div");
            cardInner.classList.add("card", "card-body", "mx-auto", "card-custom");
            listingCard.appendChild(cardInner);

            const image = document.createElement("img");
            image.setAttribute("src", listing.media[0].url);
            image.setAttribute("alt", listing.media[0].alt);
            image.classList.add("card-img", "card-img-custom", "h-200");
            cardInner.appendChild(image); 
            
            const listingInfo = document.createElement("div");
            listingInfo.classList.add("d-flex", "justify-content-center", "border", "border-top-0", "rounded-bottom", "border-0.5", "border-custom", "p-2");
            cardInner.appendChild(listingInfo);

            const listingText = document.createElement("div");
            listingText.classList.add("col-9");
            listingInfo.appendChild(listingText);

            const listingTitle = document.createElement("h2");
            listingTitle.classList.add("card-title", "p-1", "fs-4");
            const truncatedTitle =
            listing.title.length > MAX_TEXT_LENGTH
              ? listing.title.substring(0, MAX_TEXT_LENGTH) + "..."
              : listing.title;
            listingTitle.innerHTML = truncatedTitle || "No Title";
            listingText.appendChild(listingTitle);

            const listingDescription = document.createElement("p");
            listingDescription.classList.add("card-text", "p-1", "mb-2");
            const truncatedText =
            listing.description.length > MAX_TEXT_LENGTH
            ? listing.description.substring(0, MAX_TEXT_LENGTH) + "..."
            : listing.description;
            listingDescription.innerHTML = truncatedText || "No Description";
            listingText.appendChild(listingDescription);

            const listingEndsAt = document.createElement("p");
            const timeDate = new Date(listing.endsAt);
            const formattedDate = timeDate.toLocaleDateString();
            const formattedTime = timeDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
            listingEndsAt.classList.add("p-1", "fs-7", "fw-bold");
            listingEndsAt.innerHTML = `Bidding ends:${formattedDate} ${formattedTime}`;
            listingText.appendChild(listingEndsAt);

            const listingBids = document.createElement("div");
            listingBids.classList.add("col-3", "d-flex", "justify-content-center", "align-items-center", "flex-column", "border-start", "border-0.5", "border-custom", "my-3")
            listingInfo.appendChild(listingBids);

            const listingBidsText = document.createElement("p");
            listingBidsText.classList.add("fs-7", "fw-bold");
            listingBidsText.innerHTML = `Bids:`;
            listingBids.appendChild(listingBidsText);

            const listingNumberOfBids = document.createElement("h3");
            listingNumberOfBids.classList.add("fs-1");
            listingNumberOfBids.innerHTML = listing._count.bids;
            listingBids.appendChild(listingNumberOfBids);


        });

        console.log("Listings populated successfully.");
    } catch (error) {
        console.error(error);
    }
}
