import { CheckBadgeIcon, ClockIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Empty, Image, Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fallbackImage from "../../assets/fallbackImage.jpg"
import UpdateClaimReleaseModal from "./UpdateClaimReleaseModal";

const AdminClaimReleasePage = () => {

    const navigate = useNavigate()

    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(12);

    const [claimData, setClaimData] = useState()
    const [loading, setLoading] = useState(false);
    const [claimStatus, setClaimStatus] = useState('All');
    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/common/api/v1/claim-release/all-claim?page=${currentPage}&limit=${itemPerPage}&status=${claimStatus}`)
        .then(res => {
            if(res.status === 200){
                setLoading(false)
                setClaimData(res.data.data);
                setTotalItems(res.data.dataCount);
                console.log(res.data.data);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage, claimStatus])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    const handleStatus = (e) => {
        setCurrentPage(1)
        setClaimStatus(e)
    }


    return (
        <div className="md:h-full overflow-y-auto">
            <div className='my-3'>
                    <h2 className='font-bold border-b text-slate-500 bg-green-100 p-2 rounded-md'>Manage Claim</h2>
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
                                        <p>Submited Request <span className="font-bold text-slate-500">{data.userName}</span> <span className="font-bold text-slate-500">{data.date} {data.month} {data.year} || {data.time}</span></p>
                                        <p className='font-bold'>{data.claimOption}</p>
                                            <div style={{cursor: 'pointer'}} onClick={() => navigate(`/admin-dashboard/release/${data.release._id}`)} className="flex items-center justify-between my-1 py-1 px-2 rounded-lg bg-slate-100">
                                                <div className="flex items-center">
                                                        <Image
                                                        width={35}
                                                        height={35}
                                                        className="rounded-lg"
                                                        src={data?.release?.imgUrl}
                                                        fallback={fallbackImage}
                                                        />
                                                    <div className="ps-2">
                                                    <h2 className="font-bold text-sm">{data?.release?.releaseTitle}</h2>
                                                    <p className="text-xs text-slate-400">ID: {data?.release?._id}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        <a href={data.claimLink} target='_blank' className="text-info">{data.claimLink}</a>
                                        {
                                            data?.actionRequired &&
                                            <p className="p-2 rounded-md bg-red-200">{data.actionRequired}</p>
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
                                            <div onClick={()=>document.getElementById(`${data._id}`).showModal()} className="flex items-center p-1 bg-info my-2 rounded-md shadow">
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
                                defaultCurrent={currentPage} 
                                total={totalItems}
                                pageSize={itemPerPage}
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