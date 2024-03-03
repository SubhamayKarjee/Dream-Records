import { BellIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";

const UserProfile = () => {

    const {user, userNameIdRoll, mainProfileImage} = useContext(AuthContext)

    // const userName = user.displayName.split("'__'")[0]

    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r p-2'>
                <div className='flex p-2 rounded-md bg-gradient-to-r from-[#EF4136] to-[#fff]'>
                    <div className="avatar me-2">
                        <div className="w-16 rounded-md">
                            {
                                mainProfileImage ? <img className="bg-slate-200" src={mainProfileImage} alt="Profile Img" /> : <img className="bg-slate-200" src={user.photoURL} alt="Profile Img" />
                            }
                            
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">{userNameIdRoll[0]}</h1>
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