import { BellAlertIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainNotices = () => {

    const navigate = useNavigate()

    const [noticeData, setNoticeData] = useState();
    useEffect(() => {
        axios.get(`http://localhost:5000/admin/api/v1/notice`)
        .then(res => {
            if(res.status === 200){
                setNoticeData(res.data.data)
                console.log(res.data.data);
            }
        })
    },[])


    return (
        <div>
            {
                noticeData && noticeData.map(data => 
                    <div key={data._id} className='flex bg-[#F2F2F2] rounded-md my-2 p-2 gap-2'>  
                        <div>
                            <BellAlertIcon className='w-6 h-6'/>    
                        </div>          
                        <div className=''>
                            <div style={{cursor: 'pointer'}} onClick={() => navigate(`/notice/661089403281a4347e1d3498`)} className="">
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
    );
};

export default MainNotices;