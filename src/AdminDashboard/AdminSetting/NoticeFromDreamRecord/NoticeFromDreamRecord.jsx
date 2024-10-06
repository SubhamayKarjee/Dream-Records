import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";
import toast from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/outline";

const NoticeFromDreamRecord = () => {

    const [noticeData, setNoticeData] = useState();
    const [getDataLoading, setGetDataLoading] = useState(false)
    const [reFetch, setRefetch] = useState(1)
    useEffect(() => {
        setGetDataLoading(true)
        axios.get(`http://localhost:5000/admin/api/v1/notice`)
        .then(res => {
            if(res.status === 200){
                setGetDataLoading(false)
                setNoticeData(res.data.data)
            }
        })
    },[reFetch])

    
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        setLoading(true)
        const now = new Date();
        const currentDate = now.toJSON()
        const date = currentDate.slice(0,10)
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true });
        const formData = {...data, date, time}
        axios.post(`http://localhost:5000/admin/api/v1/notice`, formData)
        .then(res => {
            if(res.status === 200){
                const r = reFetch + 1;
                setRefetch(r)
                toast.success('Notice Updeted');
                setLoading(false);
            }
        })
    };

    const deleteNotice = (id) => {
        axios.delete(`http://localhost:5000/admin/api/v1/notice/delete/${id}`)
        .then(res => {
            if(res.status == 200){
                toast.success('Deleted Notice');
                const r = reFetch + 1;
                setRefetch(r)
            }
        })
    }

    if(getDataLoading){
        return <LoadingComponentsInsidePage/>
    }

    return (
        <div>
            <h2 className="font-bold text-slate-700">Notice From Dream Record</h2>
            <p className="text-xs font-bold text-slate-600">This notice show on User Dasboard!</p>

            <form onSubmit={handleSubmit(onSubmit)} className='p-2 rounded-md'>
                <p className="my-1 text-sm font-semibold text-slate-500">Notice Title <span className="text-red-500">*</span></p>
                <input type="text" placeholder="" className="input input-sm rounded-md input-bordered w-full" {...register("noticeTitle", { required: true})}/>
                {errors.noticeTitle && <span className='text-red-600 pt-2 block'>Notice Title Required</span>}

                <p className='font-bold text-sm text-slate-500 mt-2'>Notice Description</p>
                <textarea id='text_box' className="textarea textarea-bordered w-full md:h-20" {...register("noticeDescription", { required: true})} placeholder="Description!"></textarea>
                {errors.noticeDescription && <p className="font-bold text-sm text-red-500">Notice Description Required</p>}

                <div className='flex items-center mt-2'>
                    {
                        loading && <span className="loading loading-spinner loading-md me-2"></span>
                    }
                    <button type="submit" className='btn btn-sm rounded-full bg-info px-4'>Submit</button>
                </div>
            </form>
            <div>
                {
                    noticeData && noticeData.map(data => 
                        <div key={data._id} className='my-2'>
                            <div className="p-2 border rounded-md">
                                <div className="flex justify-between">
                                    <p className="text-sm text-slate-500 font-bold">{data?.noticeTitle}</p>
                                    <TrashIcon className="w-5 h-5 cursor-pointer" onClick={() => deleteNotice(data._id)} />
                                </div>
                                    <p className="text-xs text-slate-500">{data?.noticeDescription.slice(0, 100)}...</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">{data?.date}</span>
                                    <span className="text-sm">{data?.time}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default NoticeFromDreamRecord;