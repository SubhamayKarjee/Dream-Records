/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/solid";
import { DatePicker, Divider, Empty, Pagination, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import localDate from "../../Hooks/localDate";


// eslint-disable-next-line react/prop-types
const UserAnalytics = ({id}) => {

    // const navigate = useNavigate();

    // Paginatin and Search State __________________________________________________
    const [pageNumber, setPageNumber] = useState(1)
    const [perPageItem, setPerPageItem] = useState(8)
    const [totalItems, setTotalItems] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);

    const [reportList, setReportList] = useState();
    const [reload, setReload] = useState(1)
    useEffect( () => {
        setPerPageItem(8)
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/reports/${id}?page=${pageNumber}&limit=${perPageItem}`)
        .then(res => {
            if(res.status === 200){
                setReportList(res.data.data);
                setTotalItems(res.data.dataCount)
                setFetchLoading(false)
            }
        })
    },[id, pageNumber, perPageItem, reload])

    const handlePageChange = (page) => {
        setPerPageItem(8)
        setPageNumber(page)
    };

    
    const onChange = (date, dateString) => {
        setPerPageItem(50)
        if(!dateString){
            const load = reload + 1 
            setReload(load)
        }else{
            setFetchLoading(true)
            axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/reports/search/${id}?page=${pageNumber}&limit=100&search=${dateString}`)
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
            <DatePicker className="h-9 w-200" placeholder="Filter by Year" onChange={onChange} picker="year" />
            <Divider/>
            <div>
                {
                    fetchLoading && <div className="flex itmes-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                }

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className="text-md hidden md:block">Title</th>
                                <th className="text-md">Created on</th>
                                <th className="text-md">Based on</th>
                                <th className="text-md text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {
                            reportList && reportList.map(r => 
                                <>
                                    <tr className="hover">
                                        <td className="font-semibold text-sm text-[#09090B] hidden md:block">Analytics Report</td>
                                        <td className="font-semibold text-sm text-[#09090B]">
                                            {   r?.isoDate ? 
                                                localDate(r?.isoDate)
                                                : <>{r?.date} {r?.month.slice(0,3)} {r?.year}</>
                                            }
                                        </td>
                                        <td className="font-semibold text-sm text-[#09090B]">{r.reportDate}</td>
                                        <td className="flex items-center justify-end gap-2">
                                            <a className="px-2 py-1 bg-slate-100 border rounded-md flex items-center font-bold" href={r.fileUrl} download={r.fileUrl}><ArrowDownTrayIcon className="w-4 h-4 me-2"/> Download</a>
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
                                                    <TrashIcon style={{cursor: 'pointer'}} className="w-5 h-5 ms-2"/>
                                                </Popconfirm>
                                        </td>
                                    </tr>
                                </>
                            )
                        }                        
                        </tbody>
                    </table>
                </div>
                {
                    !totalItems && !fetchLoading && <Empty className="pt-12" />
                }
                {
                    totalItems > 8 && !fetchLoading && <div className="flex justify-center items-center my-4">
                        <Pagination 
                        defaultCurrent={pageNumber} 
                        total={totalItems}
                        pageSize={perPageItem}
                        onChange={handlePageChange}
                        /> 
                    </div>
                }
            </div>
        </div>
    );
};

export default UserAnalytics;