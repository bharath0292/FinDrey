import { MouseEvent } from 'react';

interface ButtonProps {
  label: string;
  onClick?: Function;
  buttonClass: 'primary' | 'secondary' | 'warning';
}

function Button(props: ButtonProps) {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    if (props.onClick) {
      props.onClick();
    }
  };

  const buttonClass = {
    primary: 'text-white bg-teal-700 border border-teal-900 rounded-md hover:bg-teal-900',
    secondary: 'text-black bg-white-700 border border-teal-900 rounded-md',
    warning: 'text-white bg-red-700 border border-red-900 rounded-md hover:bg-red-900'
  };

  return (
    <div className="w-full h-full">
      <button type="button" className={`p-2 ${buttonClass[props.buttonClass]}`} onClick={handleClick}>
        {props.label}
      </button>
    </div>
  );
}

export default Button;
