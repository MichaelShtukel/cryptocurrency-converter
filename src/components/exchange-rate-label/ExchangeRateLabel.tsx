import { FC } from 'react';

type ExchangeRateLabelProps = {
  bitcoinRate?: string
  titleBuy?: string
  symbolBuy?: string
  amountBuy?: string
  titleSell?: string
  symbolSell?: string
  amountSell?: string
}

const ExchangeRateLabel: FC<ExchangeRateLabelProps> = ({
                                                         bitcoinRate,
                                                         titleBuy,
                                                         symbolBuy,
                                                         amountBuy,
                                                         titleSell,
                                                         symbolSell,
                                                         amountSell,
                                                       }) => {
  // в идеале еще добавить подсветку при изменении рейтов
  if (bitcoinRate) {
    return (
      <div className="text-center">
        <p>1 Bitcoin (BTC) = {bitcoinRate} United States Dollar $ (USD)</p>
      </div>
    )
  }

  return (
    <div className="text-center text-wrap">
      <span>{amountBuy} {titleBuy} ({symbolBuy}) = {amountSell} {titleSell} ({symbolSell})</span>
    </div>
  );
};

export default ExchangeRateLabel;
