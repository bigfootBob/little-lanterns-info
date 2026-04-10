import { useState } from 'react';
import { useLanterns } from '../../contexts/LanternsContext';
import { useEpisodes, useGILogs } from '../../hooks/useFirestoreData';
import RangeSelector from '../../components/charts/RangeSelector';
import EpisodeHeatmap from '../../components/charts/EpisodeHeatmap';
import IncidentStacksChart from '../../components/charts/IncidentStacksChart';
import DurationFrequencyChart from '../../components/charts/DurationFrequencyChart';
import EffectiveInterventionsChart from '../../components/charts/EffectiveInterventionsChart';

function formatDuration(seconds) {
  if (!seconds) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

function OverviewPage() {
  const { childId } = useLanterns();
  const [range, setRange] = useState('90d');

  const { data: episodes, loading: epLoading } = useEpisodes(childId);
  const { data: giLogs,   loading: giLoading } = useGILogs(childId);

  if (!childId) {
    return <div className="data-loading">Select a child profile above to view data.</div>;
  }

  if (epLoading || giLoading) {
    return (
      <div className="data-loading">
        <div className="spinner" />
        Loading your data&hellip;
      </div>
    );
  }

  const avgDuration =
    episodes.length > 0
      ? Math.round(episodes.reduce((s, e) => s + (e.duration_seconds || 0), 0) / episodes.length)
      : null;

  return (
    <div className="overview-page">
      <div className="overview-header">
        <div className="stat-cards" style={{ marginBottom: 0 }}>
          <div className="stat-card">
            <div className="stat-value">{episodes.length}</div>
            <div className="stat-label">Total Storms</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{giLogs.length}</div>
            <div className="stat-label">GI Events</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{avgDuration != null ? formatDuration(avgDuration) : '—'}</div>
            <div className="stat-label">Avg Duration</div>
          </div>
        </div>
        <RangeSelector value={range} onChange={setRange} />
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <div className="chart-card-header">
            <h3>Episode Heatmap</h3>
            <p className="chart-subtitle">Distribution of episodes over 24 hours</p>
          </div>
          <EpisodeHeatmap episodes={episodes} />
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <h3>Incident Stacks</h3>
            <p className="chart-subtitle">Red = GI Distress &nbsp;|&nbsp; Yellow = Storms</p>
          </div>
          <IncidentStacksChart episodes={episodes} giLogs={giLogs} range={range} />
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <h3>Duration vs. Frequency</h3>
            <p className="chart-subtitle">Solid = Count &nbsp;|&nbsp; Dashed = Avg Duration (mins)</p>
          </div>
          <DurationFrequencyChart episodes={episodes} range={range} />
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <h3>Effective Interventions</h3>
            <p className="chart-subtitle">What successfully resolved the storm?</p>
          </div>
          <EffectiveInterventionsChart episodes={episodes} />
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
