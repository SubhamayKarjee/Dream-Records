import { BellIcon } from "@heroicons/react/24/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
import LoadingComponentsInsidePage from "../../LoadingComponents/LoadingComponentsInsidePage";

const UserProfile = () => {

    const [user, loading] = useAuthState(auth);
    if(loading){
        return <LoadingComponentsInsidePage/>
    }
    console.log(user);
    const userName = user.displayName.split("'__'")[0]

    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r p-2'>
                <div className='flex p-2 rounded-md bg-gradient-to-r from-[#EF4136] to-[#fff]'>
                    <div className="avatar me-2">
                        <div className="w-16 rounded-md">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Tailwind-CSS-Avatar-component" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">{userName}</h1>
                        <p className="text-sm font-semibold">{user.email}</p>
                    </div>
                </div>
            </div>

            {/* Blog Post Div  _______________________________*/}
            <div className="p-2 md:basis-1/4">
                <h4 className='flex items-center font-bold text-lg text-slate-500 border-b'> <BellIcon className='w-6 h-6 me-2 text-slate-500'/> Notification</h4>
            </div>
        </div>
    );
};

export default UserProfile;