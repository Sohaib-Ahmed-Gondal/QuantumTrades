import Binance from 'node-binance-api';

const binance = new Binance().options({
  APIKEY: process.env.NEXT_PUBLIC_BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET
});

export async function getBTCPrice() {
  const prices = await binance.prices();
  return { BTCUSDT: prices.BTCUSDT };
}