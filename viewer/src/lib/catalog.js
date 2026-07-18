import catalog from '../../../index.json'

/** Encode each path segment so spaces in "Chapter 02" become %20. */
export function encodeImageSrc(filePath) {
  return (
    '/' +
    filePath
      .split('/')
      .filter(Boolean)
      .map((segment) => encodeURIComponent(segment))
      .join('/')
  )
}

/** Derive chapter from path, e.g. images/Chapter 02/foo.png → "02". */
export function chapterFromFile(filePath) {
  const match = filePath.match(/Chapter\s+(\d+)/i)
  return match ? match[1].padStart(2, '0') : '??'
}

export function loadFigures() {
  return Object.values(catalog).map((entry) => ({
    ...entry,
    chapter: chapterFromFile(entry.file),
    src: encodeImageSrc(entry.file),
  }))
}

export function collectTags(figures) {
  const set = new Set()
  for (const fig of figures) {
    for (const tag of fig.tags ?? []) set.add(tag)
  }
  return [...set].sort((a, b) => a.localeCompare(b))
}

export function collectChapters(figures) {
  return [...new Set(figures.map((f) => f.chapter))].sort()
}

function tokenize(text) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((t) => t.length > 1)
}

/** Score figures by keyword overlap with a topic query. */
export function scoreReuse(figures, topic) {
  const queryTokens = tokenize(topic)
  if (queryTokens.length === 0) return []

  return figures
    .map((fig) => {
      const haystack = tokenize(
        [fig.title, fig.description, ...(fig.tags ?? [])].join(' '),
      )
      const haySet = new Set(haystack)
      const matched = queryTokens.filter((t) => haySet.has(t))
      const score = matched.length
      return { figure: fig, score, matched }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.figure.title.localeCompare(b.figure.title))
}
