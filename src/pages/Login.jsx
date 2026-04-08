import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { handleError } from "../utils/errorHandler";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 FIX: include role in request
      const requestData = {
        ...form,
        role: role.toUpperCase()   // IMPORTANT
      };

      console.log("Sending login data:", requestData);

      const res = await loginUser(requestData);
      console.log("Login response:", res);

      const token = res.token || res.data?.token || res || "logged_in";
      localStorage.setItem("token", token);

      // Save user data
      const userData = {
        name: form.name.trim() || form.email.split("@")[0],
        email: form.email,
        role: role
      };

      localStorage.setItem("user", JSON.stringify(userData));

      alert("✅ Login Success!");

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert(handleError(err));
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Login</h2>

        <div className="role-selector">
          <p className="role-label">Select your role:</p>

          <div className="role-buttons">
            <button
              type="button"
              className={`role-btn ${role === "student" ? "active" : ""}`}
              onClick={() => setRole("student")}
            >
              👨‍🎓 Student
            </button>

            <button
              type="button"
              className={`role-btn ${role === "admin" ? "active" : ""}`}
              onClick={() => setRole("admin")}
            >
              ⚙️ Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button className="btn" type="submit">
            Login as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;