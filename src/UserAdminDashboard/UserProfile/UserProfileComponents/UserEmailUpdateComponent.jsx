import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useVerifyBeforeUpdateEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import auth from "../../../../firebase.config";
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";

const UserEmailUpdateComponent = () => {

    const [verifyBeforeUpdateEmail, updating, error] = useVerifyBeforeUpdateEmail(auth);

    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = async (data) => {

        const email = data.email;
        const success = await verifyBeforeUpdateEmail(email)
        if(success){
            toast.success('Please Go to your Email inbox and verify your Email')
        }
    };

    return (
        <div>
            <div className="my-4">
                <button><Link className="px-2 py-1 font-semibold text-sm text-slate-500 flex items-center inline bg-slate-200 rounded-md" to={'/account'}><ChevronLeftIcon className="w-4 h-4 me-1 font-bold"/>Back</Link></button>
            </div>
            <div>
                <h2 className="text-lg font-semibold text-slate-500 px-2">Update your Email</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="p-3 border mt-2 rounded-lg">
                    <p className="my-1 text-sm font-semibold text-slate-500 ms-2">New Email</p>
                    <input type="email" placeholder="New Email" className="input rounded-full input-bordered w-full" {...register("email", { required: true})}/>
                    {errors.email && <span className='text-red-600 pt-2 block'>Email Required</span>}
                    {
                        updating && <LoadingComponentsInsidePage/>
                    }
                    {
                        error && <span className='text-red-600 pt-2 block'>{error.message}</span>
                    }
                    <input type="submit" value={'Update'} className="btn btn-sm my-4 px-6 btn-accent rounded-full" />
                </form>
            </div>
        </div>
    );
};

export default UserEmailUpdateComponent;