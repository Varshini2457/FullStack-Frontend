import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

function HealthResourceHub() {
  const navigate = useNavigate();
  const location = useLocation();

  const getInitialModule = () => {
    const params = new URLSearchParams(location.search);
    const module = params.get("module");
    return ["mental-health", "counseling", "wellness"].includes(module)
      ? module
      : "mental-health";
  };

  const [selectedModule, setSelectedModule] = useState(getInitialModule);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const resources = {
    "mental-health": [
      {
        id: 1,
        title: "Understanding Mental Health Basics",
        description: "Learn the fundamentals of mental health and why it matters for your overall wellbeing.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "12:45",
        views: 2450,
        rating: 4.8
      },
      {
        id: 2,
        title: "Managing Stress and Anxiety",
        description: "Practical techniques to manage stress and anxiety in your daily life.",
        youtubeId: "9bZkp7q19f0",
        duration: "18:30",
        views: 1890,
        rating: 4.7
      },
      {
        id: 3,
        title: "Mindfulness and Meditation",
        description: "Introduction to mindfulness practices and meditation techniques.",
        youtubeId: "inpok4MKVLM",
        duration: "15:20",
        views: 3120,
        rating: 4.9
      },
      {
        id: 4,
        title: "Building Resilience",
        description: "Develop mental strength and resilience to overcome life challenges.",
        youtubeId: "g-jwWYX7Jlo",
        duration: "22:10",
        views: 1650,
        rating: 4.6
      }
    ],
    "counseling": [
      {
        id: 5,
        title: "When to Seek Professional Help",
        description: "Understand when it's important to reach out to a mental health professional.",
        youtubeId: "ZXsQAXx_ao0",
        duration: "14:15",
        views: 2100,
        rating: 4.8
      },
      {
        id: 6,
        title: "Therapy Techniques and Approaches",
        description: "Overview of different therapy methods and how they can help you.",
        youtubeId: "JfH2t8vxOzE",
        duration: "19:45",
        views: 1450,
        rating: 4.5
      },
      {
        id: 7,
        title: "Overcoming Depression",
        description: "Strategies and counseling approaches for dealing with depression.",
        youtubeId: "McvJzQmlFjQ",
        duration: "25:30",
        views: 2890,
        rating: 4.7
      },
      {
        id: 8,
        title: "Relationship and Family Counseling",
        description: "How counseling can help improve relationships and family dynamics.",
        youtubeId: "tYzMGQUlEFk",
        duration: "20:15",
        views: 1720,
        rating: 4.6
      }
    ],
    "wellness": [
      {
        id: 9,
        title: "Healthy Sleep Habits",
        description: "Tips and techniques for improving sleep quality and managing insomnia.",
        youtubeId: "hFkI69zJzLI",
        duration: "16:40",
        views: 3450,
        rating: 4.8
      },
      {
        id: 10,
        title: "Nutrition for Mental Health",
        description: "How proper nutrition supports mental health and emotional wellbeing.",
        youtubeId: "dyR56Rptt0U",
        duration: "21:20",
        views: 2200,
        rating: 4.7
      },
      {
        id: 11,
        title: "Exercise and Mental Wellbeing",
        description: "The connection between physical activity and mental health benefits.",
        youtubeId: "aUaInS6HIGo",
        duration: "18:50",
        views: 2780,
        rating: 4.9
      },
      {
        id: 12,
        title: "Work-Life Balance",
        description: "Strategies to maintain balance between work and personal life.",
        youtubeId: "b_0H-3qb1Lc",
        duration: "17:30",
        views: 1920,
        rating: 4.6
      }
    ]
  };

  const validModules = ["mental-health", "counseling", "wellness"];
  const currentResources = resources[selectedModule] || [];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const module = params.get("module");

    if (module && validModules.includes(module) && module !== selectedModule) {
      setSelectedModule(module);
    }
  }, [location.search, selectedModule]);

  return (
    <div className="health-hub-container">
      <div className="hub-header">
        <div className="hub-title">
          <Link to="/dashboard" className="back-link">← Dashboard</Link>
          <h1>Health Resource Hub</h1>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Module Navigation */}
      <div className="module-nav">
        <button
          className={`module-btn ${selectedModule === "mental-health" ? "active" : ""}`}
          onClick={() => setSelectedModule("mental-health")}
        >
          🧠 Mental Health
        </button>
        <button
          className={`module-btn ${selectedModule === "counseling" ? "active" : ""}`}
          onClick={() => setSelectedModule("counseling")}
        >
          💬 Counseling
        </button>
        <button
          className={`module-btn ${selectedModule === "wellness" ? "active" : ""}`}
          onClick={() => setSelectedModule("wellness")}
        >
          💪 Wellness
        </button>
      </div>

      {/* Module Description */}
      <div className="module-description">
        {selectedModule === "mental-health" && (
          <div>
            <h2>Mental Health Resources</h2>
            <p>Explore comprehensive mental health education with expert guidance on psychological wellbeing, emotional intelligence, and mental fitness.</p>
          </div>
        )}
        {selectedModule === "counseling" && (
          <div>
            <h2>Professional Counseling Resources</h2>
            <p>Learn about professional counseling services, therapy approaches, and how to seek mental health support from qualified professionals.</p>
          </div>
        )}
        {selectedModule === "wellness" && (
          <div>
            <h2>Wellness & Lifestyle Resources</h2>
            <p>Discover holistic wellness practices including nutrition, fitness, sleep, and lifestyle habits that support overall health and happiness.</p>
          </div>
        )}
      </div>

      {/* Video Resources Grid */}
      <div className="resources-grid">
        {currentResources.map(resource => (
          <div key={resource.id} className="resource-card">
            <div className="video-thumbnail">
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${resource.youtubeId}`}
                title={resource.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <span className="duration">{resource.duration}</span>
            </div>
            <div className="resource-content">
              <h3>{resource.title}</h3>
              <p className="description">{resource.description}</p>
              <div className="resource-stats">
                <span className="views">👁 {resource.views.toLocaleString()} views</span>
                <span className="rating">⭐ {resource.rating}/5</span>
              </div>
              <button className="watch-btn">Watch Full Video</button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information Section */}
      <div className="info-section">
        <div className="info-card">
          <h3>💡 Quick Tips</h3>
          <ul>
            <li>Start with "Mental Health Basics" if you're new</li>
            <li>Schedule regular viewing time for best results</li>
            <li>Take notes while watching for better retention</li>
            <li>Share helpful resources with friends</li>
          </ul>
        </div>
        <div className="info-card">
          <h3>🤝 Need More Support?</h3>
          <p>If you're struggling with mental health, remember:</p>
          <ul>
            <li>Professional help is always available</li>
            <li>Book a counseling appointment</li>
            <li>Join our community support groups</li>
            <li>Contact our crisis helpline anytime</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HealthResourceHub;
