import { getAllListings } from "./modules/api.js";

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
            listingCard.classList.add("col-4", "m-2")
            listingCard.addEventListener("click", () => {
                window.location.href = `/html/listing/index.html?id=${listing.id}&title=${listing.title.rendered}`;
            });
            allListingsContainer.appendChild(listingCard);
            listingCard.style.cursor = "pointer";
 
            const cardInner = document.createElement("div");
            cardInner.classList.add("card", "card-body", "mx-auto");
            listingCard.appendChild(cardInner);

            const image = document.createElement("img");
            image.setAttribute("src", listing.media.url);
            image.setAttribute("alt", listing.media.alt);
            image.classList.add("card-img");
            cardInner.appendChild(image); 
        });

        console.log("Listings populated successfully.");
    } catch (error) {
        console.error(error);
    }
}
