import { isLoggedIn } from "./login.js";

// header logged in or out
document.addEventListener("DOMContentLoaded", function() {
  
    const headerLoggedIn = document.getElementById("loggedInMenu");
    const headerLoggedOut = document.getElementById("loggedOutMenu");
  
    if (isLoggedIn) {
      headerLoggedIn.classList.remove("d-none");
      headerLoggedOut.classList.add("d-none");
    } else {
      headerLoggedIn.classList.add("d-none");
      headerLoggedOut.classList.remove("d-none");
    }
  });
  
//   function isLoggedIn(username) {
//     const username = localStorage.getItem('username'); 
//     return !!username; 
//   }

  // Hamburger menu
//   document.addEventListener("DOMContentLoaded", function() {
//     const hamburgerMenu = document.querySelector(".hamburger-menu");
//     const navMenu = document.querySelector(".nav");
//     const header = document.querySelector("header");
//     const navUl = document.querySelector(".mob-menu");
//     const topDiv = this.documentElement.querySelector(".custom-height");

//     hamburgerMenu.addEventListener("click", function() {
//         navMenu.classList.toggle("d-none");
//     });

//     checkScreenSize();

//     window.addEventListener("resize", checkScreenSize);

//     function checkScreenSize() {
//         const screenWidth = window.innerWidth;

//         if (screenWidth <= 750) {
//             hamburgerMenu.classList.remove("d-none");
//             navMenu.classList.add("d-none");
//             header.classList.remove("mx-5");
//             navUl.classList.add("mob-menu");
//             header.classList.add("fixed-mobile");
//             topDiv.classList.remove("d-none");
//         } else {
//             hamburgerMenu.classList.add("d-none");
//             navMenu.classList.remove("d-none");
//             navUl.classList.remove("mob-menu");
//             header.classList.remove("fixed-mobile");
//             header.classList.add("mx-5");
//             topDiv.classList.add("d-none");
//         }
//     }
// });

  

document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".nav");
    const header = document.querySelector("header");
    const navUl = document.querySelector(".mob-menu");
    const topDiv = document.querySelector(".custom-height");

    hamburgerMenu.addEventListener("click", function() {
        navUl.classList.toggle("d-none");
    });

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    function checkScreenSize() {
        const screenWidth = window.innerWidth;
        console.log("Screen width:", screenWidth);

        if (screenWidth <= 750) {
            console.log("Screen width is less than or equal to 750");
            hamburgerMenu.classList.remove("d-none");
            navUl.classList.add("d-none");
            header.classList.remove("mx-5");
            navMenu.classList.add("fixed-mobile");
            topDiv.classList.remove("d-none");
        } else {
            console.log("Screen width is greater than 750");
            hamburgerMenu.classList.add("d-none");
            navUl.classList.remove("d-none");
            navMenu.classList.remove("fixed-mobile");
            header.classList.add("mx-5");
            topDiv.classList.add("d-none");
        }
    }
});

