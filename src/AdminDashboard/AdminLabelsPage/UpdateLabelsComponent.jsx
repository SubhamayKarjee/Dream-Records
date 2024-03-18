import { CheckBadgeIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Image, Modal, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import fallbackImage from "../../assets/fallbackImage.jpg"
import youtubeImg from '../../assets/social-icon/youtube.png';
import LoadingComponentsForPage from "../../LoadingComponents/LoadingComponentsForPage";

const UpdateLabelsComponent = () => {

    const {id} = useParams();
    const navigate = useNavigate('')

    const [labels, setLabels] = useState();
    const [labelsStatus, setLabesStatus] = useState();
    const [fetchLoading, setFetchLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(true);
    const [refetch, setRefetch] = useState(1)


    useEffect( () => {
        setFetchLoading(true)
        axios.get(`http://localhost:5000/admin/api/v1/labels/single/${id}`)
        .then(res => {
            setLabels(res.data.data[0]);
            setLabesStatus(res.data.data[0].status)
            setFetchLoading(false)
        })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[refetch])

    const handleUpdateStatus = () => {
        setUpdateLoading(true)
        const data = {...labels, status: labelsStatus };
        axios.put(`http://localhost:5000/admin/api/v1/labels/update/${id}`, data)
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

    const [actionRequird, setActionRequird] = useState();
    const [reasonFieldErr, setReasonFieldErr] = useState();
    const handleRejectedStatus = () =>{
        setReasonFieldErr('')
        if(actionRequird){
            setUpdateLoading(true)
            const data = {...labels, status: labelsStatus, actionRequird };
            axios.put(`http://localhost:5000/admin/api/v1/labels/update/${id}`, data)
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

    // Delete Labels
    const [deleteLoading, setDeleteLoading] = useState(false)
    const handleDelete = (id, imgKey) => {
        setDeleteLoading(true)
        axios.delete(`http://localhost:5000/api/v1/labels/delete-labels/${id}?imgKey=${imgKey}`)
          .then( res => {
            if(res.status == 200){
                setDeleteLoading(false)
                navigate('/admin-dashboard/labels');
                toast.success('Deleted the Labels');
            }
          })
          .catch(er => console.log(er));
    }

    if(deleteLoading){
        return <LoadingComponentsForPage/>
    }




    return (
        <div>
            <div className="flex justify-end mt-2">
                <span onClick={() => handleDelete(labels._id, labels.key)} className="btn btn-xs bg-red-400 py-1 px-2 rounded-md text-xs me-2 font-bold flex items-center">Delete Label</span>
            </div>
            {
                fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
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
                                ]}
                            />
                            <div className="flex items-center">
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
                                        <textarea onChange={(e) => setActionRequird(e.target.value)} className="textarea textarea-bordered w-full h-24" placeholder="Reason"></textarea>
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
        </div>
    );
};

export default UpdateLabelsComponent;