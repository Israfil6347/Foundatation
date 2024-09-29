import { useState } from 'react';
const initialCreatePageInputState = {
  name: '',
  email: '',
  phone: '',
  role: '',
  password: '',
  password_confirmation: '',
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
