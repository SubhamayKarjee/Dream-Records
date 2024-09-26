import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { DatePicker, Empty, Pagination, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const PaymentDetails = ({id, role}) => {
    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(14);
    const [fetchLoading, setFetchLoading] = useState(false)
    
    const [paymentData, setPaymentData] = useState();
    const [reload, setReload] = useState(1)
    useEffect( () => {
        setItemPerPage(14)
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/${id}?page=${currentPage}&limit=${itemPerPage}`)
        .then(res => {
            setPaymentData(res.data.data);
            setTotalItems(res.data.dataCount)
            setFetchLoading(false)
        })
    }, [currentPage, reload, itemPerPage, id])

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
            axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/search/${id}?page=${currentPage}&limit=${itemPerPage}&search=${dateString}`)
            .then(res => {
                setPaymentData(res.data.data);
                setTotalItems(res.data.dataCount)
                setFetchLoading(false)
            })
        }
    };

    const confirm = (id, data) => {
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/users/${data.masterUserId}`)
        .then(res => {
            if(res.status === 200){
            const preData = res.data.data;
            console.log('preData', preData);
            if(preData.balance){
                const preAmount = preData.balance.amount;
                const newAmount = parseInt(preAmount) - parseInt(data.amount);
                const newData = {...preData, balance:{amount: parseInt(newAmount),}}
                axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${data.masterUserId}`, newData)
                .then(res => {
                    if(res.status === 200){
                        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/${id}`)
                        .then(res => {
                            console.log(res.status)
                            const load = reload + 1;
                            setReload(load)
                            setFetchLoading(false)
                        })
                    }
                })
            }
        }
      })
    }

    const cancel = () => {
        return;
    };

    return (
        <div className="">
            <div className="p-2">
                <p className="text-sm font-bold text-slate-500">Filter by YEAR</p>
                <DatePicker className="payment_details" onChange={onChange} picker="year" />
            </div>
            
                {fetchLoading && <div className="flex justify-center items-center my-2"><span className="loading loading-spinner loading-md"></span></div>}
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className="text-md hidden md:block">Title</th>
                                <th className="text-md">Payment Date</th>
                                <th className="text-md">Based on</th>
                                <th className="text-md">Ammount</th>
                                <th className="text-md text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {
                            paymentData && paymentData.map(data => 
                                <>
                                    <tr className="hover">
                                        <td className="font-semibold text-sm text-[#09090B] hidden md:block">Successfully Get Payments</td>
                                        <td className="font-semibold text-sm text-[#09090B]">{data?.month} {data?.year}</td>
                                        <td className="font-semibold text-sm text-[#09090B]">{data?.paymentReportDate}</td>
                                        <td className="font-semibold text-sm text-[#09090B] flex items-center gap-1"><CurrencyRupeeIcon className="w-5 h-5"/>{data?.amount}.00</td>
                                        {
                                            role == 'User' &&
                                            <td className="font-semibold text-[#09090B]">
                                                <button className="btn btn-sm w-full">View Details</button>
                                            </td>
                                        }
                                        {
                                            role !== 'User' &&
                                            <td className="flex items-center justify-between gap-2">
                                                <button className="btn btn-sm w-full">View Details</button>
                                                <Popconfirm
                                                    title="Delete"
                                                    placement="leftTop"
                                                    className="z-1000"
                                                    description="Are you sure to Delete Payment?"
                                                    onConfirm={() => confirm(data._id, data)}
                                                    onCancel={cancel}
                                                    okText="Yes"
                                                    cancelText="No"
                                                    >
                                                    <TrashIcon style={{cursor: 'pointer'}} className="w-4 h-4 me-2 text-red-500 absolute top-2 right-3"/>
                                                </Popconfirm>
                                            </td>
                                        }
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

export default PaymentDetails;