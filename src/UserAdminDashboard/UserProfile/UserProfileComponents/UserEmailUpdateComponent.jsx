import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth";
import { useVerifyBeforeUpdateEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../UserAdminHomePage/UserAdminHomePage";
import toast from "react-hot-toast";
import auth from "../../../../firebase.config";
import axios from "axios";
import { Image } from "antd";
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";
import fallbackImage from '../../../assets/userImage.webp'


const UserEmailUpdateComponent = () => {

    const navigate = useNavigate();
    const {user, userNameIdRoll, mainProfileImage} = useContext(AuthContext)

    const [userData, setUserData] = useState()
    useEffect(() => {
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${userNameIdRoll[1]}`)
        .then(res => setUserData(res.data.data))
    },[userNameIdRoll])

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
            // Generate verification link with additional user information            
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

    const inputStyle ={
        height: '36px',
        border: '1px solid #E2E8F0'
    }



    return (
        <div className="md:h-full overflow-y-auto p-2 md:pt-16 custom-scrollbar">
            <h3 className='font-semibold text-xl pb-2 text-[#252525]'>Change Email</h3>
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


                <h2 className="font-semibold py-3">Change Email</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg">
                    <div className="md:flex items-center gap-2">
                        <div className="flex-1">
                            <p className="text-sm font-semibold">New Email</p>
                            <input style={inputStyle} type="email" placeholder="New Email" className="input w-full" {...register("email", { required: true})}/>
                            {errors.email && <span className='text-red-600 pt-2 block'>Email Required</span>}
                        </div>
                        <div className="flex-1 pt-2 md:pt-0">
                            <p className="text-sm font-semibold">Enter Password</p>
                            <input style={inputStyle} type="password" placeholder="Password" className="input w-full" {...register("password", { required: true})}/>
                            {errors.password && <span className='text-red-600 pt-2 block'>Password Required</span>}
                        </div>
                    </div>
                    {
                        loading || updating && <LoadingComponentsInsidePage/>
                    }
                    {
                        error && <span className='text-red-600 pt-2 block'>{error}</span>
                    }
                    {
                        error1 && <span className='text-red-600 pt-2 block'>{error1.message}</span>
                    }
                    <input type="submit" value={'Update Email'} className="btn btn-sm my-4 px-16 btn-neutral rounded-md" />
                </form>
            </div>
        </div>
    );
};

export default UserEmailUpdateComponent;