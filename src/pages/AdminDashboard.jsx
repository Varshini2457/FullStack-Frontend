import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const [adminName, setAdminName] = useState("Admin");

  const [studentFeedback, setStudentFeedback] = useState([]);

  // USERS FROM LOCAL STORAGE
  const [users, setUsers] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    const user = localStorage.getItem("user");

    const parsedUser = user ? JSON.parse(user) : null;

    const role = parsedUser?.role;

    if (parsedUser?.name) {
      setAdminName(parsedUser.name);
    }

    // GET FEEDBACK
    const storedFeedback = localStorage.getItem("studentFeedback");

    if (storedFeedback) {
      setStudentFeedback(JSON.parse(storedFeedback));
    }

    // GET REGISTERED USERS
    const storedUsers = localStorage.getItem("users");

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
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

    setResourceForm((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  const handleCreateResource = (e) => {

    e.preventDefault();

    alert("Resource created: " + resourceForm.title);

    setResourceForm({
      title: "",
      description: "",
      category: "Mental Health",
      url: ""
    });

  };

  // VIEW USER
  const handleViewUser = (user) => {

    alert(
      `Name: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}`
    );

  };

  // DELETE USER
  const handleDeleteUser = (email) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {

      const updatedUsers = users.filter(
        (user) => user.email !== email
      );

      setUsers(updatedUsers);

      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );

    }

  };

  return (

    <div className="admin-dashboard-container">

      {/* HEADER */}
      <div className="admin-header">

        <div>
          <h1>Admin Dashboard</h1>

          <p className="admin-welcome">
            Welcome, {adminName}
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* QUICK STATS */}
      <div className="admin-section">

        <h2>Quick Stats</h2>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-value">
              {users.length}
            </p>
            <span className="stat-change">
              Registered users
            </span>
          </div>

          <div className="stat-card">
            <h3>Active Sessions</h3>
            <p className="stat-value">432</p>
            <span className="stat-change">
              ↑ 8% from yesterday
            </span>
          </div>

          <div className="stat-card">
            <h3>Resources Created</h3>
            <p className="stat-value">87</p>
            <span className="stat-change">
              ↑ 5 new this week
            </span>
          </div>

          <div className="stat-card">
            <h3>Appointments</h3>
            <p className="stat-value">156</p>
            <span className="stat-change">
              ↑ 23 this month
            </span>
          </div>

        </div>

      </div>

      {/* CREATE RESOURCES */}
      <div className="admin-section">

        <h2>Create New Resource</h2>

        <form
          onSubmit={handleCreateResource}
          className="admin-form"
        >

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

              <option value="Mental Health">
                Mental Health
              </option>

              <option value="Counseling">
                Counseling
              </option>

              <option value="Wellness">
                Wellness
              </option>

              <option value="Fitness">
                Fitness
              </option>

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

          <button
            type="submit"
            className="admin-btn"
          >
            Create Resource
          </button>

        </form>

      </div>

      {/* USER MANAGEMENT */}
      <div className="admin-section">

        <h2>User Management</h2>

        <div className="users-list">

          {users.length > 0 ? (

            users.map((user, index) => (

              <div
                key={index}
                className="user-item"
              >

                <div className="user-info">

                  <h3>{user.name}</h3>

                  <p className="user-email">
                    {user.email}
                  </p>

                  <p className="user-role">
                    {user.role}
                  </p>

                </div>

                <div className="user-actions">

                  <button
                    className="action-btn-small"
                    onClick={() => handleViewUser(user)}
                  >
                    View
                  </button>

                  <button
                    className="action-btn-small delete"
                    onClick={() => handleDeleteUser(user.email)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          ) : (

            <p>No users found.</p>

          )}

        </div>

      </div>

      {/* FEEDBACK */}
      <div className="admin-section">

        <h2>Recent Feedback</h2>

        <div className="feedback-list">

          {studentFeedback.length > 0 ? (

            studentFeedback.map((item) => (

              <div
                key={item.id}
                className="feedback-item"
              >

                <h3>{item.title}</h3>

                <p className="feedback-author">
                  - By: {item.author}
                </p>

                <p className="feedback-text">
                  {item.text}
                </p>

                <span className="feedback-date">
                  {item.date}
                </span>

              </div>

            ))

          ) : (

            <p>No feedback available.</p>

          )}

        </div>

      </div>

    </div>

  );
}

export default AdminDashboard;