import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updatePassword } from "firebase/auth";
import auth from "../../../../firebase.config";
import axios from "axios";
import { AuthContext } from "../../UserAdminHomePage/UserAdminHomePage";
import { Image } from "antd";
import toast from "react-hot-toast";
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";
import fallbackImage from '../../../assets/userImage.webp'

const UserPassUpdateComponent = () => {

    const {user, userNameIdRoll, mainProfileImage} = useContext(AuthContext)
    const [userData, setUserData] = useState()
    useEffect(() => {
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${userNameIdRoll[1]}`)
        .then(res => setUserData(res.data.data))
    },[userNameIdRoll])

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

    const inputStyle ={
        height: '36px',
        border: '1px solid #E2E8F0'
    }


    return (
        <div className="md:h-full overflow-y-auto p-2 md:pt-16 custom-scrollbar">
            <h3 className='font-semibold text-xl pb-2 text-[#252525]'>Change Password</h3>
            <div className="p-5 rounded-lg border">

            <div className='flex items-center'>
                    <div className="avatar me-2">
                        <div className="w-100 rounded-full">
                            {
                                mainProfileImage ? <Image
                                    width={100}
                                    height={100}
                                    className="rounded-full bg-slate-100"
                                    src={mainProfileImage}
                                    fallback={fallbackImage}
                                    preview={false}
                                    alt="profile-image"
                                /> : <Image
                                        width={100}
                                        height={100}
                                        className="rounded-full bg-slate-100"
                                        src={user.photoURL}
                                        fallback={fallbackImage}
                                        preview={false}
                                        alt="profile-image"
                                    /> 
                            }
                                    
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{userData?.first_name} {userData?.last_name} </h2>
                        <p className="">User Name: {userData?.userName}</p>
                    </div>
                </div>

                <h2 className="font-semibold py-3">Change Password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="md:flex items-center gap-2">
                        <div className="flex-1">
                            <p className="text-sm font-semibold">New Password</p>
                            <input style={inputStyle} type="text" placeholder="New Email" className="input w-full" {...register("pass1", { required: true})}/>
                            {errors.pass1 && <span className='text-red-600 pt-2 block'>Password Required</span>}
                        </div>
                        <div className="flex-1 pt-2 md:pt-0">
                            <p className="text-sm font-semibold">Confirm Password</p>
                            <input style={inputStyle} type="password" placeholder="Password" className="input w-full" {...register("pass2", { required: true})}/>
                            {errors.pass2 && <span className='text-red-600 pt-2 block'>Confirm Password Required</span>}
                        </div>
                    </div>
                    {
                        passMatchErr && <span className='text-red-600 pt-2 block'>{passMatchErr}</span>
                    }
                    {
                        loading && <LoadingComponentsInsidePage/>
                    }
                    {
                        error && <span className='text-red-600 pt-2 block'>{error.message}</span>
                    }
                    <input type="submit" value={'Change Password'} className="btn btn-sm btn-neutral my-4 px-16 rounded-md bg-[#0F172A]" />
                </form>
            </div>
        </div>
    );
};

export default UserPassUpdateComponent;