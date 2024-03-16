import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddGenreComponent = () => {

    const [genre, setGenre] = useState();
    const [totalCount, setTotalCount] = useState();
    const [refe, setRefe] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        setLoading(true)
        axios.get('http://localhost:5000/admin/api/v1/genre')
        .then(res => {
            setLoading(false)
            setTotalCount(res.data.dataCount)
            setGenre(res.data.data)
        })
    }, [refe])


    const [addLoading, setAddLoading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        setAddLoading(true)
        axios.post('http://localhost:5000/admin/api/v1/genre/add-genre', data)
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

    const handleDeleteGenre = (id) => {
        axios.delete(`http://localhost:5000/admin/api/v1/genre/${id}`)
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
            <h2 className="font-bold text-slate-700">Genre</h2>
            <p className="text-xs font-bold text-slate-600">If you add Genre then USER can select Genre</p>
            <div className="mt-2">
                <form onSubmit={handleSubmit(onSubmit)} className="md:flex">
                    <div className="md:grow me-2">
                        <input type="text" placeholder="Type here" className="input input-bordered input-sm w-full my-1" {...register("genre", { required: true})}/>
                        {errors.genre && <span className='text-red-600 pt-2 block text-sm'>You have to fill Genre</span>}
                    </div>
                    {
                        addLoading &&
                        <span className="loading loading-spinner loading-sm me-2"></span>
                    }
                    <button type="submit" className="btn btn-sm btn-neutral my-1">Add Genre</button>
                </form>
            </div>
            <p className="bg-slate-200 text-sm font-bold p-2 mt-2 rounded-md">Total Languages: {totalCount}</p>
            <div style={{height: '200px'}} className="my-4 p-2 bg-white overflow-y-auto rounded-md">
                {
                    loading && <div className="flex justify-center items-center my-2"><span className="loading loading-spinner loading-sm me-2"></span></div>
                }
                {
                    genre && !loading && genre.map(g => 
                    <div key={g._id} className="flex items-center justify-between py-1 px-2 my-1 bg-slate-100 rounded-md">
                        <p>{g.genre}</p>
                        <span className="me-2" style={{cursor: 'pointer'}} onClick={() => handleDeleteGenre(g._id)}><XMarkIcon className="w-5 h-5 text-red-500"/></span>
                    </div>)
                }
            </div>
        </>
    );
};

export default AddGenreComponent;