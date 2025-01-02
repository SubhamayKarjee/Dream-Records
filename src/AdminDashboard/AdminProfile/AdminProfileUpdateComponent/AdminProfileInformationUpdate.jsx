import { Image } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { useLoaderData, useNavigate } from "react-router-dom";
import auth from "../../../../firebase.config";
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";
import { AdminAuthContext } from "../../DashboardForAdmin/DashBoardForAdmin";
import fallbackImage from '../../../assets/fallbackImage/commonDefaultImage.png';
import './AdminProfileUpdate.css';
import 'react-phone-number-input/style.css'
import "react-country-state-city/dist/react-country-state-city.css";

const AdminProfileInformationUpdate = () => {

    const userData = useLoaderData();
    const navigate = useNavigate();

    // Get And Set Data Using Context API ________________________________________
    const {user, userNameIdRoll, uploadedProfileImg, setUploadedProfileImg, setMainProfileImage } = useContext(AdminAuthContext);

    const [errorMessage, setErrorMessage] = useState('');
    const [upLoadLoading, setUploadLoading] = useState(false);
    const [imageData, setImageData] = useState()
    // Upload Profile Image Function _____________________________________________
    const handleImageChange = (e) => {
        setUploadLoading(true)
        const file = e[0];
        const formData = new FormData();
        formData.append('file', file);

        // Check image size ___________________________________
        if (file.size > 1000000) {
            setErrorMessage('Image size must be less than 1 MB.');
            setUploadLoading(false)
        return;
        }

        axios.post('https://shark-app-65c5t.ondigitalocean.app/api/v1/users/upload-profile-img', formData)
            .then(res => {
                if(res.status == 200){
                    setUploadedProfileImg(res.data.data.imgUrl);
                    setImageData(res.data.data)
                    setUploadLoading(false)
                }
            })
            .catch(er => console.log(er))
    };

    // Phone Number Input 
    const [value, setValue] = useState(userData?.data?.data?.phone);
    const [valueErr, setValueErr] = useState('');

    // Country State Select 
    const [countryid, setCountryid] = useState(0);
    const [country, setCountry] = useState(userData?.data?.data?.country);
    const [state, setState] = useState(userData?.data?.data?.state)
    const [countryError, setCountryError] = useState('');
    const [stateError, setStateError] = useState('')

    const [updateLoading, setUpdateLoading] = useState(false)

    const [updateProfile] = useUpdateProfile(auth);
    // React Hook Form Submit Function For Create User _________________________
    const { register, handleSubmit, formState: { errors }} = useForm({
        values: {
            userName: userData?.data?.data?.userName, 
            email: userData?.data?.data?.email, 
            first_name: userData?.data?.data?.first_name, 
            last_name: userData?.data?.data?.last_name,
            city: userData?.data?.data?.city,
            postalCode: userData?.data?.data?.postalCode,
            addressLine1: userData?.data?.data?.addressLine1,
            addressLine2: userData?.data?.data?.addressLine2
        }});
    const onSubmit = async (data) => {
        setUpdateLoading(true)
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
        
        let photoURL;
        let imgKey;
        if(imageData){
            photoURL = imageData.imgUrl;
            imgKey = imageData.key;
        }
        if(!imageData && user.photoURL){
            photoURL = user.photoURL;
            let forKey = user.photoURL.split("/");
            imgKey = `${forKey[3]}/${forKey[4]}`
        }
        if(!imageData && !user.photoURL){
            photoURL = user.photoURL;
            imgKey = '';
        }

        const formData = {...data, photoURL, imgKey, phone: value, country, state}
        
        const success = await updateProfile({ photoURL });

        if(success){
           axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${userNameIdRoll[1]}`, formData)
            .then(res => {
                if(res.status == 200){
                    setMainProfileImage(res.data.data.photoURL)
                    setUpdateLoading(false)
                    toast.success('Successfully Updated Your Profile Information!')
                    navigate('/account')
                    
                }
            })
            .catch(er => console.log(er)) 
        }
    
    };

    const inputStyle ={
        height: '36px',
        border: '1px solid #E2E8F0'
    }

    return (
        <div className="md:h-full overflow-y-auto p-2 md:pt-6 custom-scrollbar">
            <h3 className='font-semibold text-xl pb-2 text-[#252525]'>Edit Personal Info</h3>
            <div className="p-5 rounded-lg border">
                <div className="">
                    <div className="flex items-center gap-2">
                        <Image
                            width={100}
                            height={100}
                            className="rounded-full"
                            src={uploadedProfileImg}
                            fallback={fallbackImage}
                            preview={false}
                            alt="profile-image"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">{userData?.data?.data?.first_name} {userData?.data?.data?.last_name} </h2>
                            <p className="">User Name: {userData.data?.data?.userName}</p>
                            <p className="">User Roll: {userData.data?.data?.roll}</p>
                        </div>
                    </div>
                    <p className="text-sm font-semibold text-[#09090B] mt-2">Change Profile Picture</p>
                    <div className="flex items-center ">
                        {
                            upLoadLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                        }
                        <input type="file" accept="image/*" id="fileInput" name='image' onChange={e => handleImageChange(e.target.files)} />
                    </div>
                    {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}

                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4 className='font-semibold text-lg pb-2 text-[#252525] mt-4'>Personal Information</h4>
                    <div className="">
                        <div className="md:flex items-center gap-2">
                            <div className="flex-1">
                                <p className="text-sm text-[#768298]">First Name</p>
                                <input style={inputStyle} type="text" className="input w-full" {...register("first_name", { required: true})}/>
                                {errors.first_name && <span className='text-red-600 pt-2 block'>First Name Required</span>}
                            </div>
                            <div className="flex-1 pt-2 md:pt-0">
                                <p className="text-sm text-[#768298]">Last Name</p>
                                <input style={inputStyle} type="text" className="input w-full" {...register("last_name", { required: true})}/>
                                {errors.last_name && <span className='text-red-600 pt-2 block'>Last Name Required</span>}
                            </div>
                        </div>

                        <div className="pt-3 md:w-[50%]">
                            <p className="text-sm text-[#020617] font-semibold pb-1">Phone</p>
                            <PhoneInputWithCountrySelect
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

                        <div className="pt-4">
                            <p className="text-sm text-[#020617] font-semibold pb-1">Address</p>

                            <div className="">
                                <p className="text-sm text-[#768298]">Address Line 1</p>
                                <input style={inputStyle} type="text" className="input w-full" {...register("addressLine1", { required: true})}/>
                                {errors.first_name && <span className='text-red-600 pt-2 block'>First Name Required</span>}
                            </div>
                            <div className="py-2">
                                <p className="text-sm text-[#768298]">Address Line 2</p>
                                <input style={inputStyle} type="text" className="input w-full" {...register("addressLine2")}/>
                                {errors.last_name && <span className='text-red-600 pt-2 block'>Last Name Required</span>}
                            </div>

                            <div className="grid gap-2 grid-cols-2">
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
                                        defaultValue={country}
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
                                        defaultValue={state}
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
                    </div>
                    <div className="flex items center gap-2">
                        {
                            updateLoading && <LoadingComponentsInsidePage/>
                        }
                        <input type="submit" value={'Update Profile Information'} className="btn btn-sm btn-neutral my-4 rounded-md bg-[#0F172A]" />
                    </div>                                       
                </form>
            </div>
        </div>
    );
};

export default AdminProfileInformationUpdate;