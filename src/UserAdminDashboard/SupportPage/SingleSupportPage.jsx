import { ArrowUpTrayIcon, CheckIcon } from "@heroicons/react/24/outline";
import { ArrowDownTrayIcon, TrashIcon} from "@heroicons/react/24/solid";
import { Divider } from "antd";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";

const SingleSupportPage = () => {

    const {id} = useParams();
    const {userNameIdRoll} = useContext(AuthContext);
    
    const [supportData, setSupportData] = useState();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/common/api/v1/ticket/single-data/${id}`)
        .then(res => {
        if(res.status === 200){
            setLoading(false)
            setSupportData(res.data.data[0]);
            console.log(res.data.data);
        }
    })
    },[id])

    const [attachment, setAttachment] = useState();
    const [upLoadLoading, setUploadLoading] = useState(false);
    const attachmentUpload = (e) => {
        setUploadLoading(true)
        const file = e[0];
        const formData = new FormData();
        formData.append('file', file);
        if(attachment){
            axios.delete(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/support/delete-file?key=${attachment.key}`)
        }
        axios.post(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/support/upload-file`, formData)
        .then(res => {
            setUploadLoading(false);
            setAttachment(res.data.data)
            toast.success('File Uploaded')
        })
    }

    const [supportText, setSupportText] = useState();
    const [supportTextErr, setSupportTextErr] = useState();
    const [supportSendLoading, setSupportSendLoading] = useState(false);
    const [supportSendCheck, setSupportSendCheck] = useState(true)

    const handleSupportFormSend = (id) => {
        setSupportSendCheck(false)
        setSupportTextErr('');
        if(!supportText){
            setSupportTextErr('Support Text Required');
            return;
        }
        const date = new Date();
        const userName = userNameIdRoll[0]
        const data = {message: supportText, date, attachment, userName }
        supportData.issue.push(data)
        console.log(supportData);
        setSupportText('')
        axios.put(`http://localhost:5000/common/api/v1/ticket/update-ticket/${id}`, supportData)
        .then(res => {
            if(res.status === 200){
                document.getElementById('text_box').value = ''
                setSupportSendLoading(false)
                setSupportSendCheck(true)
                toast.success('Your Message Submited!')
                console.log(res.data);
            }else{
                setSupportSendCheck(false)
            }
        })
    }


    const deleteTicket = (id) => {
        axios.delete(`http://localhost:5000/common/api/v1/ticket/delete/${id}`)
        .then(res => {
            if(res.status == 200){
                toast.success('Deleted the Ticket')
            }
        })
    }

    const messagesEndRef = useRef(true);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [supportSendCheck, messagesEndRef]);


    return (
        <div className="h-screen overflow-y-auto custom-scrollbar">
            {
                loading && <div className='flex justify-center items-center'><span className="loading loading-spinner loading-md me-2"></span></div>
            }
            <div style={{height: '100%'}} className='md:pt-16 px-3 '>
                <div className='bg-white h-[10%]'>
                    <div className="flex justify-between items-center">
                        <h2 className="text-md md:text-xl font-bold flex items-center gap-2">{supportData?.title} <span className="text-xs md:text-sm font-semibold border px-2 py-1">{supportData?.status}</span> <TrashIcon onClick={() => deleteTicket(supportData?._id)} className='h-5 w-5 cursor-pointer'/></h2>
                        <p>{supportData?.date.slice(0,10)}</p>
                    </div>
                    <p className="font-bold text-sm">{supportData?.userName}</p>
                    <Divider className="h-2 my-2"/>
                </div>

             
                <div className='h-[60%] overflow-y-auto p-2 flex flex-col gap-2 mx-2' id="parentDiv">
                    {
                        supportData?.issue && supportData.issue.map((d,index) =>
                            <div key={index} className="p-4 rounded-md bg-[#E8E8E8] relative">
                                <ReactTimeAgo className="text-xs absolute top-2 right-2" date={Date.parse(d.date)}/> 
                                <p className='text-sm text-[#252525]'>{d?.message}</p>
                                {
                                    d?.attachment &&
                                    <div className='p-2 border rounded-md mt-2'>
                                        <p className='text-sm text-slate-500'>Attachment</p>
                                        <a className="px-2 text-sm py-1 bg-slate-100 border rounded-md flex items-center font-bold" href={d?.attachment?.fileUrl} download={d?.attachment?.fileUrl}><ArrowDownTrayIcon className="w-4 h-4 me-2"/> Download</a>
                                    </div>
                                }
                            </div>
                        )
                    }  
                        {
                            supportSendCheck == true ?
                            <div className="flex items-center justify-end">
                                <CheckIcon className="w-4 h-4 text-info"/>
                                <CheckIcon className="w-4 h-4 ms-[-6px] text-info"/>
                            </div> :
                            <div className="flex items-center justify-end">
                                <CheckIcon className="w-4 h-4"/>
                                <CheckIcon className="w-4 h-4 ms-[-6px]"/>
                            </div> 
                        }

                        <div ref={messagesEndRef}></div>
                </div>
                <div className=' h-[28%] md:h-[28%] lg:h-[28%] rounded-lg border-t-2 border-l-2 border-r-2 p-3 mt-2'>
                    <div>
                        <div className="h-[70%]">
                            <textarea id='text_box' onChange={e => setSupportText(e.target.value)} className="textarea textarea-bordered w-full h-[100%] border-none focus:outline-none" placeholder="If you have a complaint or opinion about something. Please write here!"></textarea>
                            {
                                supportTextErr && <p className='text-sm text-red-500 mb-2'>{supportTextErr}</p>
                            }
                        </div>
                        <div className="flex justify-between items-center h-[30%] pb-2">
                            <div className="flex items-center ">
                                {
                                    upLoadLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                                }
                                <input type="file" id="fileInput" className="w-[150px] sm:w-[100%] md:w-[100%]" name='image' onChange={e => attachmentUpload(e.target.files)} />
                            </div>
                            {/* {errorMessage && <p className="font-bold text-sm text-red-500">{errorMessage}</p>} */}
                            <div className='flex items-center'>
                                {
                                    supportSendLoading && <span className="loading loading-spinner loading-md me-2"></span>
                                }
                                <button onClick={() => handleSupportFormSend(supportData._id)} className='btn btn-sm btn-neutral bg-[#0F172A] px-6 h-9 w-full'>Send Message <ArrowUpTrayIcon className='h-4 w-4'/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleSupportPage;