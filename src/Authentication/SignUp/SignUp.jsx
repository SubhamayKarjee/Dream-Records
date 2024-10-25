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

const SignUp = () => {
    // Get Data From React Router Loader _______________
    const userData = useLoaderData();
    const navigate = useNavigate();
    const {id} = useParams()

    // Phone Number Input 
    const [value, setValue] = useState(userData?.data?.data?.phone);
    const [valueErr, setValueErr] = useState('');

    // Country State Select 
    const [countryid, setCountryid] = useState(0);
    const [country, setCountry] = useState(userData?.data?.data?.country);
    const [state, setState] = useState(userData?.data?.data?.state)
    const [countryError, setCountryError] = useState('');
    const [stateError, setStateError] = useState('')




    const [loading, setLoading] = useState(false)
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
        setLoading(true)
        setValue('')
        setCountryError('')
        setStateError('')

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
            .then(res => {
                if(res.status == 200){
                    navigate(`/set-password/${id}`);
                    setLoading(false)
                }
            })
            .catch(er => console.log(er)) 
            setLoading(false)
                
     
    }

    const inputStyle ={
        height: '36px',
        border: '1px solid #E2E8F0'
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
                                            <p className="text-sm text-[#020617] font-semibold pb-1">Address Line 1 *</p>
                                            <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Last Name" {...register("addressLine1", { required: true})}/>
                                            {errors.addressLine1 && <span className='text-red-600 pb-2 block'>Please fill in the Address Line 1</span>}
                                        </div>
                                        <div>
                                            <p className="text-sm text-[#020617] font-semibold pb-1 pt-3">Address Line 2</p>
                                            <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Last Name" {...register("addressLine2")}/>
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
                                    <div>
                                        {
                                            loading && <LoadingComponentsInsidePage/>
                                        }
                                    </div>
                                    <div className="flex justify-center py-5">
                                         <input className="btn btn-md btn-neutral w-full bg-[#0F172A]" type="submit" value={'Finish Setup'} />
                                    </div>
                                    <p>Finish your setup to upload your first Track</p>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 hidden md:block">
                    <img className="" style={{width: 'auto', height: '1024px'}}  src={authImage} alt='log/sign up image' />
                </div>
            </div>
        </div>
    );
};

export default SignUp;