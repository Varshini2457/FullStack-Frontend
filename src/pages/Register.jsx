import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { handleError } from "../utils/errorHandler";
import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT"
  });

  // ✅ OTP STATES
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SEND OTP
  const sendOtp = async () => {

    if (!form.email) {
      alert("Please enter email first");
      return;
    }

    try {

      await axios.post("https://student-health-backend-qtvu.onrender.com/send-otp", {
        email: form.email
      });

      alert("OTP Sent Successfully");

      setOtpSent(true);

    } catch (error) {

      alert("Failed to send OTP");
    }
  };

  // ✅ VERIFY OTP
  const verifyOtp = async () => {

    try {

      await axios.post("https://student-health-backend-qtvu.onrender.com/verify-otp", {
        email: form.email,
        otp: otp
      });

      alert("OTP Verified Successfully");

      setOtpVerified(true);

    } catch (error) {

      alert("Invalid OTP");
    }
  };

  // ✅ REGISTER SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify OTP first");
      return;
    }

    try {

      const res = await registerUser(form);

      localStorage.setItem("token", res.token || "logged_in");

      const userData = res.user || {
        name: form.name,
        email: form.email,
        role: form.role
      };

      localStorage.setItem("user", JSON.stringify(userData));

      alert("Registered Successfully!");

      console.log(res);

      navigate("/dashboard");

    } catch (err) {

      alert(handleError(err));
    }
  };

  return (

    <div className="page-center">

      <div className="form-card">

        <h2>Register</h2>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <input
            className="input"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />

          {/* EMAIL */}
          <input
            className="input"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          {/* SEND OTP */}
          <div className="otp-container">

            <button
              type="button"
              className="otp-btn"
              onClick={sendOtp}
            >
              Send OTP
            </button>

          </div>

          {/* OTP FIELD */}
          {otpSent && (

            <div className="otp-container">

              <input
                className="input"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />

              <button
                type="button"
                className="otp-btn"
                onClick={verifyOtp}
              >
                Verify OTP
              </button>

            </div>

          )}

          {/* VERIFIED MESSAGE */}
          {otpVerified && (
            <p className="otp-success">
              ✅ OTP Verified Successfully
            </p>
          )}

          {/* PASSWORD */}
          <input
            className="input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          {/* ROLE */}
          <select
            className="input"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="STUDENT">Student</option>
            <option value="ADMIN">Admin</option>
          </select>

          {/* REGISTER BUTTON */}
          <button
            className="btn"
            type="submit"
            disabled={!otpVerified}
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;