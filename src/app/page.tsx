import CurrencyConverter from '@/components/currency-converter/CurrencyConverter';
import { getCurrencies } from '@/api/getCurrencies';
import { getBitcoinRate } from '@/api/getBitcoinRate';
import ExchangeRateLabel from '@/components/exchange-rate-label/ExchangeRateLabel';

export default async function Home() {
  const bitcoinRate = await getBitcoinRate();
  const currencies = await getCurrencies();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <article className="flex flex-col gap-8 text-center">
        <h3 className="text-3xl">Cryptocurrency Converter Calculator</h3>
        <CurrencyConverter currencies={currencies || []}>
          <ExchangeRateLabel bitcoinRate={bitcoinRate || ''}/>
        </CurrencyConverter>
      </article>
    </main>
  );
}
