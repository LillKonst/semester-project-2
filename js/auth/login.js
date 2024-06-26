export { login };
export { isLoggedIn };

const API_URL = "https://v2.api.noroff.dev";

async function login(email, password) {

    if (!email.endsWith("stud.noroff.no")) {
        return false; 
    }
    if (isLoggedIn(email)) {
        return true; 
    }

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
        return false;
    }

    const loginResponseJson = await loginResponse.json();
    const { accessToken, ...profile } = loginResponseJson.data;

    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("access-token", accessToken); 

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

    const APIKeyResponsJSON = await APIKeyRespons.json(); 
    const APIKey = APIKeyResponsJSON.data.key;
    localStorage.setItem("api-key", APIKey);
    localStorage.setItem("logged-in-email", email);

    const loggedInUsername = profile.name; 
    localStorage.setItem("username", loggedInUsername);

    return true; 
}

function isLoggedIn(email) {
    return localStorage.getItem("logged-in-email") === email; 
}

// login button 
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("loginInput1").value;
    const password = document.getElementById("loginInput2").value;
    const loggedIn = await login(email, password);
    if (loggedIn) {
        const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
        loginModal.hide();
        location.reload();
    } else {
        alert("Invalid email or password. Please try again.");
    }
});


