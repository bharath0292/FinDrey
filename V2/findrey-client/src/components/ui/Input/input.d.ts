export type size = 'large' | 'normal';
export type FieldState = 'info' | 'success' | 'warning' | 'error';

export interface ItemType {
  id: string;
  label: string;
}

export interface InputProps {
  id: string;
  label: string;
  size: size;
  maxLength?: number;
  type: 'string' | 'number';
  suggestions?: ItemType[];
  showSuggestions?: boolean;
  defaultValue?: string | number | null;
  disabled?: boolean;
  onChange?: (e: T) => void;
  onBlur?: () => void;
  fieldState?: FieldState;
  required?: boolean;
  isLoading?: boolean;
}
