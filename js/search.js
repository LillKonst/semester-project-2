import { getListingsSearch } from "./modules/api.js";
import { MAX_TEXT_LENGTH } from "../js/home.js";

// Function to handle live search and display results
async function handleLiveSearch(searchTerm) {
    try {
      console.log("Searching for:", searchTerm);
      const listings = await getListingsSearch(searchTerm);
      console.log("Search results:", listings);
      displaySearchResults(listings);
    } catch (error) {
      console.error("Error during search:", error);
    }
}

  
function displaySearchResults(data) {
    console.log("Displaying search results:", data); // Add this line
    const searchResultsContainer = document.getElementById("searchResults");
    searchResultsContainer.innerHTML = ""; // Clear previous results
  
    if (!data) {
      searchResultsContainer.style.display = "none"; // Hide results container if no data
      return;
    }
  
    if (data.error) {
      searchResultsContainer.innerHTML = `<div class="dropdown-item">${data.error}</div>`; // Display error message
      searchResultsContainer.style.display = "block"; // Show the results container with error message
      return;
    }
  
    const listings = data.data; // Extract the listings from the data object
  
    if (!Array.isArray(listings) || listings.length === 0) {
      searchResultsContainer.style.display = "none"; // Hide results container if no search results
      return;
    }
  
    listings.forEach(listing => {
      const resultItem = document.createElement("a");
      resultItem.classList.add("dropdown-item", "d-flex", "m-2");
      resultItem.href = `../listings/index.html?id=${listing.id}&title=${listing.title}`; // Set the href attribute
      searchResultsContainer.appendChild(resultItem);
    
    
      if (listing.media && listing.media.length > 0) {
        const image = document.createElement("img");
        image.setAttribute("src", listing.media[0].url);
        image.setAttribute("alt", listing.media[0].alt);
        image.classList.add("search-thumbnail", "rounded");
        resultItem.appendChild(image);
      } else {
        const defaultImageUrl = "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        const defaultAltText = "Default Avatar";

        const image = document.createElement("img");
        image.setAttribute("src", defaultImageUrl);
        image.setAttribute("alt", defaultAltText);
        image.classList.add("search-thumbnail", "rounded");
        resultItem.appendChild(image);
      }

      const resultTitle = document.createElement("h2");
      resultTitle.classList.add("card-title", "px-2", "fs-4");
      const truncatedTitle =
        listing.title.length > MAX_TEXT_LENGTH
          ? listing.title.substring(0, MAX_TEXT_LENGTH) + "..."
          : listing.title;
      resultTitle.innerHTML = truncatedTitle || "No Title";
      resultItem.appendChild(resultTitle);


    });
  
    searchResultsContainer.style.display = "block";
  }
  

  document.getElementById("searchInput").addEventListener("input", async (event) => {
    const searchTerm = event.target.value.trim();
    if (searchTerm) {
      await handleLiveSearch(searchTerm);
    } else {
      document.getElementById("searchResults").style.display = "none"; // Hide results if search is cleared
    }
  });
  
  // Event listener for search input (Keyup)
  document.getElementById("searchInput").addEventListener("keyup", async (event) => {
    const searchTerm = event.target.value.trim();
    if (searchTerm) {
      await handleLiveSearch(searchTerm);
    } else {
      clearSearchResults();
    }
  });
  