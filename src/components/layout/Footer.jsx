import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-bar">
      <div className="footer-container">
        <div>
          <span className="footer-logo">Little Lanterns</span>
          <p className="footer-tagline">
            A guiding light for families navigating SCN2A &mdash; tracking storms,
            monitoring health, and building community together.
          </p>
        </div>

        <nav className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/get-started">Get Started</Link>
          <Link to="/community">Community</Link>
          <Link to="/lanterns">Your Lanterns</Link>
        </nav>

        <div className="footer-legal">
          <p>&copy; {new Date().getFullYear()} Little Lanterns Companion</p>
          <p>Built with love for the SCN2A community.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
