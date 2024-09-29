import { useState } from 'react';
const initialCreatePageInputState = {
  slug: '',
  title: '',
  base64Attachment: '',
  shortDescription: '',
  content: '',
  publishStatus: 'Draft',
  order: 0,
  image: ""
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
