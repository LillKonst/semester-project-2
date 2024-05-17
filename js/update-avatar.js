// import { updateAvatar, fetchProfile } from "../js/modules/api.js";
// import { displayUserProfile } from "./profile.js";

// document.addEventListener("DOMContentLoaded", () => {
//   const updateBtn = document.getElementById("updateProfile");
//   const username = localStorage.getItem("profile");
//   const profile = displayUserProfile(username);
//   console.log("profile:", profile);

//   updateBtn.addEventListener("click", async () => {
//     try {

//       const imageUrl = document.getElementById("updateInput1");
//       if (profile.avatar && profile.avatar.url) {
//         imageUrl.value = profile.avatar.url;
//         console.log(profile);
//       }


//       const newImageUrl = document.getElementById("updateInput1").value;
//       const loggedInUser = JSON.parse(localStorage.getItem("profile"));
      
//       if (!loggedInUser) {
//         throw new Error("User is not logged in.");
//       }

//       const username = loggedInUser.name;
//       const success = await updateAvatar(username, { avatar: newImageUrl });

//       if (success) {
//         alert("Profile image updated successfully.");
//       } else {
//         throw new Error("Failed to update profile image.");
//       }

//       // Clear the input field
//       document.getElementById("updateInput1").value = "";
//     } catch (error) {
//       console.error("Error updating profile image:", error);
//     }
//   });
// });


// import { updateAvatar, fetchProfile } from "../js/modules/api.js";
// import { displayUserProfile } from "./profile.js";

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     // Fetch and display user profile
//     await displayUserProfile();

//     // Get elements
//     const updateBtn = document.getElementById("updateProfile");
//     const imageUrlInput = document.getElementById("updateInput1");

//     // Fetch user profile
//     const loggedInUser = JSON.parse(localStorage.getItem("profile"));
//     if (!loggedInUser) {
//       throw new Error("User is not logged in.");
//     }
//     const username = loggedInUser.name;
//     const profile = await fetchProfile(username);

//     // Populate image URL input with current avatar URL
//     if (profile.avatar && profile.avatar.url) {
//       imageUrlInput.value = profile.avatar.url;
//     }

//     // Add event listener for update button
//     updateBtn.addEventListener("click", async () => {
//       try {
//         const newImageUrl = imageUrlInput.value;

//         // Update profile image
//         const success = await updateAvatar(username, { avatar: newImageUrl });

//         if (success) {
//           alert("Profile image updated successfully.");
//         } else {
//           throw new Error("Failed to update profile image.");
//         }

//         // Clear the input field after successful update
//         imageUrlInput.value = "";
//       } catch (error) {
//         console.error("Error updating profile image:", error);
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching or displaying user profile:", error);
//   }
// });


// import { updateAvatar, fetchProfile } from "../js/modules/api.js";
// import { displayUserProfile } from "./profile.js";

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     // Fetch and display user profile
//     await displayUserProfile();

//     // Get elements
//     const updateBtn = document.getElementById("updateProfile");
//     const imageUrlInput = document.getElementById("updateInput1");
//     const profileImage = document.getElementById("profileImage");

//     // Fetch user profile
//     const loggedInUser = JSON.parse(localStorage.getItem("profile"));
//     if (!loggedInUser) {
//       throw new Error("User is not logged in.");
//     }
//     const username = loggedInUser.name;
//     const profile = await fetchProfile(username);

//     // Populate image URL input with current avatar URL
//     if (profile.avatar && profile.avatar.url) {
//       imageUrlInput.value = profile.avatar.url;
//       profileImage.src = profile.avatar.url;
//       profileImage.alt = "Profile Image";
//     }

//     // Add event listener for update button
//     updateBtn.addEventListener("click", async () => {
//       try {
//         const newImageUrl = imageUrlInput.value;

//         // Update profile image
//         const success = await updateAvatar(username, { avatar: newImageUrl });

//         if (success) {
//           alert("Profile image updated successfully.");
//           profileImage.src = newImageUrl; // Update displayed image
//           profileImage.alt = "Profile Image"; // Update alt text
//         } else {
//           throw new Error("Failed to update profile image.");
//         }

//         // Clear the input field after successful update
//         imageUrlInput.value = "";
//       } catch (error) {
//         console.error("Error updating profile image:", error);
//       }
//     });

//     // Add event listener to clear input when clicked
//     imageUrlInput.addEventListener("click", () => {
//       imageUrlInput.value = "";
//     });

//     // Add event listener to display new image when URL is typed
//     imageUrlInput.addEventListener("input", () => {
//       profileImage.src = imageUrlInput.value;
//       profileImage.alt = "Preview Image";
//     });
//   } catch (error) {
//     console.error("Error fetching or displaying user profile:", error);
//   }
// });


import { updateAvatar, fetchProfile } from "../js/modules/api.js";
import { displayUserProfile } from "./profile.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch and display user profile
    await displayUserProfile();

    // Get elements
    const updateBtn = document.getElementById("updateProfile");
    const imageUrlInput = document.getElementById("updateInput1");
    const profileImage = document.getElementById("profileImage");

    // Fetch user profile
    const loggedInUser = JSON.parse(localStorage.getItem("profile"));
    if (!loggedInUser) {
      throw new Error("User is not logged in.");
    }
    const username = loggedInUser.name;
    const profile = await fetchProfile(username);

    // Populate image URL input with current avatar URL
    if (profile.avatar && profile.avatar.url) {
      imageUrlInput.value = profile.avatar.url;
      profileImage.src = profile.avatar.url;
      profileImage.alt = "Profile Image";
    }

    // Add event listener for update button
    updateBtn.addEventListener("click", async () => {
      try {
        const newImageUrl = imageUrlInput.value;

        // Update profile image
        const success = await updateAvatar(username, newImageUrl); // Pass URL string directly

        if (success) {
          alert("Profile image updated successfully.");
          profileImage.src = newImageUrl; // Update displayed image
          profileImage.alt = "Profile Image"; // Update alt text
        } else {
          throw new Error("Failed to update profile image.");
        }

        // Clear the input field after successful update
        imageUrlInput.value = "";
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
    });

    // Add event listener to clear input when clicked
    imageUrlInput.addEventListener("click", () => {
      imageUrlInput.value = "";
    });

    // Add event listener to display new image when URL is typed
    imageUrlInput.addEventListener("input", () => {
      profileImage.src = imageUrlInput.value;
      profileImage.alt = "Preview Image";
    });
  } catch (error) {
    console.error("Error fetching or displaying user profile:", error);
  }
});
