import { FC } from 'react';
import Select from '@/primitives/select/Select';
import { Currency } from '@/interfaces/currencies';

type CurrencySelectProps = {
  currencies: Currency[]
  selectedValue?: Currency
  setSelectedValue: (currency: Currency) => void;
}

const CurrencySelect: FC<CurrencySelectProps> = ({
                                                   currencies,
                                                   selectedValue,
                                                   setSelectedValue,
                                                 }) => {
  const options = currencies.map(item => ({
    value: item.id.toString(),
    label: item.title
  }))

  const onChange = (id: string) => {
    const currency = currencies.find(item => item.id.toString() === id)
    if (currency) {
      setSelectedValue(currency)
    }
  }

  return (
    <Select
      className="max-w-sm"
      placeholder="Currency"
      options={options}
      value={selectedValue?.id.toString() || ''}
      onChange={onChange}
    />
  );
};

export default CurrencySelect;
