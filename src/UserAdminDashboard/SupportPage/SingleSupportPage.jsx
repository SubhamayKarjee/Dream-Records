import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { Divider } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleSupportPage = () => {

    const {id} = useParams();
    

    const [supportData, setSupportData] = useState();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/support/single/${id}`)
        .then(res => {
        if(res.status === 200){
            setLoading(false)
            setSupportData(res.data.data[0]);
        }
    })
    },[id])


    return (
        <div className="h-screen overflow-y-auto custom-scrollbar">
            {
                loading && <div className='flex justify-center items-center'><span className="loading loading-spinner loading-md me-2"></span></div>
            }
            <div style={{height: '100%'}} className='md:pt-16 px-3'>
                <div className="flex justify-between items-center">
                    <h2 className="text-md md:text-xl font-bold">Support Title <span className="text-xs md:text-sm font-semibold border px-2 py-1">{supportData?.status}</span></h2>
                    <p>{supportData?.date} {supportData?.month.slice(0,3)} {supportData?.year} || {supportData?.time}</p>
                </div>
                <p className="font-bold text-sm">User Name</p>
            <Divider/>
             
                <div style={{height: '50%'}} className='overflow-y-auto custom-scrollbar'>
                    <div>
                        <div className="p-4 rounded-md bg-slate-100">
                            <p className='text-sm text-slate-500'>{supportData?.supportText} Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, numquam? Ex vero quod cum deserunt doloremque architecto, consectetur eveniet accusantium. </p>
                            {
                                supportData?.attachment &&
                                <div className='p-2 border rounded-md mt-2'>
                                    <p className='text-sm text-slate-500'>Attachment</p>
                                    <a className="px-2 py-1 bg-slate-100 border rounded-md flex items-center font-bold" href={supportData?.attachment?.fileUrl} download={supportData?.attachment?.fileUrl}><ArrowDownTrayIcon className="w-4 h-4 me-2"/> Download</a>
                                </div>
                            }
                        </div>
                        <div className="p-4 rounded-md bg-slate-100">
                            <p className='text-sm text-slate-500'>{supportData?.supportText} Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, numquam? Ex vero quod cum deserunt doloremque architecto, consectetur eveniet accusantium. </p>
                            {
                                supportData?.attachment &&
                                <div className='p-2 border rounded-md mt-2'>
                                    <p className='text-sm text-slate-500'>Attachment</p>
                                    <a className="px-2 py-1 bg-slate-100 border rounded-md flex items-center font-bold" href={supportData?.attachment?.fileUrl} download={supportData?.attachment?.fileUrl}><ArrowDownTrayIcon className="w-4 h-4 me-2"/> Download</a>
                                </div>
                            }
                        </div>
                        <div className="p-4 rounded-md bg-slate-100">
                            <p className='text-sm text-slate-500'>{supportData?.supportText} Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, numquam? Ex vero quod cum deserunt doloremque architecto, consectetur eveniet accusantium. </p>
                            {
                                supportData?.attachment &&
                                <div className='p-2 border rounded-md mt-2'>
                                    <p className='text-sm text-slate-500'>Attachment</p>
                                    <a className="px-2 py-1 bg-slate-100 border rounded-md flex items-center font-bold" href={supportData?.attachment?.fileUrl} download={supportData?.attachment?.fileUrl}><ArrowDownTrayIcon className="w-4 h-4 me-2"/> Download</a>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{height: '25%'}} className='rounded-md border p-3 mt-2'>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleSupportPage;