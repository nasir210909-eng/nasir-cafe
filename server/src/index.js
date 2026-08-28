import express from 'express'
import cors from 'cors'
import { ensureSchema } from './db.js'
import ordersRouter from './routes/orders.js'
import adminRouter from './routes/admin.js'

const app = express()
const port = process.env.PORT || 4000

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())

app.use(
  cors({
    origin: allowedOrigins,
  })
)
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api', ordersRouter)
app.use('/api', adminRouter)

async function start() {
  await ensureSchema()
  app.listen(port, () => {
    console.log(`NASIR CAFÉ API listening on port ${port}`)
  })
}

start().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
