import { getListingSpecific } from "../modules/api.js";
import { displayUserProfile } from "../profile.js";

const username = localStorage.getItem(`userName`);

function getListingIdFromQuery() {
  return new URLSearchParams(window.location.search).get("id");
}

async function listingData() {
  const listingId = getListingIdFromQuery();
  const errorContainer = document.querySelector(".postData-error");

  if (!listingId) {
    errorContainer.textContent = "We are unable to find the requested post. Please check the URL or go back to the homepage to continue browsing.";
    return;
  }

  try {
    const listingData = await getListingSpecific(listingId);
    displayListing(listingData);
  } catch (error) {
    console.error("Error fetching post details:", error);
    errorContainer.textContent = "There seems to be an issue loading the post details.";
  }
}

document.addEventListener("DOMContentLoaded", listingData);

async function displayListing(listing) {
  const titleElement = document.getElementById("title");
  titleElement.textContent = listing.title || "No Title";


  const listingDisplay = document.getElementById("listing-container");
  listingDisplay.classList.add("d-flex", "flex-column");

  const topContainer = document.createElement("div"); 
  topContainer.classList.add("container", "d-flex", "text-center", "justify-content-center", "align-items-center")
  listingDisplay.appendChild(topContainer);

    const listingTitle = document.createElement("h2");
    listingTitle.classList.add("card-title", "p-1", "fs-4");
    listingTitle.innerHTML = listing.title || "No Title";
    topContainer.appendChild(listingTitle);

    const imageContainer = document.createElement("div");
    listingDisplay.appendChild(imageContainer);


    if (listing.media && listing.media.length > 0) {
        // If there's only one image, display it without carousel
        if (listing.media.length === 1) {
          const image = document.createElement("img");
          image.setAttribute("src", listing.media[0].url);
          image.setAttribute("alt", listing.media[0].alt);
          image.classList.add("card-img", "card-img-custom", "h-300");
          imageContainer.appendChild(image);
        } else {
          // If there are multiple images, create a carousel
          const imageCarousel = document.createElement("div");
          imageCarousel.classList.add("carousel", "slide");
          imageCarousel.setAttribute("id", "image-carousel");
          imageCarousel.setAttribute("data-bs-ride", "carousel");
  
          const carouselIndicators = document.createElement("div");
          carouselIndicators.classList.add("carousel-indicators");
  
          const carouselInner = document.createElement("div");
          carouselInner.classList.add("carousel-inner");
  
          listing.media.forEach((media, index) => {
            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
            if (index === 0) {
              carouselItem.classList.add("active");
            }
  
            const image = document.createElement("img");
            image.setAttribute("src", media.url);
            image.setAttribute("alt", media.alt);
            image.classList.add("d-block", "w-100");
  
            carouselItem.appendChild(image);
            carouselInner.appendChild(carouselItem);
  
            // Create carousel indicators
            const indicator = document.createElement("button");
            indicator.setAttribute("type", "button");
            indicator.setAttribute("data-bs-target", "#image-carousel");
            indicator.setAttribute("data-bs-slide-to", index.toString());
            if (index === 0) {
              indicator.classList.add("active");
            }
            carouselIndicators.appendChild(indicator);
          });
  
          const prevButton = document.createElement("button");
          prevButton.classList.add("carousel-control-prev");
          prevButton.setAttribute("type", "button");
          prevButton.setAttribute("data-bs-target", "#image-carousel");
          prevButton.setAttribute("data-bs-slide", "prev");
          prevButton.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>`;
  
          const nextButton = document.createElement("button");
          nextButton.classList.add("carousel-control-next");
          nextButton.setAttribute("type", "button");
          nextButton.setAttribute("data-bs-target", "#image-carousel");
          nextButton.setAttribute("data-bs-slide", "next");
          nextButton.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>`;
  
          imageCarousel.appendChild(carouselIndicators);
          imageCarousel.appendChild(carouselInner);
          imageCarousel.appendChild(prevButton);
          imageCarousel.appendChild(nextButton);
  
          imageContainer.appendChild(imageCarousel);
        }
      } else {
        // If no images, display default image
        const defaultImageUrl = "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        const defaultAltText = "Default Image";
        const image = document.createElement("img");
        image.setAttribute("src", defaultImageUrl);
        image.setAttribute("alt", defaultAltText);
        image.classList.add("card-img", "card-img-custom", "h-200");
        imageContainer.appendChild(image);
      }

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("row");
    listingDisplay.appendChild(infoContainer);

    const listingDetails = document.createElement("div");
    listingDetails.classList.add("col-8");
    infoContainer.appendChild(listingDetails);

      const sellerContainer = document.createElement("div");
      sellerContainer.classList.add("col-4");
      listingDetails.appendChild(sellerContainer);

      const seller = document.createElement("p");
      seller.innerHTML = `Seller:`;
      sellerContainer.appendChild(seller);

      const userContainer = document.createElement("div");
      userContainer.classList.add("d-flex", "flex-row");
      sellerContainer.appendChild(userContainer);

    //   const sellerImage = document.createElement("img");
    //   sellerImage.classList.add("w-14", "h-14", "rounded-full", "object-cover");
    //   if (listing.seller.avatar && listing.seller.avatar.url) {
    //       sellerImage.src = listing.seller.avatar.url;
    //       sellerImage.alt = listing.seller.avatar.alt;
    //   } else {
    //     sellerImage.src = "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    //     sellerImage.alt = "Default Avatar";
    //   }
    //   userContainer.appendChild(sellerImage);


      const listingSeller = document.createElement("h4");
      listingSeller.innerHTML = listing.seller.name;
      sellerContainer.appendChild(listingSeller);

    const horizontalLine = document.createElement("hr");
    listingDetails.appendChild(horizontalLine);

    
    
    const listingDescription = document.createElement("p");
    listingDescription.classList.add("card-text", "p-1", "mb-2");
    listingDescription.innerHTML = listing.description || "No Description";
    listingDetails.appendChild(listingDescription);

    const listingEndsAt = document.createElement("p");
    const timeDate = new Date(listing.endsAt);
    const formattedDate = timeDate.toLocaleDateString();
    const formattedTime = timeDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        });
    listingEndsAt.classList.add("p-1", "fs-7", "fw-bold");
    listingEndsAt.innerHTML = `Ends at: ${formattedDate} ${formattedTime}`;
    listingDetails.appendChild(listingEndsAt);

    const bidBtn = document.createElement("button");
    bidBtn.classList.add("custom-btn");
    bidBtn.innerHTML = `PLACE A BID`;
    listingDetails.appendChild(bidBtn);

    const bidContainer = document.createElement("div");
    bidContainer.classList.add("container", "col-4");
    infoContainer.appendChild(bidContainer);

    const bidBox = document.createElement("div");
    bidBox.classList.add("custom-btn", "d-flex", "flex-column", "justify-content-center", "align-items-center");
    bidContainer.appendChild(bidBox);

    const listingBidsText = document.createElement("p");
    listingBidsText.classList.add("fs-7", "fw-bold");
    listingBidsText.innerHTML = `Current Bids:`;
    bidBox.appendChild(listingBidsText);

    const listingNumberOfBids = document.createElement("h3");
    listingNumberOfBids.classList.add("fs-1");
    listingNumberOfBids.innerHTML = listing._count.bids;
    bidBox.appendChild(listingNumberOfBids);

    const bidHistory = document.createElement("p");
    bidHistory.innerHTML = `Bid history (${listing._count.bids})`;
    bidContainer.appendChild(bidHistory);


    //   const listingBiddingInfo = document.createElement("div");
    //   listingBiddingInfo.classList.add("col-4");
    //   listingDetails.appendChild(listingBiddingInfo);


    //   const listingDescription = document.createElement("p");
    //   listingDescription.classList.add("card-text", "p-1", "mb-2");
    //   listingDescription.innerHTML = listing.description || "No Description";
    //   listingInfo.appendChild(listingDescription);
  
    //   const listingEndsAt = document.createElement("p");
    //   const timeDate = new Date(listing.endsAt);
    //   const formattedDate = timeDate.toLocaleDateString();
    //   const formattedTime = timeDate.toLocaleTimeString([], {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //         });
    //   listingEndsAt.classList.add("p-1", "fs-7", "fw-bold");
    //   listingEndsAt.innerHTML = `Bidding ends:${formattedDate} ${formattedTime}`;
    //   listingInfo.appendChild(listingEndsAt);

    //   const listingBidsText = document.createElement("p");
    //   listingBidsText.classList.add("fs-7", "fw-bold");
    //   listingBidsText.innerHTML = `Bids:`;
    //   listingBiddingInfo.appendChild(listingBidsText);

    //   const listingNumberOfBids = document.createElement("h3");
    //   listingNumberOfBids.classList.add("fs-1");
    //   listingNumberOfBids.innerHTML = listing._count.bids;
    //   listingBiddingInfo.appendChild(listingNumberOfBids);

}