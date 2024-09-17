import { EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import LoadingComponentsInsidePage from "../../LoadingComponents/LoadingComponentsInsidePage";
import auth from '../../../firebase.config';
import {confirmPasswordReset} from 'firebase/auth'
import { useLocation, useNavigate } from "react-router-dom";

const SetNewPassword = () => {
    const navigate = useNavigate()


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');


    const [resetPassSucessDiv, setResetPassSucessDiv] = useState(false)
    const [passwordError, setPasswordError] = useState();
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = async (data) => {
        setLoading(true)
        setPasswordError('');
        const pass1 = data.password1;
        const pass2 = data.password2;

        if(pass1 !== pass2){
            setPasswordError('Password Not Matched');
            setLoading(false)
            return;
        }

        const newPassword = pass1;
        await confirmPasswordReset(auth, oobCode, newPassword)
        .then(response => {
            console.log('res', response)
            setResetPassSucessDiv(true)
        })
        .catch(err => console.log('err', err.message))
        setLoading(false)
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
        <div className="h-screen flex justify-center items-center">
            <div className="border shadow-sm p-4 rounded-md">
                <div className="flex justify-center items-center pt-3 pb-2">
                    <LockClosedIcon className="h-12 w-12 text-white bg-[#252525] p-3 rounded-full"/>
                </div>

                {
                    resetPassSucessDiv === false ? 
                    <>
                        <h1 className="text-2xl font-bold text-center">Enter your new password</h1>
                        <p className="text-sm text-[#64748B] text-center">Your new password must be different to your previous password</p>

                        <form onSubmit={handleSubmit(onSubmit)} className='pt-4'>
                                            
                            <div>
                                <p className="text-sm text-[#020617] font-semibold pb-1">New Password</p>
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

                            {passwordError && <span className='text-red-600 pb-2 block font-bold'>{passwordError}</span>}
                            {errors.password2 && <span className='text-red-600 pb-2 block'>Please Confirm Password</span>}

                            <div>
                                {
                                    loading && <LoadingComponentsInsidePage/>
                                }
                            </div>
                            <input className="btn btn-neutral bg-[#0F172A] w-full mt-3" type="submit" value={'Change Password'} />
                        </form>
                    </> :
                    <>
                        <h1 className="text-2xl font-bold text-center">Password changed Successfully!</h1>
                        <p className="text-sm text-[#64748B] text-center">Your new password has been successfully updated</p>
                        <button onClick={() => navigate('/log-in')} className="btn btn-neutral bg-[#0F172A] w-full mt-3">Log In</button>
                    </>
                }

            </div>
        </div>
    );
};

export default SetNewPassword;