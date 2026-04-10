import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CALM_BY_MAP = {
  seizure_stopped: { label: 'Seizure Ceased',      color: '#4caf50' },
  sensory_comfort: { label: 'Sensory & Comfort',   color: '#2196f3' },
  pressure:        { label: 'Pressure & Proprio.', color: '#9c27b0' },
  vestibular:      { label: 'Vestibular',          color: '#ff9800' },
  environment:     { label: 'Environment & Hydro', color: '#009688' },
  other:           { label: 'Other',               color: '#78909c' },
};

function EffectiveInterventionsChart({ episodes }) {
  const counts = {};
  episodes.forEach((ep) => {
    const key     = ep.calmed_by || 'other';
    counts[key]   = (counts[key] || 0) + 1;
  });

  const data = Object.entries(counts).map(([key, value]) => ({
    name:  CALM_BY_MAP[key]?.label ?? key,
    value,
    color: CALM_BY_MAP[key]?.color ?? '#78909c',
  }));

  if (data.length === 0) {
    return <div className="chart-empty">No intervention data yet</div>;
  }

  const total = data.reduce((s, d) => s + d.value, 0);

  function renderLabel({ cx, cy, midAngle, innerRadius, outerRadius, value }) {
    if (value / total < 0.05) return null; // skip tiny slices
    const RADIAN = Math.PI / 180;
    const r      = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x      = cx + r * Math.cos(-midAngle * RADIAN);
    const y      = cy + r * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={600}>
        {`${Math.round((value / total) * 100)}%`}
      </text>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={210}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="46%"
          innerRadius={48}
          outerRadius={80}
          dataKey="value"
          labelLine={false}
          label={renderLabel}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} stroke="rgba(0,0,0,0.2)" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: 'rgba(26,42,45,0.97)',
            border: '1px solid rgba(255,204,51,0.25)',
            borderRadius: 4,
            fontSize: '0.78rem',
          }}
          formatter={(value, name) => [
            `${value} (${Math.round((value / total) * 100)}%)`,
            name,
          ]}
        />
        <Legend
          iconSize={8}
          wrapperStyle={{ fontSize: '0.72rem', paddingTop: 8 }}
          formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.6)' }}>{v}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EffectiveInterventionsChart;
