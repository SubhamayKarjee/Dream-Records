import { BellAlertIcon } from "@heroicons/react/24/outline";
import { Drawer, Image } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import fallbackImage from '../../assets/fallbackImage.jpg'

const MainNoticesMobile = () => {

    const [noticeData, setNoticeData] = useState();
    useEffect(() => {
        axios.get(`http://localhost:5000/admin/api/v1/notice`)
        .then(res => {
            if(res.status === 200){
                setNoticeData(res.data.data)
            }
        })
    },[])

    const [imageData, setImageData] = useState();
    useEffect(() => {
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/advertisment/66106c5bcda450b5173c46d8`)
        .then(res => {
            if(res.status === 200){
                setImageData(res.data.data)
            }
        })
    },[]);

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <BellAlertIcon onClick={showDrawer} className='w-10 h-10 p-2 text-slate-500 bg-white rounded-full border block md:hidden fixed top-[50%] right-4 pointer'/>
            <Drawer className='' title="Notification" onClose={onClose} open={open}>
                <div onClick={onClose}>
                    <Image
                        width={'100%'}
                        height={'auto'}
                        className="rounded-md"
                        src={imageData?.imgUrl}
                        fallback={fallbackImage}
                        preview={true}
                        alt="advertisment-image"
                    />
                </div>
                <div>
                    {
                        noticeData && noticeData.map(data => 
                            <div key={data._id} className='flex bg-[#F2F2F2] rounded-md my-2 p-2 gap-2' onClick={()=>document.getElementById(data._id).showModal()}>  
                            <div>
                                <BellAlertIcon className='w-6 h-6'/>    
                            </div>          
                            <div className=''>
                                <div className="cursor-pointer">
                                    <p className="font-semibold text-[#252525]">{data?.noticeTitle}</p>
                                    <p className="text-[#71717A]">{data?.noticeDescription.slice(0, 20)}...</p>
                                    <div className='flex justify-between items-center pt-2'>
                                        <p className="text-sm text-[#71717A]">{data?.date}</p>
                                        <p className="text-sm text-[#71717A]">{data?.time}</p>
                                    </div>
                                </div>
                            </div>
                                <dialog id={data._id} className="modal">
                                    <div className="modal-box rounded-md">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <h3 className="font-bold text-[#252525] text-lg">{data?.noticeTitle}</h3>
                                        <p className="text-[#71717A]">{data?.noticeDescription}</p>
                                        <div className='flex justify-between items-center pt-2'>
                                            <p className="text-sm text-[#71717A]">{data?.date}</p>
                                            <p className="text-sm text-[#71717A]">{data?.time}</p>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        )
                    }
                </div>
            </Drawer>
        </div>
    );
};

export default MainNoticesMobile;