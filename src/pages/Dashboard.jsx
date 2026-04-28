import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();
  
  const [user] = useState(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        return JSON.parse(userData);
      }
      return { name: "Wellness Enthusiast", email: "user@example.com", role: "student" };
    } catch (e) {
      console.error("Error parsing user data:", e);
      return { name: "Wellness Enthusiast", email: "user@example.com", role: "student" };
    }
  });
  
  const isAdmin = String(user?.role || "").toLowerCase() === "admin";
  const [mood, setMood] = useState(""); 
  const [notes, setNotes] = useState("");
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  
  const [feedbackSuccess, setFeedbackSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleMoodSubmit = (e) => {
    e.preventDefault();
    alert(`Mood logged: ${mood}`);
    setMood("");
  };

  const handleNotesSubmit = (e) => {
    e.preventDefault();
    alert(`Notes saved: ${notes}`);
    setNotes("");
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem("studentFeedback") || "[]");
    const newItem = {
      id: Date.now(),
      title: feedbackTitle,
      text: feedbackMessage,
      author: user?.name || "Student",
      date: new Date().toLocaleDateString()
    };
    localStorage.setItem("studentFeedback", JSON.stringify([newItem, ...saved]));
    setFeedbackTitle("");
    setFeedbackMessage("");
    setFeedbackSuccess("Feedback sent! Admin can now view it.");
    setTimeout(() => setFeedbackSuccess(""), 5000);
  };

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome, {user?.name || "User"}</h1>
          <p className="app-subtitle">Student Health and Wellness App</p>
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Link to="/contact">
  <button className="nav-btn">📞 Contact</button>
</Link>
          <Link to="/health-resource-hub">
            <button className="nav-btn">📚 Health Resources</button>
          </Link>

          {isAdmin && (
            <Link to="/admin-dashboard">
              <button className="nav-btn">⚙️ Admin Panel</button>
            </Link>
          )}

          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* 🔥 NEW: HEALTH SUMMARY */}
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>💓 Heart Rate</h3>
          <p>72 bpm</p>
        </div>

        <div className="summary-card">
          <h3>😴 Sleep</h3>
          <p>7.5 hrs</p>
        </div>

        <div className="summary-card">
          <h3>🧠 Stress</h3>
          <p>Low</p>
        </div>

        <div className="summary-card">
          <h3>🏃 Activity</h3>
          <p>5,000 steps</p>
        </div>
      </div>

      {/* 🔥 NEW: CHART SECTION */}
     <div className="feedback-card">
  <h2>Send Feedback to Admin</h2>

  <p className="feedback-text">
    Share your wellness experience, suggestions, or report any issues.
  </p>

  <input
    type="text"
    className="feedback-input"
    placeholder="Feedback Title"
    value={feedbackTitle}
    onChange={(e) => setFeedbackTitle(e.target.value)}
  />

  <textarea
    className="feedback-input"
    placeholder="Write your feedback here..."
    rows="5"
    value={feedbackMessage}
    onChange={(e) => setFeedbackMessage(e.target.value)}
  ></textarea>

  <button
    className="feedback-btn"
    onClick={handleFeedbackSubmit}
  >
    Send Feedback
  </button>

  {feedbackSuccess && (
    <p className="feedback-success">
      {feedbackSuccess}
    </p>
  )}
</div>
      {/* EXISTING CONTENT */}
      <div className="dashboard-content">
<div className="bottom-cards">
        <div className="dashboard-card">
          <h2>Daily Mood Tracker</h2>
          <form onSubmit={handleMoodSubmit}>
            <select 
              className="dashboard-input"
              value={mood} 
              onChange={(e) => setMood(e.target.value)}
              required
            >
              <option value="">Select your mood...</option>
              <option value="excellent">😄 Excellent</option>
              <option value="good">🙂 Good</option>
              <option value="okay">😐 Okay</option>
              <option value="sad">😢 Sad</option>
              <option value="stressed">😰 Stressed</option>
            </select>
            <button type="submit" className="dashboard-btn">Log Mood</button>
          </form>
        </div>

        <div className="dashboard-card">
          <h2>Quick Notes</h2>
          <form onSubmit={handleNotesSubmit}>
            <textarea 
              className="dashboard-textarea"
              placeholder="Write your thoughts or notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="5"
            />
            <button type="submit" className="dashboard-btn">Save Notes</button>
          </form>
        </div>

        {/* KEEP REST SAME */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;