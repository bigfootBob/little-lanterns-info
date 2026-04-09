import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="main-nav">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          Little Lanterns
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/get-started">Get Started</NavLink>
          <NavLink to="/community">Community</NavLink>
          <NavLink to="/lanterns">Your Lanterns</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
