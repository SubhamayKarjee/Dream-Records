import { useForm } from "react-hook-form";

const CreateUserForm = () => {
    // React Hook Form Submit Function For Create User _________________________
    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (data) => console.log(data);
    return (
        <>
            <h2 className='text-lg font-bold'>Create a new User</h2>
            <div className="flex flex-col w-full border-opacity-50">
                <div className="divider mt-0"></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder="Enter User Email" className="input input-bordered w-full" {...register("email", { required: true})}/>
                {errors.email && <span className='text-red-600 pt-2 block'>Please Fill Email</span>}
                <input className='btn btn-neutral btn-sm rounded-full mt-4' type="submit" value={'Create User'}/>
            </form>
        </>
    );
};

export default CreateUserForm;