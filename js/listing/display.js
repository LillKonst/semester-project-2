import { getListingSpecific } from "../modules/api.js";

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
    listingTitle.classList.add("card-title", "p-1", "fs-4", "fw-bold", "m-2");
    listingTitle.innerHTML = listing.title || "No Title";
    topContainer.appendChild(listingTitle);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("mx-3");
    listingDisplay.appendChild(imageContainer);


    if (listing.media && listing.media.length > 0) {
        // If there's only one image, display it without carousel
        if (listing.media.length === 1) {
          const image = document.createElement("img");
          image.setAttribute("src", listing.media[0].url);
          image.setAttribute("alt", listing.media[0].alt);
          image.classList.add("rounded", "w-100", "h-350px", "object-cover", "listing-img");
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

      const sellerContainer = document.createElement("div");
      sellerContainer.classList.add("col-8", "pt-3", "mx-4");
      listingDisplay.appendChild(sellerContainer);

    //   const seller = document.createElement("p");
    //   seller.classList.add("fs-7", "fw-bold");
    //   seller.innerHTML = `Seller:`;
    //   sellerContainer.appendChild(seller);

      const userContainer = document.createElement("div");
      userContainer.classList.add("row");
      sellerContainer.appendChild(userContainer);

      const sellerImage = document.createElement("img");
      sellerImage.classList.add("custom-profile-img", "col-4");
      if (listing.seller.avatar && listing.seller.avatar.url) {
          sellerImage.src = listing.seller.avatar.url;
          sellerImage.alt = listing.seller.avatar.alt;
      } else {
        sellerImage.src = "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        sellerImage.alt = "Default Avatar";
      }
      userContainer.appendChild(sellerImage);


      const listingSeller = document.createElement("h4");
      listingSeller.classList.add("col-8", "mt-3", "p-0");
      listingSeller.innerHTML = listing.seller.name;
      userContainer.appendChild(listingSeller);

      const infoContainer = document.createElement("div");
      infoContainer.classList.add("row", "mx-3");
      listingDisplay.appendChild(infoContainer);
  
      const listingDetails = document.createElement("div");
      listingDetails.classList.add("col-8");
      infoContainer.appendChild(listingDetails);

    const horizontalLine = document.createElement("hr");
    horizontalLine.classList.add("custom-line");
    listingDetails.appendChild(horizontalLine);

    
    
    const listingDescription = document.createElement("p");
    listingDescription.classList.add("card-text", "p-3");
    listingDescription.innerHTML = listing.description || "No Description";
    listingDetails.appendChild(listingDescription);

    const endsAt = new Date(listing.endsAt);

    const listingDate = document.createElement("p");
    listingDate.classList.add("px-3", "fs-7", "fw-bold");
    listingDate.textContent = `Bidding ends: ${endsAt.toLocaleDateString()}`;
    listingDetails.appendChild(listingDate);

    const listingTime = document.createElement("p");
    listingTime.classList.add("px-3", "fs-7", "fw-bold");
    listingTime.textContent = `At: ${endsAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    })}`;
    listingDetails.appendChild(listingTime);


    const bidContainer = document.createElement("div");
    bidContainer.classList.add("container", "col-4", "my-2", "text-center");
    infoContainer.appendChild(bidContainer);

    const bidBox = document.createElement("div");
    bidBox.classList.add("custom-btn", "d-flex", "flex-column", "justify-content-center", "align-items-center", "rounded", "mx-3", "pt-1");
    bidContainer.appendChild(bidBox);

    const listingBidsText = document.createElement("p");
    listingBidsText.classList.add("fs-7", "fw-bold");
    listingBidsText.innerHTML = `Current Bid:`;
    bidBox.appendChild(listingBidsText);

    const currentBid = document.createElement("h3");
    currentBid.classList.add("fs-1");
    if (listing.bids.length > 0) {
    const lastIndex = listing.bids.length - 1;
    const amount = listing.bids[lastIndex].amount;
    currentBid.innerHTML = `${amount}`;
    } else {
        currentBid.innerHTML = "0";
    }
    bidBox.appendChild(currentBid);

    const bidHistory = document.createElement("p");
    bidHistory.classList.add("text-center", "nav-btn", "p-1");
    bidHistory.innerHTML = `Bid history (${listing._count.bids})`;
    bidContainer.appendChild(bidHistory);

    bidHistory.addEventListener("click", function() {
        const modal = new bootstrap.Modal(document.getElementById("bid-history-modal"));
        modal.show();
    });

    const modalBody = document.getElementById("bid-history");


    bidHistory.addEventListener("click", function() {
    modalBody.innerHTML = "";

    listing.bids.forEach(bid => {
        const listItem = document.createElement("li");
        listItem.style.listStyleType = "none";
        listItem.classList.add("my-2");
        listItem.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${bid.bidder.avatar.url}" alt="${bid.bidder.avatar.alt}" class="rounded-circle me-2" style="width: 40px; height: 40px;">
                <div class="row" style="width: 100%;">
                    <h6 class="m-0 col-8">${bid.bidder.name}</h6>
                    <p class="m-0 col-4">Amount: $${bid.amount}</p>
                </div>
            </div>
        `;

        modalBody.appendChild(listItem);
    });
});


    // const bidBtn = document.createElement("button");
    // bidBtn.classList.add("btn","custom-btn", "m-3");
    // bidBtn.innerHTML = `PLACE A BID`;
    // listingDetails.appendChild(bidBtn);


// Create a container for input and submit button
const inputContainer = document.createElement("div");
inputContainer.classList.add("d-flex", "align-items-center");

// Create input element
const bidInput = document.createElement("input");
bidInput.classList.add("form-control", "m-3", "border-custom", "inputs");
bidInput.setAttribute("type", "number");
bidInput.setAttribute("placeholder", "Enter your bid amount");
bidInput.setAttribute("id", "bidInput");
inputContainer.appendChild(bidInput);

// Create submit button
const submitBtn = document.createElement("button");
submitBtn.classList.add("btn", "custom-btn", "m-3");
submitBtn.setAttribute("id", "bidBtn");
submitBtn.innerHTML = "BID";
inputContainer.appendChild(submitBtn);

// Append the container to the listingDetails element
listingDisplay.appendChild(inputContainer);

// Add a resize event listener to handle changes in window size
window.addEventListener('resize', function() {
    // Get the width of the window
    const screenWidth = window.innerWidth;
  
    // Check if the screen width is less than 600px
    if (screenWidth < 600) {
      // Change the display property of infoContainer to flex-column
      infoContainer.classList.add('flex-column');
      listingDetails.classList.add("col-12");
      bidContainer.classList.add('col-12');
    } else {
      // Change the layout for larger screens
      infoContainer.classList.remove('flex-column');
      listingDetails.classList.remove("col-12");
      bidContainer.classList.remove('col-12');
    }

  });

  const elementsReadyEvent = new Event("elementsReady");
    document.dispatchEvent(elementsReadyEvent);
}