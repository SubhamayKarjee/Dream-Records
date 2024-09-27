/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowDownTrayIcon,} from "@heroicons/react/24/solid";
import { DatePicker, Divider, Empty, Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AnalyticsReportList = ({id, link}) => {

    const navigate = useNavigate();
    const {pageNumber, perPageAnalytics} = useParams();

    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);

    const [reportList, setReportList] = useState();
    const [reload, setReload] = useState(1)
    useEffect( () => {
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/reports/${id}?page=${pageNumber}&limit=${perPageAnalytics}`)
        .then(res => {
            if(res.status === 200){
                setReportList(res.data.data);
                setTotalItems(res.data.dataCount)
                setFetchLoading(false)
            }
        })
    },[id, pageNumber, perPageAnalytics, reload])

    const handlePageChange = (page) => {
        navigate(`${link}/${page}/${perPageAnalytics}`)
    };

    
    const onChange = (date, dateString) => {
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
                                        <td className="font-semibold text-sm text-[#09090B]">{r.month} {r.year}</td>
                                        <td className="font-semibold text-sm text-[#09090B]">{r.reportDate}</td>
                                        <td className="font-semibold text-[#09090B]">
                                            <a className="px-2 py-1 bg-slate-100 border rounded-md flex items-center justify-center font-bold" href={r.fileUrl} download={r.fileUrl}><ArrowDownTrayIcon className="w-4 h-4 me-2 hidden md:block"/> Download</a>
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
                    totalItems > 12 && !fetchLoading && <div className="flex justify-center items-center my-4">
                        <Pagination 
                        defaultCurrent={pageNumber} 
                        total={totalItems}
                        pageSize={perPageAnalytics}
                        onChange={handlePageChange}
                        /> 
                    </div>
                }
            </div>
        </div>
    );
};

export default AnalyticsReportList;