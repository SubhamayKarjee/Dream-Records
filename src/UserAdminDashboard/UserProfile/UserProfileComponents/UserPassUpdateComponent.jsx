import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { updatePassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import auth from "../../../../firebase.config";
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";

const UserPassUpdateComponent = () => {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [passMatchErr, setPassMatchErr] = useState('')
    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = async (data) => {
        setPassMatchErr('')
        setLoading(true);
        if(data.pass1 !== data.pass2){
            setPassMatchErr('Password Not Match');
            return;
        }
        const user = auth.currentUser;
        try {
            await updatePassword(user, data.pass1); // Pass the user object and new password to the updatePassword function
            setPassMatchErr('');
            setLoading(false);
            toast.success('Password updated successfully');
        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                setError('User requires recent login. Initiating reauthentication...');
                try {
                    await user.reauthenticateWithPopup(
                        new auth.GoogleAuthProvider() // Use appropriate provider for your app
                    );
                    await updatePassword(user, data.pass1); // Pass the user object and new password to the updatePassword function
                    setPassMatchErr('');
                    toast.success('Password updated successfully after reauthentication');
                } catch (reauthError) {
                    setError('Reauthentication failed:', reauthError.message);
                }
            } else {
                setError('Password update error:', error.message);
            }
        }
    };


    return (
        <div>
            <div className="my-4">
                <button><Link className="px-2 py-1 font-semibold text-sm text-slate-500 flex items-center inline bg-slate-200 rounded-md" to={'/account'}><ChevronLeftIcon className="w-4 h-4 me-1 font-bold"/>Back</Link></button>
            </div>
            <div>
                <h2 className="text-lg font-semibold text-slate-500 px-2">Update your Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="p-3 border mt-2 rounded-lg">
                    <p className="my-1 text-sm font-semibold text-slate-500 ms-2">New Password</p>
                    <input type="text" placeholder="New Password" className="input rounded-full input-bordered w-full" {...register("pass1", { required: true})}/>
                    {errors.pass1 && <span className='text-red-600 pt-2 block'>New Password Required</span>}
                    <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Confirm Password</p>
                    <input type="password" placeholder="Confirm Password" className="input rounded-full input-bordered w-full" {...register("pass2", { required: true})}/>
                    {errors.pass2 && <span className='text-red-600 pt-2 block'>Confirm Password Required</span>}
                    {
                        passMatchErr && <span className='text-red-600 pt-2 block'>{passMatchErr}</span>
                    }
                    {
                        loading && <LoadingComponentsInsidePage/>
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

export default UserPassUpdateComponent;