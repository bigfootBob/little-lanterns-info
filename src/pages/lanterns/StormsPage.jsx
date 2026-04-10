import { useLanterns } from '../../contexts/LanternsContext';
import { useEpisodes } from '../../hooks/useFirestoreData';

const CALM_BY = {
  seizure_stopped: { label: 'Seizure Ceased',     color: '#4caf50', bg: 'rgba(76,175,80,0.15)',    br: 'rgba(76,175,80,0.4)'    },
  sensory_comfort: { label: 'Sensory & Comfort',  color: '#2196f3', bg: 'rgba(33,150,243,0.15)',   br: 'rgba(33,150,243,0.4)'   },
  pressure:        { label: 'Pressure',           color: '#9c27b0', bg: 'rgba(156,39,176,0.15)',   br: 'rgba(156,39,176,0.4)'   },
  vestibular:      { label: 'Vestibular',         color: '#ff9800', bg: 'rgba(255,152,0,0.15)',    br: 'rgba(255,152,0,0.4)'    },
  environment:     { label: 'Environment',        color: '#009688', bg: 'rgba(0,150,136,0.15)',    br: 'rgba(0,150,136,0.4)'    },
  other:           { label: 'Other',              color: '#78909c', bg: 'rgba(120,144,156,0.15)',  br: 'rgba(120,144,156,0.4)'  },
};

function formatDuration(seconds) {
  if (!seconds) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

function StormsPage() {
  const { childId }                              = useLanterns();
  const { data: episodes, loading, error }       = useEpisodes(childId);

  if (!childId)  return <div className="data-loading">Select a child profile above to view data.</div>;
  if (loading)   return <div className="data-loading"><div className="spinner" />Loading storms&hellip;</div>;
  if (error)     return <div className="data-loading" style={{ color: '#e57373' }}>Error loading data. Check your connection and Firestore indexes.</div>;

  const now       = new Date();
  const thisMonth = episodes.filter(
    (e) => e.timestamp.getMonth() === now.getMonth() && e.timestamp.getFullYear() === now.getFullYear(),
  ).length;

  const avgSec =
    episodes.length > 0
      ? Math.round(episodes.reduce((s, e) => s + (e.duration_seconds || 0), 0) / episodes.length)
      : null;

  return (
    <div className="storms-page">
      <div className="data-header">
        <h2>Storm Log</h2>
      </div>

      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-value">{episodes.length}</div>
          <div className="stat-label">Total Logged</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{thisMonth}</div>
          <div className="stat-label">This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgSec != null ? formatDuration(avgSec) : '—'}</div>
          <div className="stat-label">Avg Duration</div>
        </div>
      </div>

      {episodes.length === 0 ? (
        <div className="chart-empty">No storms logged yet.</div>
      ) : (
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Calmed By</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((ep) => {
                const calm = CALM_BY[ep.calmed_by] ?? {
                  label: ep.calmed_by || '—',
                  color: '#78909c',
                  bg:    'rgba(120,144,156,0.15)',
                  br:    'rgba(120,144,156,0.4)',
                };
                return (
                  <tr key={ep.id}>
                    <td>{ep.timestamp.toLocaleDateString('en-US')}</td>
                    <td>{ep.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td>{formatDuration(ep.duration_seconds)}</td>
                    <td>
                      {ep.calmed_by ? (
                        <span
                          className="calmed-by-badge"
                          style={{ color: calm.color, background: calm.bg, borderColor: calm.br }}
                        >
                          {calm.label}
                        </span>
                      ) : '—'}
                    </td>
                    <td className="notes-cell">{ep.notes || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StormsPage;
