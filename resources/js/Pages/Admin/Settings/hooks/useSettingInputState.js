import { useState } from 'react';
const initialSettingPageInputState = {
  organizationName: '',
  organizationShortName: '',
  slogan: '',
  address: '',
  hrEmail: '',
  customerSupportEmail: '',
  technicalSupportEmail: '',
  fax: 0,
  hrContact: '',
  customerSupportContact: '',
  technicalSupportContact: '',
  officeHour: '',
  facebookPage: '',
  messengerLink: '',
  youtubeUrl:'',
  featuredVideoUrl:'',
  
};

const useSettingPageInputState = () => {
  const [settingPageInputState, setSettingPageInputState] = useState(initialSettingPageInputState);

  const updateSettingPageInputState = (fieldName, fieldValue) => {
    setSettingPageInputState((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
      };
    });
  };

  const clearSettingPageState =()=>{
    setSettingPageInputState(initialSettingPageInputState)
  }

  return {
    settingPageInputState,
    setSettingPageInputState,
    updateSettingPageInputState,
    clearSettingPageState
  };
};

export default useSettingPageInputState;
