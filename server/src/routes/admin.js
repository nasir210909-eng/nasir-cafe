import { Router } from 'express'
import { pool } from '../db.js'
import { checkCredentials, issueToken, requireAuth } from '../auth.js'

const router = Router()

router.post('/admin/login', (req, res) => {
  const { username, password } = req.body || {}
  if (!checkCredentials(username, password)) {
    return res.status(401).json({ error: 'Invalid username or password.' })
  }
  res.json({ token: issueToken() })
})

router.get('/admin/orders', requireAuth, async (req, res) => {
  const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC')
  res.json(result.rows)
})

export default router
