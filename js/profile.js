import { fetchProfile, fetchListingsByUser } from "./modules/api.js";
import { MAX_TEXT_LENGTH } from "../js/home.js";

export { displayUserProfile };

async function displayUserProfile() {
    try {
        console.log("Fetching user's profile...");
        const loggedInUser = JSON.parse(localStorage.getItem("profile"));
        const username = loggedInUser.name;

        console.log("Fetching profile data for user:", username);
        const userProfile = await fetchProfile(username);
        console.log("User profile:", userProfile);

        const userName = document.getElementById("userName");
        userName.textContent = username;
        console.log("Displaying username:", username);

        const credit = userProfile.credits;
        const creditElement = document.getElementById("credit");
        creditElement.innerHTML = `Credit: ${credit}`;

        const profileImage = document.getElementById("profileImage");
        if (userProfile.avatar && userProfile.avatar.url) {
            profileImage.src = userProfile.avatar.url;
            profileImage.alt = userProfile.avatar.alt;
            console.log("Displayed user's avatar.");
        } else {
            profileImage.src = "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            profileImage.alt = "Default Avatar";
            console.log("Displayed default avatar.");
        }
        

        await displayListingsByUser(username);

    } catch (error) {
        console.error("Error fetching and displaying user profile:", error);
    }
}

async function displayListingsByUser(username) {
    try {
        const listingsByUser = await fetchListingsByUser(username);
        const listingsContainer = document.getElementById("listings-container");
        listingsContainer.innerHTML = "";

        listingsByUser.forEach(listing => {
                const listingCard = document.createElement("div");
                listingCard.classList.add("col-md-4", "col-sm-10", "p-2", "card-custom")
                listingCard.addEventListener("click", () => {
                    window.location.href = `../html/listings/index.html?id=${listing.data.id}&title=${listing.data.title}`;
                });
                listingsContainer.appendChild(listingCard);
                listingCard.style.cursor = "pointer";
                
                const cardInner = document.createElement("div");
                cardInner.classList.add("card", "card-body", "mx-auto", "card-custom");
                listingCard.appendChild(cardInner);
    
                const image = document.createElement("img");
                image.setAttribute("src", listing.media[0].url);
                image.setAttribute("alt", listing.media[0].alt);
                image.classList.add("card-img", "card-img-custom", "h-200");
                cardInner.appendChild(image); 
                
                const listingInfo = document.createElement("div");
                listingInfo.classList.add("d-flex", "justify-content-center", "border", "border-top-0", "rounded-bottom", "border-0.5", "border-custom", "p-2");
                cardInner.appendChild(listingInfo);
    
                const listingText = document.createElement("div");
                listingText.classList.add("col-9");
                listingInfo.appendChild(listingText);
    
                const listingTitle = document.createElement("h2");
                listingTitle.classList.add("card-title", "p-1", "fs-4");
                const truncatedTitle =
                listing.title.length > MAX_TEXT_LENGTH
                  ? listing.title.substring(0, MAX_TEXT_LENGTH) + "..."
                  : listing.title;
                listingTitle.innerHTML = truncatedTitle || "No Title";
                listingText.appendChild(listingTitle);
    
                const listingDescription = document.createElement("p");
                listingDescription.classList.add("card-text", "p-1", "mb-2");
                const truncatedText =
                listing.description.length > MAX_TEXT_LENGTH
                ? listing.description.substring(0, MAX_TEXT_LENGTH) + "..."
                : listing.description;
                listingDescription.innerHTML = truncatedText || "No Description";
                listingText.appendChild(listingDescription);
    
                const listingEndsAt = document.createElement("p");
                const timeDate = new Date(listing.endsAt);
                const formattedDate = timeDate.toLocaleDateString();
                const formattedTime = timeDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });
                listingEndsAt.classList.add("p-1", "fs-7", "fw-bold");
                listingEndsAt.innerHTML = `Bidding ends:${formattedDate} ${formattedTime}`;
                listingText.appendChild(listingEndsAt);
    
                const listingBids = document.createElement("div");
                listingBids.classList.add("col-3", "d-flex", "justify-content-center", "align-items-center", "flex-column", "border-start", "border-0.5", "border-custom", "my-3")
                listingInfo.appendChild(listingBids);
    
                const listingBidsText = document.createElement("p");
                listingBidsText.classList.add("fs-7", "fw-bold");
                listingBidsText.innerHTML = `Bids:`;
                listingBids.appendChild(listingBidsText);
    
                const listingNumberOfBids = document.createElement("h3");
                listingNumberOfBids.classList.add("fs-1");
                listingNumberOfBids.innerHTML = listing._count.bids;
                listingBids.appendChild(listingNumberOfBids);
            });
    
    } catch (error) {
        console.error("Error displaying listings by user:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded. Displaying user profile...");
    displayUserProfile();
});












// // import { fetchProfile } from "./modules/api.js";
// // import { fetchListingsByUser } from "./modules/api.js";
// // import { displayListings } from "./home.js";


// // async function displayListingsByUser(fetchListingsByUser, username) {
// //     try {
// //       const listingsContainer = document.getElementById("listings-container");
// //       listingsContainer.innerHTML = "";
  
// //       userPosts.forEach((listing) => {
// //         const listingCard = createListingCard(listing, username);
// //         listingsContainer.appendChild(listingCard);
// //       });
// //     } catch (error) {
// //       console.error("Error displaying user posts:", error);
// //     }
// //   }


