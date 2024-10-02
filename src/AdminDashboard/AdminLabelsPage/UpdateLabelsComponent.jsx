import { CheckBadgeIcon, ClockIcon, LockClosedIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Image, Modal, Popconfirm, Select, Skeleton } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import fallbackImage from "../../assets/fallbackImage.jpg"
import youtubeImg from '../../assets/social-icon/youtube.png';
import LoadingComponentsForPage from "../../LoadingComponents/LoadingComponentsForPage";
import AdminReleaseCardComponent from "../AdminReleases/AdminReleaseCardComponent";

const UpdateLabelsComponent = () => {

    const {id} = useParams();
    const navigate = useNavigate('')

    const [labels, setLabels] = useState();
    const [labelsStatus, setLabesStatus] = useState();
    const [loading, setLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(true);
    const [refetch, setRefetch] = useState(1)

    useEffect( () => {
        setLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/labels/single/${id}`)
        .then(res => {
            setLabels(res.data.data[0]);
            setLabesStatus(res.data.data[0].status)
            setLoading(false)
        })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[refetch])

    const handleUpdateStatus = () => {
        setUpdateLoading(true)
        const data = {...labels, status: labelsStatus };
        axios.put(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/labels/update/${id}`, data)
        .then(res => {
            if(res.status == 200){
                const count = refetch + 1;
                setRefetch(count);
                setUpdateLoading(false);
                toast.success('Labels Status Updated!');
            }
        })
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [actionRequired, setActionRequired] = useState();
    const [reasonFieldErr, setReasonFieldErr] = useState();
    const handleRejectedStatus = () =>{
        setReasonFieldErr('')
        if(actionRequired){
            setUpdateLoading(true)
            const data = {...labels, status: labelsStatus, actionRequired };
            axios.put(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/labels/update/${id}`, data)
            .then(res => {
                if(res.status == 200){
                    const count = refetch + 1;
                    setRefetch(count);
                    setUpdateLoading(false);
                    toast.success('Labels Status Updated!');
                    setIsModalOpen(false);
                }
            })
        }else{
            setReasonFieldErr('Please discribe the reasons!')
        }
    }

    // Paginatin and Search State __________________________________________________
    const [releaseStatus, setReleaseStatus] = useState('All')
    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(12);
    const [searchText, setSearchText] = useState('');

    const [releaseData, setReleaseData] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);
    const [hideShow, setHideShow] = useState('none');

    // Get Release List ______________________________________________________________
    useEffect(() => {
        setItemPerPage(12)
        // Calculate Pagination and Fetch__________________________________________________
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/labels/${id}?page=${currentPage}&limit=${itemPerPage}&status=${releaseStatus}`)
            .then( res => {
              if(res.status == 200){
                setFetchLoading(false);
                setTotalItems(res.data.dataCount);
                setReleaseData(res.data.data);
                if(!res.data.totalCount){
                    setHideShow('block')
                }
              }
            })
            .catch(er => console.log(er));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currentPage, releaseStatus]);

    const handleSearch = (e) => {
        setSearchText(e)
    }

    const handleStatus = (e) => {
        setCurrentPage(1)
        setReleaseStatus(e)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    const handleKeyPress = (event) => {
        setItemPerPage(50)
        if (event.key === 'Enter') {
          setFetchLoading(true);
          axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/labels/search/${id}?status=${releaseStatus}&search=${searchText}`)
            .then( res => {
              if(res.status == 200){
                setFetchLoading(false);
                setTotalItems(res.data.dataCount);
                setReleaseData(res.data.data);
              }
            })
            .catch(er => console.log(er));
        }
    };

    // Delete Labels
    const [deleteLoading, setDeleteLoading] = useState(false)
    const confirm = (id, imgKey) => {
        setDeleteLoading(true)
        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/api/v1/labels/delete-labels/${id}?imgKey=${imgKey}`)
          .then( res => {
            if(res.status == 200){
                setDeleteLoading(false)
                navigate('/admin-dashboard/labels/1/10/All');
                toast.success('Deleted the Labels');
            }
          })
          .catch(er => console.log(er));
    }

    const cancel = () => {
      return;
    };


    if(deleteLoading){
        return <LoadingComponentsForPage/>
    }

    return (
        <div>
            
            <div style={{display: `${hideShow}`}} className="flex justify-end mt-2">
            <Popconfirm
                title="Delete"
                placement="leftTop"
                className="z-1000"
                description="Are you sure to Delete Labels?"
                onConfirm={() => confirm(labels._id, labels.key)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                >
                <span className="btn btn-xs bg-red-400 py-1 px-2 rounded-md text-xs me-2 font-bold flex items-center">Delete Label</span>
            </Popconfirm>
            </div>
            
            {
                loading == true && 
                <Skeleton
                    className="py-4"
                    avatar
                    paragraph={{
                    rows: 2,
                    }}
                />
            }
            {
                labels && 
                <div className="md:flex gap-2 justify-between my-3 rounded-md border">
                    <div className="flex p-2">
                        <Image
                        width={120}
                        height={120}
                        className="rounded-lg"
                        src={labels.imgUrl}
                        fallback={fallbackImage}
                        />
                        <div className="ps-2">
                            <h2 className="font-bold">{labels.labelName}</h2>
                            <p className="text-sm text-slate-400">{labels?.userName}</p>
                            <p className="text-sm text-slate-400">ID: {labels._id}</p>
                            {
                                labels?.youtubeChannelLink && <a href={labels.youtubeChannelLink} target="_blank" className="flex items-center">
                                    <img className="me-2" src={youtubeImg} alt={youtubeImg} />
                                    {labels.youtubeChannelLink}
                                </a>
                            }
                            {
                                labels.status === 'Pending' &&
                                <span className="bg-yellow-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><ClockIcon className="w-4 h-4 me-1"/> {labels.status}</span>
                            }
                            {
                                labels.status === 'Approved' &&
                                <span className="bg-green-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><CheckBadgeIcon className="w-4 h-4 me-1"/> {labels.status}</span>
                            }
                            {
                                labels.status === 'Rejected' &&
                                <span className="bg-red-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><XCircleIcon className="w-4 h-4 me-1"/> {labels.status}</span>
                            }
                            {
                                labels.status === 'Locked' &&
                                <span className="bg-slate-200 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><LockClosedIcon className="w-4 h-4 me-1"/> {labels.status}</span>
                            }

                        </div>
                    </div>

                    <div className="p-2">
                        <p className="text-sm font-bold border-b text-slate-500">Labels Description</p>
                        {
                            labels?.description &&
                            <p className="text-sm text-slate-600">{labels.description}</p>
                        }
                    </div>

                    <div className="flex gap-1 flex-col p-2">
                        <div className="mt-2">
                            <p className="font-bold mb-2">Select & Update Status</p>
                            <Select
                                defaultValue={labelsStatus}
                                style={{ width: '100%' }}
                                onChange={(value) => setLabesStatus(value)}
                                options={[
                                    { value: 'Pending', label: 'Pending' },
                                    { value: 'Approved', label: 'Approved' },
                                    { value: 'Rejected', label: 'Rejected' },
                                    { value: 'Locked', label: 'Locked' },
                                ]}
                            />
                            <div className="flex items-center justify-center">
                                {
                                    updateLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                                }
                                {
                                    labelsStatus === 'Pending' &&
                                    <button onClick={handleUpdateStatus} className="btn btn-sm btn-neutral w-full mt-2">Update</button>
                                }
                                {
                                    labelsStatus === 'Approved' &&
                                    <button onClick={handleUpdateStatus} className="btn btn-sm btn-neutral w-full mt-2">Update</button>
                                }
                                {
                                    labelsStatus === 'Locked' &&
                                    <button onClick={handleUpdateStatus} className="btn btn-sm btn-neutral w-full mt-2">Update</button>
                                }
                                {
                                    labelsStatus === 'Rejected' && 
                                    <button onClick={showModal} className="btn btn-sm btn-neutral w-full mt-2">Update</button>
                                }
                                <Modal 
                                    title="Rejection Reasons!" 
                                    open={isModalOpen} 
                                    onOk={handleOk} 
                                    onCancel={handleCancel}
                                    footer={[]}
                                    >
                                        <textarea onChange={(e) => setActionRequired(e.target.value)} className="textarea textarea-bordered w-full h-24" placeholder="Reason"></textarea>
                                        {
                                            reasonFieldErr && <p className="text-red-500">{reasonFieldErr}</p>
                                        }
                                        <button onClick={handleRejectedStatus} className="btn btn-sm btn-neutral w-full mt-2">Update</button>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* Release Card _______________________________________________________________ */}
            <main>
                {/* Search and Create Release Section ______________________________________________________________________________ */}
                <div className="md:flex md:justify-between md:items-center bg-slate-50 py-2 px-2 rounded-lg">
                    <div className="my-2">
                        <input type="text" onKeyPress={handleKeyPress} onChange={e => handleSearch(e.target.value)} placeholder="Type & Enter to Search" className="input input-sm rounded-full input-bordered w-full"/>
                    </div>
                </div>
                <p className="font-bold text-slate-500 border-b">Releases under this Labels <span className="font-bold px-2 bg-slate-300 rounded-sm">{totalItems}</span></p>
                <div className="my-3">
                    <button onClick={() => handleStatus('All')} className="btn btn-sm btn-neutral m-1">All</button>
                    <button onClick={() => handleStatus('Pending')} className="btn btn-sm btn-neutral m-1">Pending</button>
                    <button onClick={() => handleStatus('Review')} className="btn btn-sm btn-neutral m-1">Review</button>
                    <button onClick={() => handleStatus('Approved')} className="btn btn-sm btn-neutral m-1">Approved</button>
                    <button onClick={() => handleStatus('Action Required')} className="btn btn-sm btn-neutral mx-1">Action Required</button>
                    <button onClick={() => handleStatus('Takedown')} className="btn btn-sm btn-neutral mx-1">Takedown</button>
                    <button onClick={() => handleStatus('ReSubmitted')} className="btn btn-sm btn-neutral mx-1">ReSubmitted</button>
                </div>
                {
                    fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                }

                <AdminReleaseCardComponent releaseData={releaseData} totalItems={totalItems} fetchLoading={fetchLoading} currentPage={currentPage} itemPerPage={itemPerPage} handlePageChange={handlePageChange}/>
            </main>
        </div>
    );
};

export default UpdateLabelsComponent;