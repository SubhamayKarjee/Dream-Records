
import { CheckBadgeIcon, ClockIcon } from '@heroicons/react/24/solid';
import { Empty, Pagination } from 'antd';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import supportIcon from '../../assets/support-icon/support.png'
import { AuthContext } from '../UserAdminHomePage/UserAdminHomePage';
const SupportPage = () => {

    const {userNameIdRoll} = useContext(AuthContext);
    const navigate = useNavigate()

    const [supportText, setSupportText] = useState();
    const [supportTextErr, setSupportTextErr] = useState();
    const [supportSendLoading, setSupportSendLoading] = useState(false);
    

    const handleSupportFormSend = () => {
        setSupportSendLoading(true)
        setSupportTextErr('');
        if(!supportText){
            setSupportTextErr('Support Text Required');
            return;
        }
        const now = new Date();
        const date = now.getDate().toLocaleString();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true });

        const masterUserId = userNameIdRoll[1]
        const userName = userNameIdRoll[0]
        const status = 'Pending'
        const data = {supportText, masterUserId, date, month, year, time, userName, status}
        axios.post(`http://localhost:5000/common/api/v1/support`, data)
        .then(res => {
            if(res.status === 200){
                document.getElementById('text_box').value = ''
                setSupportSendLoading(false)
                toast.success('Your Request Submited!')
            }
        })
    }

    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(12);

    const [supportData, setSupportData] = useState()
    const [loading, setLoading] = useState(false);
    const [supportStatus, setSupportStatus] = useState('All');
    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/common/api/v1/support/${userNameIdRoll[1]}?page=${currentPage}&limit=${itemPerPage}&status=${supportStatus}`)
        .then(res => {
            if(res.status === 200){
                setLoading(false)
                setSupportData(res.data.data);
                setTotalItems(res.data.dataCount)
            }
        })
    },[currentPage, supportStatus, userNameIdRoll[1]])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    const handleStatus = (e) => {
        setCurrentPage(1)
        setSupportStatus(e)
    }


    return (
        <div className='overflow-y-auto h-full'>
            <div className='flex items-center mt-2 p-2 rounded-md bg-green-100'>
                <img className='me-2' src={supportIcon} alt={supportIcon} />
                <h1 className='font-semibold text-xl text-slate-500'>Support</h1>
            </div>
            <p className='text-sm text-slate-500 px-2 mt-1'>If you have a complaint or opinion about something, you can let us know. We will try to answer your message as soon as possible</p>
            <div className='my-3 p-3 md:p-4 border rounded-lg'>
                <p className='font-bold text-sm text-slate-500 mb-2'>Support Box</p>
                <textarea id='text_box' onChange={e => setSupportText(e.target.value)} className="textarea textarea-bordered w-full" placeholder="If you have a complaint or opinion about something. Please write here!"></textarea>
                {
                    supportTextErr && <p className='text-sm text-red-500 mb-2'>{supportTextErr}</p>
                }
                <div>
                    {
                        supportSendLoading && <span className="loading loading-spinner loading-md me-2"></span>
                    }
                    <button onClick={handleSupportFormSend} className='btn btn-sm rounded-full bg-info px-4'>Submit</button>
                </div>
            </div>

            <div>
                <h2 className='font-semibold text-slate-500 my-2'>Support History...</h2>
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
                        <div style={{cursor: 'pointer'}} onClick={() => navigate(`/support/${data._id}`)} className='p-2 rounded-md border md:flex justify-between items-center' key={data._id}>
                            <div>
                                <p>Submited Request <span className="font-bold text-slate-500">{data.date} {data.month} {data.year} || {data.time}</span></p>
                                <p className='text-sm text-slate-500'>{data?.supportText.split(' ').slice(0, 18).join(' ')} ...</p>
                            </div>
                            {
                                data.status === 'Pending' &&
                                <div className="flex items-center p-1 music_status bg-[#ffae00] rounded-md shadow">
                                    <ClockIcon className="h-3 w-3 text-white me-1"/>
                                    <p className="text-xs font-semibold text-white">{data.status}</p>
                                </div>
                            }
                            {
                                data.status === 'Solved' &&
                                <div className="flex items-center p-1 music_status bg-[#00c90d] rounded-md shadow">
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
        </div>
    );
};

export default SupportPage;