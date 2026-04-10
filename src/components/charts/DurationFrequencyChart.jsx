import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { groupItemsByPeriod, formatPeriodLabel } from '../../lib/chartUtils';

function DurationFrequencyChart({ episodes, range }) {
  const { map, groupBy } = groupItemsByPeriod(episodes, range);

  const data = [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, items]) => {
      const totalSec = items.reduce((s, e) => s + (e.duration_seconds || 0), 0);
      return {
        label:             formatPeriodLabel(key, groupBy),
        Count:             items.length,
        'Avg Duration':    items.length > 0 ? Math.round((totalSec / items.length / 60) * 10) / 10 : 0,
      };
    });

  if (data.length === 0) {
    return <div className="chart-empty">No storm data for this period</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={210}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="label"
          tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 10 }}
          stroke="rgba(255,255,255,0.08)"
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 10 }}
          stroke="rgba(255,255,255,0.08)"
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(26,42,45,0.97)',
            border: '1px solid rgba(255,204,51,0.25)',
            borderRadius: 4,
            fontSize: '0.78rem',
          }}
          labelStyle={{ color: 'rgba(255,255,255,0.55)', marginBottom: 4 }}
          itemStyle={{ color: '#fff' }}
        />
        <Legend
          wrapperStyle={{ fontSize: '0.75rem', paddingTop: 8 }}
          formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.6)' }}>{v}</span>}
        />
        <Line
          type="monotone"
          dataKey="Count"
          stroke="#ffcc33"
          strokeWidth={2}
          dot={{ r: 3, fill: '#ffcc33', strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="Avg Duration"
          stroke="#4caf50"
          strokeWidth={2}
          strokeDasharray="5 3"
          dot={{ r: 3, fill: '#4caf50', strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DurationFrequencyChart;
