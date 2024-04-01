import { CheckBadgeIcon, ClockIcon } from '@heroicons/react/24/solid';
import { Empty, Pagination} from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const CallSupport = ({id}) => {

    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(12);

    const [supportData, setSupportData] = useState()
    const [loading, setLoading] = useState(false);
    const [supportStatus, setSupportStatus] = useState('All');
    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/common/api/v1/support/call-support/${id}?page=${currentPage}&limit=${itemPerPage}&status=${supportStatus}`)
        .then(res => {
            if(res.status === 200){
                setLoading(false)
                setSupportData(res.data.data);
                setTotalItems(res.data.dataCount)
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage, supportStatus, id])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    const handleStatus = (e) => {
        setCurrentPage(1)
        setSupportStatus(e)
    }


    return (
        <div>
            <div className="my-2">
                <button onClick={() => handleStatus('All')} className="btn btn-sm btn-neutral m-1">All</button>
                <button onClick={() => handleStatus('Pending')} className="btn btn-sm btn-neutral mx-1">Pending</button>
                <button onClick={() => handleStatus('Solved')} className="btn btn-sm btn-neutral mx-1">Solved</button>
            </div>
            {
                loading && <div className='flex justify-center items-center'><span className="loading loading-spinner loading-md me-2"></span></div>
            }
            {
                supportData && supportData.map(data => 
                    <div className='p-2 my-1 rounded-md border md:flex justify-between items-center' key={data._id}>
                        <div>
                            <p>Submited Call Request <span className="font-bold text-slate-500">{data.date} {data.month} {data.year} || {data.time}</span></p>
                            <p className='text-sm text-slate-500'>Category: {data?.category}</p>
                            <p className='text-sm text-slate-500'>Language: {data?.language}</p>
                            <p className='text-sm text-slate-500'>Phone Number: {data?.phoneNumber}</p>
                            {
                                data?.status === 'Solved' &&
                                <p className='font-bold'>Call Request Accepted <span className="font-bold text-slate-500">{data.ansDate} {data.ansMonth} {data.ansYear} || {data.ansTime}</span></p>
                            }
                        </div>
                        {
                            data.status === 'Pending' &&
                            <div className="flex items-center p-1 bg-[#ffae00] rounded-md shadow">
                                <ClockIcon className="h-3 w-3 text-white me-1"/>
                                <p className="text-xs font-semibold text-white">{data.status}</p>
                            </div>
                        }
                        {
                            data.status === 'Solved' &&
                            <div className="flex items-center p-1 bg-[#00c90d] rounded-md shadow">
                                <CheckBadgeIcon className="h-3 w-3 text-white me-1"/>
                                <p className="text-xs font-semibold text-white">{data.status}</p>
                            </div>
                        }
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
    );
};

export default CallSupport;