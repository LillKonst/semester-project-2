import { getListingsSearch } from "./modules/api.js";
import { displayListings } from "./home.js"; // Adjust the path if needed

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

// Function to display search results in the dropdown
function displaySearchResults(listings) {
    const searchResultsContainer = document.getElementById("searchResults");
    searchResultsContainer.innerHTML = ""; // Clear previous results
  
    if (!Array.isArray(listings) || listings.length === 0) {
      searchResultsContainer.style.display = "none";
      return;
    }
  
    if (listings.error) {
      searchResultsContainer.style.display = "none";
      showError(listings.error); // Display error message
      return;
    }
  
    listings.forEach(listing => {
      const resultItem = document.createElement("a");
      resultItem.classList.add("dropdown-item");
      resultItem.textContent = listing.title; // Display the title, adjust as needed
      resultItem.href = `../listings/index.html?id=${listing.id}&title=${listing.title}`; // Set the href attribute
      searchResultsContainer.appendChild(resultItem);
    });
  
    searchResultsContainer.style.display = "block"; // Show the results container
  }
  

// Event listener for search input (live search)
document.getElementById("searchInput").addEventListener("input", async (event) => {
  const searchTerm = event.target.value.trim();
  if (searchTerm) {
    await handleLiveSearch(searchTerm);
  } else {
    document.getElementById("searchResults").style.display = "none"; // Hide results if search is cleared
  }
});

// Event listener for search button click (optional)
document.getElementById("search-button").addEventListener("click", async () => {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    await handleLiveSearch(searchTerm);
  }
});

