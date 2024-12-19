import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import LoadingComponentsInsidePage from "../../LoadingComponents/LoadingComponentsInsidePage";
import axios from "axios";
import authImage from '../../assets/authImage/Container.webp'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import "react-country-state-city/dist/react-country-state-city.css";
import {
    CountrySelect,
    StateSelect,
} from "react-country-state-city";
import './SignUp.css'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import auth from "../../../firebase.config";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";



const SignUp = () => {
    // Get Data From React Router Loader _______________
    const userData = useLoaderData();
    const navigate = useNavigate();
    const {id} = useParams()
    const roll = userData?.data?.data?.roll;

    // Phone Number Input 
    const [value, setValue] = useState(userData?.data?.data?.phone);
    const [valueErr, setValueErr] = useState('');

    // Country State Select 
    const [countryid, setCountryid] = useState(0);
    const [country, setCountry] = useState(userData?.data?.data?.country);
    const [state, setState] = useState(userData?.data?.data?.state)
    const [countryError, setCountryError] = useState('');
    const [stateError, setStateError] = useState('')



    // Create User IN Firebase __________________________
    const [
        createUserWithEmailAndPassword,
        // user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const [updateProfile, updating, error1] = useUpdateProfile(auth);

    const [loading1, setLoading1] = useState(false)
    const [loadingHandle, setLoadingHandle] = useState(false)
    const [passwordError, setPasswordError] = useState();
    // User Update Form _________________________________
    const { register, handleSubmit, formState: { errors }} = useForm({
        values: {
            userName: userData?.data?.data?.userName, 
            email: userData?.data?.data?.email, 
            first_name: userData?.data?.data?.first_name, 
            last_name: userData?.data?.data?.last_name,
            city: userData?.data?.data?.city,
            postalCode: userData?.data?.data?.postalCode,
            firstLabel: userData?.data?.data?.firstLabel,
            addressLine1: userData?.data?.data?.addressLine1,
            addressLine2: userData?.data?.data?.addressLine2,
        }});
    const onSubmit = async (data) => {
        setLoading1(true)
        setCountryError('')
        setStateError('')
        setPasswordError('')

        if(!value){
            setValueErr('Please Enter your Phone number')
        }
        if(!country){
            setCountryError('Please select your Country')
        }
        if(!state){
            setStateError('Please select your State')
        }

        const formData = {...data, country, state, phone: value}
        axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${id}`, formData)
            .then( async (res) => {
                if(res.status == 200){
                    console.log('yes');
                    if(data.password1 === data.password2){
                        if(data.password1 > 6){
                            setPasswordError('You have to put at least 6 characters in the password');
                            return;
                        }
                        setValue('')
                        return createAccount(data.password1)
                    }else{
                        setPasswordError('Password Not Match')
                    }
                    
                }
            })
            .catch(er => console.log(er)) 
            setLoading1(false)     
    }

    const [emailAndUserGetErr, setEmailAndUserGetErr] = useState();
    const createAccount = async (password) => {
        const date = new Date();
        const openingDate = date.toLocaleDateString();
        const openingTime = date.toLocaleTimeString([], { hour12: true});
        const email = userData?.data?.data?.email;
        const userName = userData?.data?.data?.userName;

        if(email && userName){
            await  createUserWithEmailAndPassword(email, password).then(res => {
                console.log(res);
                const uid = res.user.uid
                const formData = {openingDate, openingTime, uid, password};
                setLoadingHandle(true)
                axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${id}`, formData).then( async res => {
                    const displayName = `${userName}'__'${id}'__'${roll}`
                    if(res.status == 200){
                        setLoadingHandle(false);
                        await updateProfile({ displayName });
                        if(roll === 'User'){
                            localStorage.setItem('popupShown', 'false');
                            navigate('/')
                            setLoading1(false)
                        }
                        if(roll === 'Admin'){
                            navigate('/admin-dashboard')
                            setLoading1(false)
                        }
                    }
                })
            
            }).catch(error => {
                console.log(error);
            })
        }else{
            setEmailAndUserGetErr('Please Refresh the page and try again!')
        }
    }

    // const newUpdate = async () => {
    //     const displayName = `ArrowMusicPrivateLimitedIndia'__'67208ff681efade8917e7bed'__'${roll}`
    //     console.log(displayName);
    //     await updateProfile({ displayName });
    // }

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
                            <h1 className="text-2xl font-bold">Account Setup</h1>
                            <p className="text-sm text-[#64748B]">Enter your information to setup your Account</p>
                            <div className="card-body p-0">
                                <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}} className='pt-6'>
                                    <div>
                                        <p className="text-sm text-[#020617] font-semibold pb-1">User Name</p>
                                        <input style={inputStyle} type="text" className="input-sm w-full input" {...register("userName", { required: true})} readOnly/>
                                    </div>

                                    <div className="pt-3">
                                        <p className="text-sm text-[#020617] font-semibold pb-1">Email</p>
                                        <input style={inputStyle} type="email" className="input-sm w-full input" {...register("email", { required: true})} readOnly/>
                                    </div>

                                    <div className="pt-3 flex justify-between gap-2">
                                        <div>
                                            <p className="text-sm text-[#020617] font-semibold pb-1">First Name</p>
                                            <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="First Name" {...register("first_name", { required: true})}/>
                                            {errors.first_name && <span className='text-red-600 pb-2 block'>Please fill in the First Name</span>}
                                        </div>
                                        <div>
                                            <p className="text-sm text-[#020617] font-semibold pb-1">Last Name</p>
                                            <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Last Name" {...register("last_name", { required: true})}/>
                                            {errors.last_name && <span className='text-red-600 pb-2 block'>Please fill in the Last Name</span>}
                                        </div>
                                    </div>

                                    <div className="pt-3">
                                        <p className="text-sm text-[#020617] font-semibold pb-1">Phone</p>
                                        <PhoneInput
                                            international
                                            style={inputStyle}
                                            placeholder="Enter phone number"
                                            className='input input-sm'
                                            value={value}
                                            onChange={e => setValue(e)}
                                            defaultCountry="IN"
                                        />
                                    </div>
                                    {valueErr && <span className='text-red-600 pt-2 block'>{valueErr}</span>}

                                    <div className="pt-3">
                                        <p className="text-sm text-[#020617] font-semibold pb-1">Label Name</p>
                                        <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Label Name" {...register("firstLabel", { required: true})} readOnly/>
                                        {errors.firstLabel && <span className='text-red-600 pb-2 block'>Please fill in the Label Name</span>}
                                    </div>

                                    <div className="pt-4">
                                        <p className="text-sm text-[#020617] font-semibold pb-1">Address</p>
                                        <div>
                                            <p className="text-sm text-[#020617] font-semibold pb-1">Address Line 1</p>
                                            <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Address Line 1" {...register("addressLine1", { required: true})}/>
                                            {errors.addressLine1 && <span className='text-red-600 pb-2 block'>Please fill in the Address Line 1</span>}
                                        </div>
                                        <div>
                                            <p className="text-sm text-[#020617] font-semibold pb-1 pt-3">Address Line 2</p>
                                            <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Address Line 2" {...register("addressLine2")}/>
                                        </div>

                                        <div className="grid gap-2 grid-cols-2 mt-3">
                                            <div>
                                                <p className="text-sm text-[#020617] font-semibold pb-1">Country</p>
                                                <CountrySelect
                                                    onChange={(e) => {
                                                        setCountryid(e.id);
                                                        const name = e.name;
                                                        const emoji = e.emoji;
                                                        const v = {name, emoji}
                                                        setCountry(v)
                                                    }}
                                                    placeHolder="Select Country"
                                                    defaultValue={userData?.data?.data?.country}
                                                />
                                                {
                                                    countryError && <p className="text-red-600 pb-2">{countryError}</p>
                                                }
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#020617] font-semibold pb-1">State</p>
                                                <StateSelect
                                                    countryid={countryid}
                                                    onChange={(e) => {
                                                        setState(e)
                                                    }}
                                                    placeHolder="Select State"
                                                    defaultValue={userData?.data?.data?.state}
                                                />
                                                {
                                                    stateError && <p className="text-red-600 pb-2">{stateError}</p>
                                                }
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#020617] font-semibold pb-1">City</p>
                                                <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Enter City Name" {...register("city", { required: true})}/>
                                                {errors.city && <span className='text-red-600 pb-2 block'>Please fill in the City Name</span>}
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#020617] font-semibold pb-1">Postal Code</p>
                                                <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Enter Code Here" {...register("postalCode", { required: true})}/>
                                                {errors.postalCode && <span className='text-red-600 pb-2 block'>Please fill in the Postal Code</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <p className="text-sm text-[#020617] font-semibold pb-1">Password</p>
                                        <div className="relative">
                                            <input style={inputStyle} type={inputType1} className="input-sm w-full input" {...register("password1", { required: true})}/>
                                            {
                                                inputType1 === 'password' ? <EyeSlashIcon onClick={passwordTypeHandle1} className="h-5 w-5 absolute top-2 right-4"/> : <EyeIcon onClick={passwordTypeHandle1} className="h-5 w-5 absolute top-2 right-4"/>
                                            }
                                            {errors.password1 && <span className='text-red-600 pt-1 block'>Please Set Password</span>}
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
                                            loading1 && <LoadingComponentsInsidePage/>
                                        }
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
                                        {
                                            emailAndUserGetErr && <span className='text-red-600 pb-2 block font-bold'>{emailAndUserGetErr}</span>
                                        }
                                    </div>
                                    <div className="flex justify-center py-5">
                                        {
                                            !userData?.data ? <input className="btn btn-md btn-neutral w-full bg-[#0F172A]" type="submit" value={'Finish Setup'} disabled/>: <input className="btn btn-md btn-neutral w-full bg-[#0F172A]" type="submit" value={'Finish Setup'} />
                                        }
                                         
                                    </div>
                                    <p>Finish your setup to upload your first Track</p>


                                </form>
                                    {/* <button onClick={newUpdate}>New Update</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 hidden md:block">
                    <img className="" style={{width: 'auto', height: '1100px'}}  src={authImage} alt='log/sign up image' />
                </div>
            </div>
        </div>
    );
};

export default SignUp;