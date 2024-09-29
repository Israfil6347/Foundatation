
import MyTextInput from '@/Components/MyTextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from "framer-motion";

import { Head, router, usePage } from '@inertiajs/react';
import MyDropdown from '@/Components/MyDropdown';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import useCreatePageInputState from '../../Admin/Settings/hooks/useSettingInputState';

export default function Index({ auth }) {

  const { SettingData, flash } = usePage().props;

  const {
    settingPageInputState,
    setSettingPageInputState,
    updateSettingPageInputState,
    clearSettingPageState
  } = useCreatePageInputState();

  const saveSettingActionHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    router.post(route('settings.update'), data, {
      onSuccess: (resp) => {

        toast(resp)
      }
    });
  };

  useEffect(()=>{
    updateSettingPageInputState("organizationName",SettingData?.organization_name);
    updateSettingPageInputState("organizationShortName",SettingData?.organization_short_name);
    updateSettingPageInputState("slogan",SettingData?.slogan);
    updateSettingPageInputState("address",SettingData?.address);
    updateSettingPageInputState("hrEmail",SettingData?.hr_email);
    updateSettingPageInputState("customerSupportEmail",SettingData?.customer_support_email);
    updateSettingPageInputState("technicalSupportEmail",SettingData?.technical_support_email);
    updateSettingPageInputState("fax",SettingData?.fax);
    updateSettingPageInputState("hrContact",SettingData?.hr_contact);
    updateSettingPageInputState("customerSupportContact",SettingData?.customer_support_contact);
    updateSettingPageInputState("technicalSupportContact",SettingData?.technical_support_contact);
    updateSettingPageInputState("officeHour",SettingData?.office_hour);
    updateSettingPageInputState("facebookPage",SettingData?.facebook_page);
    updateSettingPageInputState("messengerLink",SettingData?.messenger_link);
    updateSettingPageInputState("youtubeUrl",SettingData?.youtube_url);
    updateSettingPageInputState("featuredVideoUrl",SettingData?.featured_video_url);    
  },[])


  useEffect(() => {
    if (flash.message) {
      toast.success(flash.message);
    }
    if (flash.error) {
      toast.error(flash.error);
    }
  }, [flash]);


  console.log(SettingData)

  return (
    <>
    <ToastContainer />
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
      >
        <Head title="Setting" />

        <motion.div
          initial={{ opacity: 1, x: '100vw', skewX: '-30deg' }}
          animate={{
            x: 0,
            y: 0,
            skewX: '0deg',
            opacity: 1,
            transition: { velocity: 10 },
          }}
          className=""
        >
          {/* <Loading isLoading={loading} /> */}
          <div className="m-2 ">
            <div className="mx-auto flex w-full overflow-hidden rounded rounded-b-none bg-white ">
              <div className="hidden w-3/12 bg-blue-gray-100 p-8  md:inline-block">
                <h2 className="text-md mb-4 font-medium tracking-wide text-gray-800">
                  General Settings
                </h2>
                <p className="text-xs text-gray-700 ">
                  Update your basic setting information such as Email Address,
                  Company Name, and Logo.
                </p>
              </div>
              <div className="w-full p-6 md:w-9/12">
                <form action="" onSubmit={saveSettingActionHandler}>
                  <div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <MyTextInput
                        label={'Organization Name'}
                        name={'organizationName'}
                        inputType={'text'}
                        value={settingPageInputState?.organizationName}
                        // error={error?.organizationName}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />
                      <MyTextInput
                        label={'Organization Short Name'}
                        name={'organizationShortName'}
                        inputType={'text'}
                        value={settingPageInputState?.organizationShortName}
                        // error={error?.organizationShortName}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />

                      <MyTextInput
                        label={'Slogan'}
                        name={'slogan'}
                        inputType={'text'}
                        value={settingPageInputState?.slogan}
                        // error={error?.slogan}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />

                      <MyTextInput
                        label={'Address'}
                        name={'address'}
                        inputType={'text'}
                        value={settingPageInputState?.address}
                        // error={error?.address}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />

                      <MyTextInput
                        label={'HR Email'}
                        name={'hrEmail'}
                        inputType={'text'}
                        value={settingPageInputState?.hrEmail}
                        // error={error?.hrEmail}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />

                      <MyTextInput
                        label={'Customer Support Email'}
                        name={'customerSupportEmail'}
                        inputType={'text'}
                        value={settingPageInputState?.customerSupportEmail}
                        // error={error?.customerSupportEmail}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />

                      <MyTextInput
                        label={'Technical Support Email'}
                        name={'technicalSupportEmail'}
                        inputType={'text'}
                        value={settingPageInputState?.technicalSupportEmail}
                        // error={error?.technicalSupportEmail}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />

                      <MyTextInput
                        label={'Fax'}
                        name={'fax'}
                        inputType={'text'}
                        value={settingPageInputState?.fax}
                        // error={error?.fax}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />

                      <MyTextInput
                        label={'HR Contact No'}
                        name={'hrContact'}
                        inputType={'text'}
                        value={settingPageInputState?.hrContact}
                        // error={error?.hrContact}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />

                      <MyTextInput
                        label={'Customer Support Contact No'}
                        name={'customerSupportContact'}
                        inputType={'text'}
                        value={settingPageInputState?.customerSupportContact}
                        // error={error?.customerSupportContact}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />

                      <MyTextInput
                        label={'Technical Support Contact No'}
                        name={'technicalSupportContact'}
                        inputType={'text'}
                        value={settingPageInputState?.technicalSupportContact}
                        // error={error?.technicalSupportContact}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />

                      <MyTextInput
                        label={'Office Hour'}
                        name={'officeHour'}
                        inputType={'text'}
                        value={settingPageInputState?.officeHour}
                        // error={error?.officeHour}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />

                      <MyTextInput
                        label={'Facebook Page'}
                        name={'facebookPage'}
                        inputType={'text'}
                        value={settingPageInputState?.facebookPage}
                        // error={error?.facebookPage}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />

                      <MyTextInput
                        label={'Messenger Link'}
                        name={'messengerLink'}
                        inputType={'text'}
                        value={settingPageInputState?.messengerLink}
                        // error={error?.messengerLink}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />

                      <MyTextInput
                        label={'linkedin link'}
                        name={'youtubeUrl'}
                        inputType={'text'}
                        value={settingPageInputState?.youtubeUrl}
                        // error={error?.youtubeUrl}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />

                      <MyTextInput
                        label={'Featured Video Embedded Link'}
                        name={'featuredVideoUrl'}
                        inputType={'text'}
                        value={settingPageInputState?.featuredVideoUrl}
                        // error={error?.featuredVideoUrl}
                        onChangeHandler={(event) => {
                          updateSettingPageInputState(event.target.name, event.target.value);
                        }}
                      />
                    </div>


                  </div>
                  <div className="flex mt-4 items-center justify-between rounded   bg-light-green-100 p-6 ">
                    <p className="text-xs text-gray-700">
                      Click on Save to update your change.
                    </p>
                    <button
                      type="submit"
                      className="cursor-pointer rounded bg-primary px-6 py-2 text-sm font-medium uppercase text-white"

                    // onClick={updateSettingsHandler}
                    >
                      Save
                    </button>

                  </div>
                </form>
              </div>
            </div>

          </div>
        </motion.div>
      </AuthenticatedLayout>
    </>
  );
}
