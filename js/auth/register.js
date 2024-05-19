import { login } from "./login.js";
import { API_URL } from "../modules/api.js";

document.getElementById("register").addEventListener("click", function (event) {
    event.preventDefault();
    const name = document.getElementById("registerInput1").value;
    const email = document.getElementById("registerInput2").value;
    const password = document.getElementById("registerInput3").value;
    const avatar = document.getElementById("registerInput4").value; 
    register(name, email, password, avatar).then((registered) => {
        if (registered) {
            login(email, password).then((loggedIn) => {
                if (loggedIn) {
                    window.location.href = "/index.html";
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
    if (!email.endsWith("stud.noroff.no")) {
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
            name: name, 
            email: email,
            password: password,
            avatar: { url: avatarURL },
        }),
    });
    if (response.status === 400) {
        const responseJson = await response.json();
        if (responseJson.errors[0].message === "Profile already exists") {
            localStorage.setItem(`${email}-registered`, true);
        }
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
