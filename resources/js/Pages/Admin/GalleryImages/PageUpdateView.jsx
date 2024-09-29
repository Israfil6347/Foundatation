import Modal from '@/Components/Modal';
import MyTextInput from '@/Components/MyTextInput';
import MyTextarea from '@/Components/MyTextarea';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, router, usePage } from "@inertiajs/react";
import { Tooltip, Typography } from '@material-tailwind/react';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import originalLogo from "../../../../assets/brand/logo_original.png";
import { slugify } from "../../../shared/emums/QuillSetting";
import useCreatePageInputState from './hooks/useCreatePageInputState';

const TABLE_HEAD = ['Title', 'subtitle', 'Image', 'Action'];

function PageUpdateView({ auth }) {
  const { pageView, id, flash } = usePage().props;

  const [openAddImageDialog, setOpenAddImageDialog] = useState(false)

  const [imageData, setImageData] = useState({
    file: null,
    title: '',
    subtitle: '',
  });
  const [pagUpdateQuery, setPagUpdateQuery] = useState({
    openDialog: false,
    link: '',
    data: []
  })



  const [imageDataUpdate, setUpdateImageData] = useState({
    file: null,
    title: '',
    subtitle: '',
  });

  const updateFileChange = (key, value) => {
    setPagUpdateQuery((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {

    handleUpdateChange("title", pagUpdateQuery?.data?.title);
    handleUpdateChange("subtitle", pagUpdateQuery?.data?.subtitle);
  }, [pagUpdateQuery])



  const handleFileChange = (key, value) => {
    setImageData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdateChange = (key, value) => {
    setUpdateImageData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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
    const data = Object.fromEntries(formData);
    // router.post(route('pages.update', id), data);
    router.post(route('adminGalleryImage.update', id), data, {
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


  const imageSubmitHandler = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    router.post(route('adminGalleryImage.storeGalleryImage', id), data, {
      onSuccess: (resp) => {
       
        toast(resp)
        setOpenAddImageDialog(false);
      }
    });
  }

  const executePageDestroyQuery = (link) => {
    router.delete(link), {
      onSuccess: (resp) => {
       
      }
    }
  }



  const imageUpdateSubmitHandler = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    router.post(route('adminGalleryImageUpdate.updateGalleryImage', pagUpdateQuery?.data?.id), data, {
      onSuccess: (resp) => {
       
        toast(resp)
      }
    });

  }


  return (
    <>
      <ToastContainer />
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
      >
        <Head title="Page View" />

        <Modal show={openAddImageDialog} maxWidth={'Xl'} onClose={() => {
          setOpenAddImageDialog(false);
        }} >
          <form onSubmit={imageSubmitHandler}>
            <div className="bg-background p-6">
              <div className="hover:animate-swing flex w-full flex-col items-center hover:cursor-pointer">
                <img src={originalLogo} alt="" className="w-28" />
                <h3 className="font-bold text-primary">
                  Add Image
                </h3>
              </div>
            </div>
            <div className="p-6 relative">
              <div className='grid grid-cols-1 gap-3'>
                <div className=''>
                  <input
                    type="file"
                    name={`attachment`}
                    onChange={(e) => handleFileChange("file", e.target.files[0])}
                  />
                </div>
                <div>
                  <MyTextInput
                    label={'Image Title'}
                    name={`title`}
                    value={imageData.title}
                    inputType={'text'}
                    leftIcon={<i className="fa-solid fa-heading"></i>}
                    onChangeHandler={(event) => {
                      handleFileChange(
                        "title", event.target.value)

                    }}

                  />
                </div>
                <div>
                  <MyTextarea
                    label={'Image Short Description'}
                    name={`subtitle`}
                    value={imageData?.subtitle}
                    rows={4}
                    onChange={(event) => {
                      handleFileChange(
                        "subtitle", event.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center gap-4 bg-background p-4">
              <button
                type='submit'
                className="w-2/5  rounded border bg-primary py-2 font-semibold uppercase text-onPrimary hover:bg-primaryVariant">Add Image</button>
            </div>
          </form>
        </Modal>

        <Modal show={pagUpdateQuery?.openDialog} maxWidth={'Xl'} onClose={() => {
          updateFileChange("openDialog", false)
        }} >
          <form onSubmit={imageUpdateSubmitHandler}>
            <div className="bg-background p-6">
              <div className="hover:animate-swing flex w-full flex-col items-center hover:cursor-pointer">
                <img src={originalLogo} alt="" className="w-28" />
                <h3 className="font-bold text-primary">
                  Update
                </h3>
              </div>
            </div>
            <div className="p-6 relative">
              <div className='grid grid-cols-1 gap-3'>
                <div className=''>
                  <input
                    type="file"
                    name={`attachment`}
                    onChange={(e) => handleUpdateChange("file", e.target.files[0])}
                  />
                </div>
                <div>
                  <MyTextInput
                    label={'Image Title'}
                    name={`title`}
                    value={imageDataUpdate.title}
                    inputType={'text'}
                    leftIcon={<i className="fa-solid fa-heading"></i>}
                    onChangeHandler={(event) => {
                      handleUpdateChange(
                        "title", event.target.value)
                    }}
                  />
                </div>
                <div>
                  <MyTextarea
                    label={'Image Short Description'}
                    name={`subtitle`}
                    value={imageDataUpdate?.subtitle}
                    rows={4}
                    onChange={(event) => {
                      handleUpdateChange(
                        "subtitle", event.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center gap-4 bg-background p-4">
              <button
                type='submit'
                className="w-2/5  rounded border bg-primary py-2 font-semibold uppercase text-onPrimary hover:bg-primaryVariant">Update</button>
            </div>
          </form>
        </Modal>
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
                <p className="text-2xl font-bold">Gallery Edit</p>
                <p className="mt-1 font-normal">
                  Edit gallery details
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
                <div className="flex items-center justify-end gap-4 bg-surface py-2 ">
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
              <div className='flex justify-end'>
                <button
                  onClick={() => {
                    setOpenAddImageDialog(true);
                  }}
                  type="submit"
                  className="flex mb-2 items-center rounded bg-lime-600 hover:bg-lime-700 px-4 py-2 text-onPrimary"
                >
                  <i className="fa-solid fa-plus"></i>
                  Add Child Image
                </button>
              </div>
               <div className="overflow-scroll px-0">
              <div className="h-[calc(100vh-800px)] overflow-auto md:h-[calc(100vh-700px)]">
              <table className="whitespace-no-wrap relative w-full table-auto border-collapse border">
                <thead className="w-full">
                  <tr className="sticky hidden h-14 w-full shadow-sm md:table-row">
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
                  {pageView?.data?.attachments?.map((data, index) => {

                    return (
                      <tr
                        key={index}
                        className="flex w-full flex-col flex-wrap border-b border-blue-gray-50 last:border-b-0 even:bg-blue-gray-600/5 md:table-row"
                      >
                        <td className="border px-2">
                          <label className="md:hidden">Title</label>
                          <p className="font-semibold md:font-normal">
                            {data?.title}
                          </p>
                        </td>
                        <td className="border px-2">
                          <label className="md:hidden">subtitle</label>
                          <p className="font-semibold md:font-normal">
                            {data?.subtitle}
                          </p>
                        </td>
                        <td className="border px-2">
                          <label className="md:hidden">Image</label>
                          <p className="font-semibold md:font-normal">
                            <img className='w-10 h-10 rounded-full' src={data?.attachment_url} alt='img not found' />
                          </p>
                        </td>

                        <td className="border px-2">
                          <label className="md:hidden">Action</label>
                          <div className="flex h-full ]">
                            {data.links?.map((link, index) => {
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
                                       
                                          // executePageUpdateQuery(link.url);
                                          // setPagUpdateQuery(true)
                                          updateFileChange("openDialog", true)
                                          updateFileChange("link", link.url)
                                          updateFileChange("data", data)
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
                                        className={`text-xl text-primary  ${link.icon}`}
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
                    )
                  })}
                </tbody>
              </table>
              </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AuthenticatedLayout>
    </>
  )
}

export default PageUpdateView
