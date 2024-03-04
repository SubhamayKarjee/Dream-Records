// /* eslint-disable no-unused-vars */
import {  ChevronLeftIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import auth from "../../../../firebase.config";
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";
import { AuthContext } from "../../UserAdminHomePage/UserAdminHomePage";
import './UserProfile.css'

const UpdateProfileInformation = () => {
    // Get And Set Data Using Context API ________________________________________
    const {user, userNameIdRoll, uploadedProfileImg, setUploadedProfileImg, setMainProfileImage } = useContext(AuthContext);


    const [userData, setUserData] = useState({});
    const [getUserDataLoading, setGetUserDataLoading] = useState(false)
    // Fetch User Data ___________________________________________________________
    const [firstNameHandle, setFirstNameHandle] = useState();
    const [lastNameHandle, setLastNameHandle] = useState();
    const [addressHandle, setAddressHandle] = useState();
    useEffect( () => {
        setGetUserDataLoading(true)
        axios.get(`http://localhost:5000/api/v1/users/${userNameIdRoll[1]}`)
            .then( res => {
                setFirstNameHandle(res.data.data.first_name)
                setLastNameHandle(res.data.data.last_name)
                setAddressHandle(res.data.data.address)

                setUserData(res.data.data)
                setUploadedProfileImg(user.photoURL)
                setGetUserDataLoading(false)
                console.log(res.data.data);
            })
            .catch(er => console.log(er));
    },[])



    const [errorMessage, setErrorMessage] = useState('');
    const [upLoadLoading, setUploadLoading] = useState(false)
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
        return;
        }

        axios.post('http://localhost:5000/api/v1/users/upload-profile-img', formData)
            .then(res => {
                if(res.status == 200){
                    setUploadedProfileImg(res.data.data.imgUrl);
                    setImageData(res.data.data)
                    setUploadLoading(false)
                }
            })
            .catch(er => console.log(er))
    };


    const [updateProfile, updating, error] = useUpdateProfile(auth);

    const [udateLoading, setUpdateLoading] = useState(false)
    // React Hook Form Submit Function For Create User _________________________
    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = async (data) => {
        setUpdateLoading(true)
        let first_name;
        let last_name;
        let address;
        if(data.preName){
            first_name = data.preName;
        }
        if(data.newName){
            first_name = data.newName
        }

        if(data.preLast){
            last_name = data.preLast
        }
        if(data.newLast){
            last_name = data.newLast
        }

        if(data.preAdd){
            address = data.preAdd
        }
        if(data.newLast){
            address = data.newAdd
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
            console.log(imgKey);
        }
        if(!imageData && !user.photoURL){
            photoURL = user.photoURL;
            imgKey = '';
        }

        const name = data.nick_name;
        const formData = {first_name, last_name, address, photoURL, imgKey, name}
        

        // // setMainProfileImage
        const displayName = `${data.nick_name}'__'${userNameIdRoll[1]}'__'${userNameIdRoll[2]}`;
        const success = await updateProfile({ displayName, photoURL });

        if(success){
           axios.put(`http://localhost:5000/api/v1/users/${userNameIdRoll[1]}`, formData)
            .then(res => {
                setUserData(res.data.data);
                setMainProfileImage(res.data.data.photoURL)
                setUpdateLoading(false)
                alert('Updated')
            })
            .catch(er => console.log(er)) 
        }
    
    };


    if(getUserDataLoading){
        return <LoadingComponentsInsidePage/>
    }

    return (
        <div>
            <div className="my-4">
                <button><Link className="px-2 py-1 font-semibold text-sm text-slate-500 flex items-center inline bg-slate-200 rounded-md" to={'/account'}><ChevronLeftIcon className="w-4 h-4 me-1 font-bold"/>Back</Link></button>
            </div>
            <div>
                <div className="border rounded-lg p-2">

                    <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Upload/Change Profile Image</p>
                    <img className="h-16 w-16 my-2 rounded-full bg-slate-300" src={uploadedProfileImg} alt="" />
                    <div className="flex items-center ">
                        {
                            upLoadLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                        }
                        <input type="file" accept="image/*" id="fileInput" name='image' onChange={e => handleImageChange(e.target.files)} />
                    </div>
                    {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}

                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap gap-2 md:flex-nowrap justify-between items-center">
                        <div className="flex-1">
                            <p className="my-1 text-sm font-semibold text-slate-500 ms-2">First Name</p>
                            {
                                firstNameHandle && <input type="text" defaultValue={firstNameHandle} className="input rounded-full input-bordered w-full" {...register("preName")}/>
                            }
                            {
                                !firstNameHandle && <input type="text" className="input rounded-full input-bordered w-full" {...register("newName")}/>
                            }
                        </div>
                        
                        <div className="flex-1">
                            <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Last Name</p>
                            {
                                lastNameHandle && <input type="text" defaultValue={userData.last_name} className="input rounded-full input-bordered w-full" {...register("preLast")}/>
                            }
                            {
                                !lastNameHandle && <input type="text" className="input rounded-full input-bordered w-full" {...register("newLast")}/>
                            }
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Display Name/Nick Name</p>
                        <input type="text" defaultValue={userNameIdRoll[0]} className="input rounded-full input-bordered w-full" {...register("nick_name", { required: true})}/>
                        {errors.nick_name && <span className='text-red-600 pt-2 block'>Nick/Display Name Required</span>}

                        <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Address</p>
                        {
                            addressHandle && <input type="text" defaultValue={userData.address} className="input rounded-full input-bordered w-full" {...register("preAdd")}/> 
                        }
                        {
                            !addressHandle && <input type="text" className="input rounded-full input-bordered w-full" {...register("newAdd")}/> 
                        }
                    </div>   
                    {
                        error && <span className='text-red-600 pt-2 block'>{error.message}</span>
                    }
                    {
                        udateLoading || updating && <span className="block loading loading-spinner loading-md me-2"></span>
                    }
                    
                    <div className="flex items-center my-4">
                        {
                            udateLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                        }
                        <input type="submit" value={'Update'} className="btn btn-sm my-4 px-6 btn-accent rounded-full" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileInformation;