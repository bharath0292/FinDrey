import { ChangeEvent } from 'react';

type size = 'large' | 'normal';
type inputType = 'number' | 'date' | 'decimal' | 'text' | 'datetime-local';

export interface InputProps {
  id: string;
  label: string;
  size: size;
  inputType: inputType;
  defaultValue?: string | number;
  disabled?: boolean;
  setState: Function;
}

function Input(props: InputProps) {
  const handleChange = async (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    console.log(target.id, target.value);

    // props.setState(props.id, target.value);
  };

  return (
    <div className="py-1">
      <label htmlFor={props.label} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {props.label}
      </label>
      {props.size === 'large' ? (
        <textarea
          className="block w-auto p-2 bg-white text-gray-900 
          border border-gray-300 rounded-lg sm:text-md 
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id={props.label}
          // cols={30}
          rows={5}
          placeholder={props.label}
          onChange={handleChange}
          value={String(props.defaultValue)}
          disabled={props.disabled}
        />
      ) : (
        <input
          type={props.inputType}
          id={props.id}
          className="block w-auto p-2 bg-white text-gray-900 
                border border-gray-300 rounded-lg sm:text-md 
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.label}
          onChange={(e) => handleChange(e)}
          // value={props.defaultValue || ''}
          min="0"
          step=".001"
          disabled={props.disabled}
        />
      )}
    </div>
  );
}

export default Input;
