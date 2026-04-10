import { useLanterns } from '../../contexts/LanternsContext';
import { useGILogs } from '../../hooks/useFirestoreData';

// Bristol Stool Scale: 1-2 constipated, 3-5 normal, 6-7 loose
function getBristolInfo(type) {
  if (type <= 2) return { label: `Type ${type} — Constipated`, cls: 'gi-constipated' };
  if (type <= 5) return { label: `Type ${type} — Normal`,      cls: 'gi-normal'      };
  return           { label: `Type ${type} — Loose`,            cls: 'gi-loose'       };
}

function GIPage() {
  const { childId }                           = useLanterns();
  const { data: giLogs, loading, error }      = useGILogs(childId);

  if (!childId) return <div className="data-loading">Select a child profile above to view data.</div>;
  if (loading)  return <div className="data-loading"><div className="spinner" />Loading GI data&hellip;</div>;
  if (error)    return <div className="data-loading" style={{ color: '#e57373' }}>Error loading data.</div>;

  const now        = new Date();
  const thisMonth  = giLogs.filter(
    (g) => g.timestamp.getMonth() === now.getMonth() && g.timestamp.getFullYear() === now.getFullYear(),
  ).length;
  const constipated = giLogs.filter((g) => g.type <= 2).length;
  const loose       = giLogs.filter((g) => g.type >= 6).length;

  return (
    <div className="gi-page">
      <div className="data-header">
        <h2>GI Issues</h2>
      </div>

      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-value">{giLogs.length}</div>
          <div className="stat-label">Total Logged</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{thisMonth}</div>
          <div className="stat-label">This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{constipated}</div>
          <div className="stat-label">Constipated</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{loose}</div>
          <div className="stat-label">Loose</div>
        </div>
      </div>

      {giLogs.length === 0 ? (
        <div className="chart-empty">No GI events logged yet.</div>
      ) : (
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Bristol Type</th>
              </tr>
            </thead>
            <tbody>
              {giLogs.map((log) => {
                const info = getBristolInfo(log.type);
                return (
                  <tr key={log.id}>
                    <td>{log.timestamp.toLocaleDateString('en-US')}</td>
                    <td>{log.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td>
                      <span className={`gi-badge ${info.cls}`}>{info.label}</span>
                    </td>
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

export default GIPage;
