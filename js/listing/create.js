// import { createListing } from "../modules/api.js";
// import { storeToken } from "../modules/auth.js";

// const accessToken = localStorage.getItem(`access-token`);

// //addEventlistener for modal input 
// document.addEventListener('DOMContentLoaded', (event) => {
// document.getElementById("newListingForm").addEventListener("submit", async function (event) {
//     event.preventDefault();
    
//     const createListingForm = document.getElementById("newListingForm");
//     console.log("listing form created");
//     // Extra data from the form
//         const title = document.getElementById("newListingInput1").value;
//         const description = document.getElementById("newListingTextarea1").value;
//         const imageInput = document.getElementById("newListingInput3").value; 
//         const endsAt = document.getElementById("newListingInput4").value; 
    
//     //store the values from the inputs
//         const listingData = {
//             title: title,
//             description: description,
//             media: {
//                 url: imageInput,
//             },
//             endsAt: endsAt
//         };
//     //calls the createPost to create
//         try {
//             const data = await createListing(listingData);
//                 window.location.reload();
//                 alert("Listing created successfully!");
            
//             } catch (error) {
//                 console.error(error);
//                 //
//             }
//         });
//     });


import { createListing } from "../modules/api.js";

// Function to get form data
function getFormData() {
    const title = document.getElementById("newListingInput1").value;
    const description = document.getElementById("newListingTextarea1").value;
    const imageInput = document.getElementById("newListingInput3").value; 
    const endsAt = document.getElementById("newListingInput4").value; 

    return {
        title,
        description,
        media: {
            url: imageInput,
        },
        endsAt
    };
}

// Function to handle form submission
async function handleFormSubmission(event) {
    event.preventDefault();

    const listingData = getFormData();

    try {
        const data = await createListing(listingData);
        window.location.reload();
        alert("Listing created successfully!");
    } catch (error) {
        console.error(error);
    }
}

// Main function to initialize event listeners
function initialize() {
    document.addEventListener('DOMContentLoaded', (event) => {
        const newListingForm = document.getElementById("newListingForm");
        console.log("listing form created");

        if (newListingForm) {
            newListingForm.addEventListener("submit", handleFormSubmission);
        }
    });
}

// Initialize the script
initialize();
