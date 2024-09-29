import MyTextInput from '@/Components/MyTextInput';
import MyTextarea from '@/Components/MyTextarea';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import { motion } from "framer-motion";
import ReactQuill from 'react-quill';
import Swal from 'sweetalert2';
import { formats, modules } from "../../../shared/emums/QuillSetting";

function PageView({ auth }) {
  const { pageView } = usePage().props;

  const pageQueryExecuted = (link) => {
    const method = link?.method?.toLowerCase();
    Inertia[method](link?.url);
  }


  return (
    <>
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
      >
        <Head title="Page View" />

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
                <p className="text-2xl font-bold">Notice View</p>
                <p className="mt-1 font-normal">
                  Notice Page details
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {pageView?.data?.links?.map((link) => {
                  if (link.label === "View Post") {
                    return null;
                  }
                  return (
                    <button
                      className="flex items-center gap-3 rounded bg-primary px-4 py-2 text-onPrimary"
                      onClick={() => {
                        // e.preventDefault();
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
          <div
            className="w-full  bg-surface px-6 py-6  lg:px-20"
            style={{
              maxHeight: 'calc(100vh - 205px)',
            }}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className='flex justify-between'>
                <div>
                  <img className='w-28 h-28 rounded' src={pageView?.data?.attachment_url} alt="Image not found " />
                </div>
              </div>



            </div>
            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
              <MyTextInput
                label={'Page Title'}
                name={'title'}
                disabled={true}
                value={pageView?.data?.title}
                inputType={'text'}
                leftIcon={<i className="fa-solid fa-heading"></i>}

                id={'title'}
              />
              <MyTextInput
                label={'Page Slug'}
                name={'slug'}
                value={pageView?.data?.slug}
                inputType={'text'}
                leftIcon={<i className="fa-solid fa-link"></i>}
                disabled={true}
                id={'slug'}
              />

              <MyTextInput
                label={'Page Order'}
                name={'order'}
                disabled={true}
                value={PageView?.data?.order?.toString()}
                inputType={'number'}
                leftIcon={<i className="fa-solid fa-arrow-down-1-9"></i>}
                onChangeHandler={(event) => {
                  updatePageInputState(event.target.name, event.target.value);
                }}
                id={'order'}
              />
            </div>
            <div className="mt-4 grid grid-cols-1">
              <MyTextarea
                label={'Short Description'}
                name={'subtitle'}
                value={pageView?.data?.subtitle}
                disabled={true}
                rows={4}

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
                value={pageView?.data?.body ? pageView?.data?.body : ''}

              />
            </div>
          </div>
        </motion.div>
      </AuthenticatedLayout>
    </>
  )
}

export default PageView
