const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function EpisodeHeatmap({ episodes }) {
  // Build 7 (day-of-week) × 24 (hour) grid
  const grid = Array.from({ length: 7 }, () => Array(24).fill(0));

  episodes.forEach((ep) => {
    const d = ep.timestamp;
    if (d instanceof Date && !isNaN(d)) {
      grid[d.getDay()][d.getHours()]++;
    }
  });

  const maxCount = Math.max(1, ...grid.flat());

  return (
    <div className="heatmap-wrapper">
      {/* Column hour labels — shown every 4 hours */}
      <div className="heatmap-col-labels">
        <span className="hm-corner" />
        {Array.from({ length: 24 }, (_, h) => (
          <span key={h} className="hm-col-label">
            {h % 4 === 0 ? `${h}:00` : ''}
          </span>
        ))}
      </div>

      {/* Rows */}
      {DAYS.map((day, dayIdx) => (
        <div key={day} className="heatmap-row">
          <span className="hm-row-label">{day}</span>
          <div className="hm-cells">
            {Array.from({ length: 24 }, (_, hour) => {
              const count     = grid[dayIdx][hour];
              const intensity = count / maxCount;
              return (
                <div
                  key={hour}
                  className="hm-cell"
                  title={count > 0 ? `${day} ${hour}:00 — ${count} event${count !== 1 ? 's' : ''}` : undefined}
                  style={{
                    backgroundColor:
                      count > 0
                        ? `rgba(255, 204, 51, ${0.12 + intensity * 0.88})`
                        : 'rgba(44, 74, 79, 0.35)',
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="heatmap-legend">
        <span>Less</span>
        <div className="legend-gradient" />
        <span>More</span>
      </div>
    </div>
  );
}

export default EpisodeHeatmap;
