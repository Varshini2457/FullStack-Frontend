import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { handleError } from "../utils/errorHandler";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(form);

      // Save token and user data
      localStorage.setItem("token", res.token || "logged_in");
      
      // Save user data with fallback
      const userData = res.user || { 
        name: form.name, 
        email: form.email, 
        role: form.role 
      };
      localStorage.setItem("user", JSON.stringify(userData));

      alert("Registered Successfully!");
      console.log(res);

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      // ✅ use common error handler
      alert(handleError(err));
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input 
            className="input"
            name="name" 
            placeholder="Name" 
            onChange={handleChange} 
          />

          <input 
            className="input"
            name="email" 
            placeholder="Email" 
            onChange={handleChange} 
          />

          <input 
            className="input"
            name="password" 
            type="password" 
            placeholder="Password" 
            onChange={handleChange} 
          />

          <select 
            className="input"
            name="role" 
            value={form.role} 
            onChange={handleChange}
          >
            <option value="STUDENT">Student</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button className="btn" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;