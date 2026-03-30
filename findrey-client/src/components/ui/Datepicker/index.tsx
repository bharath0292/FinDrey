'use client';

import { type ChangeEvent, useEffect, useRef, useState } from 'react';

import type { DatePickerProps, FieldState } from './datepicker';
import styles from './datepicker.module.css';

function Datepicker(props: Readonly<DatePickerProps>) {
	const [value, setValue] = useState<Date>(new Date());
	const [fieldState, setFieldState] = useState<FieldState>('info');

	const dropdownRef = useRef(null);
	const inputRef = useRef(null);

	const getFormattedDateTime = (now: Date) => {
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');

		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		return `${year}-${month}-${day}T${hours}:${minutes}`;
	};

	const handleChange = (event: ChangeEvent) => {
		const target = event.target as HTMLTextAreaElement;
		const input = new Date(target.value);

		setValue(input);

		if (props.onChange) {
			props.onChange(input);
		}
	};

	useEffect(() => {
		if (props.defaultValue) {
			setValue(props.defaultValue);
		} else {
			setValue(new Date());
			if (props.onChange) {
				props.onChange(new Date());
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.defaultValue, props.onChange]);

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
					value={getFormattedDateTime(value)}
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
