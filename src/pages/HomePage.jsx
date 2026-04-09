import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">Little Lanterns</h1>
          <p className="hero-subtitle">
            A guiding light for families navigating SCN2A &mdash; tracking storms,
            monitoring health, and building community together.
          </p>
          <div className="hero-actions">
            <Link to="/get-started" className="btn btn-primary">Get Started</Link>
            <Link to="/about" className="btn btn-outline">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="features-preview">
        <h2 className="section-title">Everything Your Care Team Needs</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrap">Storm</div>
            <h3>Storm Tracking</h3>
            <p>Log seizure events with date, duration, type, and severity. View patterns over time to share with your neurologist.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">GI</div>
            <h3>GI Monitoring</h3>
            <p>Track gastrointestinal issues common in SCN2A children to identify patterns, triggers, and responses to treatment.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">Notes</div>
            <h3>Group Notes</h3>
            <p>A shared journal for your entire care network &mdash; parents, grandparents, educators, and therapists in one place.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">Care</div>
            <h3>Multi-Caregiver</h3>
            <p>Multiple caregivers can log data for the same child, keeping everyone aligned regardless of who is present that day.</p>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div>
          <h2>Ready to light the way?</h2>
          <p>
            Join the growing community of SCN2A families using Little Lanterns
            to take control of their data and connect with others who understand.
          </p>
          <Link to="/get-started" className="btn btn-primary">Download the App</Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
