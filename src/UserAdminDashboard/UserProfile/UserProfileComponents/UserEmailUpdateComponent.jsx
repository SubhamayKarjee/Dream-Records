import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
// import { useVerifyBeforeUpdateEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import auth from "../../../../firebase.config";
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";

export function useVerificationCode() {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code'); // Assuming the verification code is named 'code' in the URL
  
    return code;
  }

const UserEmailUpdateComponent = () => {

    // const navigate = useNavigate();


    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }} = useForm();
    console.log('auth', auth.currentUser);
    const onSubmit = async (data) => {
        setError('');
        setLoading(true);
        const email = data.email;
        console.log(email);
      
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
                        loading && <LoadingComponentsInsidePage/>
                    }
                    {
                        error && <span className='text-red-600 pt-2 block'>{error}</span>
                    }
                    <input type="submit" value={'Update'} className="btn btn-sm my-4 px-6 btn-accent rounded-full" />
                </form>
            </div>
        </div>
    );
};

export default UserEmailUpdateComponent;