import { getToken, APIKey } from "../modules/auth.js"

export { getAllListings };

//export { API_URL }; 

export const API_URL = "https://v2.api.noroff.dev";


// Get all listings
async function getAllListings(newestFirst = true) {
    const defaultOrder = newestFirst ? "desc" : "asc";
    const response = await fetch(
      `${NOROFF_API_URL}/auction/listings`,
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