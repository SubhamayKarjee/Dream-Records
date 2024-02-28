import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const UserYoutubeOacRequestComponent = () => {

    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };


    return (
        <div>
            <div className="my-4">
                <button><Link className="px-2 py-1 font-semibold text-sm text-slate-500 flex items-center inline bg-slate-200 rounded-md" to={'/account'}><ChevronLeftIcon className="w-4 h-4 me-1 font-bold"/>Back</Link></button>
            </div>
            <div>
                <h2 className="text-lg font-semibold text-slate-500 px-2">Youtube OAC Request</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="p-3 border mt-2 rounded-lg">
                    <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Youtube Chanel Link <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="Youtube Chanel Link" className="input rounded-full input-bordered w-full" {...register("youtubeChanelLink", { required: true})}/>
                    {errors.youtubeChanelLink && <span className='text-red-600 pt-2 block'>Youtube Chanel Link Required</span>}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">YouTube Topic Channel URL Required <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="YouTube Topic Channel URL" className="input rounded-full input-bordered w-full" {...register("youTubeTopicChannelURL", { required: true})}/>
                    <div className="mt-1">
                        <span className="text-xs bg-slate-100 text-slate-500 font-bold mx-2 px-2 py-1 rounded-md">Channel that is created for YouTube Music. Example: Artist Name - Topic</span>
                    </div>
                    {errors.youtubeChanelLink && <span className='text-red-600 pt-2 block'>YouTube Topic Channel URL Required</span>}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Vevo Channel URL (if you have one)</p>
                    <input type="text" placeholder="Vevo Channel URL" className="input rounded-full input-bordered w-full" {...register("vevoChanelUrl")}/>

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">URL of Official Video or Art Track we distributed <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="URL of Official Video or Art Track we distributed" className="input rounded-full input-bordered w-full" {...register("distributedUrl", { required: true})}/>
                    {errors.distributedUrl && <span className='text-red-600 pt-2 block'>YouTube Topic Channel URL Required</span>}


                    <input type="submit" value={'Update'} className="btn btn-sm my-4 px-6 btn-accent rounded-full" />
                </form>
            </div>
        </div>
    );
};

export default UserYoutubeOacRequestComponent;