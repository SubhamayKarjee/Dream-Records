import { CheckBadgeIcon, ClockIcon, DocumentDuplicateIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Divider, Empty, Image, Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import fallbackImage from "../../assets/fallbackImage.jpg"
import UpdateClaimReleaseModal from "./UpdateClaimReleaseModal";
import './AdminClaimReleasePage.css'
import wrapperStyle from "../../Hooks/commonCssForHTMLwarp";
import localDate from "../../Hooks/localDate";
import localTime from "../../Hooks/localTime";

const AdminClaimReleasePage = () => {

    const navigate = useNavigate();
    const { pageNumber, perPageList, status } = useParams();

    const [totalItems, setTotalItems] = useState();
    const [claimData, setClaimData] = useState()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/claim-release/all-claim?page=${pageNumber}&limit=${perPageList}&status=${status}`)
        .then(res => {
            if(res.status === 200){
                setLoading(false)
                setClaimData(res.data.data);
                setTotalItems(res.data.dataCount);
            }
        })
    },[pageNumber, perPageList, status])

    const handlePageChange = (page) => {
        navigate(`/admin-dashboard/claim-release/${page}/${8}/${status}`)
    };

    const handleStatus = (e) => {
        navigate(`/admin-dashboard/claim-release/${1}/${8}/${e}`)
    }

    const handleCopyText = (index) => {
        const inputElement = document.getElementById(index);
        console.log(inputElement);
        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        toast.success('Coppied')
    };

    const [searchText, setSearchText] = useState();
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {          
        setLoading(true)
          axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/claim-release/admin-search?status=${status}&search=${searchText}`)
            .then(res => {
                setClaimData(res.data.data);
                setTotalItems(res.data.dataCount)
                setLoading(false)
            })
        }
    };

    const inputStyle ={
        height: '36px',
        border: '1px solid #E2E8F0',
        minWidth: '300px'
    }

    return (
        <div className="md:h-full overflow-y-auto">
            <div className='my-3'>
                <div className="flex items-center justify-between">
                    <h3 className='font-bold text-xl text-[#252525]'>Manage Claim</h3>
                    <input type="text" style={inputStyle} onKeyPress={handleKeyPress} onChange={e => setSearchText(e.target.value)} placeholder="Type Release Title& Enter to Search" className="input input-sm"/>
                </div>
                <Divider className="my-2"/>
                <div>
                    <div className="my-2">
                        <button onClick={() => handleStatus('All')} className="btn btn-sm btn-neutral m-1">All</button>
                        <button onClick={() => handleStatus('Pending')} className="btn btn-sm btn-neutral mx-1">Pending</button>
                        <button onClick={() => handleStatus('Solved')} className="btn btn-sm btn-neutral mx-1">Solved</button>
                        <button onClick={() => handleStatus('Rejected')} className="btn btn-sm btn-neutral mx-1">Rejected</button>
                    </div>
                    {
                        loading && <div className='flex justify-center items-center'><span className="loading loading-spinner loading-md me-2"></span></div>
                    }
                    {
                        claimData && claimData.map(data => 
                            <div className='p-2 my-1 rounded-md border md:flex justify-between' key={data._id}>
                                <div className='grow m-2'>
                                    <p>Submited Request <span className="font-bold text-slate-500 me-3">{data.userName}</span> 
                                    {
                                        data?.isoDate && 
                                        <p className='text-sm text-[#71717A]'>
                                            {localDate(data?.isoDate)} &nbsp; {localTime(data?.isoDate)}
                                        </p>
                                    }
                                    {
                                        !data?.isoDate &&
                                        <span className="font-bold text-slate-500">{data.date} {data.month} {data.year} || {data.time}</span>
                                    }
                                    </p>
                                    <p className='font-bold'>{data.claimOption}</p>
                                        <div className="my-1 py-1 px-2 rounded-lg bg-slate-100">
                                            <div className="flex">
                                                    <Image
                                                        onClick={() => navigate(`/admin-dashboard/release/${data.release._id}`)}
                                                        width={65}
                                                        height={65}
                                                        className="rounded-md cursor-pointer"
                                                        preview={false}
                                                        src={data?.release?.imgUrl}
                                                        fallback={fallbackImage}
                                                    />
                                                <div className="ps-2 grow">
                                                    <div className="flex items-center">
                                                        <input id={data?.release?._id} className="font-bold text-sm copy_text_field me-3" value={data?.release?.releaseTitle} readOnly/>
                                                        <DocumentDuplicateIcon style={{cursor: 'pointer'}} onClick={() => handleCopyText(data?.release?._id)} className="w-5 h-5 text-slate-500"/>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="me-2 text-sm">UPC:</span>
                                                        <input id={data?.release?.UPC} className="text-sm text-slate-400 copy_text_field" type="text" value={data?.release?.UPC} readOnly/>
                                                        <DocumentDuplicateIcon style={{cursor: 'pointer'}} onClick={() => handleCopyText(data?.release?.UPC)} className="w-5 h-5 text-slate-500"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            {
                                                data?.claimLink && 
                                                <div className="flex">
                                                    <input id={data.claimLink} className="text-info copy_text_field me-3" value={data.claimLink} readOnly />
                                                    <DocumentDuplicateIcon style={{cursor: 'pointer'}} onClick={() => handleCopyText(data.claimLink)} className="w-5 h-5 text-slate-500"/>
                                                </div>
                                            }
                                        {
                                            data?.actionRequired &&
                                            <div className="p-2 rounded-md bg-red-200" style={wrapperStyle} dangerouslySetInnerHTML={{ __html: data.actionRequired }} />
                                        }
                                </div>
                                <div>
                                {
                                    data.status === 'Pending' &&
                                    <div>
                                        <div className="flex items-center p-1 bg-[#ffae00] rounded-md shadow">
                                            <ClockIcon className="h-3 w-3 text-white me-1"/>
                                            <p className="text-xs font-semibold text-white">{data.status}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    data.status === 'Pending' &&
                                    <div>
                                        <div style={{cursor: 'pointer'}} onClick={()=>document.getElementById(`${data._id}`).showModal()} className="flex items-center p-1 bg-info my-2 rounded-md shadow">
                                            <ClockIcon className="h-3 w-3 text-white me-1"/>
                                            <p className="text-xs font-semibold text-white">Update Status</p>
                                        </div>
                                    </div>
                                }
                                {/* Modal Update Claim Release */}
                                <dialog id={`${data._id}`} className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <UpdateClaimReleaseModal id={data._id} data={data}/>
                                    </div>
                                </dialog>
                                {
                                    data.status === 'Solved' &&
                                    <div>
                                        <div className="flex items-center p-1 bg-[#00c90d] rounded-md shadow">
                                            <CheckBadgeIcon className="h-3 w-3 text-white me-1"/>
                                            <p className="text-xs font-semibold text-white">{data.status}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    data.status === 'Rejected' &&
                                    <div>
                                        <div className="flex items-center p-1 bg-red-300 rounded-md shadow">
                                            <ExclamationTriangleIcon className="h-3 w-3 text-white me-1"/>
                                            <p className="text-xs font-semibold text-white">{data.status}</p>
                                        </div>
                                    </div>
                                }
                                </div>
                            </div>
                        )
                    }
                    {
                        !totalItems && !loading && <Empty className="pt-12" />
                    }
                    {
                        totalItems > 12 && !loading && <div className="flex justify-center items-center my-4">
                            <Pagination 
                            defaultCurrent={pageNumber} 
                            total={totalItems}
                            pageSize={perPageList}
                            onChange={handlePageChange}
                            /> 
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminClaimReleasePage;