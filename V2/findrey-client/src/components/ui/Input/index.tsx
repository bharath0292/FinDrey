'use client';

export type * from './input';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { FieldState, InputProps, ItemType } from './input';
import styles from './input.module.css';

function Input(props: Readonly<InputProps>) {
  const [value, setValue] = useState<string | number | null | undefined>('');
  const [filteredOptions, setFilteredOptions] = useState<ItemType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fieldState, setFieldState] = useState<FieldState>('info');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClick = async () => {
    if (!isOpen) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      closeDropdown();
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleOptionClick = (option: string) => {
    if (props.onChange) {
      const formattedValue =
        props.type === 'number' ? Number(option) : String(option);
      props.onChange(formattedValue);
    }
    setValue(option);
    closeDropdown();
    setFilteredOptions([]);
  };

  const handleBlur = () => {
    if (props.onBlur) {
      props.onBlur();
    }
  };

  const handleFilterOptions = (
    searchValue: string | number | null | undefined,
  ) => {
    if (searchValue && props.suggestions && props.suggestions.length > 0) {
      const currentOptions = props.suggestions.filter((row) => {
        const values = Object.values(row)
          .map((value) => value.toString().toLowerCase())
          .some((v) => v.includes(String(searchValue).toLowerCase()));
        return values;
      });
      setFilteredOptions(currentOptions);
      !isOpen && setIsOpen(currentOptions.length > 0);
    } else {
      setFilteredOptions([]);
      closeDropdown();
    }
  };

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;

    const input = props.type === 'number' ? Number(target.value) : target.value;

    if (props.onChange) {
      props.onChange(input);
    }
    setValue(input);
  };

  useEffect(() => {
    handleFilterOptions(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.suggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
    if (props.defaultValue !== value) {
      setValue(props.defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultValue]);

  // ** To set the items */
  useEffect(() => {
    if (props.fieldState) {
      setFieldState(props.fieldState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.fieldState]);

  return (
    <div
      className={`${styles.container} ${styles[fieldState]}`}
      ref={dropdownRef}
    >
      <div onClick={handleClick} className="">
        <input
          ref={inputRef}
          type={props.type === 'number' ? 'number' : 'text'}
          value={value ?? ''}
          placeholder={props.label}
          disabled={props.disabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <ul className="">
          {props.isLoading ? (
            <li key="isLoading">
              <span key="isLoading">Loading...</span>
            </li>
          ) : (
            filteredOptions.map((item) => (
              <li
                key={item.id}
                className=""
                onClick={() => handleOptionClick(item.id)}
              >
                <span key={item.id}>{item.label}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default Input;
