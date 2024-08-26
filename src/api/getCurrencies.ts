import { fetchAxios } from '@/api/fetch';
import { Currency } from '@/interfaces/currencies';

export async function getCurrencies() {
  return await fetchAxios<Currency[]>('/currencies')
}
