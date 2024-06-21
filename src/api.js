export const login = (username, password) => {
  const API_URL = "https://deafio-backend.onrender.com";
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: true,
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Login failed");
        });
      }
      return response.json();
    })
    .then((data) => data.token)
    .catch((error) => {
      throw error;
    });
};
