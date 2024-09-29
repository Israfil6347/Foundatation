import MyTextInput from '@/Components/MyTextInput';
import MyTextarea from '@/Components/MyTextarea';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, router, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { formats, modules, slugify } from "../../../shared/emums/QuillSetting";
import useCreatePageInputState from './hooks/useCreatePageInputState';


function PageUpdateView({ auth }) {
  const { pageView, id, flash } = usePage().props;

  const pageQueryExecuted = (link) => {
    const method = link?.method?.toLowerCase();
    Inertia[method](link?.url);
  }


  const {
    createPageInputState,
    updateCreatePageInputState,
  } = useCreatePageInputState();

  useEffect(() => {
    if (pageView?.data !== '') {
      updateCreatePageInputState('title', pageView?.data?.title);
      updateCreatePageInputState('slug', pageView?.data?.slug);
      updateCreatePageInputState('order', pageView?.data?.order);
      updateCreatePageInputState('shortDescription', pageView?.data?.subtitle);
      updateCreatePageInputState('content', pageView?.data?.body);
      updateCreatePageInputState('image', pageView?.data?.attachment_url);
    }
  }, [pageView]);

  const pageUpdateActionHandler = (event) => {

    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    formData.append('body', createPageInputState?.content);
    const data = Object.fromEntries(formData);

    // router.post(route('pages.update', id), data);
    router.post(route('pages.update', id), data, {
      onSuccess: (resp) => {
      
        toast(resp)
      }
    });
  }

  useEffect(() => {
    if (flash.message) {
      toast.success(flash.message);
    }
    if (flash.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  const removeImageHandler = (id) => {
    router.delete(route('pages.removeImage', id)), {
      onSuccess: (resp) => {

      }
    }

  }

  return (
    <>
      <ToastContainer />
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
      >
        <Head title="Page View" />
        <div>

        </div>
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
                <p className="text-2xl font-bold"> Edit Notice </p>
                <p className="mt-1 font-normal">
                  Edit notice page details
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {pageView?.data?.links?.map((link) => {

                  if (link.label === "Edit Page") {
                    return null;
                  }
                  return (
                    <button
                      className="flex items-center gap-3 rounded bg-primary px-4 py-2 text-onPrimary"
                      onClick={() => {
                        if (link.rel === 'destroy') {
                          Swal.fire({
                            title: 'Are you sure?',
                            text: "You won't delate this page!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              pageQueryExecuted(link)
                              Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                              );
                            }
                          });
                        } else if (link.rel === 'PublishLink') {
                          Swal.fire({
                            title: 'Are you sure?',
                            text: `You won't publish this page!`,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes!'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              pageQueryExecuted(link)

                            }
                          });

                        }
                        else if (link.rel === 'draft') {
                          Swal.fire({
                            title: 'Are you sure?',
                            text: `You won't draft this page!`,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes!'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              pageQueryExecuted(link)

                            }
                          });

                        } else {
                          pageQueryExecuted(link)
                        }
                      }}
                    >
                      <i className={link.icon}></i>
                      {link.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
            </div>
          </div>
          <div>
            <div
              className="w-full  bg-surface px-6 py-6  lg:px-20"
              style={{
                maxHeight: 'calc(100vh - 205px)',
              }}
            >
              <form onSubmit={pageUpdateActionHandler}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className='flex justify-between'>
                    {createPageInputState?.image ?
                      <div className='border-4 border-dashed border-gray-400 h-44 w-44 bg-surface hover:border-primary hover:bg-gray-100'>
                        <div className='relative'>
                          <div className='absolute right-2 top-1' onClick={() => {
                            removeImageHandler(id)
                          }}>
                            <i class="fa-solid fa-trash-can text-red-700"></i>
                          </div>
                          <div>
                            <img
                              src={createPageInputState.image}
                              className="h-full p-2"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      :
                      <div>
                        <input type="file" name="attachment" />
                      </div>
                    }
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
                  <MyTextInput
                    label={'Page Title'}
                    name={'title'}
                    value={createPageInputState.title}
                    inputType={'text'}
                    leftIcon={<i className="fa-solid fa-heading"></i>}
                    id={'title'}
                    onChangeHandler={(event) => {
                      updateCreatePageInputState(event.target.name, event.target.value);
                      updateCreatePageInputState('slug', slugify(event.target.value));
                    }}
                  />
                  <MyTextInput
                    label={'Page Slug'}
                    name={'slug'}
                    value={createPageInputState?.slug}
                    inputType={'text'}
                    leftIcon={<i className="fa-solid fa-link"></i>}
                    id={'slug'}
                  />
                  <MyTextInput
                    label={'Page Order'}
                    name={'order'}
                    disabled={false}
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
                </div>
                <div className="flex mt-12  items-center justify-end gap-4 bg-surface py-2 ">
                  {pageView?.update && (
                    <button
                      type="submit"
                      className="flex items-center rounded bg-lime-600 hover:bg-lime-700 px-4 py-2 text-onPrimary"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                      {pageView.update.label}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </AuthenticatedLayout>
    </>
  )
}

export default PageUpdateView
