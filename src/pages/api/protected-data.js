// pages/api/protected-data.js
import { getToken } from 'next-auth/jwt'

export default async function handler(req, res) {
  const token = await getToken({ req })
  
  if (!token) {
    return res.status(401).json({ error: 'Access Denied' })
  }

  // Simulate database fetch
  const premiumData = {
    magicNumber: Math.floor(Math.random() * 1000),
    secretKey: Buffer.from(token.email).toString('base64'),
    timestamp: new Date().toISOString(),
    user: {
      name: token.name,
      email: token.email,
      image: token.picture
    }
  }

  res.status(200).json(premiumData)
}