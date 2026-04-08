import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin");
  const [studentFeedback, setStudentFeedback] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    const role = parsedUser?.role;

    if (parsedUser?.name) {
      setAdminName(parsedUser.name);
    }

    const storedFeedback = localStorage.getItem("studentFeedback");
    if (storedFeedback) {
      setStudentFeedback(JSON.parse(storedFeedback));
    }

    if (!token || String(role || "").toLowerCase() !== "admin") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    category: "Mental Health",
    url: ""
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    setResourceForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateResource = (e) => {
    e.preventDefault();
    alert("Resource created: " + resourceForm.title);
    setResourceForm({ title: "", description: "", category: "Mental Health", url: "" });
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="admin-welcome">Welcome, {adminName}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Quick Stats */}
      <div className="admin-section">
        <h2>Quick Stats</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-value">1,245</p>
            <span className="stat-change">↑ 12% this month</span>
          </div>
          <div className="stat-card">
            <h3>Active Sessions</h3>
            <p className="stat-value">432</p>
            <span className="stat-change">↑ 8% from yesterday</span>
          </div>
          <div className="stat-card">
            <h3>Resources Created</h3>
            <p className="stat-value">87</p>
            <span className="stat-change">↑ 5 new this week</span>
          </div>
          <div className="stat-card">
            <h3>Appointments</h3>
            <p className="stat-value">156</p>
            <span className="stat-change">↑ 23 this month</span>
          </div>
        </div>
      </div>

      {/* Create Resources */}
      <div className="admin-section">
        <h2>Create New Resource</h2>
        <form onSubmit={handleCreateResource} className="admin-form">
          <div className="form-row">
            <input
              type="text"
              name="title"
              placeholder="Resource Title"
              value={resourceForm.title}
              onChange={handleResourceChange}
              required
              className="form-input"
            />
            <select
              name="category"
              value={resourceForm.category}
              onChange={handleResourceChange}
              className="form-input"
            >
              <option value="Mental Health">Mental Health</option>
              <option value="Counseling">Counseling</option>
              <option value="Wellness">Wellness</option>
              <option value="Fitness">Fitness</option>
            </select>
          </div>
          <textarea
            name="description"
            placeholder="Resource Description"
            value={resourceForm.description}
            onChange={handleResourceChange}
            rows="4"
            className="form-textarea"
          />
          <input
            type="url"
            name="url"
            placeholder="YouTube Video URL or Resource Link"
            value={resourceForm.url}
            onChange={handleResourceChange}
            className="form-input"
          />
          <button type="submit" className="admin-btn">Create Resource</button>
        </form>
      </div>

      {/* Most Viewed Resources */}
      <div className="admin-section">
        <h2>Most Viewed Resources</h2>
        <div className="resources-list">
          <div className="resource-item">
            <div className="resource-info">
              <h3>Meditation for Stress Relief</h3>
              <p className="resource-category">Mental Health</p>
            </div>
            <div className="resource-stats">
              <span className="views">👁 2,450 views</span>
              <span className="rating">⭐ 4.8/5</span>
            </div>
          </div>
          <div className="resource-item">
            <div className="resource-info">
              <h3>Sleep Better Tonight</h3>
              <p className="resource-category">Wellness</p>
            </div>
            <div className="resource-stats">
              <span className="views">👁 1,890 views</span>
              <span className="rating">⭐ 4.6/5</span>
            </div>
          </div>
          <div className="resource-item">
            <div className="resource-info">
              <h3>Managing Anxiety</h3>
              <p className="resource-category">Counseling</p>
            </div>
            <div className="resource-stats">
              <span className="views">👁 1,720 views</span>
              <span className="rating">⭐ 4.7/5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments */}
      <div className="admin-section">
        <h2>Upcoming Appointments</h2>
        <div className="appointments-list">
          <div className="appointment-item">
            <h3>John Doe</h3>
            <p><strong>Date:</strong> April 8, 2026</p>
            <p><strong>Time:</strong> 10:00 AM</p>
            <p><strong>Type:</strong> Mental Health Counseling</p>
            <button className="action-btn">Approve</button>
          </div>
          <div className="appointment-item">
            <h3>Sarah Smith</h3>
            <p><strong>Date:</strong> April 9, 2026</p>
            <p><strong>Time:</strong> 2:00 PM</p>
            <p><strong>Type:</strong> Wellness Consultation</p>
            <button className="action-btn">Approve</button>
          </div>
          <div className="appointment-item">
            <h3>Mike Johnson</h3>
            <p><strong>Date:</strong> April 10, 2026</p>
            <p><strong>Time:</strong> 11:00 AM</p>
            <p><strong>Type:</strong> Stress Management</p>
            <button className="action-btn">Approve</button>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="admin-section">
        <h2>User Management</h2>
        <div className="users-list">
          <div className="user-item">
            <div className="user-info">
              <h3>Alice Brown</h3>
              <p className="user-email">alice@example.com</p>
              <p className="user-role">Student</p>
            </div>
            <div className="user-actions">
              <button className="action-btn-small">View</button>
              <button className="action-btn-small delete">Delete</button>
            </div>
          </div>
          <div className="user-item">
            <div className="user-info">
              <h3>Bob Wilson</h3>
              <p className="user-email">bob@example.com</p>
              <p className="user-role">Student</p>
            </div>
            <div className="user-actions">
              <button className="action-btn-small">View</button>
              <button className="action-btn-small delete">Delete</button>
            </div>
          </div>
          <div className="user-item">
            <div className="user-info">
              <h3>Carol Davis</h3>
              <p className="user-email">carol@example.com</p>
              <p className="user-role">Counselor</p>
            </div>
            <div className="user-actions">
              <button className="action-btn-small">View</button>
              <button className="action-btn-small delete">Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="admin-section">
        <h2>Recent Feedback</h2>
        <div className="feedback-list">
          {studentFeedback.length > 0 && studentFeedback.map((item) => (
            <div key={item.id} className="feedback-item">
              <h3>{item.title}</h3>
              <p className="feedback-author">- By: {item.author}</p>
              <p className="feedback-text">{item.text}</p>
              <span className="feedback-date">{item.date}</span>
            </div>
          ))}

          <div className="feedback-item">
            <h3>Great resources!</h3>
            <p className="feedback-author">- By: John Doe</p>
            <p className="feedback-text">The meditation videos are really helpful for stress relief. Keep up the good work!</p>
            <span className="feedback-date">2 days ago</span>
          </div>
          <div className="feedback-item">
            <h3>Very supportive community</h3>
            <p className="feedback-author">- By: Sarah Smith</p>
            <p className="feedback-text">I appreciate the counseling services and the supportive environment. This app is a game changer!</p>
            <span className="feedback-date">1 day ago</span>
          </div>
          <div className="feedback-item">
            <h3>Improvement needed</h3>
            <p className="feedback-author">- By: Mike Johnson</p>
            <p className="feedback-text">Would be better if there are more resources for beginners. Overall, still a solid platform.</p>
            <span className="feedback-date">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
