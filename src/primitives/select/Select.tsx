import { FC } from 'react';

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  className?: string;
  placeholder?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

const Select: FC<SelectProps> = ({ className, placeholder, options, value, onChange }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <select
        className="p-2 pr-4 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {!!placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
