import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddLanguageComponent = () => {

    // const [language, setLanguage] = useState();
    const [addLoading, setAddLoading] = useState(false)

    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        setAddLoading(true)
        axios.post('http://localhost:5000/admin/api/v1/language/add-language', data)
        .then(res => {
            if(res.status == 200){
              toast.success(res.data.message)
              setAddLoading(false)
              reset();                
            }
        })
        .catch(er => console.log(er))
    };
    return (
        <>
            <h2 className="font-bold text-slate-700">Language</h2>
            <p className="text-xs font-bold text-slate-600">If you add Language then USER can select Language</p>
            <div className="mt-2">
                <form onSubmit={handleSubmit(onSubmit)} className="md:flex">
                    <div className="md:grow me-2">
                        <input type="text" placeholder="Type here" className="input input-bordered input-sm w-full my-1" {...register("language", { required: true})}/>
                        {errors.language && <span className='text-red-600 pt-2 block text-sm'>You have to fill Language</span>}
                    </div>
                    {
                        addLoading &&
                        <span className="loading loading-spinner loading-sm me-2"></span>
                    }
                    <button type="submit" className="btn btn-sm btn-neutral my-1">Add Language</button>
                </form>
            </div>
        </>
    );
};

export default AddLanguageComponent;