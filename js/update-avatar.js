import { updateAvatar } from "../js/modules/api.js";

document.addEventListener("DOMContentLoaded", () => {
  // Get reference to the update button
  const updateBtn = document.getElementById("update");

  // Add event listener to the update button
  updateBtn.addEventListener("click", async () => {
      try {
          // Get the new profile image URL from the input field
          const newProfileImgUrl = document.getElementById("updateInput1").value;

          // Retrieve the username of the logged-in user from localStorage
          const loggedInUser = JSON.parse(localStorage.getItem("profile"));
          const username = loggedInUser.name;

          // Update the profile image
          await updateAvatar(username, newProfileImgUrl);

          // Log success message
          alert("Profile image updated successfully");

          // Clear the input field
          document.getElementById("updateInput1").value = "";
      } catch (error) {
          console.error("Error updating profile image:", error);
      }
  });
});