// // async function displayUserProfile() {
// //     try {
// //       console.log("Fetching user's profile...");
// //       // Retrieve the user's profile
// //       const loggedInUser = JSON.parse(localStorage.getItem("profile"));
// //       const username = loggedInUser.name;
// //       console.log("Username:", username);

// //       console.log("Fetching profile data for user:", username);
// //       const userProfile = await fetchProfile(username);
// //       console.log("User profile:", userProfile);
  
// //       // Display user's username
// //       const userName = document.getElementById("userName");
// //       userName.textContent = username;
// //       console.log("Displaying username:", username);
  
// //       // Display user's avatar if available
// //       const profileImage = document.getElementById("profileImage");
// //       if (userProfile.avatar && userProfile.avatar.url) {
// //         profileImage.src = userProfile.avatar.url;
// //         profileImage.alt = userProfile.avatar.alt;
// //         console.log("Displayed user's avatar.");
// //       } else {
// //         // Set a default image if avatar is not available
// //         profileImage.src = "/images/kompis.JPG";
// //         profileImage.alt = "Default Avatar";
// //         console.log("Displayed default avatar.");
// //       }


// //         // Retrieve and display user's posts
// //         const listingsByUser = await fetchListingsByUser(username);
// //         displayListingsByUser(listingsByUser, username);
  
// //     } catch (error) {
// //       console.error("Error fetching and displaying user profile:", error);
// //     }
// //   }
  
// //   // Call the function to display user profile after the DOM is fully loaded
// //   document.addEventListener("DOMContentLoaded", () => {
// //     console.log("DOM fully loaded. Displaying user profile...");
// //     displayUserProfile();
// //   });

  
// import { fetchProfile } from "./modules/api.js";
// import { fetchListingsByUser } from "./modules/api.js";
// // import { fetchProfile } from "./modules/api.js";
// import { fetchListingsByUser } from "./modules/api.js";
// //import { displayListings } from "./home.js";

// // async function displayListingsByUser(fetchListingsFunction, username) {
// //     try {
// //         const listingsByUser = await fetchListingsFunction(username);
// //         const listingsContainer = document.getElementById("listings-container");
// //         listingsContainer.innerHTML = "";

// //         // Assuming each listing in listingsByUser is an object
// //         listingsByUser.forEach((listing) => {
// //             const listingCard = createListingCard(listing, username);
// //             listingsContainer.appendChild(listingCard);
// //         });
// //     } catch (error) {
// //         console.error("Error displaying listings by user:", error);
// //     }
// // }

// async function displayUserProfile() {
//     try {
//         console.log("Fetching user's profile...");
//         const loggedInUser = JSON.parse(localStorage.getItem("profile"));
//         const username = loggedInUser.name;
//         console.log("Username:", username);

//         console.log("Fetching profile data for user:", username);
//         const userProfile = await fetchProfile(username);
//         console.log("User profile:", userProfile);

//         const userName = document.getElementById("userName");
//         userName.textContent = username;
//         console.log("Displaying username:", username);

//         const profileImage = document.getElementById("profileImage");
//         if (userProfile.avatar && userProfile.avatar.url) {
//             profileImage.src = userProfile.avatar.url;
//             profileImage.alt = userProfile.avatar.alt;
//             console.log("Displayed user's avatar.");
//         } else {
//             profileImage.src = "/images/kompis.JPG";
//             profileImage.alt = "Default Avatar";
//             console.log("Displayed default avatar.");
//         }

//         await displayListingsByUser(fetchListingsByUser, username);

//     } catch (error) {
//         console.error("Error fetching and displaying user profile:", error);
//     }
// }

// document.addEventListener("DOMContentLoaded", () => {
//     console.log("DOM fully loaded. Displaying user profile...");
//     displayUserProfile();
// });
// // import { displayListings } from "./home.js";

// async function displayListingsByUser(fetchListingsFunction, username) {
//     try {
//         const listingsByUser = await fetchListingsFunction(username);
//         const listingsContainer = document.getElementById("listings-container");
//         listingsContainer.innerHTML = "";

//         // Assuming each listing in listingsByUser is an object
//         listingsByUser.forEach((listing) => {
//             const listingCard = createListingCard(listing, username);
//             listingsContainer.appendChild(listingCard);
//         });
//     } catch (error) {
//         console.error("Error displaying listings by user:", error);
//     }
// }

// async function displayUserProfile() {
//     try {
//         console.log("Fetching user's profile...");
//         const loggedInUser = JSON.parse(localStorage.getItem("profile"));
//         const username = loggedInUser.name;
//         console.log("Username:", username);

//         console.log("Fetching profile data for user:", username);
//         const userProfile = await fetchProfile(username);
//         console.log("User profile:", userProfile);

//         const userName = document.getElementById("userName");
//         userName.textContent = username;
//         console.log("Displaying username:", username);

//         const profileImage = document.getElementById("profileImage");
//         if (userProfile.avatar && userProfile.avatar.url) {
//             profileImage.src = userProfile.avatar.url;
//             profileImage.alt = userProfile.avatar.alt;
//             console.log("Displayed user's avatar.");
//         } else {
//             profileImage.src = "/images/kompis.JPG";
//             profileImage.alt = "Default Avatar";
//             console.log("Displayed default avatar.");
//         }

//         await displayListingsByUser(fetchListingsByUser, username);

//     } catch (error) {
//         console.error("Error fetching and displaying user profile:", error);
//     }
// }

// document.addEventListener("DOMContentLoaded", () => {
//     console.log("DOM fully loaded. Displaying user profile...");
//     displayUserProfile();
// });
