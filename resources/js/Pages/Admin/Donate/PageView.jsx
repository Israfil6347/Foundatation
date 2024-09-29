import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MyTextInput from '@/Components/MyTextInput';
import { Inertia } from '@inertiajs/inertia';
import { motion } from "framer-motion";
import Swal from 'sweetalert2';

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
                <p className="text-2xl font-bold">Page View</p>
                <p className="mt-1 font-normal">
                  Page details
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
            </div>
            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
              <MyTextInput
                label={'Bank/Company Name'}
                name={'company_name'}
                value={pageView?.data.company_name}
                inputType={'text'}
                leftIcon={<i class="fa-solid fa-building-columns"></i>}
                id={'company_name'}
              />
              <MyTextInput
                label={'Page Slug'}
                name={'slug'}
                value={pageView?.data?.slug}
                inputType={'text'}
                leftIcon={<i className="fa-solid fa-link"></i>}
                id={'slug'}
              />
              <MyTextInput
                label={'Page Order'}
                name={'order'}
                value={pageView?.data?.order?.toString()}
                inputType={'number'}
                leftIcon={<i className="fa-solid fa-arrow-down-1-9"></i>}
                id={'order'}
              />
              <MyTextInput
                label={'Accounts Name'}
                name={'accounts_name'}
                value={pageView?.data?.accounts_name}
                inputType={'text'}
                leftIcon={<i className="fa-solid fa-heading"></i>}
                id={'accounts_name'}
              />
              <MyTextInput
                label={'Account Number'}
                name={'account_number'}
                value={pageView?.data?.account_number}
                inputType={'number'}
                leftIcon={<i class="fa-solid fa-hashtag"></i>}
                id={'account_number'}
              />
              <MyTextInput
                label={'Branch Name'}
                name={'branch_name'}
                value={pageView?.data?.branch_name}
                inputType={'text'}
                leftIcon={<i class="fa-solid fa-code-branch"></i>}
                id={'branch_name'}
              />
            </div>

          </div>

        </motion.div>
      </AuthenticatedLayout>
    </>
  )
}

export default PageView
