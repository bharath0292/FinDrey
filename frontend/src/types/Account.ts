export interface AccountType {
  id: string;
  bank_name: string | number;
  account_number: string | number;
  account_name?: string;
  account_type: string;
  balance: string | number;
  balance_updated_time?: string;
}

export interface AccountAddType {
  user_id: string;
  bank_name: string | number;
  account_number?: string | number;
  account_type: string;
  balance?: string | number;
}

export interface AccountUpdateType {
  id: string;
  user_id: string;
  bank_name: string | number;
  account_number?: string | number;
  account_type: string;
  balance?: string | number;
}

export interface AccountDeleteType {
  id: string;
  user_id: string;
}
