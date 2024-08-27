'use client'

import { FC, PropsWithChildren } from 'react';
import ExchangeRateLabel from "@/components/exchange-rate-label/ExchangeRateLabel";
import Input from '@/primitives/input/Input';
import { Currency } from '@/interfaces/currencies';
import CurrencySelect from '@/components/currency-select/CurrencySelect';
import SwapButton from '@/components/swap-button/SwapButton';
import useExchangeRate from '@/hooks/useExchangeRate';

type CurrencyConverterProps = PropsWithChildren<{
  currencies: Currency[]
}>

const CurrencyConverter: FC<CurrencyConverterProps> = ({currencies, children}) => {
  const {
    buyCurrency,
    setBuyCurrency,
    buyAmount,
    setBuyAmount,
    sellCurrency,
    setSellCurrency,
    sellAmount,
  } = useExchangeRate()

  const onSwap = () => {
    setBuyCurrency(sellCurrency)
    setSellCurrency(buyCurrency)
  }

  return (
    <>
      <section className="flex flex-col items-center gap-8">
        <div className="flex justify-between gap-4 items-end">
          <div className="flex flex-col gap-4">
            <Input placeholder="Enter Amount to Convert" value={buyAmount} onChange={value => setBuyAmount(value)} />
            <CurrencySelect currencies={currencies} selectedValue={buyCurrency} setSelectedValue={setBuyCurrency} />
          </div>
          <div className="flex justify-between gap-4 items-center">
            <SwapButton onClick={onSwap} />
            <CurrencySelect currencies={currencies} selectedValue={sellCurrency} setSelectedValue={setSellCurrency} />
          </div>
        </div>
      </section>
      {
        buyCurrency && sellCurrency ? (
          <ExchangeRateLabel
            titleBuy={buyCurrency.title}
            symbolBuy={buyCurrency.symbol}
            amountBuy={buyAmount}
            titleSell={sellCurrency.title}
            symbolSell={sellCurrency.symbol}
            amountSell={sellAmount}
          />
        ) : children
      }
    </>
  );
}

export default CurrencyConverter
