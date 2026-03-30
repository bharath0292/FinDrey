import { createRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { transactionTypeState } from '../../stores/atoms/States';
import Button from '../common/Button';
import Dropdown, { FieldState, type DropdownRefType } from '../common/Dropdown';
import Input from '../common/Input';

function CategoryModal() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const transactionTypeRef = createRef<DropdownRefType>();
  const categoryRef = createRef<DropdownRefType>();

  const [transactionTypeFieldState, setTransactionTypeFieldState] = useState<FieldState>('info');
  const [categoryFieldState, setCategoryFieldState] = useState<FieldState>('info');

  const transactionTypesItem = useRecoilValue(transactionTypeState);

  const handleShow = () => {
    setShowModal(!showModal);
  };

  const clearAllFields = async () => {
    categoryRef.current.clearComponent();
    transactionTypeRef.current.clearComponent();
  };

  const validateForm = () => {
    let validationSuccess = true;

    if (transactionTypeRef.current && !transactionTypeRef.current.value) {
      setTransactionTypeFieldState('error');
      validationSuccess = false;
    } else {
      setTransactionTypeFieldState('info');
    }

    if (categoryRef.current && !categoryRef.current.value) {
      setCategoryFieldState('error');
      validationSuccess = false;
    } else {
      setCategoryFieldState('info');
    }
    return validationSuccess;
  };

  const addNewCategory = async () => {
    if (!validateForm()) {
      return;
    }
    // add new category
  };

  return (
    <>
      <Button label={'Add'} onClick={handleShow} buttonClass={'primary'} />
      {showModal && (
        <div
          id="transaction-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-1 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  handleShow();
                }}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <form className="space-y-6" action="#">
                  <div>
                    <div className="p-1">
                      <Dropdown
                        ref={transactionTypeRef}
                        id="transactionType"
                        label="Transaction Type"
                        items={transactionTypesItem}
                        fieldState={transactionTypeFieldState}
                      />
                    </div>
                    <div className="p-1">
                      <Input
                        ref={categoryRef}
                        id="category"
                        label="Category"
                        size="normal"
                        inputType="text"
                        fieldState={categoryFieldState}
                      />
                    </div>
                  </div>
                  <div className="m-2">
                    {errorMessage && <label className="text-red-500">{errorMessage}</label>}
                    <Button label="Add" onClick={addNewCategory} buttonClass="primary" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryModal;
