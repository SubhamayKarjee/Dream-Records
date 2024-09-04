/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/solid";
import { DatePicker, Empty, Pagination, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const AnalyticsReportList = ({id, text, role}) => {

    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(12);
    const [fetchLoading, setFetchLoading] = useState(false);

    const [reportList, setReportList] = useState();
    const [reload, setReload] = useState(1)
    useEffect( () => {
        setItemPerPage(12)
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/reports/${id}?page=${currentPage}&limit=${itemPerPage}`)
        .then(res => {
            if(res.status === 200){
                setReportList(res.data.data);
                setTotalItems(res.data.dataCount)
                setFetchLoading(false)
            }
        })
    },[id, currentPage, reload])

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
            axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/reports/search/${id}?page=${currentPage}&limit=${itemPerPage}&search=${dateString}`)
            .then(res => {
                setReportList(res.data.data);
                setTotalItems(res.data.dataCount)
                setFetchLoading(false)
            })
        }
    };

    const confirm = (id, data) => {
        setFetchLoading(true)
        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/reports/delete-report/${id}`)
        .then(res => {
            if(res.status === 200){
                axios.delete(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/reports/delete-file?key=${data.key}`)
                .then(res => {
                    if(res.status === 200){
                        const load = reload + 1;
                        setReload(load)
                        setFetchLoading(false)
                    }
                })
            }
        })
        
    }

    const cancel = () => {
        return;
    };


    return (
        <div>
            <div className="p-2 border my-2 bg-slate-100 mb-4">
                <p className="text-sm font-bold text-slate-500">Filter by YEAR</p>
                <DatePicker className="payment_details" onChange={onChange} picker="year" />
            </div>
            <div>
                {
                    fetchLoading && <div className="flex itmes-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                }
                {
                    reportList && reportList.map(r => 
                        <div className="p-3 rounded-lg my-1 border" key={r._id}>
                            <div className="md:flex justify-between">
                                <div>
                                    <p>{text} <span className="font-bold text-slate-500">{r.date} {r.month} {r.year} || {r.time}</span></p>
                                    <p>Reports based on <span className="font-bold text-green-600">{r.reportDate}</span></p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <a className="px-2 py-1 bg-slate-100 border rounded-md flex items-center font-bold" href={r.fileUrl} download={r.fileUrl}><ArrowDownTrayIcon className="w-4 h-4 me-2"/> Download</a>
                                    {
                                        role !== 'User' &&
                                        <Popconfirm
                                            title="Delete"
                                            placement="leftTop"
                                            className="z-1000"
                                            description="Are you sure to Delete Report?"
                                            onConfirm={() => confirm(r._id, r)}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                            >
                                            <TrashIcon style={{cursor: 'pointer'}} className="w-5 h-5 ms-2 text-red-500"/>
                                        </Popconfirm>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    !totalItems && !fetchLoading && <Empty className="pt-12" />
                }
                {
                    totalItems > 12 && !fetchLoading && <div className="flex justify-center items-center my-4">
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

export default AnalyticsReportList;