import { useForm } from "react-hook-form";

const AddGenreComponent = () => {

    // const [genre, setGenre] = useState();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

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
                    <button type="submit" className="btn btn-sm btn-neutral my-1">Add Genre</button>
                </form>
            </div>
        </>
    );
};

export default AddGenreComponent;