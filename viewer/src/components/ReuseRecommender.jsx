import { useMemo, useState } from 'react'
import { scoreReuse } from '../lib/catalog.js'

export default function ReuseRecommender({ figures }) {
  const [topic, setTopic] = useState('')

  const results = useMemo(() => {
    const trimmed = topic.trim()
    if (!trimmed) return []
    return scoreReuse(figures, trimmed).slice(0, 8)
  }, [figures, topic])

  return (
    <section className="recommender" aria-label="Reuse recommender">
      <div className="recommender__header">
        <h2 className="recommender__title">Reuse before you generate</h2>
        <p className="recommender__hint">
          Type a topic. Matching figures are ranked by keyword overlap with title,
          description, and tags.
        </p>
      </div>
      <label className="field">
        <span className="field__label">Topic</span>
        <input
          type="search"
          className="field__input"
          placeholder="e.g. carcinogenesis stages, cancer stem cell hierarchy…"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </label>

      {topic.trim() && results.length === 0 && (
        <p className="recommender__empty">No existing figures match this topic.</p>
      )}

      {results.length > 0 && (
        <div className="recommender__results">
          <p className="recommender__note">
            Consider reworking these before generating new artwork.
          </p>
          <ol className="recommender__list">
            {results.map(({ figure, score, matched }) => (
              <li key={figure.id} className="recommender__item">
                <div className="recommender__item-top">
                  <span className="chapter-badge">Ch {figure.chapter}</span>
                  <strong>{figure.title}</strong>
                  <span className="score-badge">score {score}</span>
                </div>
                <p className="recommender__matched">
                  Matched: {matched.join(', ')}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}
