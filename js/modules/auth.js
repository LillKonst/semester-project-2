export { APIKey };

export { storeToken };
export { getToken };
export { clearToken };



const APIKey = "20893b22-d84f-4eb9-b4f2-93753fdedefe";
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