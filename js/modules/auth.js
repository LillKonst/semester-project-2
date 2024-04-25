export { APIKey };

export { storeToken };
export { getToken };
export { clearToken };



const APIKey = "";
localStorage.setItem("APIKey", APIKey);

function storeToken(token) {
    localStorage.setItem("access-token", token);
}

function getToken() {
    return localStorage.getItem("access-token");
}

function clearToken() {
    localStorage.removeItem("access-token");
}