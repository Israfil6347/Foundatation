
import MyTextInput from '@/Components/MyTextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { motion } from "framer-motion";
import 'react-quill/dist/quill.snow.css';
import useCreatePageInputState from './hooks/useCreatePageInputState';
import MyPasswordInput from '@/Components/MyPasswordInput';
import MyDropdown from '@/Components/MyDropdown';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

const DropdownData = [
  {
    "id": "1",
    "label": "Super Admin",
    "value": "Super Admin"
  },
  {
    "id": "2",
    "label": "Admin",
    "value": "Admin"
  },
  {
    "id": "3",
    "label": "Visitor",
    "value": "Visitor"
  }
]

function PageCreateView({ auth }) {
  const { Page ,flash} = usePage().props;

  const {
    createPageInputState,
    updateCreatePageInputState,
  } = useCreatePageInputState();

  const pageCreateActionHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    router.post(route('users.store'), data, {
      onSuccess: (resp) => {
        toast(resp)
      }
    });
  };

  const LinkClickHandler = (link) => {
    router.get(link);
  }

   useEffect(() => {
    if (flash.message) {
      toast.success(flash.message);
    }
    if (flash.error) {
      toast.error(flash.error);
    }
  }, [flash]);
  
  console.log(createPageInputState)

  return (
    <>
     <ToastContainer />
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
      >
        <Head title="Create page" />
        <motion.div
          initial={{ opacity: 1, x: '100vw', skewX: '-30deg' }}
          animate={{
            x: 0,
            y: 0,
            skewX: '0deg',
            opacity: 1,
            transition: { velocity: 10 },
          }}
          className="m-2 h-[calc(100vh-130px)] w-[calc(100vw-74px)] rounded bg-surface p-2 shadow-sm "
        >
          <div className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <p className="text-2xl font-bold">Create User</p>
                <p className="mt-1 font-normal">
                  Create a new user
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <button className="flex items-center gap-3 rounded bg-primary px-4 py-2 text-onPrimary"
                  onClick={() => {
                    LinkClickHandler(Page.url);
                  }}
                >
                  <i className={Page.icon}></i>
                  {Page.label}
                </button>
              </div>
            </div>
            <div>
            </div>
          </div>
          <form onSubmit={pageCreateActionHandler} >
           <div>
                <input type="file" name="photo"
                  onChangeHandler={(name, value) => {
                    updateCreatePageInputState(name, value);
                  }}></input>
           </div>
            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3">
            
              <MyTextInput
                label={'User Name'}
                name={'name'}
                // error={errors?.name}
                value={createPageInputState?.name}
                inputType={'text'}
                leftIcon={<i className="fa-solid fa-id-badge"></i>}
                onChangeHandler={(event) => {
                  updateCreatePageInputState(event.target.name, event.target.value);
                }}
                id={'name'}
              />
              <MyTextInput
                label={'User Email'}
                name={'email'}
                value={createPageInputState?.email}
                // error={errors?.email}
                inputType={'text'}
                leftIcon={<i className="fa-solid fa-at"></i>}
                onChangeHandler={(event) => {
                  updateCreatePageInputState(event.target.name, event.target.value);
                }}
                id={'email'}
              />

              <MyTextInput
                label={'Phone'}
                name={'phone'}
                // error={errors?.phone}
                value={createPageInputState?.phone}
                inputType={'text'}
                leftIcon={<i className="fa-solid fa-phone-volume"></i>}
                onChangeHandler={(event) => {
                  updateCreatePageInputState(event.target.name, event.target.value);
                }}
                id={'phone'}
              />

              <MyDropdown
                label={'Role'}
                name={'role'}
                // error={errors?.role}
                value={createPageInputState?.role}
                leftIcon={<i className="fa-brands fa-r-project"></i>}
        

                dropDownData={DropdownData?.map((obj, index) => {

                  console.log(obj)
                  return {
                    id: index,
                    value: obj?.value,
                    label: obj?.label,
                  };
                })}
              onChange={(event) => {
                  updateCreatePageInputState(event.target.name, event.target.value);
              }}
              />



              <MyPasswordInput
                fullWidth={true}
                id="password"
                label="Password"
                name="password"
                value={createPageInputState?.password}
                required={true}
                // error={errors?.password}
                leftIcon={<i className="fa-solid fa-key"></i>}
                onChangeHandler={(event) => {
                  updateCreatePageInputState(event.target.name, event.target.value);
                }}
              />

              <MyPasswordInput
                fullWidth={true}
                id="password_confirmation"
                label="Confirm Password"
                name="password_confirmation"
                value={createPageInputState?.password_confirmation}
                required={true}
                // error={errors?.confirmedPassword}
                leftIcon={<i className="fa-solid fa-key"></i>}
                onChangeHandler={(event) => {
                  updateCreatePageInputState(event.target.name, event.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-end gap-4 bg-surface pt-4">
              <button type='submit' className='rounded bg-lime-600 hover:bg-lime-700 px-4 py-2 text-onPrimary shadow-sm transition-all duration-150 hover:scale-105  hover:shadow'>Submit</button>
            </div>
          </form>
        </motion.div>
      </AuthenticatedLayout>
    </>
  )
}

export default PageCreateView
