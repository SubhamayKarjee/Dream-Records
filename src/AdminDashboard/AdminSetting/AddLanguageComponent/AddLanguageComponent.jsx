import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddLanguageComponent = () => {

    const [language, setLanguage] = useState();
    const [totalCount, setTotalCount] = useState();
    const [refe, setRefe] = useState(1);
    const [loading, setLoading] = useState(false)
    useEffect( () => {
        setLoading(true)
        axios.get('https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/language')
        .then(res => {
            setLanguage(res.data.data);
            setTotalCount(res.data.dataCount)
            setLoading(false)
        })
    }, [refe])



    const [addLoading, setAddLoading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        setAddLoading(true)
        axios.post('https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/language/add-language', data)
        .then(res => {
            if(res.status == 200){
                const r = refe + 1
                setRefe(r)
                setAddLoading(false)
                reset();                
                toast.success(res.data.message)
            }
        })
        .catch(er => console.log(er))
    };


    const handleDeleteLanguage = (id) => {
        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/language/${id}`)
        .then(res => {
            if(res.status == 200){
                const r = refe + 1
                setRefe(r)
                setAddLoading(false)
                toast.success(res.data.message)
            }
        })
        .catch(er => console.log(er))
    }


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
            <p className="bg-slate-200 text-sm font-bold p-2 mt-2 rounded-md">Total Languages: {totalCount}</p>
            <div className="my-4 p-2 bg-white rounded-md overflow-y-auto">
                {
                    loading && <div className="flex justify-center items-center my-2"><span className="loading loading-spinner loading-sm me-2"></span></div>
                }
                {
                    language && !loading && language.map(l => 
                    <div key={l._id} className="flex items-center justify-between py-1 px-2 my-1 bg-slate-100 rounded-md">
                        <p>{l.language}</p>
                        <span className="me-2" style={{cursor: 'pointer'}} onClick={() => handleDeleteLanguage(l._id)}><XMarkIcon className="w-5 h-5 text-red-500"/></span>
                    </div>)
                }
            </div>
        </>
    );
};

export default AddLanguageComponent;