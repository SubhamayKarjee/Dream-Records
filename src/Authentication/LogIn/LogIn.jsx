import { 
    UserIcon, 
 } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { useSignInWithEmailAndPassword, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.config';

const LogIn = () => {

    const navigate = useNavigate();
    const [
        signInWithEmailAndPassword,
        // user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

    //   signInWithEmailAndPassword(email, password)

    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        await signInWithEmailAndPassword(email, password)
        .then((res) => {
            let userNameIdRoll = res.user?.displayName?.split("'__'");
            if(userNameIdRoll[2] === 'User'){
                localStorage.setItem('popupShown', 'false');
                navigate('/')
            }
            if(userNameIdRoll[2] === 'Admin'){
                navigate('/admin-dashboard')
            }
        })
    }

    // Reset Password
    const [email, setEmail] = useState()
    const [emailErr, setEmailErr] = useState();
    const handleForgetPassword = () => {
        setEmailErr('')
        if(!email){
            setEmailErr('Please Type Emali')
            return;
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setEmailErr('Email Not Valid')
            return;
        }
        console.log(email);
        // Send Reset Email
        sendPasswordResetEmail(auth, email)
        .then(() => alert("Please check your Email"))
        .catch(err => setEmailErr(err))
    }

    return (
        <div className='xl:max-w-[1140px] lg:max-w-[90%] md:max-w-[90%] sm:max-w-[90%] w-[95%] mx-auto'>
            <div className="h-screen flex justify-center items-center">
                <div className="card w-96 bg-base-100 shadow-xl border">
                    
                    <div className="flex justify-center pt-4">
                        <UserIcon className='w-12 h-12'/>
                    </div>
                    <h3 className="px-4 text-2xl font-bold text-center">Log In</h3>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                            <label className="input input-bordered flex items-center gap-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input onChange={e => setEmail(e.target.value)} type="text" className="grow" placeholder="Email" {...register("email", { required: true})}/>
                            </label>
                            {errors.email && <span className='text-red-600 pt-2 block'>Email Required</span>}
                            {emailErr && <span className='text-red-600 pt-2 block'>{emailErr}</span>}
                            <label className="input input-bordered flex items-center gap-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password" className="grow" placeholder="Password" {...register("password", { required: true})}/>
                            </label>
                            {errors.password && <span className='text-red-600 pt-2 block'>Password Required</span>}
                            <a onClick={handleForgetPassword} className="text-semibold link text-info" href="">Forgate Password</a>
                            {
                                loading && <div className='flex justify-center'><span className="block loading loading-spinner loading-md me-2"></span></div>
                            }
                            {
                                error && <span className='text-red-600 pt-2 block'>{error.message}</span>
                            }
                            <div className="flex justify-center mt-4">
                                <input className="btn btn-neutral rounded-full btn-wide" type="submit" value={'Submit'} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;