import { useMemo, useState } from 'react'
import ChapterFilter from './components/ChapterFilter.jsx'
import TagFilter from './components/TagFilter.jsx'
import FigureCard from './components/FigureCard.jsx'
import ReuseRecommender from './components/ReuseRecommender.jsx'
import {
  collectChapters,
  collectTags,
  loadFigures,
} from './lib/catalog.js'

const ALL_FIGURES = loadFigures()

export default function App() {
  const [chapter, setChapter] = useState('all')
  const [selectedTags, setSelectedTags] = useState([])
  const [query, setQuery] = useState('')

  const chapters = useMemo(() => collectChapters(ALL_FIGURES), [])
  const tags = useMemo(() => collectTags(ALL_FIGURES), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return ALL_FIGURES.filter((fig) => {
      if (chapter !== 'all' && fig.chapter !== chapter) return false

      if (selectedTags.length > 0) {
        const figTags = new Set(fig.tags ?? [])
        if (!selectedTags.every((t) => figTags.has(t))) return false
      }

      if (q) {
        const hay = `${fig.title} ${fig.description}`.toLowerCase()
        if (!hay.includes(q)) return false
      }

      return true
    })
  }, [chapter, selectedTags, query])

  function toggleTag(tag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )
  }

  return (
    <div className="app">
      <header className="hero">
        <p className="hero__brand">Medhavy Bio-Art</p>
        <h1 className="hero__title">Figure browser</h1>
        <p className="hero__sub">
          Browse the catalog from <code>index.json</code>. Filter by chapter and
          tags, or check for reusable figures before commissioning new ones.
        </p>
      </header>

      <ReuseRecommender figures={ALL_FIGURES} />

      <section className="controls" aria-label="Catalog filters">
        <label className="field">
          <span className="field__label">Search</span>
          <input
            type="search"
            className="field__input"
            placeholder="Search title or description…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <ChapterFilter
          chapters={chapters}
          selected={chapter}
          onChange={setChapter}
        />

        <TagFilter
          tags={tags}
          selected={selectedTags}
          onToggle={toggleTag}
        />
      </section>

      <section className="results" aria-live="polite">
        <p className="results__count">
          {filtered.length} figure{filtered.length === 1 ? '' : 's'}
          {selectedTags.length > 0 ? ' · matching all selected tags' : ''}
        </p>

        {filtered.length === 0 ? (
          <p className="results__empty">No figures match these filters.</p>
        ) : (
          <div className="figure-grid">
            {filtered.map((fig) => (
              <FigureCard
                key={fig.id}
                figure={fig}
                highlightedTags={selectedTags}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
