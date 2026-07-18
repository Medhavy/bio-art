import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

function mimeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.webp') return 'image/webp'
  if (ext === '.svg') return 'image/svg+xml'
  if (ext === '.gif') return 'image/gif'
  return 'application/octet-stream'
}

/** Serve ../images (and keep paths with spaces working via decodeURIComponent). */
function serveRepoImages() {
  return {
    name: 'serve-repo-images',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/images/')) return next()

        const pathname = decodeURIComponent(req.url.split('?')[0])
        const filePath = path.resolve(repoRoot, '.' + pathname)

        if (!filePath.startsWith(repoRoot) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
          return next()
        }

        res.setHeader('Content-Type', mimeFor(filePath))
        fs.createReadStream(filePath).pipe(res)
      })
    },
    closeBundle() {
      const src = path.join(repoRoot, 'images')
      const dest = path.join(__dirname, 'dist', 'images')
      if (fs.existsSync(src)) {
        fs.cpSync(src, dest, { recursive: true })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), serveRepoImages()],
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
})
