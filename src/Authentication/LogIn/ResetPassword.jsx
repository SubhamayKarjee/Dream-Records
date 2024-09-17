import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import auth from "../../../firebase.config";
import LoadingComponentsInsidePage from "../../LoadingComponents/LoadingComponentsInsidePage";

const ResetPassword = () => {

    const navigate = useNavigate()

    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

    const [loading, setLoading] = useState(false);
    const [emaliErr, setEmailErr] = useState();
    const [sendEmailDiv, setSendEmailDiv] = useState(false)
    // User Update Form _________________________________
    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = async (data) => {
        setLoading(true)
        const email = data.email
        sendPasswordResetEmail(email)
        .then((res) => {
            console.log(res);
            setSendEmailDiv(true)
        })
        .catch(err => {
            console.log(err);
            setEmailErr(err)
        })
        setLoading(false)   
    }

    const inputStyle ={
        height: '36px',
        border: '1px solid #E2E8F0'
    }


    return (
        <div className="h-screen flex justify-center items-center">
            <div className="border shadow-sm p-4 rounded-md">
                <div className="flex justify-center items-center pt-3 pb-2">
                    <LockClosedIcon className="h-12 w-12 text-white bg-[#252525] p-3 rounded-full"/>
                </div>
                {
                    sendEmailDiv === false ?
                    <>
                        <h1 className="text-2xl font-bold text-center">Reset Your Password</h1>
                        <p className="text-sm text-[#64748B] text-center">Enter the email address you used to register with</p>
                        <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}} className='pt-4'>
                                        
                            <div className="pt-3">
                                <p className="text-sm text-[#020617] font-semibold pb-1">Email</p>
                                <input style={inputStyle} type="email" className="input-sm w-full input" placeholder="m@example.com" {...register("email", { required: true})}/>
                                {errors.email && <span className='text-red-600 pb-2 block'>Please enter your email</span>}
                                {
                                    emaliErr && <span className='text-red-600 pb-2 block'>{emaliErr}</span>
                                }
                            </div>
                                        
                            <div>
                                {
                                    loading && <LoadingComponentsInsidePage/>
                                }
                            </div>
                            <div className="flex justify-between py-5 gap-2">
                                <button onClick={() => navigate('/log-in')} className="btn btn-sm flex-1">Back to sign in</button>
                                <input className="btn btn-sm btn-neutral bg-[#0F172A] flex-1" type="submit" value={'Send Instructions'} />
                            </div>
                        </form>
                    </> : 
                    <>
                        <h1 className="text-2xl font-bold text-center">Check your email !</h1>
                        <p className="text-sm text-[#64748B] text-center">We have sent you a link to reset your password</p>
                        <button onClick={() => navigate('/log-in')} className="btn  btn-neutral bg-[#0F172A] my-4 w-full">Got it</button>
                    </>
                }
            </div>
        </div>
    );
};

export default ResetPassword;