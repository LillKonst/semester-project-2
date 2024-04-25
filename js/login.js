import { API_URL } from "../js/modules/api.js"

async function login(email, password) {
    if (!email.endsWith("@noroff.no") && !email.endsWith("stud.noroff.no")) {
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

    //Fetch username from profile info
    const loggedInUsername = profile.name; 

    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("access-token", accessToken); 
}