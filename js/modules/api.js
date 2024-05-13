import { storeToken, getToken, APIKey } from "../modules/auth.js"

export { getAllListings };
export { fetchProfile };
export { fetchListingsByUser };
export { createListing };
export { updateAvatar };
export { getListingSpecific };
export { listingBid };
export { fetchListingsByBids };

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

// Get post specific
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
async function listingBid(listingId) {
 

  const response = await fetch(
    `${API_URL}/auction/listings/${listingId}/_bids`,
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
    throw new Error(`Could not post comment: ${errorData.message}`);
  }

  return await response.json();
}

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