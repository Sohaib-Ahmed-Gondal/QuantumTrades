// pages/api/paypal/create-order.js
import { client } from '../../../lib/paypal'

export default async function handler(req, res) {
  const request = new paypal.orders.OrdersCreateRequest()
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '100.00' // Dynamic in real usage
      }
    }]
  })

  try {
    const response = await client.execute(request)
    res.status(200).json({ id: response.result.id })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}