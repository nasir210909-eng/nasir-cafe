import { Router } from 'express'
import { pool } from '../db.js'

const router = Router()

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

router.post('/orders', async (req, res) => {
  const { customer, deliveryType, paymentMethod, items, subtotal, deliveryFee, total } = req.body || {}

  if (!customer || !isNonEmptyString(customer.name) || !isNonEmptyString(customer.mobile)) {
    return res.status(400).json({ error: 'Customer name and mobile number are required.' })
  }
  if (deliveryType !== 'delivery' && deliveryType !== 'pickup') {
    return res.status(400).json({ error: 'deliveryType must be "delivery" or "pickup".' })
  }
  if (deliveryType === 'delivery' && !isNonEmptyString(customer.address)) {
    return res.status(400).json({ error: 'Delivery address is required for delivery orders.' })
  }
  if (paymentMethod !== 'cod' && paymentMethod !== 'card') {
    return res.status(400).json({ error: 'paymentMethod must be "cod" or "card".' })
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must include at least one item.' })
  }
  if (typeof subtotal !== 'number' || typeof deliveryFee !== 'number' || typeof total !== 'number') {
    return res.status(400).json({ error: 'subtotal, deliveryFee and total must be numbers.' })
  }

  try {
    const insertResult = await pool.query(
      `INSERT INTO orders
        (order_number, customer_name, mobile, email, address, notes, delivery_type, payment_method, items, subtotal, delivery_fee, total)
       VALUES ('PENDING', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id, created_at`,
      [
        customer.name.trim(),
        customer.mobile.trim(),
        customer.email?.trim() || null,
        customer.address?.trim() || null,
        customer.notes?.trim() || null,
        deliveryType,
        paymentMethod,
        JSON.stringify(items),
        subtotal,
        deliveryFee,
        total,
      ]
    )

    const { id, created_at: createdAt } = insertResult.rows[0]
    const year = new Date(createdAt).getFullYear()
    const orderNumber = `NC-${year}-${String(id).padStart(4, '0')}`

    await pool.query('UPDATE orders SET order_number = $1 WHERE id = $2', [orderNumber, id])

    res.status(201).json({ orderNumber, id, createdAt })
  } catch (err) {
    console.error('Failed to save order:', err)
    res.status(500).json({ error: 'Could not save order. Please try again.' })
  }
})

router.get('/orders/:orderNumber', async (req, res) => {
  const result = await pool.query('SELECT * FROM orders WHERE order_number = $1', [req.params.orderNumber])
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Order not found.' })
  }
  res.json(result.rows[0])
})

export default router
