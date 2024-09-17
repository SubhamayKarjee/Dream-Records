import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import auth from "../../../../firebase.config";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";
import axios from "axios";
import authImage from '../../../assets/authImage/Container.webp'
import 'react-phone-number-input/style.css'
import "react-country-state-city/dist/react-country-state-city.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";


const SetPassword = () => {

    // Get Data From React Router Loader _______________
    const userData = useLoaderData();
    const navigate = useNavigate()

    const id = userData?.data?.data?._id;
    const roll = userData?.data?.data?.roll;

    const [loadingHandle, setLoadingHandle] = useState(false)

    // Create User IN Firebase __________________________
    const [
        createUserWithEmailAndPassword,
        // user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const [updateProfile, updating, error1] = useUpdateProfile(auth);



    // User Update Form _________________________________
    const [passwordError, setPasswordError] = useState();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = async (data) => {
        
        const date = new Date();
        const openingDate = date.toLocaleDateString();
        const openingTime = date.toLocaleTimeString([], { hour12: true});
        
        if(data.password1 === data.password2){
            const password = data.password1;
            const email = data.email
            // _________________
            await createUserWithEmailAndPassword(email, password).then(res => {
                const uid = res.user.uid
                const userData = {openingDate, openingTime, uid};
                setLoadingHandle(true)
                axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${id}`, userData).then( async res => {
                    const displayName = `${data.userName}'__'${id}'__'${roll}`
                    if(res.status == 200){
                        setLoadingHandle(false);
                        await updateProfile({ displayName });
                        if(roll === 'User'){
                            localStorage.setItem('popupShown', 'false');
                            navigate('/')
                        }
                        if(roll === 'Admin'){
                            navigate('/admin-dashboard')
                        }
                    }
                })
            })
            
        }else{
            setPasswordError('Password Not Match')
        }
    }

    const inputStyle ={
        height: '36px',
        border: '1px solid #E2E8F0'
    }

    const [inputType1, setInputType1] = useState('password')
    const [inputType2, setInputType2] = useState('password')

    const passwordTypeHandle1 = () => {
        if(inputType1 === 'password'){
            setInputType1('text')
        }
        if(inputType1 === 'text'){
            setInputType1('password')
        }
    }
    const passwordTypeHandle2 = () => {
        if(inputType2 === 'password'){
            setInputType2('text')
        }
        if(inputType2 === 'text'){
            setInputType2('password')
        }
    }

    return (
        <div className=''>
            <div className="md:flex justify-between items-center gap-4">
                <div className="flex-1 py-4 px-1">
                    <div style={{maxWidth: '384px'}} className='mx-auto'>
                        <div style={{borderRadius: '0.5rem'}} className="card border p-6">
                            <h1 className="text-2xl font-bold">Set Password</h1>
                            <p className="text-sm text-[#64748B]">Add your password to secure account</p>
                            <div className="card-body p-0">
                                <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}} className='pt-6'>
                
                                    <div>
                                        <p className="text-sm text-[#020617] font-semibold pb-1">Password</p>
                                        <div className="relative">
                                            <input style={inputStyle} type={inputType1} className="input-sm w-full input" {...register("password1", { required: true})}/>
                                            {
                                                inputType1 === 'password' ? <EyeSlashIcon onClick={passwordTypeHandle1} className="h-5 w-5 absolute top-2 right-4"/> : <EyeIcon onClick={passwordTypeHandle1} className="h-5 w-5 absolute top-2 right-4"/>
                                            }
                                        </div>
                                    </div>

                                    <div className="pt-3">
                                        <p className="text-sm text-[#020617] font-semibold pb-1">Confirm Password</p>
                                        <div className="relative">
                                            <input style={inputStyle} type={inputType2} className="input-sm w-full input" {...register("password2", { required: true})}/>
                                            {
                                                inputType2 === 'password' ? <EyeSlashIcon onClick={passwordTypeHandle2} className="h-5 w-5 absolute top-2 right-4"/> : <EyeIcon onClick={passwordTypeHandle2} className="h-5 w-5 absolute top-2 right-4"/>
                                            }
                                        </div>
                                    </div>
                                        {errors.password2 && <span className='text-red-600 pb-2 block'>Please Confirm Password</span>}
                                        {passwordError && <span className='text-red-600 pb-2 block font-bold'>{passwordError}</span>}

                                    <div>
                                        {
                                            loadingHandle && loading  && <LoadingComponentsInsidePage/>
                                        }
                                        {
                                            updating && <LoadingComponentsInsidePage/>
                                        }
                                        {
                                            error && <span className='text-red-600 pb-2 block font-bold'>{error}</span>
                                        }
                                        {
                                            error1 && <span className='text-red-600 pb-2 block font-bold'>{error1}</span>
                                        }
                                    </div>
                                    <div className="flex justify-center py-5">
                                        {
                                            !userData?.data ? <input className="btn btn-md btn-neutral w-full bg-[#0F172A]" type="submit" value={'Set Password'} disabled/> : <input className="btn btn-md btn-neutral w-full bg-[#0F172A]" type="submit" value={'Set Password'} />
                                        }
                                    </div>                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 hidden md:block">
                    <img className="h-screen" style={{width: '100%',}} src={authImage} alt='log/sign up image' />
                </div>
            </div>
        </div>
    );
};

export default SetPassword;