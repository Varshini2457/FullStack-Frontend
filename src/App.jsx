import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import HealthResourceHub from "./pages/HealthResourceHub";
import Contact from "./pages/Contact";

function App() {
  const location = useLocation();
  /*const isAuthPage = location.pathname === "/login" || location.pathname === "/register";*/
  /*const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const isDashboard = location.pathname === "/dashboard";
  const isAdminDashboard = location.pathname === "/admin-dashboard";
  const isHealthHub = location.pathname === "/health-resource-hub";
  const isSpecialPage = isAuthPage || isDashboard || isAdminDashboard || isHealthHub;*/
const hideLayout = [
  "/login",
  "/register",
  "/dashboard",
  "/admin-dashboard",
  "/health-resource-hub"
].includes(location.pathname);

  return (
    <div style={{ minHeight: '100vh' }}>
      {!hideLayout && (
        <nav className="navbar">
          <h1>Student Wellness</h1>

          <div>
            <Link to="/">Home</Link>
            <a href="/#about">About</a>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        </nav>
      )}

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/health-resource-hub" element={<HealthResourceHub />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {!hideLayout && (
        <footer>
          <p>&copy; 2024 Student Health & Wellness. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
}

export default App;
