/* eslint-disable react/prop-types */
import { CheckBadgeIcon, ClockIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { CurrencyRupeeIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { DatePicker, Empty, Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";


const WithdrawalList = ({id}) => {

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
        <div className="">
            <div className="">
                <p className="text-sm font-bold text-slate-500">Filter by YEAR</p>
                <DatePicker className="payment_details" onChange={onChange} picker="year" />
            </div>


                {fetchLoading && <div className="flex justify-center items-center my-2"><span className="loading loading-spinner loading-md"></span></div>}
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="">
                                <th className="text-md">Title</th>
                                <th className="text-md">Date</th>
                                <th className="text-md">Status</th>
                                <th className="text-md">Ammount</th>
                                <th className="text-md text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {
                            withdrawalData && withdrawalData.map(data => 
                                <>
                                    <tr className="hover">
                                        <td className="font-semibold text-sm text-[#09090B]">Withdrawal Requested !</td>
                                        <td className="font-semibold text-sm text-[#09090B]">{data?.withdrawalMonth}/{data?.withdrawalYear}</td>
                                        <td className="font-semibold text-sm text-[#09090B]">
                                        {
                                            data?.status === 'Pending' &&
                                                <div className="flex items-center p-1">
                                                    <ClockIcon className="h-3 w-3 me-1"/>
                                                    <p className="text-sm font-semibold">{data.status}</p>
                                                </div>
                                        }
                                        {
                                            data?.status === 'Approved' &&
                                                <div className="flex items-center p-1">
                                                    <CheckBadgeIcon className="h-3 w-3 me-1"/>
                                                    <p className="text-sm font-semibold">{data.status}</p>
                                                </div>
                                        }
                                        {
                                            data?.status === 'Rejected' &&
                                                <div className="flex items-center p-1">
                                                    <ExclamationTriangleIcon className="h-3 w-3 me-1"/>
                                                    <p className="text-sm font-semibold">{data.status}</p>
                                                </div>
                                        }
                                        </td>
                                        <td className="font-semibold text-sm text-[#09090B]">
                                            <div className="flex items center gap-1">
                                                 <CurrencyRupeeIcon className="w-5 h-5"/><p className="font-semibold text-sm text-[#09090B]">{data?.balance?.amount}</p>
                                            </div>
                                        </td>
                                        <td className="font-semibold text-sm text-[#09090B]">
                                            <button onClick={()=>document.getElementById(data._id).showModal()} className="btn btn-sm w-full">View Details</button>
                                        </td>

                                        <dialog id={data._id} className="modal">
                                            <div className="modal-box">
                                                <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                </form>
                                                    <h3 className="font-bold text-xl text-[#020617]">Withdrawal Details</h3>
                                                    <p className="text-sm text-[#64748B]">Transaction Details or Rejection Details</p>
                                                    <div className="py-3">
                                                        <p className="text-5xl font-bold text-center">{data.withdrawalAmount}</p>
                                                        <div className="flex justify-center">
                                                            {
                                                                data?.status === 'Pending' &&
                                                                    <div className="flex items-center p-1">
                                                                        <ClockIcon className="h-3 w-3 me-1 text-[#FEB951]"/>
                                                                        <p className="text-sm font-semibold text-[#FEB951]">{data.status}</p>
                                                                    </div>
                                                            }
                                                            {
                                                                data?.status === 'Approved' &&
                                                                    <div className="flex items-center p-1">
                                                                        <CheckBadgeIcon className="h-3 w-3 me-1 text-[#39C616]"/>
                                                                        <p className="text-sm font-semibold text-[#39C616]">{data.status}</p>
                                                                    </div>
                                                            }
                                                            {
                                                                data?.status === 'Rejected' &&
                                                                    <div className="flex items-center p-1">
                                                                        <ExclamationTriangleIcon className="h-3 w-3 me-1 text-[#71717A]"/>
                                                                        <p className="text-sm font-semibold text-[#71717A]">{data.status}</p>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols gap-2">
                                                        <div>
                                                            <p className="text-sm text-[#020617]">Title</p>
                                                            {
                                                                data?.status === 'Pending' &&
                                                                <p className="text-sm text-[#71717A]">Withdrawal Pending</p>
                                                            }
                                                            {
                                                                data?.status === 'Approved' &&
                                                                <p className="text-sm text-[#71717A]">Successfully Completed Withdrawal</p>
                                                            }
                                                            {
                                                                data?.status === 'Rejected' &&
                                                                <p className="text-sm text-[#71717A]">Withdrawal Rejected</p>
                                                            }
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-[#020617]">ID</p>
                                                            <p className="text-sm text-[#71717A]">{data._id}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-[#020617]">To</p>
                                                            <p className="text-sm text-[#71717A]">***********{data.bankInfo.account_number.toString().slice(-4)} {data?.bankInfo?.bank_name}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-[#020617]">Date and Time</p>
                                                            <p className="text-sm text-[#71717A]">{data.withdrawalDate} {data.withdrawalMonth} {data.withdrawalYear}</p>
                                                        </div>
                                                        {
                                                            data?.rejectResoan && 
                                                            <div className="p-2 my-2 rounded-md bg-[#F1F1F1] flex gap-2">
                                                                <QuestionMarkCircleIcon className="w-5 h-5"/>
                                                                <div>
                                                                    <p className="text-sm font-semibold text-[#252525]">Rejection Reason</p>
                                                                    <p className="text-sm text-[#71717A]">{data.rejectResoan}</p>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                            </div>
                                        </dialog>
                                    </tr>
                                </>
                            )
                        }                        
                        </tbody>
                    </table>
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