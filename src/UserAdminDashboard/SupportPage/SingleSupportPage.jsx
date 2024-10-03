import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { ArrowDownTrayIcon} from "@heroicons/react/24/solid";
import { Divider } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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

        const status = 'Pending'
        const data = {supportText, date, month, year, time,  status, attachment}
        axios.post(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/support`, data)
        .then(res => {
            if(res.status === 200){
                document.getElementById('text_box').value = ''
                setSupportSendLoading(false)
                toast.success('Your Request Submited!')
            }
        })
    }


    return (
        <div className="h-screen overflow-y-auto custom-scrollbar">
            {
                loading && <div className='flex justify-center items-center'><span className="loading loading-spinner loading-md me-2"></span></div>
            }
            <div style={{height: '100%'}} className='md:pt-16 px-3 '>
                <div className='bg-white h-[10%]'>
                    <div className="flex justify-between items-center">
                        <h2 className="text-md md:text-xl font-bold">Support Title <span className="text-xs md:text-sm font-semibold border px-2 py-1">{supportData?.status}</span></h2>
                        <p>{supportData?.date} {supportData?.month.slice(0,3)} {supportData?.year} || {supportData?.time}</p>
                    </div>
                    <p className="font-bold text-sm">User Name</p>
                    <Divider className="h-2 my-2"/>
                </div>

             
                <div className='h-[60%] overflow-y-auto p-2'>
                    <div className="flex flex-col gap-2 mx-2">
                        <div className="p-4 rounded-md bg-[#E8E8E8]">
                            <p className='text-sm text-[#252525]'>{supportData?.supportText} Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, numquam? Ex vero quod cum deserunt doloremque architecto, consectetur eveniet accusantium. </p>
                            {
                                supportData?.attachment &&
                                <div className='p-2 border rounded-md mt-2'>
                                    <p className='text-sm text-slate-500'>Attachment</p>
                                    <a className="px-2 text-sm py-1 bg-slate-100 border rounded-md flex items-center font-bold" href={supportData?.attachment?.fileUrl} download={supportData?.attachment?.fileUrl}><ArrowDownTrayIcon className="w-4 h-4 me-2"/> Download</a>
                                </div>
                            }
                        </div>
                        
                    </div>
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
                                <button onClick={handleSupportFormSend} className='btn btn-sm btn-neutral bg-[#0F172A] px-6 h-9 w-full'>Send Message <ArrowUpTrayIcon className='h-4 w-4'/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleSupportPage;