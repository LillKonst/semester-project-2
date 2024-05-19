import { updateAvatar, fetchProfile } from "../modules/api.js";
import { displayUserProfile } from "./profile.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {

    // Fetch and display user profile
    await displayUserProfile();


    // Get elements
    const updateBtn = document.getElementById("updateProfile");
    const imageUrlInput = document.getElementById("updateInput1");
    const profileImage = document.getElementById("profileImageUpdate");

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
    updateBtn.addEventListener("click", async (event) => {
      event.preventDefault(); 
      try {
        const newImageUrl = imageUrlInput.value;

        // Update profile image
        const success = await updateAvatar(username, newImageUrl);

        if (success) {
          console.log("Profile image updated successfully");
          alert("Profile image updated successfully.");
          profileImage.src = newImageUrl;
          profileImage.alt = "Profile Image";

          location.reload();
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
      console.log("Image URL input clicked");
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

