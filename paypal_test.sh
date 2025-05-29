#!/bin/bash
set -a
source .env.production
set +a

echo "Testing with Client ID: ${PAYPAL_CLIENT_ID:0:8}..."

curl -v -X POST https://api-m.sandbox.paypal.com/v1/oauth2/token \
  -u "$PAYPAL_CLIENT_ID:$PAYPAL_SECRET" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" 2>&1 | grep -E 'HTTP|<'
