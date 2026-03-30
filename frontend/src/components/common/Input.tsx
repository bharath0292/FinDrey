import { ChangeEvent, Ref, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ItemType } from '../../types/Item';

export type size = 'large' | 'normal';
export type inputType = 'number' | 'text';
export type FieldState = 'info' | 'success' | 'warning' | 'error';

export interface InputProps {
  id: string;
  label: string;
  size: size;
  maxLength?: number;
  inputType: inputType;
  suggestions?: ItemType[];
  showSuggestions?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: Function;
  fieldState?: FieldState;
  required?: boolean;
}

export interface InputRefType {
  clearComponent: () => void;
  updateValue: (value: string) => void;
  value: string | number;
}

function Input(props: InputProps, ref: Ref<InputRefType>) {
  const [value, setValue] = useState<string | number>('');
  const [filteredOptions, setFilteredOptions] = useState<ItemType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fieldState, setFieldState] = useState<FieldState>('info');

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
    info: `before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-sky-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-sky-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-sky-500  peer-disabled:peer-placeholder-shown:text-gray-500`
  };

  const inputOptionVariant = {
    error: 'border-red-600',
    success: 'border-green-600 ',
    warning: 'border-yellow-600 ',
    info: 'border-gray-300'
  };

  const inputOptionLinkVariant = {
    error: 'hover:bg-red-100',
    success: 'hover:bg-green-100 ',
    warning: 'hover:bg-yellow-100 ',
    info: 'hover:bg-gray-100'
  };

  const closeDropdown = async () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleClick = async () => {
    if (!isOpen) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      // openDropdown();
    } else {
      closeDropdown();
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleOptionClick = async (option: string) => {
    setValue(option);
    setIsOpen(false);

    setTimeout(() => {
      if (props.onChange) {
        props.onChange();
      }
    }, 10);
  };

  const handleChange = async (event: ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    const input = target.value;

    if (props.inputType === 'number') {
      setValue(Number(input));
    } else {
      setValue(input);
    }

    if (input && props.suggestions && props.suggestions.length > 0) {
      const currentOptions = props.suggestions.filter((row) => {
        const values = Object.values(row).map((value) => value.toString().toLowerCase());
        return values.some((value) => value.includes(input.toLowerCase()));
      });

      setFilteredOptions(currentOptions);
      setIsOpen(true);
    }

    setTimeout(() => {
      if (props.onChange) {
        props.onChange();
      }
    }, 10);
  };

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

  useEffect(() => {
    if (props.defaultValue) {
      setValue(props.defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultValue]);

  // ** To set the items */
  useEffect(() => {
    if (props.suggestions) {
      setFilteredOptions(props.suggestions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.suggestions]);

  // ** To set the items */
  useEffect(() => {
    if (props.fieldState) {
      setFieldState(props.fieldState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.fieldState]);

  return (
    <div className="w-full" ref={dropdownRef}>
      <div onClick={handleClick} className="relative w-full">
        <input
          ref={inputRef}
          type={props.inputType}
          value={value ? value : ''}
          placeholder=" "
          disabled={props.disabled}
          onChange={handleChange}
          className={`${inputVariant[fieldState]}`}
        />
        <label className={`${inputLabelVariant[fieldState]}`}>{props.label}</label>
      </div>

      {isOpen && filteredOptions.length > 0 && props.showSuggestions && String(value).length > 0 && (
        <ul
          className={`overflow-y-auto border ${inputOptionVariant[fieldState]} border-solid rounded-sm cursor-pointer bg-color-white max-h-60`}
        >
          {filteredOptions.map((item) => (
            <li
              key={item.id}
              className={`w-full p-2 text-sm bg-white ${inputOptionLinkVariant[fieldState]}`}
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

export default forwardRef(Input);
