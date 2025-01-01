import { Image } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import fallbackImage from '../../assets/fallbackImage.jpg'
import bellIcon from '../../assets/common-icons/bell.png'
import localDate from "../../Hooks/localDate";
import localTime from "../../Hooks/localTime";

const MainNotices = () => {

    const [noticeData, setNoticeData] = useState();
    useEffect(() => {
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/notice`)
        .then(res => {
            if(res.status === 200){
                setNoticeData(res.data.data)
            }
        })
    },[]);

    const [imageData, setImageData] = useState();
    useEffect(() => {
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/advertisment/66106c5bcda450b5173c46d8`)
        .then(res => {
            if(res.status === 200){
                setImageData(res.data.data)
            }
        })
    },[]);


    return (
        <div className="flex flex-col justify-between h-[100%]">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {
                    noticeData && noticeData.map(data => 
                        <div key={data._id} className='flex bg-[#F2F2F2] rounded-md my-2 p-2 gap-2' onClick={()=>document.getElementById(data._id).showModal()}>  
                            <div>
                                <img src={bellIcon} alt={bellIcon} />
                            </div>          
                            <div className=''>
                                <div className="cursor-pointer">
                                    <p className="font-semibold text-[#252525]">{data?.noticeTitle}</p>
                                    <p className="text-[#71717A]">{data?.noticeDescription.slice(0, 20)}...</p>
                                    <div className='flex justify-between items-center pt-2'>
                                        <p className="text-sm text-[#71717A]">{ data?.isoDate ? localDate(data?.isoDate) :data?.date}</p>
                                        <p className="text-sm text-[#71717A]">{ data?.isoDate ? localTime(data?.isoDate) :data?.time}</p>
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
                                            <p className="text-sm text-[#71717A]">{ data?.isoDate ? localDate(data?.isoDate) :data?.date}</p>
                                            <p className="text-sm text-[#71717A]">{ data?.isoDate ? localTime(data?.isoDate) :data?.time}</p>
                                        </div>
                                    </div>
                                </dialog>
                        </div>
                    )
                }
            </div>
            <div className='pt-3 flex-1 flex items-end pb-14'>
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
        </div>
    );
};

export default MainNotices;