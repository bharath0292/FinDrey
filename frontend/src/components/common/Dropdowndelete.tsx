import { ChangeEvent } from 'react';

interface DropdownItemType {
  id: string | number;
  value: string | number;
}

interface DropdownProp {
  id: string;
  label: string;
  defaultValue?: string;
  items: DropdownItemType[];
  disabled?: boolean;
  setState: Function;
}

function Dropdown(props: DropdownProp) {
  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    props.setState(props.id, target.value);
  };

  const listItems = props.items.map((item) => (
    <option key={item.id} value={item.id} className="bg-white">
      {item.value}
    </option>
  ));

  return (
    <div className="py-1">
      <label htmlFor={props.label} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {props.label}
      </label>
      <select
        id={props.label}
        className="block w-auto p-2 bg-white text-gray-900 
        border border-gray-300 rounded-lg sm:text-md 
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none 
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleChange}
        disabled={props.disabled}
        value={props.defaultValue || ''}
      >
        <option hidden key="" value="" className="bg-white italic">
          Select your Option
        </option>
        {listItems}
      </select>
    </div>
  );
}

export default Dropdown;
