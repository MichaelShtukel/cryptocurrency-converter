import { FC } from 'react';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const Input: FC<InputProps> = ({value, onChange, placeholder}) => {
  return (
    <input className="rounded p-1 text-black px-2"
           type="number"
           placeholder={placeholder}
           value={value}
           onChange={e => onChange(e.target.value)}
    />
  );
};

export default Input;
