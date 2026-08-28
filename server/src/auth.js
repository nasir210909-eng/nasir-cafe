import crypto from 'node:crypto'

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000 // 12 hours

function getSecret() {
  const secret = process.env.ADMIN_TOKEN_SECRET
  if (!secret) throw new Error('ADMIN_TOKEN_SECRET environment variable is required')
  return secret
}

function sign(value) {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('base64url')
}

export function issueToken() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + TOKEN_TTL_MS })).toString(
    'base64url'
  )
  return `${payload}.${sign(payload)}`
}

export function verifyToken(token) {
  if (typeof token !== 'string' || !token.includes('.')) return false
  const [payload, signature] = token.split('.')
  const expected = sign(payload)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false

  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return typeof exp === 'number' && exp > Date.now()
  } catch {
    return false
  }
}

export function checkCredentials(username, password) {
  const expectedUser = process.env.ADMIN_USERNAME
  const expectedPass = process.env.ADMIN_PASSWORD
  if (!expectedUser || !expectedPass) {
    throw new Error('ADMIN_USERNAME/ADMIN_PASSWORD environment variables are required')
  }
  const userBuf = Buffer.from(String(username || ''))
  const expectedUserBuf = Buffer.from(expectedUser)
  const passBuf = Buffer.from(String(password || ''))
  const expectedPassBuf = Buffer.from(expectedPass)

  const userOk =
    userBuf.length === expectedUserBuf.length && crypto.timingSafeEqual(userBuf, expectedUserBuf)
  const passOk =
    passBuf.length === expectedPassBuf.length && crypto.timingSafeEqual(passBuf, expectedPassBuf)

  return userOk && passOk
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}
