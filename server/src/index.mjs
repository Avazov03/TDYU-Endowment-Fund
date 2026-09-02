import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.mjs'
import formsRoutes from './routes/forms.mjs'
import adminRoutes from './routes/admin.mjs'
import publicRoutes from './routes/public.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env') })
dotenv.config({ path: path.join(__dirname, '../../.env') })

const PORT = Number(process.env.PORT || 8787)
const HOST = process.env.HOST || '0.0.0.0'
const app = express()
app.disable('x-powered-by')

const corsOrigin = process.env.CORS_ORIGIN
app.use(
  corsOrigin
    ? cors({ origin: corsOrigin.split(',').map((s) => s.trim()).filter(Boolean) })
    : cors(),
)
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'tdyu-endowment-api' })
})

app.use('/api/auth', authRoutes)
app.use('/api/forms', formsRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/public', publicRoutes)

const root = path.join(__dirname, '../..')
const pub = path.join(root, 'public')
const uploads = path.join(__dirname, '../uploads')
app.use('/uploads', express.static(uploads))
app.use(express.static(pub))

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Server error' })
})

app.listen(PORT, HOST, () => {
  console.log(`TDYU API http://${HOST}:${PORT}`)
})
