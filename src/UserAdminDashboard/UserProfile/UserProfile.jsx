import { Image } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import fallbackImage from '../../assets/fallbackImage/commonDefaultImage.png'
import axios from "axios";
import { ArrowUpTrayIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useSignOut } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {

    const {user, userNameIdRoll, mainProfileImage} = useContext(AuthContext)

    const [signOut] = useSignOut(auth);
    const navigate = useNavigate();

    const [userData, setUserData] = useState()
    useEffect(() => {
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${userNameIdRoll[1]}`)
            .then(res => {
                setUserData(res.data.data)
            })
    },[userNameIdRoll]);


    const handleLogOut = () => {
        signOut();
        navigate('/log-in')
    }



    return (
        <div className="md:h-full">
            <div className='md:h-full overflow-y-auto md:border-r px-3 md:pt-16 custom-scrollbar'>
                <h3 className='font-semibold text-xl pb-2 text-[#252525]'>My Account</h3>
                <div className="p-5 rounded-lg border">
                    <div className='flex items-center'>
                        <div className="avatar me-2">
                            <div className="w-100 rounded-full">
                                {
                                    mainProfileImage ? <Image
                                        width={100}
                                        height={100}
                                        className="rounded-full bg-slate-100"
                                        src={mainProfileImage}
                                        fallback={fallbackImage}
                                        preview={false}
                                        alt="profile-image"
                                    /> : <Image
                                            width={100}
                                            height={100}
                                            className="rounded-full bg-slate-100"
                                            src={user.photoURL}
                                            fallback={fallbackImage}
                                            preview={false}
                                            alt="profile-image"
                                        /> 
                                }
                                
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{userData?.first_name} {userData?.last_name} </h2>
                            <p className="">User Name: {userData?.userName}</p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <div className="flex justify-between items-center">
                            <h4 className='font-semibold text-lg pb-2 text-[#252525]'>Personal Information</h4>
                            <span style={{cursor: 'pointer'}} onClick={() => navigate(`/edit-profile/${userData._id}`)} className="text-sm flex items-center border px-3 pt-1 font-semibold rounded-md">Edit <PencilSquareIcon className="w-4 h-4 ms-1"/></span>
                        </div>
                        <div>
                            <div className="md:flex items-center">
                                <div className="flex-1">
                                    <p className="text-sm text-[#768298]">First Name</p>
                                    <p className="font-semibold text-base">{userData?.first_name}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-[#768298]">Last Name</p>
                                    <p className="font-semibold text-base">{userData?.last_name}</p>
                                </div>
                            </div>

                            <div className="pt-2">
                                <p className="text-sm text-[#768298]">Phone Number</p>
                                <p className="font-semibold text-base">{userData?.phone}</p>
                            </div>

                            <h4 className='font-semibold text-xl pt-4 pb-2 text-[#252525]'>Address</h4>

                            <div className="grid grid-cols-1">
                                {
                                    userData?.addressLine1 && 
                                    <div className="pb-2">
                                        <p className="text-sm text-[#768298]">Address Line 1</p>
                                        <p className="font-semibold text-base">{userData?.addressLine1}</p>
                                    </div>
                                }
                                {
                                    userData?.addressLine2 && 
                                    <div className="pb-2"> 
                                        <p className="text-sm text-[#768298]">Address Line 2</p>
                                        <p className="font-semibold text-base">{userData?.addressLine2}</p>
                                    </div>
                                }
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="">
                                    <p className="text-sm text-[#768298]">Country</p>
                                    <p className="font-semibold text-base">{userData?.country?.name}</p>
                                </div>
                                <div className="">
                                    <p className="text-sm text-[#768298]">State</p>
                                    <p className="font-semibold text-base">{userData?.state?.name}</p>
                                </div>
                                <div className="">
                                    <p className="text-sm text-[#768298]">City</p>
                                    <p className="font-semibold text-base">{userData?.city}</p>
                                </div>
                                <div className="">
                                    <p className="text-sm text-[#768298]">Postal Code</p>
                                    <p className="font-semibold text-base">{userData?.postalCode}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-5 rounded-lg border mt-3">
                    <div className="">
                        <h4 className='font-semibold text-lg pb-2 text-[#252525]'>Login & Security</h4>

                        <div>
                            <div className="md:flex items-center">
                                <div className="flex-1">
                                    <p className="text-sm text-[#768298]">Email</p>
                                    <div className="md:flex justify-between">
                                        <p className="font-semibold text-base">{user.email}</p>
                                        <span style={{cursor: 'pointer'}} onClick={() => navigate('/email-update')} className="text-sm flex items-center border px-3 pt-1 font-semibold rounded-md md:me-4">Change Email <PencilSquareIcon className="w-4 h-4 ms-1"/></span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-[#768298] pt-4 md:pt-0">Password</p>
                                    <div className="md:flex justify-between">
                                        <p className="font-semibold text-base">***********</p>
                                        <span style={{cursor: 'pointer'}} onClick={() => navigate('/password-update')} className="text-sm flex items-center border px-3 pt-1 font-semibold rounded-md">Change Password <PencilSquareIcon className="w-4 h-4 ms-1"/></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" mt-4">
                    <button onClick={handleLogOut} className="btn btn-neutral py-1 rounded-md btn-sm border-none flex items-center"> <ArrowUpTrayIcon className="w-4 h-4"/>Log Out</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;