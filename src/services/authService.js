import API from "./api";

// Test backend connectivity
export const testBackendConnection = async () => {
  try {
    console.log("Testing backend connection...");
    const response = await API.get("/health"); // Try common health endpoint
    console.log("Backend health check:", response.data);
    return true;
  } catch {
    console.log("Health check failed, trying root endpoint...");
    try {
      const response = await API.get("/"); // Try root endpoint
      console.log("Root endpoint response:", response.data);
      return true;
    } catch {
      console.log("Backend connection failed");
      return false;
    }
  }
};

export const registerUser = async (data) => {
  console.log("Register request:", data);
  const response = await API.post("/register", data);
  console.log("Register response:", response.data);
  return response.data;
};

export const loginUser = async (data) => {
  try {
    console.log("✅ Sending login request:", data);

    const response = await API.post("/login", data, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("✅ Login success:", response.data);
    return response.data;

  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    throw error;
  }
};