import { useEffect, useState } from 'react';
import { Currency } from '@/interfaces/currencies';

export default function useExchangeRate() {
  const [buyCurrency, setBuyCurrency] = useState<Currency | undefined>(undefined)
  const [buyAmount, setBuyAmount] = useState<string>('1')
  const [sellCurrency, setSellCurrency] = useState<Currency | undefined>(undefined)
  const [sellAmount, setSellAmount] = useState<string>('')

  useEffect(() => {
    if (buyCurrency && sellCurrency) {
      const eventSource = new EventSource(`/api/exchange-rate?buyCurrency=${buyCurrency.symbol}&sellCurrency=${sellCurrency.symbol}`);

      eventSource.onmessage = (event) => {
        const rate = event.data
        if (rate) {
          setSellAmount(String(Number(rate) * Number(buyAmount)))
        }
      };

      eventSource.onerror = () => {
        // дропнуть тостер
      };

      return () => {
        eventSource.close()
      }
    }
  }, [buyAmount, buyCurrency, sellCurrency])

  return {
    buyCurrency,
    setBuyCurrency,
    buyAmount,
    setBuyAmount,
    sellCurrency,
    setSellCurrency,
    sellAmount,
    setSellAmount,
  }
}
