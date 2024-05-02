// import { API_URL } from "../js/modules/api.js"

// export { login };

// async function login(email, password) {
//     if (!email.endsWith("stud.noroff.no")) {
//         return false; 
//     }

//     if (isLoggedIn(email)) {
//         return true; 
//     }

//     const loginResponse = await fetch(`${API_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             email: email, 
//             password: password,
//         }),
//     });
//     if (!loginResponse.ok) {
//         return false;
//     }
//     const loginResponseJson = await loginResponse.json();
//     const { accessToken, ...profile } = loginResponseJson.data;

//     //Fetch username from profile info
//     const loggedInUsername = profile.name; 

//     localStorage.setItem("profile", JSON.stringify(profile));
//     localStorage.setItem("access-token", accessToken); 

//     const APIKeyRespons = await fetch (`${API_URL}/auth/create-api-key`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//             name: "User api key",
//         }),
//     });
//     const APIKeyResponsJSON = await APIKeyRespons.json(); 
//     const APIKey = APIKeyResponsJSON.data.key;
//     localStorage.setItem("api-key", APIKey);
//     localStorage.setItem("logged-in-email", email);

//     //Set the username in localStorage
//     localStorage.setItem("username", loggedInUsername);

//     return true; 
// }

// function isLoggedIn(email) {
//     return localStorage.getItem("logged-in-email") === email; 
// }

// // login button 
// document.getElementById("loginForm").addEventListener("submit", function (event) {
//     event.preventDefault();
//     const email = document.getElementById("loginInput1").value;
//     const password = document.getElementById("loginInput2").value;
//     login(email, password).then ((loggedIn) => {
//         if (loggedIn) {
//             window.location.href = "/html/home.html";
//         } else {
//             alert("Invalid email or password. Please try again.");
//         }
//     });
// });

// // If user already logged in, go directly to logged in page
// window.addEventListener("load", () => {
//     if (localStorage.getItem("logged-in-email")) {
//         window.location.href = "/html/home.html";
//     }
// });



import { API_URL } from "../js/modules/api.js"

export { login };

async function login(email, password) {
    console.log("Step 1: Starting login process...");

    if (!email.endsWith("stud.noroff.no")) {
        console.log("Step 2: Email does not end with 'stud.noroff.no'. Login not allowed.");
        return false; 
    }

    console.log("Step 3: Checking if user is already logged in...");
    if (isLoggedIn(email)) {
        console.log("Step 4: User is already logged in.");
        return true; 
    }

    console.log("Step 5: Sending login request to server...");
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email, 
            password: password,
        }),
    });

    if (!loginResponse.ok) {
        console.log("Step 6: Login request failed. Status code:", loginResponse.status);
        return false;
    }

    console.log("Step 7: Parsing login response...");
    const loginResponseJson = await loginResponse.json();
    const { accessToken, ...profile } = loginResponseJson.data;

    console.log("Step 8: Storing user profile and access token in localStorage...");
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("access-token", accessToken); 

    console.log("Step 9: Sending request to create API key...");
    const APIKeyRespons = await fetch (`${API_URL}/auth/create-api-key`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            name: "User api key",
        }),
    });

    console.log("Step 10: Parsing API key response...");
    const APIKeyResponsJSON = await APIKeyRespons.json(); 
    const APIKey = APIKeyResponsJSON.data.key;
    localStorage.setItem("api-key", APIKey);
    localStorage.setItem("logged-in-email", email);

    console.log("Step 11: Storing username in localStorage...");
    const loggedInUsername = profile.name; 
    localStorage.setItem("username", loggedInUsername);

    console.log("Step 12: Login successful!");
    return true; 
}

function isLoggedIn(email) {
    return localStorage.getItem("logged-in-email") === email; 
}

// login button 
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("loginInput1").value;
    const password = document.getElementById("loginInput2").value;
    login(email, password).then ((loggedIn) => {
        if (loggedIn) {
            window.location.href = "/html/home/index.html";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});

// If user already logged in, go directly to logged in page
window.addEventListener("load", () => {
    if (localStorage.getItem("logged-in-email")) {
        window.location.href = "/html/home/index.html";
    }
});
