import { storeToken, getToken, APIKey } from "../modules/auth.js"

export { getAllListings };
export { fetchProfile };
export { fetchListingsByUser };
export { createListing };

//export { API_URL }; 

export const API_URL = "https://v2.api.noroff.dev";


// Get all listings
async function getAllListings(newestFirst = true) {
    const defaultOrder = newestFirst ? "desc" : "asc";
    const response = await fetch(
      `${API_URL}/auction/listings`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          "X-Noroff-API-Key": APIKey,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Could not load listings");
    }
    const result = await response.json();
    return result.data;
  }

  // Fetch profile
async function fetchProfile(username) {
    const response = await fetch(
      `${API_URL}/auction/profiles/${username}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          "X-Noroff-API-Key": APIKey,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Could not fetch profile information");
    }
    const result = await response.json();
    return result.data;
  }
  
  // Fetch posts by user name
  async function fetchListingsByUser(username) {
    const response = await fetch(
      `${API_URL}/auction/profiles/${username}/listings`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          "X-Noroff-API-Key": APIKey,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const result = await response.json();
    return result.data;
  }


  // Create new listing
  async function createListing(listingData) {
    console.log(JSON.stringify(listingData));
    const response = await fetch(`${API_URL}/auction/listings`,  {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${getToken}`,
             "X-Noroff-API-Key": APIKey,
          },
          body: JSON.stringify(listingData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        console.error('Request Failed:', JSON.stringify(errorData)); 
        throw new Error(`Failed to create post: ${errorData.message}`);
    }
      const result = await response.json();
      return result.data;
    }