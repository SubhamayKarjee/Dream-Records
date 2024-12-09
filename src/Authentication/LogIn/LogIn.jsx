import axios from 'axios';
import { useState } from 'react';
import { useSignInWithEmailAndPassword, } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.config';
import authImage from '../../assets/authImage/Container.webp'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';


const LogIn = () => {

    const navigate = useNavigate();
    const [
        signInWithEmailAndPassword,
    ] = useSignInWithEmailAndPassword(auth);

    const [signInError, setSignInError] = useState('');
    const [signInLoading, setSignInLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = async (data) => {
        setSignInLoading(true)
        setSignInError('')
        try {
            const password = data.password;
            const email = data.email
            await signInWithEmailAndPassword(email, password)
            .then((res) => {
                let userNameIdRoll = res.user?.displayName?.split("'__'");
                const userEmail = res.user?.email;
                const uid = res.user?.uid;
                if(userNameIdRoll[2] === 'User'){
                    axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${userNameIdRoll[1]}`)
                    .then(res => {
                        if(res.status === 200){
                            const data = res.data.data;
                            const formData = {...data, email: userEmail, uid, password: password}
                            axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${userNameIdRoll[1]}`, formData)
                            .then(res => {
                                if(res.status === 200){
                                    localStorage.setItem('popupShown', 'false');
                                    navigate('/')
                                }
                            })
                        }
                    })
                }
                if(userNameIdRoll[2] === 'Admin'){
                    navigate('/admin-dashboard')
                }
            })
            setSignInLoading(false)
        } catch (error) {
            if (error) {
                setSignInError("Email/Password Not Correct");
                setSignInLoading(false)
            }
        }
        
    }


    const inputStyle ={
        height: '36px',
        border: '1px solid #E2E8F0'
    }

    const [inputType1, setInputType1] = useState('password')
    const passwordTypeHandle1 = () => {
        if(inputType1 === 'password'){
            setInputType1('text')
        }
        if(inputType1 === 'text'){
            setInputType1('password')
        }
    }


    return (
        <div className=''>
        {/* <div className='xl:max-w-[1140px] lg:max-w-[90%] md:max-w-[90%] sm:max-w-[90%] w-[95%] mx-auto'> */}
            <div className="h-screen flex justify-between items-center">
                <div className='flex-1 py-4 px-1'>
                    <div style={{maxWidth: '384px'}} className='mx-auto'>
                        <div style={{borderRadius: '0.5rem'}}  className="card p-6 shadow border">
                            <h1 className="text-2xl font-bold text-center">Login</h1>
                            <p className="text-sm text-[#64748B] pb-6 text-center">Enter your email below to login to your account</p>
                            <div className="card-body p-0">
                                <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                                    
                                    <div>
                                        <p className="text-sm text-[#020617] font-semibold pb-1">Email</p>
                                        <input style={inputStyle} type="email" className="input-sm w-full input" placeholder='m@example.com' {...register("email", { required: true})}/>
                                        {errors.email && <span className='text-red-600 pt-2 block'>Email Required</span>}
                                    </div>

                                    <div className='pt-3'>
                                        <div className='flex justify-between pb-1'>
                                            <p className="text-sm text-[#020617] font-semibold">Password</p>
                                            <span onClick={() => navigate('/reset-password')} style={{cursor: 'pointer'}} className="text-semibold link text-underline">Forgot your password?</span>
                                        </div>
                                        <div className="relative">
                                            <input style={inputStyle} type={inputType1} className="input-sm w-full input" placeholder='Enter your Password' {...register("password", { required: true})}/>
                                            {
                                                inputType1 === 'password' ? <EyeSlashIcon onClick={passwordTypeHandle1} className="h-5 w-5 absolute top-2 right-4"/> : <EyeIcon onClick={passwordTypeHandle1} className="h-5 w-5 absolute top-2 right-4"/>
                                            }
                                            {errors.password && <span className='text-red-600 pt-2 block'>Password Required</span>}
                                        </div>
                                    </div>

                                    {
                                        signInLoading && <div className='flex justify-center'><span className="block loading loading-spinner loading-md me-2"></span></div>
                                    }
                                    {
                                        signInError && <span className='text-red-600 pt-2 block'>{signInError}</span>
                                    }
                                    <div className="flex justify-center mt-4">
                                        <input className="btn btn-neutral btn-wide w-full bg-[#0F172A]" type="submit" value={'Submit'} />
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

export default LogIn;