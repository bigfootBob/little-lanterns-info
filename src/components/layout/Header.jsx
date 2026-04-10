import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import GoogleLoginButton from '../auth/GoogleLoginButton.jsx';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="main-nav">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo" onClick={closeMenu}>
          Little Lanterns
        </NavLink>
        <button
          className={`nav-hamburger${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav-links${menuOpen ? ' is-open' : ''}`}>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/get-started" onClick={closeMenu}>Get Started</NavLink>
          <NavLink to="/community" onClick={closeMenu}>Community</NavLink>
          <NavLink to="/lanterns" onClick={closeMenu}>Your Lanterns</NavLink>
          <div className="nav-auth-mobile">
            <GoogleLoginButton />
          </div>
        </nav>
        <div className="nav-auth-desktop">
          <GoogleLoginButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
