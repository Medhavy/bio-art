# Medhavy Bio-Art Library

A public catalog of biological and scientific artwork — illustrations, diagrams, and visual assets related to life sciences, medicine, and biotechnology.

## What this is

This repository stores:

- **Images** — artwork files in `images/`
- **Metadata** — structured records in `index.json` (title, artist, tags, license, source, etc.)

It is intended for researchers, educators, designers, and anyone who needs high-quality bio-related visuals with clear attribution.

## Repository layout

```
bio-art/
├── images/       # Artwork assets
├── index.json    # Catalog of all entries
└── README.md
```

## `index.json` schema (suggested)

Each entry could look like:

```json
{
  "id": "cell-membrane-01",
  "title": "Cell Membrane Cross-Section",
  "artist": "Artist Name",
  "year": 2026,
  "tags": ["cell biology", "membrane", "illustration"],
  "file": "images/cell-membrane-01.png",
  "license": "CC BY 4.0",
  "description": "Cross-sectional illustration of a eukaryotic cell membrane.",
  "source": "https://example.com"
}
```

## Browse the collection

Open [`index.json`](./index.json) for the full catalog. Each entry's `file` field points to an asset in `images/`.

## Contributing

Contributions are welcome via pull request.

1. Place the image in `images/` using a clear, kebab-case filename
2. Add a complete entry to `index.json`
3. Include license and attribution information
4. Open a PR with a short description of what you're adding

## Guidelines

- Prefer original work or properly licensed third-party art
- Include artist name, year, and license for every entry
- Use descriptive tags (e.g. `genetics`, `anatomy`, `microscopy`)
- Keep file sizes reasonable; prefer SVG for diagrams when possible

## License

Specify a default license for the collection (e.g. CC BY 4.0) and per-entry overrides in `index.json` where needed.

## Contact

Maintained by the [Medhavy](https://github.com/Medhavy) organization.
