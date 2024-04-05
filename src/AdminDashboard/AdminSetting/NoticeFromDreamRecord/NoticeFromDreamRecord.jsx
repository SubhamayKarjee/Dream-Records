import { useState } from "react";
import { useForm } from "react-hook-form";

const NoticeFromDreamRecord = () => {

    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = (data) => {
        setLoading(true)
        console.log(data);
        setLoading(false)
    };


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
        </div>
    );
};

export default NoticeFromDreamRecord;