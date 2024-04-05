import { ArrowDownTrayIcon, CheckBadgeIcon, ClockIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const SupportAnsPage = () => {

    const {id} = useParams();
    

    const [supportData, setSupportData] = useState();
    const [loading, setLoading] = useState(false);
    const [reFetch, setReFetch] = useState(1)
    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/common/api/v1/support/single/${id}`)
        .then(res => {
        if(res.status === 200){
            setLoading(false)
            setSupportData(res.data.data);
        }
    })
    },[id, reFetch])


    const [supportAnsText, setSupportAnsText] = useState();
    const [supportAnsTextErr, setSupportAnsTextErr] = useState();
    const [supportAnsSendLoading, setSupportAnsSendLoading] = useState(false);

    const handleSupportFormSend = () => {
        setSupportAnsSendLoading(true)
        setSupportAnsTextErr('');
        if(!supportAnsText){
            setSupportAnsTextErr('Support Text Required');
            return;
        }
        const now = new Date();
        const date = now.getDate().toLocaleString();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true });

        const status = 'Solved'
        const data = {...supportData, status, ansDate: date, ansMonth: month, ansYear: year, ansTime: time, supportAnsText}
        axios.put(`http://localhost:5000/common/api/v1/support/ans/${id}`, data)
        .then(res => {
            if(res.status === 200){
                document.getElementById('text_box').value = ''
                setSupportAnsSendLoading(false);
                const r = reFetch + 1;
                setReFetch(r)
                toast.success('Issues Ans Submited!')
            }
        })
    }

    return (
        <div className="my-2">
            {
                loading && <div className='flex justify-center items-center'><span className="loading loading-spinner loading-md me-2"></span></div>
            }
            {
                supportData && supportData.map(data => 
                    <div className='p-2 rounded-md border' key={data._id}>
                        <div className="relative bg-slate-100 p-2 rounded-md">
                            {
                                data.status === 'Pending' &&
                                <div className="flex items-center p-1 absolute top-2 right-2 bg-[#ffae00] rounded-md shadow">
                                    <ClockIcon className="h-3 w-3 text-white me-1"/>
                                    <p className="text-xs font-semibold text-white">{data.status}</p>
                                </div>
                            }
                            {
                                data.status === 'Solved' &&
                                <div className="flex items-center p-1 absolute top-2 right-2 bg-[#00c90d] rounded-md shadow">
                                    <CheckBadgeIcon className="h-3 w-3 text-white me-1"/>
                                    <p className="text-xs font-semibold text-white">{data.status}</p>
                                </div>
                            }
                            <div>
                                <p>Submited Request From <span className="font-bold text-green-500 me-2">{data.userName}</span>|| <span className="font-bold text-slate-500">{data.date} {data.month} {data.year} || {data.time}</span></p>
                                <p className='text-sm text-slate-500'>{data?.supportText} </p>
                                {
                                    data?.attachment &&
                                    <div className='p-2 border rounded-md mt-2'>
                                        <p className='text-sm text-slate-500'>Attachment</p>
                                        <a className="px-2 py-1 bg-slate-100 border rounded-md flex items-center font-bold" href={data?.attachment?.fileUrl} download={data?.attachment?.fileUrl}><ArrowDownTrayIcon className="w-4 h-4 me-2"/> Download</a>
                                    </div>
                                }
                            </div>
                        </div>
                        {
                            data.status === 'Pending' && 
                            <div className='my-3 p-3 md:p-4 border rounded-lg'>
                                <p className='font-bold text-sm text-slate-500 mb-2'>Submit Ans</p>
                                <textarea id='text_box' onChange={e => setSupportAnsText(e.target.value)} className="textarea textarea-bordered w-full" placeholder="Please answer the support request Here!"></textarea>
                                {
                                    supportAnsTextErr && <p className='text-sm text-red-500 mb-2'>{supportAnsTextErr}</p>
                                }
                                <div>
                                    {
                                        supportAnsSendLoading && <span className="loading loading-spinner loading-md me-2"></span>
                                    }
                                    <button onClick={handleSupportFormSend} className='btn btn-sm rounded-full bg-info px-4'>Submit</button>
                                </div>
                            </div>
                        }
                        {
                            data.status === 'Solved' && 
                            <div className='my-3 p-3 md:p-4 border rounded-lg bg-green-100'>
                                <p>Support Issue Solved on <span className="font-bold text-slate-500">{data.ansDate} {data.ansMonth} {data.ansYear} || {data.ansTime}</span></p>
                                <p className='text-sm text-slate-500'>{data?.supportAnsText} </p>
                            </div>
                        }
                    </div>
                )
            }
        </div>
    );
};

export default SupportAnsPage;