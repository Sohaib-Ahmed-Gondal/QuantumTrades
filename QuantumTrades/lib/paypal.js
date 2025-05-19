// lib/paypal.js
import paypal from '@paypal/checkout-server-sdk'

const clientId = 'AcnoPTFqgaaQ_7mfd7T2lMGOlBCs1XdN5QYhTxQvht7If60fCEvopI1JpEcFKcroymncP32714qu_zGt'
const secret = 'AcnoPTFqgaaQ_7mfd7T2lMGOlBCs1XdN5QYhTxQvht7If60fCEvopI1JpEcFKcroymncP32714qu_zGt'

const environment = new paypal.core.SandboxEnvironment(clientId, secret)
export const client = new paypal.core.PayPalHttpClient(environment)