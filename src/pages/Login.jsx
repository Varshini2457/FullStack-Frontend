import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { handleError } from "../utils/errorHandler";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

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
      const requestData = {
        ...form,
        role: role.toUpperCase()
      };

      const res = await loginUser(requestData);

      const token = res.token || res.data?.token || res || "logged_in";
      localStorage.setItem("token", token);

      const userData = {
        name: form.name.trim() || form.email.split("@")[0],
        email: form.email,
        role: role
      };

      localStorage.setItem("user", JSON.stringify(userData));

      alert("✅ Login Success!");

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      alert(handleError(err));
    }
  };

  return (
    <div className="page-center">
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

        {/* 🔥 GOOGLE LOGIN BUTTON */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await axios.post(
                  "http://localhost:2028/auth/google",
                  {
                    token: credentialResponse.credential,
                  }
                );

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                alert("✅ Google Login Success");

                navigate("/dashboard");

              } catch (err) {
                console.error(err);
                alert("Google login failed");
              }
            }}
            onError={() => {
              alert("Google Login Failed");
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default Login;