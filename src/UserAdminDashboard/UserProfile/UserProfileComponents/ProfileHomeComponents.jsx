import { AtSymbolIcon, ClipboardDocumentListIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useSignOut } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../../firebase.config";

const ProfileHomeComponents = () => {

    const [signOut] = useSignOut(auth);
    const navigate = useNavigate();

    const handleLogOut = () => {
        signOut();
        navigate('/log-in')
    }


    return (
        <div className="py-2 mt-4">
            <Link className="block py-2 px-2 font-semibold flex items-center  text-[#595959] hover:bg-slate-100 rounded-md" to={'/account/update-profile-information'}><ClipboardDocumentListIcon className="w-5 h-5 me-2 text-[#595959]"/>Update Profile Information</Link>
            <Link className="block py-2 px-2 font-semibold flex items-center  text-[#595959] hover:bg-slate-100 rounded-md" to={'/account/change-password'}><LockClosedIcon className="w-5 h-5 me-2 text-[#595959]"/>Change Password</Link>
            <Link className="block py-2 px-2 font-semibold flex items-center  text-[#595959] hover:bg-slate-100 rounded-md" to={'/account/change-email'}><AtSymbolIcon className="w-5 h-5 me-2 text-[#595959]"/>Change Email</Link>
            <div className="flex justify-end me-4 mt-4">
                <button onClick={handleLogOut} className="btn btn-neutral py-1 rounded-full btn-sm border-none">Log Out</button>
            </div>
        </div>
    );
};

export default ProfileHomeComponents;