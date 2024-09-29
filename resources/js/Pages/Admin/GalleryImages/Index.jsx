
import MyPagination from '@/Components/MyPagination';
import MySearchInput from '@/Components/MySearchInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, router, usePage, useRemember } from '@inertiajs/react';
import { Tooltip, Typography } from '@material-tailwind/react';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';



const TABLE_HEAD = ['Title', 'Slug', 'Order',  'Status', 'Action'];

const initialPublishOrDraftPageState = {
  openDialog: false,
  dialogLink: null,
  text: ""
}

export default function Index({ auth }) {
   const { pages,flash } = usePage().props;  
   const [publishOrDraftPage, setPublishOrDraftPage] = useRemember(initialPublishOrDraftPageState);
  const [currentPage, setCurrentPage] = useRemember()

    const updatePublishOrDraftPage = (fieldName, fieldValue) => {
      setPublishOrDraftPage((prevState) => {
        return {
          ...prevState,
          [fieldName]: fieldValue,
        };
      });
    };
    const executePageUpdateQuery =(link)=>{
     
      router.get(link),{
            onSuccess: (resp) => {
             
            }
      }
    }
    const executePageDestroyQuery =(link)=>{
      router.delete(link),{
            onSuccess: (resp) => {
              
            }
      }
    }
    const setExecutedPageDraftQuery =(link)=>{
       router.patch(link),{
            onSuccess: () => {
              setExecutedPageDraftState(false)
            }
      }
    }
    const createNewPageHandler= (link)=>{
      router.get(link.url),{
            onSuccess: () => {
              setExecutedPageDraftState(false)
            }
      }
    }
    
    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handlePageChange = (page) => {
        Inertia.get(`/pages?page=${page}`);
    };

   

    useEffect(()=>{
      if(publishOrDraftPage.openDialog){
        Swal.fire({
          title: 'Are you sure?',
          text: `You won't ${publishOrDraftPage.text} this page!`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isConfirmed) {
            setExecutedPageDraftQuery(publishOrDraftPage.dialogLink)
            Swal.fire(
              `${publishOrDraftPage.text}`,
              `Your file has been ${publishOrDraftPage.text}.`,
              'success'
            );
          }
        });
      }
    },[publishOrDraftPage])

    return (
       <>
          <ToastContainer />
          <AuthenticatedLayout
              user={auth.user}
              header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
          >
          <Head title="Gallery" />    
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
                    <p className="text-2xl font-bold">All Gallery </p>
                    <p className="mt-1 font-normal">
                      List of all Gallery
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    {pages?.createNew && (
                      <button
                        className="flex items-center gap-3 rounded bg-primary px-4 py-2 text-onPrimary"
                        onClick={() => {
                          createNewPageHandler(pages.createNew)
                        }}
                      >
                        <i className="fa-brands fa-page4"></i>
                        {pages.createNew.label}
                      </button>
                    )}
                  </div>
                  
                </div>
                <div className="my-2 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <form
                action=""
             
              >
                <MySearchInput
                  label="Search"
                  disabled={true}
                  name={''}
                />
              </form>
            </div>
          </div>
                <div className="my-2 flex flex-col items-center justify-between gap-4 md:flex-row">
              
                  <div className="w-full md:w-72">
                    <form
                      action=""
                    >
                    </form>
                  </div>
                </div>
              </div>
              <div className="overflow-scroll px-0">
                <div className="h-[calc(100vh-430px)] overflow-auto md:h-[calc(100vh-350px)]">
                  <table className="whitespace-no-wrap relative w-full table-auto border-collapse border">
                    <thead className="w-full">
                      <tr className="sticky -top-0 hidden h-14 w-full shadow-sm md:table-row">
                        {TABLE_HEAD.map((head, index) => (
                          <th
                            key={head}
                            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50  p-4 transition-colors hover:bg-blue-gray-50 "
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="flex items-center justify-between gap-2 font-normal leading-none "
                            >
                              {head}
                              {index !== TABLE_HEAD.length - 1 && (
                                <i className="fa-solid fa-up-down"></i>
                              )}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="flex-1 sm:flex-none">
                      {pages &&
                        pages.data.map((page, index) => {

              
                          return (
                            <tr
                              key={index}
                              className="flex w-full flex-col flex-wrap border-b border-blue-gray-50 last:border-b-0 even:bg-blue-gray-600/5 md:table-row"
                            >
                              <td className="border px-2">
                                <label className="md:hidden">Title</label>
                                <p className="font-semibold md:font-normal">
                                  {page.title}
                                </p>
                              </td>
                              <td className="border px-2">
                                <label className="md:hidden">Slug</label>
                                <p className="font-semibold md:font-normal">
                                  {page.slug}
                                </p>
                              </td>
                              <td className="border px-2">
                                <label className="md:hidden">Order</label>
                                <p className="font-semibold md:font-normal">
                                  {page.order}
                                </p>
                              </td>
                              <td className="border px-2">
                                <label className="md:hidden">Status</label>
                                <span
                                  className={`w-fit rounded-md ${
                                    page.publishStatus !== 'Published'
                                      ? 'bg-orange-600 '
                                      : 'bg-green-600 '
                                  } py-0.5 px-1 text-white shadow`}
                                >
                                  {page.publishStatus}
                                </span>
                              </td>

                              <td className="h-full border px-2">
                                <div className="flex h-full ]">
                                  {page.links?.map((link, index) => {
                                    if (link) {
                                      return (
                                        <Tooltip content={link.label} key={index}>
                                          <button
                                          className='p-2'
                                            variant="text"
                                            onClick={() => {
                                              if (link.rel === 'show') {
                                                // executePageQuery(link.url);
                                                 executePageUpdateQuery(link.url);
                                              }
                                              if (link.rel === 'update') {
                                            
                                                executePageUpdateQuery(link.url);
                                            
                                              }
                                              if (link.rel === 'draft') {
                                                updatePublishOrDraftPage("openDialog", true)
                                                updatePublishOrDraftPage("dialogLink", link.url)
                                                updatePublishOrDraftPage("text", "Draft")
                                              }
                                              if (link.rel === 'PublishLink') {
                                                updatePublishOrDraftPage("openDialog", true)
                                                updatePublishOrDraftPage("dialogLink", link.url)
                                                updatePublishOrDraftPage("text", "Publish")
                                              }
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
                                                    executePageDestroyQuery(link.url);
                                                    Swal.fire(
                                                      'Deleted!',
                                                      'Your file has been deleted.',
                                                      'success'
                                                    );
                                                  }
                                                });
                                              }
                                            }}
                                          >
                                            <i
                                              className={`text-xl text-primary ${link.icon}`}
                                            ></i>
                                          </button>
                                        </Tooltip>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
               
                </div>
                <MyPagination
                currentPage={pages?.meta?.current_page}
                meta={pages?.meta}
                setCurrentPage={setCurrentPage}
                handlePageChange={handlePageChange}
               />
              </div>
              
            </motion.div>
        </AuthenticatedLayout>
      </>
    );
}
