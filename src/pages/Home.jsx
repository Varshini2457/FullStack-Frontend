function Home() {
  return (
    <div>
      <div className="hero">
        <h1>
           Student <br />
          <span>Health & Wellness</span>
        </h1>

        <p>
          Track mental health, get support, and improve your well-being with personalized AI insights.
        </p>

        <div className="hero-buttons">
          <button className="primary">Get Started</button>
          <button className="secondary">Learn More</button>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <h3>🧠 Mental Tracking</h3>
          <p>Monitor your emotional health daily with AI-powered mood analysis and personalized recommendations.</p>
        </div>

        <div className="card">
          <h3>📚 Resources</h3>
          <p>Access curated wellness content, meditation guides, and expert articles tailored to student life.</p>
        </div>

        <div className="card">
          <h3>💬 Instant Help</h3>
          <p>Connect with counselors and get immediate support through our 24/7 AI chat assistant.</p>
        </div>
      </div>

      <div className="usage-section">
        <h2>How to Use Our App</h2>
        <div className="usage-cards">
          <div className="usage-card">
            <h3>1. Track Your Mood</h3>
            <p>Use the mood tracker every day to understand how your feelings change over time.</p>
          </div>
          <div className="usage-card">
            <h3>2. Write Notes</h3>
            <p>Capture your thoughts and stressors directly in the app for better reflection.</p>
          </div>
          <div className="usage-card">
            <h3>3. Explore Resources</h3>
            <p>Visit the Health Resource Hub for wellness videos, self-care tips, and expert guidance.</p>
          </div>
          <div className="usage-card">
            <h3>4. Stay Connected</h3>
            <p>Check your insights regularly and reach out for support whenever you need it.</p>
          </div>
        </div>
      </div>

      <div className="about-section" id="about">
        <h2>About Student Health & Wellness</h2>
        <p>This app is built to help students improve their mental health, manage stress, and build stronger wellness habits every day.</p>
        <p>It is important because students often face academic pressure, emotional challenges, and life changes that make self-care hard to prioritize.</p>
        <p>With the app, students can track mood patterns, save personal notes, and access helpful wellness resources in one place.</p>
        <ul className="about-list">
          <li><strong>Track your mood daily:</strong> Notice changes over time and spot early signs of stress or burnout.</li>
          <li><strong>Save personal reflections:</strong> Keep your thoughts, goals, and challenges in a private journal.</li>
          <li><strong>Find helpful resources:</strong> Use the Health Resource Hub for videos, tips, and wellness guidance.</li>
          <li><strong>Stay connected:</strong> Use the app regularly to feel more supported and in control of your wellbeing.</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;