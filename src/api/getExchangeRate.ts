import { fetchAxios } from '@/api/fetch';

export async function getExchangeRate(buyCurrency: string, sellCurrency: string) {
  return await fetchAxios<string>(`/rates/trader/buy/${buyCurrency}/${sellCurrency}`)
}
