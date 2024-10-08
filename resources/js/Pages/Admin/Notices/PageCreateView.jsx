
import MyTextarea from '@/Components/MyTextarea';
import MyTextInput from '@/Components/MyTextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, usePage } from '@inertiajs/react';
import { motion } from "framer-motion";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formats, modules, slugify } from "../../../shared/emums/QuillSetting";
import useCreatePageInputState from './hooks/useCreatePageInputState';


function PageCreateView({ auth }) {
  const { Page } = usePage().props;

  const {
    createPageInputState,
    updateCreatePageInputState,
  } = useCreatePageInputState();

  const pageCreateActionHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('body', createPageInputState?.content);
    const data = Object.fromEntries(formData);
    router.post(route('adminNotice.store'), data, {
      onSuccess: (resp) => {
       
        toast(resp)
      }
    });
  };

  const LinkClickHandler = (link) => {
    router.get(link);
  }

  return (
    <>
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
      >
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
                <p className="text-2xl font-bold">Create Notice</p>
                <p className="mt-1 font-normal">
                  Create a new Notice
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
            <div
              className="w-full overflow-auto  bg-surface px-6 py-6  lg:px-20"
              style={{
                maxHeight: 'calc(100vh - 205px)',
              }}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <input type="file" name="attachment"
                  onChangeHandler={(name, value) => {
                    updateCreatePageInputState(name, value);
                  }}></input>

              </div>
              <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
                <MyTextInput
                  label={'Page Title'}
                  name={'title'}
                  value={createPageInputState?.title}
                  inputType={'text'}
                  leftIcon={<i className="fa-solid fa-heading"></i>}
                  onChangeHandler={(event) => {
                    updateCreatePageInputState(event.target.name, event.target.value);
                    updateCreatePageInputState('slug', slugify(event.target.value));
                  }}
                  id={'title'}
                />
                <MyTextInput
                  label={'Page Slug'}
                  name={'slug'}
                  value={createPageInputState?.slug}
                  inputType={'text'}
                  leftIcon={<i className="fa-solid fa-link"></i>}
                  onChangeHandler={(event) => {
                    updateCreatePageInputState(
                      event.target.name,
                      slugify(event.target.value)
                    );
                  }}
                  id={'slug'}
                />

                <MyTextInput
                  label={'Page Order'}
                  name={'order'}
                  value={createPageInputState?.order?.toString()}
                  inputType={'number'}
                  leftIcon={<i className="fa-solid fa-arrow-down-1-9"></i>}
                  onChangeHandler={(event) => {
                    updateCreatePageInputState(event.target.name, event.target.value);
                  }}
                  id={'order'}
                />
              </div>
              <div className="mt-4 grid grid-cols-1">
                <MyTextarea
                  label={'Short Description'}
                  name={'subtitle'}
                  value={createPageInputState?.shortDescription}
                  rows={4}
                  onChange={(event) => {
                    updateCreatePageInputState("shortDescription", event.target.value);
                  }}
                />
              </div>
              <div className=" mt-2 grid  grid-cols-1 ">
                <label htmlFor="content">Content</label>
                <ReactQuill
                  theme="snow"
                  id="content"
                  name="content"
                  modules={modules}
                  formats={formats}
                  value={createPageInputState?.content ? createPageInputState?.content : ''}
                  onChange={(value) => {
                    updateCreatePageInputState('content', value);
                  }}
                />
                <div className="flex items-center justify-end gap-4 bg-surface py-2 mt-12 ">
                  <button
                    className="rounded bg-lime-600 hover:bg-lime-700 px-4 py-2 text-onPrimary shadow-sm transition-all duration-150 hover:scale-105  hover:shadow"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>

            </div>

          </form>

        </motion.div>
      </AuthenticatedLayout>
    </>
  )
}

export default PageCreateView
