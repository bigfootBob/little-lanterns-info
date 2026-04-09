const storms = [
  {
    id: 1,
    date: '2026-04-07',
    time: '08:14',
    duration: '45 min',
    type: 'Tonic-Clonic',
    severity: 4,
    notes: 'Post-ictal approx 30 min. Rescue med administered. Recovered by afternoon.',
  },
  {
    id: 2,
    date: '2026-04-03',
    time: '12:32',
    duration: '2 min',
    type: 'Absence',
    severity: 2,
    notes: 'Brief, self-resolved during lunch. Teacher notified.',
  },
  {
    id: 3,
    date: '2026-03-28',
    time: '07:05',
    duration: '8 min',
    type: 'Focal',
    severity: 3,
    notes: 'Morning. Possibly triggered by low-grade fever (99.8°F overnight).',
  },
  {
    id: 4,
    date: '2026-03-21',
    time: '22:47',
    duration: '3 min',
    type: 'Absence',
    severity: 1,
    notes: 'Late night. Short duration, low severity. Went back to sleep.',
  },
  {
    id: 5,
    date: '2026-03-14',
    time: '09:30',
    duration: '12 min',
    type: 'Tonic-Clonic',
    severity: 4,
    notes: 'Rescue med administered at 5 min mark. Recovered in approx 2 hours.',
  },
  {
    id: 6,
    date: '2026-03-06',
    time: '14:15',
    duration: '1 min',
    type: 'Absence',
    severity: 1,
    notes: 'During OT session. Therapist documented and notified parents.',
  },
];

const SEVERITY = {
  1: { label: 'Mild',        cls: 'sev-1' },
  2: { label: 'Low',         cls: 'sev-2' },
  3: { label: 'Moderate',    cls: 'sev-3' },
  4: { label: 'Significant', cls: 'sev-4' },
  5: { label: 'Severe',      cls: 'sev-5' },
};

function StormsPage() {
  const thisMonth = storms.filter((s) => s.date.startsWith('2026-04')).length;
  const avgSev = (storms.reduce((acc, s) => acc + s.severity, 0) / storms.length).toFixed(1);

  return (
    <div className="storms-page">
      <div className="data-header">
        <h2>Storm Log</h2>
        <button className="btn btn-primary btn-sm" disabled>+ Log Storm</button>
      </div>

      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-value">{storms.length}</div>
          <div className="stat-label">Total Logged</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{thisMonth}</div>
          <div className="stat-label">This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgSev}</div>
          <div className="stat-label">Avg Severity</div>
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Severity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {storms.map((storm) => (
              <tr key={storm.id}>
                <td>{storm.date}</td>
                <td>{storm.time}</td>
                <td>{storm.type}</td>
                <td>{storm.duration}</td>
                <td>
                  <span className={`severity-badge ${SEVERITY[storm.severity].cls}`}>
                    {SEVERITY[storm.severity].label}
                  </span>
                </td>
                <td className="notes-cell">{storm.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StormsPage;
