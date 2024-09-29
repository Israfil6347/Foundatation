import { useState } from 'react';
const initialCreatePageInputState = {
  company_name: '',
  slug: '',
  order: 0,
  accounts_name: '',
  account_number: '',
  branch_name: '',
  publishStatus: 'Draft',
};

const useCreatePageInputState = () => {
  const [createPageInputState, setCreatePageInputState] = useState(initialCreatePageInputState);

  const updateCreatePageInputState = (fieldName, fieldValue) => {
    setCreatePageInputState((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
      };
    });
  };

  const clearCreatePageState =()=>{
    setCreatePageInputState(initialCreatePageInputState)
  }

  return {
    createPageInputState,
    setCreatePageInputState,
    updateCreatePageInputState,
    clearCreatePageState
  };
};

export default useCreatePageInputState;
