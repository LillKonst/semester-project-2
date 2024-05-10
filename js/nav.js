document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav');

    hamburgerMenu.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
});