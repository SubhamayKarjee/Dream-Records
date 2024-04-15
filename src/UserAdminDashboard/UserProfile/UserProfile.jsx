import { BellIcon } from "@heroicons/react/24/solid";
import { Image } from "antd";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import fallbackImage from '../../assets/userImage.webp'

const UserProfile = () => {

    const {user, userNameIdRoll, mainProfileImage} = useContext(AuthContext)


    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r p-2'>
                <div className='flex p-2 rounded-md bg-[#EF4136]'>
                    <div className="avatar me-2">
                        <div className="w-16 rounded-md">
                            {
                                mainProfileImage ? <Image
                                    width={65}
                                    height={65}
                                    className="rounded-md bg-slate-100"
                                    src={mainProfileImage}
                                    fallback={fallbackImage}
                                    preview={false}
                                    alt="profile-image"
                                /> : <Image
                                        width={65}
                                        height={65}
                                        className="rounded-md bg-slate-100"
                                        src={user.photoURL}
                                        fallback={fallbackImage}
                                        preview={false}
                                        alt="profile-image"
                                    /> 
                            }
                            
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">{userNameIdRoll[0]}</h1>
                        <p className="text-sm text-white">ID: {userNameIdRoll[1]}</p>
                        <p className="text-sm text-white">{user.email}</p>
                    </div>
                </div>
                <div>
                    <Outlet/>
                </div>
            </div>

            {/* Blog Post Div  _______________________________*/}
            <div className="md:basis-1/4">
                <div className='p-2 border-b'>
                    <h4 className='flex items-center font-bold text-lg text-slate-500'> <BellIcon className='w-6 h-6 me-2 text-slate-500'/> Notification</h4>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;