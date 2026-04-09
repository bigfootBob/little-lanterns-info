const giEvents = [
  {
    id: 1,
    date: '2026-04-08',
    issue: 'Constipation',
    severity: 2,
    duration: '3 days',
    notes: 'Day 3. Tried Miralax half dose. Monitoring closely.',
  },
  {
    id: 2,
    date: '2026-04-05',
    issue: 'Vomiting',
    severity: 3,
    duration: '4 hours',
    notes: '2 episodes. Possibly medication-related. Reported to GI team.',
  },
  {
    id: 3,
    date: '2026-03-30',
    issue: 'Reflux',
    severity: 2,
    duration: 'Ongoing',
    notes: 'Increased frequency after diet change. Raised head of bed 30°.',
  },
  {
    id: 4,
    date: '2026-03-22',
    issue: 'Constipation',
    severity: 3,
    duration: '5 days',
    notes: 'Required medical intervention. Added fiber supplement per GI recommendation.',
  },
  {
    id: 5,
    date: '2026-03-10',
    issue: 'Bloating / Discomfort',
    severity: 2,
    duration: '1 day',
    notes: 'Resolved overnight. Possible food sensitivity — tracking correlations.',
  },
  {
    id: 6,
    date: '2026-03-02',
    issue: 'Diarrhea',
    severity: 2,
    duration: '2 days',
    notes: 'Following antibiotic course. Resolved after probiotic started.',
  },
];

const SEVERITY = {
  1: { label: 'Mild',        cls: 'sev-1' },
  2: { label: 'Moderate',    cls: 'sev-2' },
  3: { label: 'Significant', cls: 'sev-3' },
  4: { label: 'Severe',      cls: 'sev-4' },
  5: { label: 'Critical',    cls: 'sev-5' },
};

function GIPage() {
  const thisMonth = giEvents.filter((e) => e.date.startsWith('2026-04')).length;
  const issueTypes = new Set(giEvents.map((e) => e.issue)).size;

  return (
    <div className="gi-page">
      <div className="data-header">
        <h2>GI Issues</h2>
        <button className="btn btn-primary btn-sm" disabled>+ Log Event</button>
      </div>

      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-value">{giEvents.length}</div>
          <div className="stat-label">Total Logged</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{thisMonth}</div>
          <div className="stat-label">This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{issueTypes}</div>
          <div className="stat-label">Issue Types</div>
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Issue</th>
              <th>Duration</th>
              <th>Severity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {giEvents.map((event) => (
              <tr key={event.id}>
                <td>{event.date}</td>
                <td>{event.issue}</td>
                <td>{event.duration}</td>
                <td>
                  <span className={`severity-badge ${SEVERITY[event.severity].cls}`}>
                    {SEVERITY[event.severity].label}
                  </span>
                </td>
                <td className="notes-cell">{event.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GIPage;
