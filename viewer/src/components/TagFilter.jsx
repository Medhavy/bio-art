export default function TagFilter({ tags, selected, onToggle }) {
  if (tags.length === 0) return null

  return (
    <div className="filter-row" role="group" aria-label="Tag filter">
      <span className="filter-label">Tags</span>
      <div className="chip-row chip-row--wrap">
        {tags.map((tag) => {
          const active = selected.includes(tag)
          return (
            <button
              key={tag}
              type="button"
              className={`pill ${active ? 'pill--active' : ''}`}
              onClick={() => onToggle(tag)}
              aria-pressed={active}
            >
              {tag}
            </button>
          )
        })}
      </div>
    </div>
  )
}
