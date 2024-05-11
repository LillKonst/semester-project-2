document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".nav");
    const header = document.querySelector("header");

    hamburgerMenu.addEventListener("click", function() {
        navMenu.classList.toggle("d-none"); // Toggle visibility of navMenu
    });

    // Check screen size on page load and toggle visibility of hamburger menu and navMenu
    checkScreenSize();

    // Check screen size when window is resized and toggle visibility of hamburger menu and navMenu
    window.addEventListener("resize", checkScreenSize);

    function checkScreenSize() {
        const screenWidth = window.innerWidth;

        // If screen width is less than or equal to 750px, show hamburger menu and hide navMenu, otherwise hide hamburger menu and show navMenu
        if (screenWidth <= 750) {
            hamburgerMenu.classList.remove("d-none");
            navMenu.classList.add("d-none");
            header.classList.remove("mx-5");
        } else {
            hamburgerMenu.classList.add("d-none");
            navMenu.classList.remove("d-none");
            navMenu.classList.remove("bg-light"); // Remove Bootstrap bg-light class when screen is wider
            navMenu.classList.remove("flex-column"); // Remove Bootstrap flex-column class when screen is wider
        }
    }
});


