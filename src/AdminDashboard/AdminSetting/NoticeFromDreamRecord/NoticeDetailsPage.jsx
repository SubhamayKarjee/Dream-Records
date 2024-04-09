import axios from "axios";
import { useEffect, useState } from "react";
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";

const NoticeDetailsPage = () => {

    const [noticeData, setNoticeData] = useState();
    const [getDataLoading, setGetDataLoading] = useState(false)
    useEffect(() => {
        setGetDataLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/notice/661089403281a4347e1d3498`)
        .then(res => {
            if(res.status === 200){
                setGetDataLoading(false)
                setNoticeData(res.data.data)
            }
        })
    },[])


    if(getDataLoading){
        return <LoadingComponentsInsidePage/>
    }


    return (
        <div>
            <p className="text-slate-500 font-bold bg-green-200 my-2 p-2 rounded-md">Current Notice {noticeData?.date} || {noticeData?.time}</p>
            <div className="p-2 border rounded-md">
                <p className="text-xl text-slate-500 font-bold">{noticeData?.noticeTitle}</p>
                <p className=" text-slate-500">{noticeData?.noticeDescription}</p>
            </div>
        </div>
    );
};

export default NoticeDetailsPage;