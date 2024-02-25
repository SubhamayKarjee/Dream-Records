import './UserAdminHomePage.css'
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/logo/Dream-Records Logo-(Light).png';
import { 
    HomeIcon, 
    Bars3BottomLeftIcon,
    DocumentCheckIcon,
    UserGroupIcon,
    UsersIcon,
    ChartPieIcon,
    UserCircleIcon,
    ClipboardDocumentListIcon,
 } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { Drawer } from 'antd';
import CreateUserForm from '../../AdminDashboard/DashboardForAdmin/CreateUserForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.config';
import LoadingComponentsForPage from '../../LoadingComponents/LoadingComponentsForPage';

const UserAdminHomePage = () => {
    const [user, loading] = useAuthState(auth);
   

    // Mobile Navigation Humbergo ______________________
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    if(loading){
        return <LoadingComponentsForPage/>
    }
    const userData = user.displayName.split("'__'");
    console.log(userData);

    return (
        <section className='md:h-screen bg-slate-950'>
            <div className='xl:max-w-[1300px] lg:max-w-[96%] md:max-w-[96%] sm:max-w-[100%] w-[100%] mx-auto'>
                <div className="md:grid md:gap-4 grid-cols-5 md:py-4 md:h-screen">
                    <div className="pt-4 hidden md:block h-full overflow-y-auto">
                        <div className="avatar">
                            <div className="w-32">
                                <img src={logo} />
                            </div>
                        </div>
                        <h1 className='text-xl font-extrabold text-white'>Hi, {userData[0]}</h1>
                        <p className='text-white text-sm'>Welcome to Dream Records. You are now a member of Dream Records</p>
                        <div className='py-4'>
                            <button onClick={()=>document.getElementById('create_user_modal').showModal()} style={{width: '90%'}} className='btn-sm border-none rounded-full text-slate-950 md:text-sm lg:text-lg font-semibold bg-gradient-to-r from-[#EF4136] to-[#fff]'>
                               + Create
                            </button>
                            {/* Open Modal For Create User Start __________________________________________________________________________ */}
                            <dialog id="create_user_modal" className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">                                    
                                    {/* User Form Components _________________________ */}
                                    <CreateUserForm/>
                                </div>
                            </dialog>
                             {/* __________________________________________________________________________________________________________ */}
                            {/* Admin All Nav Link ________________________________________________________________________________________ */}
                            <div className='mt-2 py-2'> 
                                <Link className='text-white flex items-center py-2' to={'/'}>
                                    <HomeIcon className="h-7 w-7 pe-2" />
                                    Home
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/'}>
                                    <DocumentCheckIcon className="h-7 w-7 pe-2" />
                                    Releases
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/'}>
                                    <UsersIcon className="h-7 w-7 pe-2" />
                                    Artists
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/'}>
                                    <UserGroupIcon className="h-7 w-7 pe-2" />    
                                    Labels
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/'}>
                                    <ChartPieIcon className="h-7 w-7 pe-2" />
                                    Statistics
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/'}>
                                    <ClipboardDocumentListIcon className="h-7 w-7 pe-2" />
                                    Blog
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/account'}>
                                    <UserCircleIcon className="h-7 w-7 pe-2" />
                                    Account
                                </Link>
                            </div>
                        </div>
                    </div>
                     {/* __________________________________________________________________________________________________________ */}
                    <div className="bg-white col-span-4 p-2 md:p-4 md:rounded-lg h-full overflow-hidden">
                        {/* Admin Profile image right Side ________________________________________________________________________ */}
                        <div style={{marginTop: '-10px'}} className='hidden md:block md:flex justify-end items-center border-b'>
                            <div className="flex-none gap-2">
                                <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-12 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="border mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <h3 className='text-lg font-bold px-2 border-b'>{userData[0]}</h3>
                                    <li><Link className='font-bold py-2 my-2' to={'/account'}>Account</Link></li>
                                    <li><Link className='btn btn-sm btn-error' to={'/'}>Logout</Link></li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        {/* ______________________________________________________________________________________________________________ */}
                        {/* Mobile Menu Start !!!!!!!!!_______________________________________________________________________________________!!!!!!!!!! */}
                        <div className='block mb-4 md:hidden flex justify-between items-center'>
                            {/* Left Drawer Icon _________________________________________________________________________________________ */}
                            <button type="primary" onClick={showDrawer}>
                                <Bars3BottomLeftIcon className="h-10 w-10" />
                            </button>
                            {/* __________________________________________________________________________________________________________ */}
                            {/* Drawer____________________________________________________________________________________________________ */}
                            <Drawer className='bg-slate-950' onClose={onClose} open={open}>
                                <div className="pt-4 bg-slate-950">
                                    <div className="avatar">
                                        <div className="w-32">
                                            <img src={logo} />
                                        </div>
                                    </div>
                                    <h1 className='text-xl font-extrabold text-white'>Hi, {userData[0]}</h1>
                                    <p className='text-white text-sm'>Welcome to Dream Records. You are now a member of Dream Records</p>
                                    <div className='py-4'>
                                        <Link to={'/admin-dashboard/create-user'}>
                                            <button onClick={onClose} style={{width: '90%'}} className='btn-sm border-none rounded-full text-slate-950 md:text-sm lg:text-lg font-semibold bg-gradient-to-r from-[#EF4136] to-[#fff]'>
                                                + Create
                                            </button>
                                        </Link>
                                        
                                        <div className='mt-2 py-2'> 
                                            <Link onClick={onClose} className='text-white flex items-center py-2' htmlFor="menu_drower" aria-label="close sidebar" to={'/'}>
                                                <HomeIcon className="h-7 w-7 pe-2" />
                                                Home
                                            </Link>
                                            <Link onClick={onClose} className='text-white flex items-center py-2' to={'/admin-dashboard/all-user'}>
                                                <DocumentCheckIcon className="h-7 w-7 pe-2" />
                                                Releases
                                            </Link>
                                            <Link onClick={onClose} className='text-white flex items-center py-2' to={'/'}>
                                                <UsersIcon className="h-7 w-7 pe-2" />
                                                Artists
                                            </Link>
                                            <Link onClick={onClose} className='text-white flex items-center py-2' to={'/'}>
                                                <UserGroupIcon className="h-7 w-7 pe-2" />    
                                                Labels
                                            </Link>
                                            <Link onClick={onClose} className='text-white flex items-center py-2' to={'/'}>
                                                <ChartPieIcon className="h-7 w-7 pe-2" />
                                                Statistics
                                            </Link>
                                            <Link className='text-white flex items-center py-2' to={'/blog'}>
                                                <ClipboardDocumentListIcon className="h-7 w-7 pe-2" />
                                                Blog
                                            </Link>
                                            <Link onClick={onClose} className='text-white flex items-center py-2' to={'/account'}>
                                                <UserCircleIcon className="h-7 w-7 pe-2" />
                                                Account
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Drawer>
                            {/* __________________________________________________________________________________________________________ */}
                            {/* Right Admin Profile ______________________________________________________________________________________ */}
                            <div className='flex justify-end items-center border-b'>
                                <div className="flex-none gap-2">
                                    <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-12 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="border mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                        <h3 className='text-lg font-bold px-2 border-b'>{userData[0]}</h3>
                                        <li><Link className='font-bold py-2 my-2' to={'/account'}>Account</Link></li>
                                        <li><Link className='btn btn-sm btn-error' to={'/'}>Logout</Link></li>
                                    </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* __________________________________________________________________________________________________________ */}
                        {/* Admin Page Outlate Div ___________________________________________________________________________________ */}
                        <main className='outlet_layout_issue'>
                            <Outlet/>
                        </main>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserAdminHomePage;