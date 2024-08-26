import { fetchAxios } from '@/api/fetch';

export async function getBitcoinRate() {
  return await fetchAxios<string>('/rates/trader/buy/BTC/USD')
}
