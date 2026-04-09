import { NavLink, Outlet } from 'react-router-dom';

function LanternsLayout() {
  return (
    <div className="lanterns-layout page-overlay">
      <div className="section-container">

        <div className="lanterns-header">
          <h1>Your Lanterns</h1>
          <p className="lead-text" style={{ textAlign: 'left', maxWidth: 'none', marginBottom: '0' }}>
            Review your child&rsquo;s health data across all tracked categories.
          </p>
        </div>

        <nav className="lanterns-subnav">
          <NavLink to="storms">Storms</NavLink>
          <NavLink to="gi">GI Issues</NavLink>
          <NavLink to="notes">Group Notes</NavLink>
        </nav>

        <div className="lanterns-content">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default LanternsLayout;
