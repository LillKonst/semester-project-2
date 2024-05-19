export function logout() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("api-key");
    localStorage.removeItem("logged-in-email");
    localStorage.removeItem("profile");
    localStorage.removeItem("username");
  }
  