import axios from 'axios';
import { useState } from 'react';
import { useSignInWithEmailAndPassword, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.config';
import logoImg from '../../assets/logo/Dream Records Logo (Dark).png'

const LogIn = () => {
    

    const navigate = useNavigate();
    const [
        signInWithEmailAndPassword,
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

    //   signInWithEmailAndPassword(email, password)

    const [signInError, setSignInError] = useState('');
    const [signInLoading, setSignInLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [email, setEmail] = useState('')
    const [emailErr, setEmailErr] = useState();
    const onSubmit = async (data) => {
        setSignInLoading(true)
        setSignInError('')
        try {
            if(!email){
                setEmailErr('Please Enter Email');
                return;
            }
            const password = data.password;
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
                            const formData = {...data, email: userEmail, uid}
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

    const handleForgetPassword = () => {
        setEmailErr('')
        if(!email){
            setEmailErr('Please Type Emali')
            return;
        }
        sendPasswordResetEmail(email)
        .then(() => alert("Please check your Email"))
        .catch(err => setEmailErr(err))
    }



    return (
        <div className='xl:max-w-[1140px] lg:max-w-[90%] md:max-w-[90%] sm:max-w-[90%] w-[95%] mx-auto'>
            <div className="h-screen flex justify-center items-center">
                <div className="card w-96 bg-base-100 shadow-xl border">
                    <div className='flex justify-center items-center'>
                        <img style={{width: '120px', hight: 'auto'}} src={logoImg} alt={logoImg} />
                    </div>
                    <h3 className="px-4 text-2xl font-bold text-center">Sign In</h3>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                            <label className="input input-bordered flex items-center gap-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input onChange={e => setEmail(e.target.value)} type="text" className="grow" placeholder="Email"/>
                            </label>
                            {emailErr && <span className='text-red-600 pt-2 block'>{emailErr}</span>}
                            <label className="input input-bordered flex items-center gap-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password" className="grow" placeholder="Password" {...register("password", { required: true})}/>
                            </label>
                            {errors.password && <span className='text-red-600 pt-2 block'>Password Required</span>}
                            {
                                signInLoading && <div className='flex justify-center'><span className="block loading loading-spinner loading-md me-2"></span></div>
                            }
                            {
                                signInError && <span className='text-red-600 pt-2 block'>{signInError}</span>
                            }
                            <div className="flex justify-center mt-4">
                                <input className="btn btn-neutral rounded-full btn-wide" type="submit" value={'Submit'} />
                            </div>
                        </form>
                        {emailErr && <span className='text-red-600 pt-2 block'>{emailErr}</span>}
                        <span onClick={handleForgetPassword} className="text-semibold link text-info">Forgot Password</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;