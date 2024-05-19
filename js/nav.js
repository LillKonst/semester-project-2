import { logout } from "./auth/logout.js";

// header logged in or out
document.addEventListener("DOMContentLoaded", function() {
    const loggedIn = localStorage.getItem("username");
  
const nav = document.getElementById("nav"); 
nav.classList.add("nav", "ms-auto",  "p-2", "my-1", "mob-menu");

if (loggedIn) {
const homeBtn = document.createElement("a")
homeBtn.classList.add("nav-btn");
homeBtn.innerHTML = `HOME`;
homeBtn.addEventListener("click", () => {
    window.location.href = `../../index.html`;
  });
nav.appendChild(homeBtn);

const profileBtn = document.createElement("a")
profileBtn.classList.add("nav-btn");
profileBtn.innerHTML = `PROFILE`;
profileBtn.addEventListener("click", () => {
    window.location.href = `../../../html/profile/index.html`;
  });
nav.appendChild(profileBtn);

const logOutBtn = document.createElement("a")
logOutBtn.classList.add("nav-btn");
logOutBtn.innerHTML = `LOG OUT`;
logOutBtn.setAttribute("id", "logout");
logOutBtn.addEventListener("click", function(event) {
    event.preventDefault();
    logout();
    window.location.href = "../../index.html";
});
nav.appendChild(logOutBtn);

} else {
    const loginBtn = document.createElement("a")
loginBtn.classList.add("nav-btn");
loginBtn.innerHTML = `LOGIN`;
loginBtn.addEventListener("click", function() {
    const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
    loginModal.show();
});
nav.appendChild(loginBtn);

const registerBtn = document.createElement("a")
registerBtn.classList.add("btn", "custom-btn", "m-2");
registerBtn.innerHTML = `REGISTER`;
registerBtn.addEventListener("click", function() {
    const registerModal = new bootstrap.Modal(document.getElementById("registerModal"));
    registerModal.show();
});
nav.appendChild(registerBtn);
}
});


  // Hamburger menu
  document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.querySelector(".hamburger-menu svg");
    const navMenu = document.querySelector(".nav");
    const header = document.querySelector("header");
    const navUl = document.querySelector(".mob-menu");
    const topDiv = document.querySelector(".custom-height");

    hamburgerMenu.addEventListener("click", function() {
        navMenu.classList.toggle("d-none");
    });

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    function checkScreenSize() {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 750) {
            hamburgerMenu.classList.remove("d-none");
            navMenu.classList.add("d-none");
            header.classList.remove("mx-5");
            navUl.classList.add("mob-menu");
            header.classList.add("fixed-mobile");
            topDiv.classList.remove("d-none");
        } else {
            hamburgerMenu.classList.add("d-none");
            navMenu.classList.remove("d-none");
            navUl.classList.remove("mob-menu");
            header.classList.remove("fixed-mobile");
            header.classList.add("mx-5");
            topDiv.classList.add("d-none");
        }
    }
});

