import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  
  // Initialize user state from localStorage
  const [user] = useState(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        return JSON.parse(userData);
      }
      // Fallback user data if not in localStorage
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
    // Check if user is logged in
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
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome, {user?.name || "User"}</h1>
          <p className="app-subtitle">Student Health and Wellness App</p>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
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

      <div className="dashboard-content">
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

        <div className="dashboard-card">
          <h2>Your Insights</h2>
          <div className="insights">
            <div className="insight-item">
              <h3>Current Mood Streak</h3>
              <p className="insight-value">5 days</p>
            </div>
            <div className="insight-item">
              <h3>Total Entries</h3>
              <p className="insight-value">24</p>
            </div>
            <div className="insight-item">
              <h3>Wellness Score</h3>
              <p className="insight-value">78%</p>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Wellness Tips</h2>
          <ul className="tips-list">
            <li>Take a 10-minute break every hour</li>
            <li>Practice deep breathing exercises</li>
            <li>Stay hydrated throughout the day</li>
            <li>Get at least 7-8 hours of sleep</li>
            <li>Reach out to someone if you need support</li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h2>Send Feedback</h2>
          <p>Share your thoughts so the admin can review and improve the app.</p>
          <form onSubmit={handleFeedbackSubmit}>
            <input
              className="dashboard-input"
              type="text"
              placeholder="Feedback title"
              value={feedbackTitle}
              onChange={(e) => setFeedbackTitle(e.target.value)}
              required
            />
            <textarea
              className="dashboard-textarea"
              placeholder="Write your feedback here..."
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              rows="5"
              required
            />
            <button type="submit" className="dashboard-btn">Submit Feedback</button>
            {feedbackSuccess && <p className="feedback-success">{feedbackSuccess}</p>}
          </form>
        </div>

        <div className="dashboard-card app-use-card">
          <h2>How to Use the App</h2>
          <p>Make the most of the Student Health and Wellness App by following these simple steps:</p>
          <ul className="usage-list">
            <li><strong>Log your mood daily:</strong> Track emotional changes and spot patterns over time.</li>
            <li><strong>Save quick notes:</strong> Record your thoughts, stressors, or positive moments.</li>
            <li><strong>Explore resources:</strong> Open the Health Resource Hub for curated mental health and wellness videos.</li>
            <li><strong>Review insights:</strong> Check your wellness score to stay motivated and focused.</li>
            <li><strong>Reach out:</strong> Use the app regularly and connect with support if you need help.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
