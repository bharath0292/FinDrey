export type FieldState = 'info' | 'success' | 'warning' | 'error';

export interface DatePickerProps {
	id: string;
	label: string;
	defaultValue?: Date | null;
	disabled?: boolean;
	onChange?: (value: Date) => void;
	fieldState?: FieldState;
	required?: boolean;
}
