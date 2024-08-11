/* eslint-disable react/prop-types */
import { CheckBadgeIcon, ClockIcon, CurrencyRupeeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Empty, Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const AdminWithdrawalPage = () => {

    const navigate = useNavigate();
    const { pageNumber, perPageList, status } = useParams();

    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [fetchLoading, setFetchLoading] = useState(false)
    
    const [withdrawalStatus, setWithdrawalStatus] = useState(status)
    const [withdrawalData, setWithdrawalData] = useState();
    // const [activeList, setActiveList] = useState()
    useEffect( () => {
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/admin/withdrawal/req-list?page=${pageNumber}&limit=${perPageList}&status=${withdrawalStatus}`)
        .then(res => {
            setWithdrawalData(res.data.data);
            setTotalItems(res.data.dataCount)
            // setActiveList(res.data.data.length);
            setFetchLoading(false)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, withdrawalStatus])

    const handlePageChange = (page) => {
        navigate(`/admin-dashboard/withdrawal-request/${page}/${10}/${withdrawalStatus}`)
    };

    const [searchText, setSearchText] = useState('')
    const handleStatus = (e) => {
        navigate(`/admin-dashboard/withdrawal-request/${1}/${10}/${e}`)
        setWithdrawalStatus(e)
    }
  
    const handleSearch = (e) => {
        setSearchText(e)
    }

    const handleKeyPress = () => {
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/admin/withdrawal/search-req-list?search=${searchText}&status=${withdrawalStatus}`)
        .then(res => {
            setWithdrawalData(res.data.data);
            setTotalItems(res.data.dataCount);
            // setActiveList(res.data.data.length);
            setFetchLoading(false)
        })
    };

    const handleNavigate = (id) => {
        const link = `/admin-dashboard/withdrawal-request/${id}`
        navigate(link)
    }


    return (
        <div className="my-5">
            <div className="p-2 border my-2 bg-slate-100 mb-4">
                <p className="text-sm font-bold text-slate-500">Filter by ID</p>
                <input type="text" onKeyPress={handleKeyPress} onChange={e => handleSearch(e.target.value)} placeholder="Type ID & Enter to Search" className="input input-sm rounded-full input-bordered w-full"/>
            </div>
            <div className="mb-3">
                <button onClick={() => handleStatus('All')} className="btn btn-sm btn-neutral mx-1">All</button>
                <button onClick={() => handleStatus('Pending')} className="btn btn-sm btn-neutral mx-1">Pending</button>
                <button onClick={() => handleStatus('Approved')} className="btn btn-sm btn-neutral mx-1">Approved</button>
                <button onClick={() => handleStatus('Rejected')} className="btn btn-sm btn-neutral mx-1">Rejected</button>
            </div>
            <div>
                {fetchLoading && <div className="flex justify-center items-center my-2"><span className="loading loading-spinner loading-md"></span></div>}
                {
                    !fetchLoading && withdrawalData?.map(data => 
                        <div style={{cursor: 'pointer'}} className="p-3 rounded-lg my-1 border" onClick={() => handleNavigate(data._id)} key={data._id}>
                            <div className="md:flex justify-between">
                                <div>
                                    <p className="text-green-500"> Withdrawal Request Form {data?.nick_name ? data.nick_name : data?.name} || <span className="font-bold text-slate-600">{data?.withdrawalDate}/{data?.withdrawalMonth}/{data?.withdrawalYear} || {data?.withdrawalTime}</span> </p>
                                    <p>{data?.userName}</p>
                                    {
                                        data?.status === 'Approved' && <p className="text-sm font-bold text-slate-500">Payment on {data.updatedDate} has been processed</p> 
                                    }
                                </div>
                                <div className="">
                                    <p className="font-bold text-lg md:pe-3 flex items-center"><CurrencyRupeeIcon className="w-5 h-5 me-2"/> {data?.balance?.amount}</p>
                                    {
                                        data?.status === 'Pending' &&
                                            <div className="flex items-center p-1 bg-[#ffae00] rounded-md shadow">
                                                <ClockIcon className="h-3 w-3 text-white me-1"/>
                                                <p className="text-xs font-semibold text-white">{data.status}</p>
                                            </div>
                                    }
                                    {
                                        data?.status === 'Approved' &&
                                            <div className="flex items-center p-1 bg-[#00c90d] rounded-md shadow">
                                                <CheckBadgeIcon className="h-3 w-3 text-white me-1"/>
                                                <p className="text-xs font-semibold text-white">{data.status}</p>
                                            </div>
                                    }
                                    {
                                        data?.status === 'Rejected' &&
                                            <div className="flex items-center p-1 bg-red-700 rounded-md shadow">
                                                <ExclamationTriangleIcon className="h-3 w-3 text-white me-1"/>
                                                <p className="text-xs font-semibold text-white">{data.status}</p>
                                            </div>
                                    }
                                </div>
                            </div>
                            {
                                data?.rejectResoan && <p className="p-2 mt-2 text-sm bg-red-100 font-bold rounded-md">{data.rejectResoan}</p>
                            }
                        </div>
                    )
                }
            </div>
            <div className="py-6">
                {
                    !totalItems && !fetchLoading && <Empty className="pt-8" />
                }
                {
                    totalItems > 10 && !fetchLoading && <div className="flex justify-center items-center my-4">
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
    );
};

export default AdminWithdrawalPage;