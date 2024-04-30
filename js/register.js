import { login } from "./login.js";
import { API_URL } from "./modules/api.js"

document
.getElementById("register")
.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const avatar = event.target[3].value;
    register(name, email, password, avatar).then((registered) => {
        if (registered) {
            login(email, password).then((loggedIn) => {
                if (loggedIn) {
                    window.location.href = "/html/home.html";
                } else {
                    alert("Invalid email or password. Please try again.");
                }
            });
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});

// register function

async function register(name, email, password) {
    if (!email.endsWith("@noroff.no") && !email.endsWith("stud.noroff.no")) {
        return false;
    }
    if (isRegistered(email)) {
        return true;
    }
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name, 
        }),
    });
    if (response.status === 400) {
        const responseJson = await response.json();
        if (responseJson.errors[0].message === "Profile already exists")
        localStorage.setItem(`${email}-registered`, true);
    return true;
    }

if (!response.ok) {
    return false; 
}

localStorage.setItem("username", name);
localStorage.setItem(`${email}-registered`, true);

return true;
}

function isRegistered(email) {
    return localStorage.getItem(`${email}-registered`) ? true : false; 
}