import { getAllListings } from "./modules/api";

document.getElementById("listings-container"); 

async function displayListings(listings) {
    try { 
        const allListingsContainer = document.getElementById("listings-container");
        allListingsContainer.innerHTML = "";

        for (let i = 0; i < listings.length; i++) {
            const listing = listings[i];

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

    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
      displayListings(listings);
  });