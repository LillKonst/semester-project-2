import { updateAvatar } from "../js/modules/api.js";

document.addEventListener("DOMContentLoaded", () => {
  const updateBtn = document.getElementById("updateProfile");

  updateBtn.addEventListener("click", async () => {
    try {
      const newImageUrl = document.getElementById("updateInput1").value;
      const loggedInUser = JSON.parse(localStorage.getItem("profile"));
      
      if (!loggedInUser) {
        throw new Error("User is not logged in.");
      }

      const username = loggedInUser.name;
      const success = await updateAvatar(username, { avatar: newImageUrl });

      if (success) {
        alert("Profile image updated successfully.");
      } else {
        throw new Error("Failed to update profile image.");
      }

      // Clear the input field
      document.getElementById("updateInput1").value = "";
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  });
});
