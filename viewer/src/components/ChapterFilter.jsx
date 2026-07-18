export default function ChapterFilter({ chapters, selected, onChange }) {
  return (
    <div className="filter-row" role="group" aria-label="Chapter filter">
      <span className="filter-label">Chapter</span>
      <div className="chip-row">
        <button
          type="button"
          className={`chip ${selected === 'all' ? 'chip--active' : ''}`}
          onClick={() => onChange('all')}
        >
          All
        </button>
        {chapters.map((ch) => (
          <button
            key={ch}
            type="button"
            className={`chip ${selected === ch ? 'chip--active' : ''}`}
            onClick={() => onChange(ch)}
          >
            {ch}
          </button>
        ))}
      </div>
    </div>
  )
}
