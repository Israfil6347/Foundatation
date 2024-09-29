
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage, useRemember } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import { motion } from "framer-motion";
import MySearchInput from '@/Components/MySearchInput';
import { Tooltip, Typography } from '@material-tailwind/react';
import MyPagination from '@/Components/MyPagination';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const TABLE_HEAD = ['Name', 'Phone', 'Email', 'Role', 'Status', 'Action'];
const initialPublishOrDraftPageState = {
  openDialog: false,
  dialogLink: null,
  text: ""
}
export default function Index({ auth }) {
    const { pages, flash } = usePage().props;
    const [currentPage, setCurrentPage] = useRemember()
     const [publishOrDraftPage, setPublishOrDraftPage] = useRemember(initialPublishOrDraftPageState);
    const handlePageChange = (page) => {
        Inertia.get(`/pages?page=${page}`);
    };

    const createNewPageHandler = (link) => {
        router.get(link.url), {
            onSuccess: () => {
                setExecutedPageDraftState(false)
            }
        }
    }

    const executePageUpdateQuery = (link) => {

        router.get(link), {
            onSuccess: (resp) => {

            }
        }
    }
    const executePageDestroyQuery = (link) => {
        router.delete(link), {
            onSuccess: (resp) => {

            }
        }
    }

    const updatePublishOrDraftPage = (fieldName, fieldValue) => {
    setPublishOrDraftPage((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
      };
    });
  };

  useEffect(() => {
    if (publishOrDraftPage.openDialog) {
      Swal.fire({
        title: 'Are you sure?',
        text: `You won't ${publishOrDraftPage.text} this user!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.isConfirmed) {
          updateActiveAndInactiveHandler(publishOrDraftPage.dialogLink)
          Swal.fire(
            `${publishOrDraftPage.text}`,
            `Your User has been ${publishOrDraftPage.text}.`,
            'success'
          );
        }
      });
    }
  }, [publishOrDraftPage])


   const updateActiveAndInactiveHandler = (link) => {
    router.patch(link), {
      onSuccess: () => {
        setExecutedPageDraftState(false)
      }
    }
  }

    console.log(pages)


    return (
        <>
            <ToastContainer />
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
            >
                <Head title="User" />
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
                                <p className="text-2xl font-bold">All User</p>
                                <p className="mt-1 font-normal">
                                    List of all users
                                </p>
                            </div>
                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                {pages?.createNew && (
                                    <button
                                        className="flex items-center gap-3 rounded bg-primary px-4 py-2 text-onPrimary"
                                        onClick={() => {
                                            // setCreatePageDialog(true);
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
                            {/* <RecordsPerPage onClickHandler={setRecordPerPage} /> */}
                            <div className="w-full md:w-72">
                                <form
                                    action=""
                                // onSubmit={(event) => {
                                //   searchClickHandler(event);
                                // }}
                                >
                                    <MySearchInput
                                        label="Search"
                                        disabled={true}
                                        //   inputRef={searchInputRef}
                                        name={''}
                                    />
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
                                                            {page.name}
                                                        </p>
                                                    </td>
                                                    <td className="border px-2">
                                                        <label className="md:hidden">Slug</label>
                                                        <p className="font-semibold md:font-normal">
                                                            {page.phone}
                                                        </p>
                                                    </td>
                                                    <td className="border px-2">
                                                        <label className="md:hidden">Order</label>
                                                        <p className="font-semibold md:font-normal">
                                                            {page.email}
                                                        </p>
                                                    </td>

                                                    <td className="border px-2">
                                                        <label className="md:hidden">Role</label>
                                                        <span
                                                            className={`w-fit rounded-md ${page.role !== 'Super Admin'
                                                                ? 'bg-orange-600 '
                                                                : 'bg-green-600 '
                                                                } py-0.5 px-1 text-white shadow`}
                                                        >
                                                            {page.role}
                                                        </span>
                                                    </td>
                                                    <td className="border px-2">
                                                        <label className="md:hidden">Status</label>
                                                        <span
                                                            className={`w-fit rounded-md ${page.status !== 0
                                                                ? 'bg-orange-600 '
                                                                : 'bg-green-600 '
                                                                } py-0.5 px-1 text-white shadow`}
                                                        >
                                                            {page.status === 1 ? "deactivate" : "Active"}
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
                                                                                    if (link.rel === 'inactive') {
                                                                                        updatePublishOrDraftPage("openDialog", true)
                                                                                        updatePublishOrDraftPage("dialogLink", link.url)
                                                                                        updatePublishOrDraftPage("text", "Deactivate")
                                                                                    }
                                                                                    if (link.rel === 'active') {
                                                                                        updatePublishOrDraftPage("openDialog", true),
                                                                                        updatePublishOrDraftPage("dialogLink", link.url)
                                                                                        updatePublishOrDraftPage("text", "Active")
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
