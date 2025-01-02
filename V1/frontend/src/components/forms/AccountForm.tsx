import { createRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addAccount } from '../../services/accounts';
import { accountState, accountTypeState, userState } from '../../stores/atoms/States';
import { ItemType } from '../../types/Item';
import Button from '../common/Button';
import Dropdown, { DropdownRefType, FieldState } from '../common/Dropdown';
import Input, { InputRefType } from '../common/Input';
import AccountList from './AccountListForm';

function AccountForm() {
  const bankNameRef = createRef<InputRefType>();
  const accountNumberRef = createRef<InputRefType>();
  const accountTypeRef = createRef<DropdownRefType>();
  const balanceRef = createRef<InputRefType>();

  const [bankNameFieldState, setBankNameFieldState] = useState<FieldState>('info');
  const [accountNumberFieldState, setAccountNumberFieldState] = useState<FieldState>('info');
  const [accountTypeFieldState, setAccountTypeFieldState] = useState<FieldState>('info');
  const [balanceFieldState, setBalanceFieldState] = useState<FieldState>('info');

  const [errorMessage, setErrorMessage] = useState<string>('');

  const user = useRecoilValue<string>(userState);
  const accountTypes = useRecoilValue<ItemType[]>(accountTypeState);
  const [accounts, setAccounts] = useRecoilState(accountState);

  const clearAllFields = async () => {
    bankNameRef.current.clearComponent();
    accountNumberRef.current.clearComponent();
    accountTypeRef.current.clearComponent();
    balanceRef.current.clearComponent();

    setBankNameFieldState('info');
    setAccountNumberFieldState('info');
    setAccountTypeFieldState('info');
    setBalanceFieldState('info');
  };

  const validateForms = () => {
    let isValid = true;

    if (!bankNameRef.current.value) {
      setBankNameFieldState('error');
      isValid = false;
    } else {
      setBankNameFieldState('info');
    }

    if (!accountTypeRef.current.value) {
      setAccountTypeFieldState('error');
      isValid = false;
    } else {
      setAccountTypeFieldState('info');
    }

    return isValid;
  };

  const addNewAccount = async () => {
    setErrorMessage('');

    const isValid = validateForms();

    if (!isValid) {
      return;
    } else {
      const newAccount = await addAccount({
        user_id: user,
        bank_name: bankNameRef.current.value,
        account_number: accountNumberRef.current.value,
        account_type: accountTypeRef.current.value,
        balance: balanceRef.current.value
      });

      if ('error' in newAccount) {
        setErrorMessage(newAccount.error);
        return;
      }

      setAccounts([...accounts, ...[newAccount]]);
      await clearAllFields();
    }
  };

  return (
    <form className="p-5">
      <div className="grid gap-2 mb-6 md:grid-cols-5">
        <Input
          ref={bankNameRef}
          id="bank_name"
          label="Bank Name"
          size="normal"
          inputType="text"
          showSuggestions={false}
          fieldState={bankNameFieldState}
        />
        <Input
          ref={accountNumberRef}
          id="account_number"
          label="Account Number"
          size="normal"
          maxLength={4}
          inputType="text"
          showSuggestions={false}
          fieldState={accountNumberFieldState}
        />
        <Dropdown
          ref={accountTypeRef}
          id="account_type"
          label="Account Type"
          items={accountTypes}
          fieldState={accountTypeFieldState}
        />
        <Input
          ref={balanceRef}
          id="balance"
          label="Current Balance"
          size="normal"
          inputType="number"
          showSuggestions={false}
          fieldState={balanceFieldState}
        />
        {errorMessage && <label className="text-red-500">{errorMessage}</label>}
        <Button label="Add" onClick={addNewAccount} buttonClass="primary" />
      </div>
      <AccountList editable={true} />
    </form>
  );
}

export default AccountForm;
