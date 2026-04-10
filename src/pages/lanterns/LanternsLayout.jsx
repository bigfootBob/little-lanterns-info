import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useChildren } from '../../hooks/useFirestoreData';
import { LanternsContext } from '../../contexts/LanternsContext';

function LanternsLayout() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const { children, loading: childrenLoading }           = useChildren(user?.uid);
  const [selectedChildId, setSelectedChildId]            = useState(null);

  // Auto-select when there is exactly one child profile
  useEffect(() => {
    if (children.length === 1) setSelectedChildId(children[0].id);
  }, [children]);

  // ── Auth loading ────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="lanterns-layout page-overlay">
        <div className="section-container">
          <div className="data-loading"><div className="spinner" /></div>
        </div>
      </div>
    );
  }

  // ── Not signed in ────────────────────────────────────────
  if (!user) {
    return (
      <div className="lanterns-layout page-overlay">
        <div className="section-container">
          <div className="lanterns-signin-gate">
            <h2>Your Lanterns</h2>
            <p>
              Sign in with the Google account linked to your Little Lanterns app to
              access your child&rsquo;s storm log, GI tracking, and care team notes.
            </p>
            <button className="btn btn-primary" onClick={signInWithGoogle}>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Signed in ────────────────────────────────────────────
  return (
    <div className="lanterns-layout page-overlay">
      <div className="section-container">

        <div className="lanterns-header">
          <h1>Your Lanterns</h1>

          {childrenLoading && (
            <p className="lanterns-child-name">Loading profiles&hellip;</p>
          )}

          {!childrenLoading && children.length === 0 && (
            <p className="lanterns-child-name">
              No child profiles found. Create a profile in the Little Lanterns app to get started.
            </p>
          )}

          {!childrenLoading && children.length === 1 && (
            <p className="lanterns-child-name">
              Viewing data for&nbsp;
              <strong style={{ color: '#ffcc33' }}>{children[0].name}</strong>
            </p>
          )}

          {!childrenLoading && children.length > 1 && (
            <div className="child-selector-bar">
              <label htmlFor="child-select">Viewing:</label>
              <select
                id="child-select"
                value={selectedChildId ?? ''}
                onChange={(e) => setSelectedChildId(e.target.value)}
              >
                <option value="" disabled>Select a child</option>
                {children.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <nav className="lanterns-subnav">
          <NavLink to="overview">Overview</NavLink>
          <NavLink to="storms">Storms</NavLink>
          <NavLink to="gi">GI Issues</NavLink>
          <NavLink to="notes">Group Notes</NavLink>
        </nav>

        <LanternsContext.Provider value={{ childId: selectedChildId }}>
          <div className="lanterns-content">
            <Outlet />
          </div>
        </LanternsContext.Provider>

      </div>
    </div>
  );
}

export default LanternsLayout;
