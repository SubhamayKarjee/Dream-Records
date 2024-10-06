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
                        <div key={data._key} className='pt-2'>
                            <div className='flex bg-[#F2F2F2] rounded-md'>
                                <BellAlertIcon className='w-12 h-12 ps-1 '/>
                                <div style={{cursor: 'pointer'}} className="p-2">
                                    <p className=" font-semibold text-[#252525]">{data?.noticeTitle}</p>
                                    <p className="text-[#71717A]">{data?.noticeDescription.slice(0, 50)}...</p>
                                    <div className='flex justify-between items-center pt-2'>
                                        <p className="text-sm text-[#71717A]">{data?.date}</p>
                                        <p className="text-sm text-[#71717A]">{data?.time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    }
                </div>
            </Drawer>
        </div>
    );
};

export default MainNoticesMobile;