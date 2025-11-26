'use client';

export type * from './select';

import {
	type ChangeEvent,
	memo,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { useDebounce } from 'use-debounce';

import type { GroupedOptions, ItemType, SelectProps } from './select';
import styles from './select.module.css';

const Row = (
	group: string,
	options: ItemType[],
	handleOptionClick?: (item: ItemType) => void,
) => {
	return (
		<div key={group}>
			{group !== 'default' && <p className={styles['group-header']}>{group}</p>}
			{options.map((item) => (
				<li
					className={
						group === 'default' ? styles['option'] : styles['group-option']
					}
					key={item.id}
					onClick={() => handleOptionClick && handleOptionClick(item)}
				>
					{item.label}
				</li>
			))}
		</div>
	);
};

function Dropdown(props: Readonly<SelectProps>) {
	const [value, setValue] = useState<ItemType | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

	const dropdownRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleOptionClick = (option: ItemType) => {
		setValue(option);
		setIsOpen(false);

		if (props.onClick) {
			props.onClick(option);
		}
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target?.value);
	};

	const handleClick = () => {
		if (props.disabled) return;

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

	const closeDropdown = () => {
		setIsOpen(false);
		setSearchTerm('');
	};

	const openDropdown = () => {
		setIsOpen(true);
	};

	const filteredOptions = useMemo(() => {
		if (!debouncedSearchTerm) return props.items;
		return props.items.filter((row) =>
			Object.values(row).join(' ').toLowerCase().includes(debouncedSearchTerm),
		);
	}, [debouncedSearchTerm, props.items]);

	const groupedOptions = useMemo(() => {
		return filteredOptions.reduce<GroupedOptions>((acc, item) => {
			const groupKey = item.group ?? 'default';
			if (!acc[groupKey]) acc[groupKey] = [];
			acc[groupKey].push(item);
			return acc;
		}, {});
	}, [filteredOptions]);

	const renderOptions = () => {
		if (filteredOptions.length === 0) {
			return Row('default', [{ id: 'no-options', label: 'No Options...' }]);
		}

		return Object.entries(groupedOptions).map(([group, options]) =>
			Row(group, options, handleOptionClick),
		);
	};

	//** To close the dropdown option when click outside */
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

	// ** To set the defaultValue */
	useEffect(() => {
		if (props.defaultValue && props.items.length > 0) {
			if (props.defaultValue === value?.id) {
				return;
			}

			const option = props.items.find((item) => item.id === props.defaultValue);
			if (option) {
				setValue(option);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.defaultValue, props.items]);

	return (
		<div
			className={`${styles.container} ${props.disabled && styles.disabled}`}
			ref={dropdownRef}
		>
			<div
				onClick={handleClick}
				className={`${styles['input-box']} ${styles[props.fieldState ?? 'info']}`}
			>
				<input
					ref={inputRef}
					type="text"
					value={isOpen ? searchTerm : (value?.label ?? '')}
					disabled={props.disabled}
					onChange={handleInputChange}
					className=""
					placeholder={value?.label ?? props.label}
				/>
				{!props.disabled &&
					(isOpen ? <IoIosArrowDropup className="" /> : <IoIosArrowDropdown />)}
			</div>
			{isOpen && <ul>{renderOptions()}</ul>}
		</div>
	);
}

const MemoDropdown = memo(Dropdown);

export default MemoDropdown;
