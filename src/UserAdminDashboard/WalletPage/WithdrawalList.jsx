/* eslint-disable react/prop-types */
import { CheckBadgeIcon, ClockIcon, CurrencyRupeeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { DatePicker, Empty, Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";


const WithdrawalList = ({id, text}) => {

    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(14);
    const [fetchLoading, setFetchLoading] = useState(false)
    
    const [withdrawalData, setWithdrawalData] = useState();
    const [reload, setReload] = useState(1)
    useEffect( () => {
        setItemPerPage(14)
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/withdrawal/${id}?page=${currentPage}&limit=${itemPerPage}`)
        .then(res => {
            setWithdrawalData(res.data.data);
            setTotalItems(res.data.dataCount)
            setFetchLoading(false)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, reload])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    const onChange = (date, dateString) => {
        if(!dateString){
            const load = reload + 1 
            setReload(load)
        }else{
            setItemPerPage(20)
            setFetchLoading(true)
            axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/withdrawal/search/${id}?page=${currentPage}&limit=${itemPerPage}&search=${dateString}`)
            .then(res => {
                setWithdrawalData(res.data.data);
                setTotalItems(res.data.dataCount)
                setFetchLoading(false)
            })
        }
    };


    return (
        <div className="my-5">
            <div className="p-2 border my-2 bg-slate-100 mb-4">
                <p className="text-sm font-bold text-slate-500">Filter by YEAR</p>
                <DatePicker className="payment_details" onChange={onChange} picker="year" />
            </div>
            <div>
                {fetchLoading && <div className="flex justify-center items-center my-2"><span className="loading loading-spinner loading-md"></span></div>}
                {
                    !fetchLoading && withdrawalData?.map(data => 
                        <div className="p-3 rounded-lg my-1 border" key={data._id}>
                            <div className="md:flex justify-between">
                                <div>
                                    <p className="text-green-500"> {text} || <span className="font-bold text-slate-600">{data?.withdrawalDate}/{data?.withdrawalMonth}/{data?.withdrawalYear} || {data?.withdrawalTime}</span> </p>
                                    <p>ID: {data?._id}</p>
                                    {
                                        data?.status === 'Approved' && <p className="text-sm font-bold text-slate-500">Your payment on {data.updatedDate} has been processed</p> 
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
                                data?.rejectResoan && <p className="p-2 text-sm mt-2 bg-red-100 font-bold rounded-md">{data.rejectResoan}</p>
                            }
                        </div>
                    )
                }
            </div>
            <div className="pt-6">
                {
                    !totalItems && !fetchLoading && <Empty className="pt-8" />
                }
                {
                    totalItems > 14 && !fetchLoading && <div className="flex justify-center items-center my-4">
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
    );
};

export default WithdrawalList;