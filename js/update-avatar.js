import { updateAvatar, fetchProfile } from "../js/modules/api.js";
import { displayUserProfile } from "./profile.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await displayUserProfile();

    const updateBtn = document.getElementById("updateProfile");
    const imageUrlInput = document.getElementById("updateInput1");
    const profileImage = document.getElementById("profileImageUpdate");

    const loggedInUser = JSON.parse(localStorage.getItem("profile"));
    if (!loggedInUser) {
      throw new Error("User is not logged in.");
    }
    const username = loggedInUser.name;
    const profile = await fetchProfile(username);

    if (profile.avatar && profile.avatar.url) {
      imageUrlInput.value = profile.avatar.url;
      profileImage.src = profile.avatar.url;
      profileImage.alt = "Profile Image";
    }

    updateBtn.addEventListener("click", async (event) => {
      event.preventDefault(); 
      try {
        const newImageUrl = imageUrlInput.value;

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

        imageUrlInput.value = "";
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
    });

    imageUrlInput.addEventListener("click", () => {
      console.log("Image URL input clicked");
      imageUrlInput.value = "";
    });

    imageUrlInput.addEventListener("input", () => {
      profileImage.src = imageUrlInput.value;
      profileImage.alt = "Preview Image";
    });
  } catch (error) {
    console.error("Error fetching or displaying user profile:", error);
  }
});

