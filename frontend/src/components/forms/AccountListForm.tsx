import { createRef, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { deleteAccount, updateAccount } from '../../services/accounts';
import { accountState, accountTypeState, userState } from '../../stores/atoms/States';
import { useRefreshAccounts } from '../../stores/selectors/AccountSelector';
import { AccountType } from '../../types/Account';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import Input, { InputRefType } from '../common/Input';

export interface AccountListProp {
  editable: boolean;
}

function AccountListForm(props: AccountListProp) {
  const accountTypes = useRecoilValue(accountTypeState);
  const accounts = useRecoilValue<AccountType[]>(accountState);
  const user = useRecoilValue<string>(userState);
  const refreshAccounts = useRefreshAccounts();

  const [disabled, setDisabled] = useState<Record<string, boolean>>({});

  const accountRefs = useMemo(
    () =>
      accounts.reduce((refAccounts, account) => {
        let newValue = {};
        Object.keys(account).forEach((value) => {
          newValue[value] = createRef<InputRefType>();
        });
        refAccounts.push(newValue);
        return refAccounts;
      }, []),
    [accounts]
  );

  const handleEdit = (id: string) => {
    const changeDisabledState = { ...disabled, ...{ [id]: false } };
    setDisabled(changeDisabledState);
  };

  const handleCancel = async (id: string) => {
    const changeDisabledState = { ...disabled, ...{ [id]: true } };
    setDisabled(changeDisabledState);
  };

  const handleSave = async (id: string, refIndex: number) => {
    const isAccountAvailable = accounts.filter(
      (element) =>
        element.bank_name === accountRefs[refIndex].bank_name.current.value &&
        element.account_number === accountRefs[refIndex].account_number.current.value &&
        element.account_type === accountRefs[refIndex].account_type.current.value &&
        element.balance === accountRefs[refIndex].balance.current.value
    );

    if (!isAccountAvailable.length) {
      await updateAccount({
        id: id,
        user_id: user,
        bank_name: accountRefs[refIndex].bank_name.current.value,
        account_number: accountRefs[refIndex].account_number.current.value,
        account_type: accountRefs[refIndex].account_type.current.value,
        balance: accountRefs[refIndex].balance.current.value
      });
    }

    const changeDisabledState = { ...disabled, ...{ [id]: true } };
    setDisabled(changeDisabledState);

    refreshAccounts();
  };

  const handleDelete = async (id: string) => {
    await deleteAccount({
      id: id,
      user_id: user
    });
    refreshAccounts();
  };

  useEffect(() => {
    if (accounts.length > 0) {
      const initialDisabledState = accounts.reduce((acc, account) => {
        acc[account.id] = true;
        return acc;
      }, {});

      setDisabled(initialDisabledState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  return (
    <div className="p-4 m-2 border border-gray-200 rounded-md shadow-md">
      <h1 className="p-2 text-2xl font-bold text-blue-800">Accounts List</h1>
      <div className="m-2">
        {accounts.length > 0 &&
          accounts.map((account, id) => (
            <div key={account.id} className="flex items-center h-16 gap-2">
              <Input
                ref={accountRefs[id].bank_name}
                id={account.id}
                label="Bank Name"
                defaultValue={account.bank_name}
                size="normal"
                inputType="text"
                disabled={disabled[account.id]}
              />
              <Input
                ref={accountRefs[id].account_number}
                id={account.id}
                label="Account Number"
                defaultValue={account.account_number}
                size="normal"
                maxLength={4}
                inputType="text"
                disabled={disabled[account.id]}
              />
              <Dropdown
                ref={accountRefs[id].account_type}
                id={account.id}
                label="Account Type"
                defaultValue={account.account_type}
                items={accountTypes}
                disabled={disabled[account.id]}
              />
              <Input
                ref={accountRefs[id].balance}
                id={account.id}
                label="Balance"
                defaultValue={account.balance}
                size="normal"
                inputType="text"
                disabled={disabled[account.id]}
              />
              {props.editable &&
                (disabled[account.id] ? (
                  <div className="flex gap-4">
                    <Button label="Edit" onClick={() => handleEdit(account.id)} buttonClass="primary" />
                    <Button label="Delete" onClick={() => handleDelete(account.id)} buttonClass="warning" />
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <Button label="Save" onClick={() => handleSave(account.id, id)} buttonClass="primary" />
                    <Button label="Cancel" onClick={() => handleCancel(account.id)} buttonClass="secondary" />
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default AccountListForm;
