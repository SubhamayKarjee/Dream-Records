import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../../firebase.config";
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";
import { useVerifyBeforeUpdateEmail } from "react-firebase-hooks/auth";


const UserEmailUpdateComponent = () => {

    const navigate = useNavigate();


    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    // const [password, setPassword] = useState()
    const { register, handleSubmit, formState: { errors }} = useForm();

    const [verifyBeforeUpdateEmail, updating, error1] = useVerifyBeforeUpdateEmail(
        auth
      );

    const onSubmit = async (data) => {
        setError('');
        setLoading(true);
        try {
            const user = auth.currentUser;
            const password = data.password;
            const email = data.email;
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);            
            await verifyBeforeUpdateEmail(email)
            toast.success('Please verify Email')
            navigate('/log-in')
            setLoading(false);
        } catch (error) {
            console.error('Error updating email address:', error);
            setError(error.message); // Update state for error handling
            setLoading(false);
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
                    <p className="mt-2 mb-1 text-sm font-semibold text-slate-500 ms-2">Enter Password</p>
                    <input type="password" placeholder="Password" className="input rounded-full input-bordered w-full" {...register("password", { required: true})}/>
                    {errors.password && <span className='text-red-600 pt-2 block'>Password Required</span>}
                    {
                        loading || updating && <LoadingComponentsInsidePage/>
                    }
                    {
                        error && <span className='text-red-600 pt-2 block'>{error}</span>
                    }
                    {
                        error1 && <span className='text-red-600 pt-2 block'>{error1.message}</span>
                    }
                    <input type="submit" value={'Update'} className="btn btn-sm my-4 px-6 btn-accent rounded-full" />
                </form>
            </div>
        </div>
    );
};

export default UserEmailUpdateComponent;