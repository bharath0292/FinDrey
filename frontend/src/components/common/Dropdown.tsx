import { FormEvent, Ref, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { ItemType } from '../../types/Item';

export type FieldState = 'info' | 'success' | 'warning' | 'error';

interface DropdownProps {
  id: string;
  label: string;
  defaultValue?: string;
  items: ItemType[];
  disabled?: boolean;
  onClick?: Function;
  fieldState?: FieldState;
  multiple?: boolean;
  required?: boolean;
}

export interface DropdownRefType {
  clearComponent: () => void;
  updateValue: (value: string) => void;
  value: string;
}

function Dropdown(props: DropdownProps, ref: Ref<DropdownRefType>) {
  const [value, setValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<ItemType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fieldState, setFieldState] = useState<FieldState>('info');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        clearComponent() {
          setValue('');
        },
        updateValue(inputValue: string) {
          setValue(inputValue);
        },
        value: value
      };
    },
    [value]
  );

  const inputVariant = {
    error: `peer h-[44px] w-full rounded-[7px] border border-red-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-red-500 placeholder-shown:border-t-red-500 focus:border-2 focus:border-red-500 focus:border-t-transparent focus:outline-0 disabled:border-1 disabled:bg-gray-50`,
    success: `peer h-[44px] w-full rounded-[7px] border border-green-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-500 placeholder-shown:border-t-green-500 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-1 disabled:bg-gray-50`,
    warning: `peer h-[44px] w-full rounded-[7px] border border-yellow-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-yellow-500 placeholder-shown:border-t-yellow-500 focus:border-2 focus:border-yellow-500 focus:border-t-transparent focus:outline-0 disabled:border-1 disabled:bg-gray-50`,
    info: `peer h-[44px] w-full rounded-[7px] border border-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-sky-500 focus:border-t-transparent focus:outline-0 disabled:border-1 disabled:bg-gray-50`
  };

  const inputLabelVariant = {
    error: `before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-red-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-red-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-red-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-red-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-red-500 peer-disabled:peer-placeholder-shown:text-gray-500`,
    success: `before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-green-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-500 peer-disabled:peer-placeholder-shown:text-gray-500`,
    warning: `before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-yellow-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-yellow-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-yellow-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-yellow-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-yellow-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-yellow-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-yellow-500 peer-disabled:peer-placeholder-shown:text-gray-500`,
    info: `before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-sky-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-sky-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-sky-500 peer-disabled:peer-placeholder-shown:text-gray-500`
  };

  const dropdownOptionVariant = {
    error: 'border-red-600',
    success: 'border-green-600 ',
    warning: 'border-yellow-600 ',
    info: 'border-gray-300'
  };

  const dropdownOptionLinkVariant = {
    error: 'hover:bg-red-100',
    success: 'hover:bg-green-100 ',
    warning: 'hover:bg-yellow-100 ',
    info: 'hover:bg-gray-100'
  };

  const handleOptionClick = async (option: string) => {
    setValue(option);
    setIsOpen(false);

    setTimeout(() => {
      if (props.onClick) {
        props.onClick();
      }
    }, 10);
  };

  const handleClick = async () => {
    if (!isOpen) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      openDropdown();
    } else {
      closeDropdown();
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const closeDropdown = async () => {
    setTimeout(() => {
      setIsOpen(false);
      setSearchTerm('');
    }, 200);
  };

  const openDropdown = async () => {
    setFilteredOptions(props.items);
    setTimeout(() => {
      setIsOpen(true);
    }, 20);
  };

  const filterOptions = (event: FormEvent) => {
    const target = event.target as HTMLTextAreaElement;
    const newSearchTerm = target.value; // Store the new search term

    setIsOpen(true);
    setSearchTerm(newSearchTerm);

    if (newSearchTerm) {
      const currentOptions = props.items.filter((row) => {
        const values = Object.values(row).map((value) => value.toString().toLowerCase());
        return values.some((value) => value.includes(newSearchTerm.toLowerCase()));
      });
      setFilteredOptions(currentOptions);
    } else {
      setFilteredOptions(props.items);
    }
  };

  //** To close the dropdown option when click outside */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ** To set the defaultValue */
  useEffect(() => {
    if (props.defaultValue) {
      setValue(props.defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultValue]);

  // ** To set the items */
  useEffect(() => {
    setFilteredOptions(props.items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.items]);

  // ** To set the items */
  useEffect(() => {
    if (props.fieldState) {
      setFieldState(props.fieldState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.fieldState]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div onClick={handleClick} className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? searchTerm : value || ''}
          disabled={props.disabled}
          onInput={(e) => filterOptions(e)}
          className={`${inputVariant[fieldState]}`}
          placeholder=" "
        />
        <div className="absolute top-1/4 right-2">
          {!props.disabled && (isOpen ? <IoIosArrowDropup className="" /> : <IoIosArrowDropdown />)}
        </div>
        <label className={`${inputLabelVariant[fieldState]}`}>{props.label}</label>
      </div>
      {isOpen && (
        <ul
          className={`absolute w-[100%] z-50 overflow-y-auto border ${dropdownOptionVariant[fieldState]} border-solid rounded-sm cursor-pointer bg-color-white max-h-60`}
        >
          {filteredOptions.map((item) => (
            <li
              key={item.id}
              className={`w-full p-2 text-sm bg-white ${dropdownOptionLinkVariant[fieldState]}`}
              onClick={() => handleOptionClick(item.id)}
            >
              <span key={item.id}>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default forwardRef(Dropdown);
