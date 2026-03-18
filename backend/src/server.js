require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { initDb } = require('./db/init')
const dentistsRouter = require('./routes/dentists')
const appointmentsRouter = require('./routes/appointments')
const { fail } = require('./lib/http')

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'

async function main() {
  await initDb()

  const app = express()
  app.use(express.json())
  app.use(
    cors({
      origin: FRONTEND_ORIGIN,
    })
  )

  app.get('/health', (_req, res) => res.json({ ok: true }))

  app.use('/api/dentists', dentistsRouter)
  app.use('/api/appointments', appointmentsRouter)

  app.use((_req, res) => fail(res, 404, 'Not found'))

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    return fail(res, 500, 'Unexpected server error')
  })

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${PORT}`)
  })
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})

