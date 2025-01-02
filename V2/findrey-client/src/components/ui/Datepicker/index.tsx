'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { DatePickerProps, FieldState } from './datepicker';
import styles from './datepicker.module.css';

function Datepicker(props: Readonly<DatePickerProps>) {
  const [value, setValue] = useState<string>('');
  const [fieldState, setFieldState] = useState<FieldState>('info');

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // const getFormattedDateTime = (datetime: string) => {
  //   const now = new Date(datetime);
  //   const year = now.getFullYear();
  //   const month = String(now.getMonth() + 1).padStart(2, '0');
  //   const day = String(now.getDate()).padStart(2, '0');

  //   const hours = String(now.getHours()).padStart(2, '0');
  //   const minutes = String(now.getMinutes()).padStart(2, '0');
  //   return `${year}-${month}-${day}T${hours}:${minutes}`;
  // };

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    const input = target.value;

    setValue(input);

    if (props.onChange) {
      props.onChange(`${input}:00Z`);
    }
  };

  useEffect(() => {
    if (props.defaultValue) {
      const defaultValue = props.defaultValue.split(':00Z')[0];
      setValue(defaultValue);
    } else {
      const currentDate = getCurrentDateTime();
      setValue(currentDate);
      if (props.onChange) {
        props.onChange(`${currentDate}:00Z`);
      }
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
      <div className="">
        <input
          ref={inputRef}
          type="datetime-local"
          value={value}
          placeholder={props.label}
          disabled={props.disabled}
          onChange={handleChange}
          className=""
        />
      </div>
    </div>
  );
}

export default Datepicker;
