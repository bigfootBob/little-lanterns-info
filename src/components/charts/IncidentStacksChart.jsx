import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import { getDateRange, getPeriodKey, formatPeriodLabel } from '../../lib/chartUtils';

function IncidentStacksChart({ episodes, giLogs, range }) {
  const { cutoff, groupBy } = getDateRange(range);

  const filteredEps = episodes.filter((e) => e.timestamp >= cutoff);
  const filteredGI  = giLogs.filter((g)  => g.timestamp >= cutoff);

  const allKeys = new Set([
    ...filteredEps.map((e) => getPeriodKey(e.timestamp, groupBy)),
    ...filteredGI.map((g)  => getPeriodKey(g.timestamp, groupBy)),
  ]);

  const data = [...allKeys].sort().map((key) => ({
    label:         formatPeriodLabel(key, groupBy),
    'GI Distress': filteredGI.filter((g)  => getPeriodKey(g.timestamp, groupBy) === key).length,
    Storms:        filteredEps.filter((e) => getPeriodKey(e.timestamp, groupBy) === key).length,
  }));

  if (data.length === 0) {
    return <div className="chart-empty">No data for this period</div>;
  }

  return (
    <>
      <div aria-hidden="true">
        <ResponsiveContainer width="100%" height={210}>
          <BarChart data={data} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: 'rgba(255,255,255,0.78)', fontSize: 10 }}
              stroke="rgba(255,255,255,0.08)"
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.78)', fontSize: 10 }}
              stroke="rgba(255,255,255,0.08)"
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(26,42,45,0.97)',
                border: '1px solid rgba(255,204,51,0.25)',
                borderRadius: 4,
                fontSize: '0.78rem',
              }}
              labelStyle={{ color: 'rgba(255,255,255,0.85)', marginBottom: 4 }}
              itemStyle={{ color: '#fff' }}
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            />
            <Legend
              wrapperStyle={{ fontSize: '0.75rem', paddingTop: 8 }}
              formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.85)' }}>{v}</span>}
            />
            <Bar dataKey="GI Distress" stackId="a" fill="#e57373" />
            <Bar dataKey="Storms"      stackId="a" fill="#ffcc33" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>GI distress and storm incidents per period</caption>
        <thead>
          <tr><th scope="col">Period</th><th scope="col">GI Distress</th><th scope="col">Storms</th></tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row['GI Distress']}</td>
              <td>{row.Storms}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default IncidentStacksChart;
