// import { login } from "./login.js";
// import { API_URL } from "./modules/api.js"

// document
// .getElementById("register")
// .addEventListener("click", function (event) {
//     console.log("Register button clicked!");
//     event.preventDefault();
//     const name = document.getElementById("registerInput1").value;
//     const email = document.getElementById("registerInput2").value;
//     const password = document.getElementById("registerInput3").value;
//     const avatar = document.getElementById("registerInput4").value;
//     console.log(name, email, password, avatar);
//     register(name, email, password, avatar).then((registered) => {
//         if (registered) {
//             login(email, password).then((loggedIn) => {
//                 if (loggedIn) {
//                     window.location.href = "/html/home.html";
//                 } else {
//                     alert("Invalid email or password. Please try again.");
//                 }
//             });
//         } else {
//             alert("Invalid email or password. Please try again.");
//         }
//     });
// });



// // register function

// async function register(name, email, password, avatar) {
//     if (!email.endsWith("stud.noroff.no")) {
//         return false;
//     }
//     if (isRegistered(email)) {
//         return true;
//     }
//     const response = await fetch(`${API_URL}/auth/register`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             name: name, 
//             email: email,
//             password: password,
//             avatar: avatar,
//         }),
//     });
//     if (response.status === 400) {
//         const responseJson = await response.json();
//         if (responseJson.errors[0].message === "Profile already exists")
//         localStorage.setItem(`${email}-registered`, true);
//     return true;
//     }

// if (!response.ok) {
//     return false; 
// }

// localStorage.setItem("username", name);
// localStorage.setItem(`${email}-registered`, true);

// return true;
// }

// function isRegistered(email) {
//     return localStorage.getItem(`${email}-registered`) ? true : false; 
// }


import { login } from "./login.js";
import { API_URL } from "./modules/api.js";

document.getElementById("register").addEventListener("click", function (event) {
    console.log("Register button clicked!");
    event.preventDefault();
    const name = document.getElementById("registerInput1").value;
    const email = document.getElementById("registerInput2").value;
    const password = document.getElementById("registerInput3").value;
    const avatar = document.getElementById("registerInput4").value; 
    console.log("Registering:", name, email, password, avatar);
    register(name, email, password, avatar).then((registered) => {
        console.log("Registered:", registered);
        if (registered) {
            login(email, password).then((loggedIn) => {
                console.log("Logged in:", loggedIn);
                if (loggedIn) {
                    window.location.href = "/html/home/index.html";
                } else {
                    alert("Invalid email or password. Please try again.");
                }
            });
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});

async function register(name, email, password, avatarURL) {
    console.log("Step 1: Starting registration process...");
    if (!email.endsWith("stud.noroff.no")) {
        console.log("Step 2: Email does not end with 'stud.noroff.no'. Registration not allowed.");
        return false;
    }
    console.log("Step 3: Checking if user is already registered...");
    if (isRegistered(email)) {
        console.log("Step 4: User is already registered.");
        return true;
    }
    console.log("Step 5: Sending registration request to server...");
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name, 
            email: email,
            password: password,
            avatar: { url: avatarURL },
        }),
    });
    if (response.status === 400) {
        console.log("Step 6: Registration request failed with status code 400.");
        const responseJson = await response.json();
        if (responseJson.errors[0].message === "Profile already exists") {
            localStorage.setItem(`${email}-registered`, true);
        }
        return true;
    }
    if (!response.ok) {
        console.log("Step 7: Registration request failed with status code:", response.status);
        return false; 
    }
    console.log("Step 8: Registration successful!");
    localStorage.setItem("username", name);
    localStorage.setItem(`${email}-registered`, true);
    return true;
}

function isRegistered(email) {
    return localStorage.getItem(`${email}-registered`) ? true : false; 
}
