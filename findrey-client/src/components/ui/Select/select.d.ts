export type FieldState = 'info' | 'success' | 'warning' | 'error';

export interface ItemType {
  id: string;
  label: string;
  group?: string;
}

export interface SelectProps {
  id: string;
  label: string;
  defaultValue?: string | null;
  items: ItemType[];
  disabled?: boolean;
  onClick?: (e: ItemType) => void;
  fieldState?: FieldState;
  multiple?: boolean;
  required?: boolean;
}

export type GroupedOptions = {
  [key: string]: ItemType[];
};
