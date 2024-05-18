import { storeToken, getToken, APIKey } from "../modules/auth.js"
import { listingsPerPage } from "../home.js";

export { getAllListings };
export { fetchProfile };
export { fetchListingsByUser };
export { createListing };
export { updateAvatar };
export { getListingSpecific };
export { listingBid };
export { fetchListingsByBids };
export { getListingsSearch };
export { API_URL }; 

const API_URL = "https://v2.api.noroff.dev";


// Get all listings
async function getAllListings(page = 1, newestFirst = true) {
  const defaultOrder = newestFirst ? "desc" : "asc";
  const response = await fetch(
    `${API_URL}/auction/listings?per_page=${listingsPerPage}&page=${page}&order=${defaultOrder}`,
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
             Authorization: `Bearer ${getToken()}`,
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

// Update avatar
async function updateAvatar(username, newImageUrl) {
  try {
    const response = await fetch(
      `${API_URL}/auction/profiles/${username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          "X-Noroff-API-Key": APIKey,
        },
        body: JSON.stringify({
          avatar: {
            url: newImageUrl,
            alt: "Profile Image",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response text:", errorText);
      throw new Error(`Failed to update profile image: ${response.statusText}`);
    }

    // Profile image updated successfully
    return true;
  } catch (error) {
    console.error("Error updating profile image:", error.message);
    return false;
  }
}


// Get listing specific
async function getListingSpecific(listingId) {
  const response = await fetch(
    `${API_URL}/auction/listings/${listingId}?_seller=true&_bids=true`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        "X-Noroff-API-Key": APIKey,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Could not load post");
  }
  const result = await response.json();
  return result.data;
}

// Make a bid
async function listingBid(listingId, bidData) {
  const response = await fetch(
      `${API_URL}/auction/listings/${listingId}/bids`,
      {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
              "X-Noroff-API-Key": APIKey,
          },
          body: JSON.stringify(bidData),
      }
  );

  if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to register bid:', errorData);
      throw new Error(`Failed to register your bid: ${errorData.message}`);
  }

  return await response.json();
}


// Fetch Listings by bids

async function fetchListingsByBids (username) {
   

  const response = await fetch(
    `${API_URL}/auction/profiles/${username}/bids`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "X-Noroff-API-Key": APIKey,
      },
    }
  );


  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Could not post comment: ${errorData.message}`);
  }

  return await response.json();

}

// Search listings
async function getListingsSearch(searchTerm) {
  const response = await fetch(
    `${API_URL}/auction/listings/search?q=${encodeURIComponent(searchTerm)}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        "X-Noroff-API-Key": APIKey,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Could not search listings");
  }
  const result = await response.json();
  return result;
}