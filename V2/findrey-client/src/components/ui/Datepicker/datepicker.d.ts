export type FieldState = 'info' | 'success' | 'warning' | 'error';

export interface DatePickerProps {
  id: string;
  label: string;
  defaultValue?: string | null;
  disabled?: boolean;
  onChange?: (value: string | null) => void;
  fieldState?: FieldState;
  required?: boolean;
}
