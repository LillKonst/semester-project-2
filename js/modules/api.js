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
export { filterListings };

//export { API_URL }; 

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
async function updateAvatar(username, newProfileImgUrl) {
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
            url: newProfileImgUrl,
            alt: "Profile Image",
          },
        }),
      }
      );
      
  if (!response.ok) {
    throw new Error("Failed to update profile image");
  }
      
   // Profile image updated successfully
  console.log("Profile image updated successfully");
  } catch (error) {
    console.error("Error updating profile image:", error.message);
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
    `${API_URL}/auction/listings/search?query=${encodeURIComponent(searchTerm)}`,
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
  return result.data;
}

// Filters
async function filterListings(tag = "", active = false, popular = false, newest = false, lastChance = false) {
  let apiUrl = `${API_URL}/auction/listings`;

  // Construct filter parameters
  let filterParams = [];
  if (tag) {
    filterParams.push(`_tag=${tag}`);
  }
  if (active) {
    filterParams.push("_active=true");
  }
  
  // Add filter parameters to the URL
  if (filterParams.length > 0) {
    apiUrl += `?${filterParams.join("&")}`;
  }

  // Construct sorting parameters
  let order = "desc"; // Default order
  if (popular) {
    apiUrl += `&order=bids_count.desc`;
  } else if (newest) {
    apiUrl += `&order=created.desc`;
  } else if (lastChance) {
    apiUrl += `&order=endsAt.asc`;  
  }

  // Add sorting parameters to the URL
  apiUrl += `&per_page=${listingsPerPage}&order=${order}`;

  const response = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": APIKey,
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch listings");
  }

  const result = await response.json();
  return result.data;
}
