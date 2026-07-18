export default function FigureCard({ figure, highlightedTags = [] }) {
  const highlightSet = new Set(highlightedTags)

  return (
    <article className="figure-card">
      <div className="figure-card__media">
        <img
          src={figure.src}
          alt=""
          loading="lazy"
          className="figure-card__image"
        />
      </div>
      <div className="figure-card__body">
        <div className="figure-card__meta-row">
          <span className="chapter-badge">Ch {figure.chapter}</span>
          <span className="figure-card__year">{figure.year}</span>
        </div>
        <h2 className="figure-card__title">{figure.title}</h2>
        <p className="figure-card__description">{figure.description}</p>
        <ul className="figure-card__tags">
          {(figure.tags ?? []).map((tag) => (
            <li
              key={tag}
              className={`tag-dot ${highlightSet.has(tag) ? 'tag-dot--match' : ''}`}
            >
              {tag}
            </li>
          ))}
        </ul>
        <p className="figure-card__source">
          <span className="muted">Source</span> {figure.source}
          {figure.artist ? ` · ${figure.artist}` : ''}
        </p>
      </div>
    </article>
  )
}
