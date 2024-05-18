import { createListing } from "../modules/api.js";

document.addEventListener('DOMContentLoaded', () => {
    const thumbnailContainer = document.getElementById("thumbnailContainer");
        thumbnailContainer.classList.add("d-flex", "flex-row", "flex-wrap");
    
    const addImageButton = document.getElementById("addImageButton");
    
    const imageInput = document.getElementById("newListingInput3");

    let imageCount = 0;

    addImageButton.addEventListener("click", () => {
        const imageUrl = imageInput.value.trim();
        if (imageUrl !== "") {
            if (imageCount < 5) {
                createThumbnail(imageUrl);
                imageInput.value = "";
                imageCount++;
            } else {
                alert("You can only add up to 5 images.");
            }
        }
    });

    function createThumbnail(imageUrl) {
        const thumbnail = document.createElement("div");
        thumbnail.classList.add("thumbnail", "custom-thumbnail");
        thumbnail.innerHTML = `<img src="${imageUrl}" class="thumbnail-image custom-thumbnail p-2" alt="Thumbnail Image">`;
        thumbnailContainer.appendChild(thumbnail);
    }

    const newListingForm = document.getElementById("newListingForm");
    newListingForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const listingData = getFormData();
        try {
            const data = await createListing(listingData);
            window.location.href = "/html/profile/index.html";
            alert("Listing created successfully!");
        } catch (error) {
            console.error(error);
        }
    });

    function getFormData() {
        const title = document.getElementById("newListingInput1").value;
        const description = document.getElementById("newListingTextarea1").value;
        const endsAt = document.getElementById("newListingInput4").value;
        const thumbnailImages = document.querySelectorAll(".thumbnail-image");
        const media = Array.from(thumbnailImages).map(image => ({ url: image.src }));
        return { title, description, media, endsAt };
    }
});
