// Shared authentication logic for all protected pages

const API_URL = "https://dbgroup-backend.onrender.com";

// Check if user is logged in — redirect to login if not
function requireAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
    return null;
  }
  return token;
}

// Fetch current user profile from backend
async function fetchProfile() {
  const token = requireAuth();
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) throw new Error();
    return await response.json();
  } catch (error) {
    localStorage.removeItem("token");
    window.location.href = "index.html";
    return null;
  }
}

// Logout function
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// Attach logout button listener if it exists
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});