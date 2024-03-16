import { useForm } from "react-hook-form";

const AddLanguageComponent = () => {

    // const [language, setLanguage] = useState();

    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        console.log(data);
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
                    <button type="submit" className="btn btn-sm btn-neutral my-1">Add Language</button>
                </form>
            </div>
        </>
    );
};

export default AddLanguageComponent;