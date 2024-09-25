import { BellAlertIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingComponentsInsidePage from '../../LoadingComponents/LoadingComponentsInsidePage'

const MainNotices = () => {

    const navigate = useNavigate()

    const [noticeData, setNoticeData] = useState();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/notice/661089403281a4347e1d3498`)
        .then(res => {
            if(res.status === 200){
                setLoading(false)
                setNoticeData(res.data.data)
            }
        })
    },[])


    return (
        <div className='flex bg-[#F2F2F2] rounded-md'>            
            {
                loading ? <LoadingComponentsInsidePage/> :
                <>
                    <BellAlertIcon className='w-12 h-12 ps-1 '/>
                    <div className=''>
                        <div style={{cursor: 'pointer'}} onClick={() => navigate(`/notice/661089403281a4347e1d3498`)} className="p-2">
                            <p className=" font-semibold text-[#252525]">{noticeData?.noticeTitle}</p>
                            <p className="text-[#71717A]">{noticeData?.noticeDescription.slice(0, 50)}...</p>
                            <div className='flex justify-between items-center pt-2'>
                                <p className="text-sm text-[#71717A]">{noticeData?.date}</p>
                                <p className="text-sm text-[#71717A]">{noticeData?.time}</p>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default MainNotices;