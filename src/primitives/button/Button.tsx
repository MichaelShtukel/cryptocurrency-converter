import { FC, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  className?: string;
  onClick: () => void;
}>

const Button: FC<ButtonProps> = ({className, onClick, children}) => {
  return (
    <button className={`rounded p-1 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
