// pages/api/paypal/capture-order.js
import { client } from '../../../lib/paypal'

export default async function handler(req, res) {
  const { orderID } = req.body
  const request = new paypal.orders.OrdersCaptureRequest(orderID)

  try {
    const response = await client.execute(request)
    res.status(200).json(response.result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}