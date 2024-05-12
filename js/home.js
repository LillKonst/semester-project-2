import { getAllListings } from "./modules/api.js";

export { displayListings };

export const MAX_TEXT_LENGTH = 20; // Maximum number of characters to display

document.getElementById("listings-container"); 

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await displayListings();
    } catch (error) {
        console.error(error);
    }
});

async function displayListings() {
    try { 
        const listings = await getAllListings();
  
        const allListingsContainer = document.getElementById("listings-container");
        if (!allListingsContainer) {
            throw new Error("Listings container not found in DOM");
        }
   

        allListingsContainer.innerHTML = "";
        allListingsContainer.classList.add("d-flex", "justify-content-center", "align-items-center", "text-center");

        listings.forEach(listing => {
            const listingCard = document.createElement("div");
            listingCard.classList.add("col-md-4", "col-sm-10", "p-2", "card-custom")
            listingCard.addEventListener("click", () => {
                window.location.href = `../listings/index.html?id=${listing.id}&title=${listing.title}`;
            });
            allListingsContainer.appendChild(listingCard);
            listingCard.style.cursor = "pointer";
            
            const cardInner = document.createElement("div");
            cardInner.classList.add("card", "card-body", "mx-auto", "card-custom");
            listingCard.appendChild(cardInner);

            if (listing.media && listing.media.length > 0) {
                const image = document.createElement("img");
                image.setAttribute("src", listing.media[0].url);
                image.setAttribute("alt", listing.media[0].alt);
                image.classList.add("card-img", "card-img-custom", "h-200");
                cardInner.appendChild(image); 
            } else {
                const defaultImageUrl = "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                const defaultAltText = "Default Avatar";
            
                const image = document.createElement("img");
                image.setAttribute("src", defaultImageUrl);
                image.setAttribute("alt", defaultAltText);
                image.classList.add("card-img", "card-img-custom", "h-200");
                cardInner.appendChild(image); 
            }
            
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

            // const listingEndsAt = document.createElement("p");
            // const timeDate = new Date(listing.endsAt);
            // const formattedDate = timeDate.toLocaleDateString();
            // const formattedTime = timeDate.toLocaleTimeString([], {
            //     hour: "2-digit",
            //     minute: "2-digit",
            // });
            // listingEndsAt.classList.add("p-1", "fs-7", "fw-bold");
            // listingEndsAt.innerHTML = `Bidding ends:${formattedDate} ${formattedTime}`;
            // listingText.appendChild(listingEndsAt);

               // Assuming the 'endsAt' field is available in the 'listing' object
const endsAt = new Date(listing.endsAt);

// Create a paragraph element for the date
const listingDate = document.createElement("p");
listingDate.classList.add("fs-7", "fw-bold");
listingDate.textContent = `Bidding ends: ${endsAt.toLocaleDateString()}`;
listingText.appendChild(listingDate);

// Create a paragraph element for the time
const listingTime = document.createElement("p");
listingTime.classList.add("fs-7", "fw-bold");
listingTime.textContent = `At: ${endsAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
})}`;
listingText.appendChild(listingTime);

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

    } catch (error) {
        console.error(error);
    }
}

let listingUl; 

document.addEventListener("DOMContentLoaded", function() {
    listingUl = document.getElementById("listing-ul");
});

window.addEventListener("resize", checkScreenSize);

function checkScreenSize() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 620) {
        if (listingUl) {
            listingUl.classList.remove("ms-auto");
        }
    }
}

