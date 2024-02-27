import { AtSymbolIcon, ClipboardDocumentListIcon, ExclamationCircleIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const ProfileHomeComponents = () => {
    return (
        <div className="py-2 mt-4">
            <Link className="block py-2 px-2 font-semibold flex items-center  text-[#595959] hover:bg-slate-100 rounded-md" to={'/account/update-profile-information'}><ClipboardDocumentListIcon className="w-5 h-5 me-2 text-[#595959]"/>Update Profile Information</Link>
            <Link className="block py-2 px-2 font-semibold flex items-center  text-[#595959] hover:bg-slate-100 rounded-md" to={'/account/change-password'}><LockClosedIcon className="w-5 h-5 me-2 text-[#595959]"/>Change Password</Link>
            <Link className="block py-2 px-2 font-semibold flex items-center  text-[#595959] hover:bg-slate-100 rounded-md" to={'/account/change-email'}><AtSymbolIcon className="w-5 h-5 me-2 text-[#595959]"/>Change Email</Link>
            <Link className="block py-2 px-2 font-semibold flex items-center  text-[#595959] hover:bg-slate-100 rounded-md" to={'/account/youtube-oac-request'}>
                <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 256 180"><path fill="#595959" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"/><path fill="#fff" d="m102.421 128.06l66.328-38.418l-66.328-38.418z"/></svg>
                Youtube OAC Request
            </Link>
            <Link className="block py-2 px-2 font-semibold flex items-center  text-[#595959] hover:bg-slate-100 rounded-md" to={'/account/youtube-claim-release'}><ExclamationCircleIcon className="w-5 h-5 me-2 text-[#595959]"/>Claim Release</Link>

            <div className="flex justify-end me-4 mt-4">
                <button className="btn btn-neutral py-1 rounded-full btn-sm border-none">Log Out</button>
            </div>
        </div>
    );
};

export default ProfileHomeComponents;