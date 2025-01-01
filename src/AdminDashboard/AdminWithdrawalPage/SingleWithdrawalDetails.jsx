import { CheckBadgeIcon, ClockIcon, CurrencyRupeeIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Image, Modal, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import fallbackImage from '../../assets/fallbackImage.jpg'
import localDate from "../../Hooks/localDate";
import localTime from "../../Hooks/localTime";
import textToHTML from "../../Hooks/textToHTML";
import LoadingComponentsInsidePage from "../../LoadingComponents/LoadingComponentsInsidePage";
import './SingleWithdrawalDetails.css'

const SingleWithdrawalDetails = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [fetchLoading, setFetchLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false);
    const [refetch, setRefetch] = useState(1)
    
    const [withdrawalData, setWithdrawalData] = useState();
    const [withdrawalStatus, setWithdrawalStatus] = useState();
    const [userData, setUserData] = useState();
    useEffect( () => {
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/admin/withdrawal/single/${id}`)
        .then(res => {
            if(res.status === 200) {
                setWithdrawalData(res.data.data[0]);
                console.log(res.data.data[0]);
                setWithdrawalStatus(res.data.data[0].status)
                axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${res.data.data[0]?.masterUserId}`)
                .then(res => {
                    if(res.status === 200) {
                        setFetchLoading(false)
                        setUserData(res.data.data);
                    }
                })
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refetch])

    const [withdrawalInvoice, setWithdrawalInvoice] = useState();

    // Approved Status Handle
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const showModal1 = () => {
        setIsModalOpen1(true);
    };
    const handleOk1 = () => {
        setIsModalOpen1(false);
    };
    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };


    const handleUpdateStatus = (id) => {
        setUpdateLoading(true)
        const date = new Date().toISOString();
        const updatedProcessed = `Your payment has been processed`
        const data = {...withdrawalData, status: withdrawalStatus, updatedProcessed, updatedDate: date, invoice: withdrawalInvoice}
        axios.put(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/admin/withdrawal/single/${id}`, data)
        .then(res => {
            if(res.status == 200){
                const count = refetch + 1;
                setRefetch(count);
                setUpdateLoading(false);
                setIsModalOpen1(false)
                const file = document.getElementById('fileInput');
                file.value = '';
                toast.success('Withdrawal Status Updated!');
            }
        })
    }


    

    // Reject Status Handle
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
    const handleRejectedStatus = (id) =>{
        setReasonFieldErr('')
        if(actionRequired){
            const updateUserBalance = {...userData, balance: {...userData.balance, amount: parseInt(withdrawalData.withdrawalAmount)}}
            axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${id}`, updateUserBalance)
            .then(res => {
                if(res.status === 200){
                    const date = new Date().toISOString();
                    const rejectResoan = textToHTML(actionRequired);
                    const data = {...withdrawalData, status: withdrawalStatus, rejectResoan, updatedDate: date}
                    axios.put(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/admin/withdrawal/single/${withdrawalData._id}`, data)
                    .then(res => {
                        if(res.status == 200){
                            const count = refetch + 1;
                            setRefetch(count);
                            setIsModalOpen(false);
                            setUpdateLoading(false);
                            toast.success('Withdrawal Status Updated!');
                        }
                    })
                }
            })
        }else{
            setReasonFieldErr('Please discribe the reasons!')
        }
    }

    const handleDeleteWithdrawalData = (id) => {
        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/admin/withdrawal/single/${id}`)
        .then(res => {
            if(res.status === 200){
                toast.success('Deleted');
                navigate('/admin-dashboard/withdrawal-request/1/10/All')
            }
        })
    }

    const [uploadLoading, setUploadLoading] = useState();
    const [invoiceUploadError, setInvoiceUploadError] = useState();
    const uploadWithdrawalInvoice = (e) => {
        setInvoiceUploadError('')
        setUploadLoading(true)
        const file = e[0];
        const formData = new FormData();
        formData.append('file', file);
        if(withdrawalInvoice){
            axios.delete(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/admin/delete-invoice-file?key=${withdrawalInvoice.key}`)
        }
        axios.post(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/admin/withdrawal-invoice-upload`, formData)
        .then(res => {
            if(res.status == 200){
                setUploadLoading(false);
                setWithdrawalInvoice(res.data.data)
                toast.success('File Uploaded')
            }else{
                setInvoiceUploadError('Internal Error Please try Again');
                setUploadLoading(false);
            }
        })
    }

    const deleteInvoice = () => {
        if(withdrawalInvoice)
        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/admin/delete-invoice-file?key=${withdrawalInvoice.key}`)
        .then(res => {
            if(res.status == 200){
                setWithdrawalInvoice();
                const file = document.getElementById('fileInput');
                file.value = '';
                toast.success('Deleted')
            }
        })
    }
    
    return (
        <div>
            {
                fetchLoading && <LoadingComponentsInsidePage/>
            }
            {
                withdrawalData && 
                <div>
                    {
                        withdrawalData?.status === 'Approved' && <p className="text-sm font-bold text-slate-500 bg-green-200 text-center my-2 p-2 rounded-md">Payment on {localDate(withdrawalData?.updatedDate)} - {localTime(withdrawalData?.updatedDate)} has been processed</p> 
                    }
                    <div className="md:flex gap-2 justify-between my-3 rounded-md border">
                        <div className="flex p-2">
                            <Image
                            width={120}
                            height={120}
                            className="rounded-lg"
                            src={withdrawalData.photoURL}
                            fallback={fallbackImage}
                            />
                            <div className="ps-2">
                                <h2 className="font-bold">{withdrawalData?.nick_name ? withdrawalData.nick_name : withdrawalData?.name}</h2>
                                <div className="flex items-center">
                                    <p className="text-green-500 me-2"> Withdrawal Requested</p>
                                    <p className="font-bold text-lg md:pe-3 flex items-center"><CurrencyRupeeIcon className="w-5 h-5 me-2"/> {withdrawalData?.withdrawalAmount}</p>
                                </div>
                                <div>
                                    {
                                        withdrawalData?.withdrawISODate ? 
                                        <p className="text-sm text-[#71717A]">
                                            {localDate(withdrawalData?.withdrawISODate)} &nbsp; {localTime(withdrawalData?.withdrawISODate)}
                                        </p>
                                        : <>{withdrawalData?.withdrawalDate}/{withdrawalData?.withdrawalMonth}/{withdrawalData?.withdrawalYear} || {withdrawalData?.withdrawalTime}</>
                                    }
                                </div>
                                <p className="text-sm text-slate-400">ID: {withdrawalData._id}</p>
                                {
                                    withdrawalData.status === 'Pending' &&
                                    <span className="bg-yellow-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><ClockIcon className="w-4 h-4 me-1"/> {withdrawalData.status}</span>
                                }
                                {
                                    withdrawalData.status === 'Approved' &&
                                    <span className="bg-green-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><CheckBadgeIcon className="w-4 h-4 me-1"/> {withdrawalData.status}</span>
                                }
                                {
                                    withdrawalData.status === 'Rejected' &&
                                    <span className="bg-red-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><XCircleIcon className="w-4 h-4 me-1"/> {withdrawalData.status}</span>
                                }

                            </div>
                        </div>

                        <div className="flex gap-1 flex-col p-2">
                            <div className="mt-2">
                                {
                                    withdrawalData.status !== 'Rejected' && withdrawalData.status !== 'Approved' &&
                                    <div>
                                        <p className="font-bold mb-2">Select & Update Status</p>
                                        <Select
                                            placeholder='Update Status'
                                            style={{ width: '100%' }}
                                            onChange={(value) => setWithdrawalStatus(value)}
                                            options={[
                                                { value: 'Approved', label: 'Approved' },
                                                { value: 'Rejected', label: 'Rejected' },
                                            ]}
                                        />
                                    </div>
                                }
                                {
                                    withdrawalData.status === 'Rejected' &&
                                    <TrashIcon onClick={() => handleDeleteWithdrawalData(withdrawalData._id)} style={{cursor: 'pointer'}} className="w-6 h-6 text-red-500"/>
                                }
                                <div className="flex items-center">
                                    {
                                        updateLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                                    }
                                    {
                                        withdrawalData.status === 'Pending' && withdrawalStatus === 'Approved' &&
                                        <button onClick={showModal1} className="btn btn-sm btn-neutral w-full mt-2">Update</button>
                                    }
                                    <Modal 
                                        title="Upload Withdrawal Invoice" 
                                        open={isModalOpen1} 
                                        onOk={handleOk1} 
                                        onCancel={handleCancel1}
                                        footer={[]}
                                        >
                                            <div className="flex items-center justify-between">
                                                <input type="file" id="fileInput" name='file' onChange={e => uploadWithdrawalInvoice(e.target.files)} />
                                                {
                                                   withdrawalInvoice && 
                                                   <button className="btn btn-sm" onClick={deleteInvoice}>Delete</button> 
                                                }
                                            </div>
                                            {
                                                invoiceUploadError && <p className="text-red-500">{invoiceUploadError}</p>
                                            }
                                            <div className="flex items-center">
                                                {
                                                    uploadLoading && 
                                                    <div className="flex items-center">
                                                        <span className="loading loading-spinner loading-md me-2"></span>
                                                    </div>
                                                }
                                                <button onClick={() => handleUpdateStatus(withdrawalData._id)} className="btn btn-sm btn-neutral w-full mt-2">Update</button>
                                            </div>
                                    </Modal>

                                    {
                                        withdrawalData.status !== 'Rejected' && withdrawalStatus === 'Rejected' && 
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
                                            <button onClick={() => handleRejectedStatus(withdrawalData.masterUserId)} className="btn btn-sm btn-neutral w-full mt-2">Update</button>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        withdrawalData?.rejectResoan && <p className="p-2 text-sm my-2 bg-red-100 font-bold rounded-md">{withdrawalData.rejectResoan}</p>
                    }
                    <div className="mt-3">
                        <h2 className="font-bold text-slate-500 border-b">Bank Details</h2>
                        <div className="px-2 mt-2 border rounded-md">
                            <h2 className="font-bold mt-3 text-slate-600">{withdrawalData?.bankInfo?.bank_name}</h2>
                            <div className="border rounded-md p-2 bg-slate-50">
                                <p className="text-sm font-bold text-slate-600">Account Holder: {withdrawalData?.bankInfo?.account_holder_name}</p>
                                <p className="text-sm font-bold text-slate-600">Account Number: {withdrawalData?.bankInfo?.account_number}</p>
                                <p className="text-sm font-bold text-slate-600">Branch Name: {withdrawalData?.bankInfo?.branch_name}</p>
                                <p className="text-sm font-bold text-slate-600">IFSC: {withdrawalData?.bankInfo?.IFSC}</p>
                                <p className="text-sm font-bold text-slate-600">Swift Code: {withdrawalData?.bankInfo?.swift_code}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default SingleWithdrawalDetails;