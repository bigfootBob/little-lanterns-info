const RANGES = [
  ['30d', '30 Days'],
  ['90d', '90 Days'],
  ['ytd', 'YTD'],
];

function RangeSelector({ value, onChange }) {
  return (
    <div className="range-selector">
      {RANGES.map(([key, label]) => (
        <button
          key={key}
          className={`range-btn${value === key ? ' active' : ''}`}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default RangeSelector;
