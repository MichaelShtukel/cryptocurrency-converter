import { fetchProxyAxios } from '@/api/fetch';

export async function getExchangeRate(buyCurrency: string, sellCurrency: string) {
  return await fetchProxyAxios<string>(`/api/proxy?buyCurrency=${buyCurrency}&sellCurrency=${sellCurrency}`);
}
