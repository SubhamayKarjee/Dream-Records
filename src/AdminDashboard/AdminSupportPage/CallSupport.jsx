import { CheckBadgeIcon, ClockIcon } from '@heroicons/react/24/solid';
import { Empty, Pagination, Popconfirm} from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LoadingComponentsInsidePage from '../../LoadingComponents/LoadingComponentsInsidePage';
import './CallSupport.css'


const CallSupport = () => {

    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(12);

    const [supportData, setSupportData] = useState()
    const [loading, setLoading] = useState(false);
    const [supportStatus, setSupportStatus] = useState('All');
    const [reFetch, setReFetch] = useState(1)
    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/common/api/v1/support/call-support-list?page=${currentPage}&limit=${itemPerPage}&status=${supportStatus}`)
        .then(res => {
            if(res.status === 200){
                console.log(res.data.data);
                setLoading(false)
                setSupportData(res.data.data);
                setTotalItems(res.data.dataCount)
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage, supportStatus, reFetch])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    const handleStatus = (e) => {
        setCurrentPage(1)
        setSupportStatus(e)
    }

    const [supportAnsSendLoading, setSupportAnsSendLoading] = useState(false);
    const confirm = (e) => {
        setSupportAnsSendLoading(true)
        const now = new Date();
        const date = now.getDate().toLocaleString();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true });

        const status = 'Solved'
        const data = {...supportData, status, ansDate: date, ansMonth: month, ansYear: year, ansTime: time,}
        axios.put(`http://localhost:5000/common/api/v1/support//call-support/update/${e}`, data)
        .then(res => {
            if(res.status === 200){
                setSupportAnsSendLoading(false);
                const r = reFetch + 1;
                setReFetch(r)
                toast.success('Status Updated!')
            }
        })
    };
    const cancel = () => {
        return
    };

    if(supportAnsSendLoading){
        return <LoadingComponentsInsidePage/>
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
                            <p>Get Call Request From <span className="font-bold text-green-500 me-2">{data.userName}</span>|| <span className="font-bold text-slate-500">{data.date} {data.month} {data.year} || {data.time}</span></p>
                            <p className='text-sm text-slate-500'>Category: {data?.category}</p>
                            <p className='text-sm text-slate-500'>Language: {data?.language}</p>
                            <p className='text-sm text-slate-500'>Phone Number: {data?.phoneNumber}</p>
                            {
                                data?.status === 'Solved' &&
                                <p className='font-bold'>Call Request Accepted <span className="font-bold text-green-500 me-2">{data.userName}</span>|| <span className="font-bold text-slate-500">{data.ansDate} {data.ansMonth} {data.ansYear} || {data.ansTime}</span></p>
                            }
                        </div>
                        <div>
                            {
                                data.status === 'Pending' &&
                                <div className="my-1 flex items-center p-1 music_status bg-[#ffae00] rounded-md shadow">
                                    <ClockIcon className="h-3 w-3 text-white me-1"/>
                                    <p className="text-xs font-semibold text-white">{data.status}</p>
                                </div>
                            }
                            {
                                data.status === 'Pending' &&
                                <Popconfirm
                                    placement="topLeft"
                                    title="Are You Change Status?"
                                    description="If you want to change status Pending to Solved then press the Yes Button"
                                    onConfirm={() => confirm(data._id)}
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <p style={{cursor: 'pointer'}} className="text-xs font-semibold bg-info py-1 rounded-md px-3 text-white">Update Status</p>
                                </Popconfirm>
                            }
                            {
                                data.status === 'Solved' &&
                                <div className="my-1 py-1 px-4 flex items-center bg-[#00c90d] rounded-md shadow">
                                    <CheckBadgeIcon className="h-3 w-3 text-white me-1"/>
                                    <p className="text-xs font-semibold text-white">{data.status}</p>
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
    );
};

export default CallSupport;