import './DashBoardForAdmin.css'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/Dream-Records Logo-(Light).png';
import { 
    HomeIcon, 
    AdjustmentsHorizontalIcon, 
    UserIcon,
    Bars3BottomLeftIcon,
    UsersIcon,
    UserGroupIcon,
    Cog6ToothIcon,
    CurrencyDollarIcon,
    RectangleGroupIcon,
    ExclamationTriangleIcon,
 } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { Drawer } from 'antd';
import CreateUserForm from './CreateUserForm';

import { createContext } from 'react';
import LoadingComponentsForPage from '../../LoadingComponents/LoadingComponentsForPage';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.config';

export const AdminAuthContext = createContext();

const DashBoardForAdmin = () => {

    const location = useLocation();
    const currentPath = location.pathname;


    const [signOut] = useSignOut(auth);
    const navigate = useNavigate()

    // Mobile Navigation Humbergo ______________________
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    // const [signOut, error1] = useSignOut(auth);
    const [user, loading] = useAuthState(auth);

    const activeLink = (isActive) => {
        return {
            color: isActive ? '#db6058' : '',
        }
    }

    const activeLinkDynamic = (to , currentPath) => {
        console.log(currentPath);
        return currentPath.startsWith(to)
        ? { color: '#db6058'} // Active styles
        : {};
    }

    if(loading){
        return <LoadingComponentsForPage/>
    }
    
    let adminNameIdRoll = user?.displayName?.split("'__'");
    

    const contextValue = {
        adminNameIdRoll
    }

    const logOutHandle = () => {
        signOut();
        navigate('/log-in')
    }


    return (
        <section className='md:h-screen bg-slate-950'>
            <AdminAuthContext.Provider value={contextValue}>
            <div className='xl:max-w-[1300px] lg:max-w-[96%] md:max-w-[96%] sm:max-w-[100%] w-[100%] mx-auto'>
                <div className="md:grid md:gap-4 grid-cols-5 md:py-4 md:h-screen">
                    <div className="pt-4 hidden md:block relative">
                        <div className='admin_dashboard_height_issue_logo_div'>
                            <div className="avatar">
                                <div className="w-32">
                                    <img src={logo} />
                                </div>
                            </div>
                            <h1 className='text-xl font-extrabold text-white'>DR Admin</h1>
                            <p className='text-white text-sm'>Explore the site Admin. Easily Manage Your Site</p>
                                <div className='pt-3'>
                                    <button onClick={()=>document.getElementById('create_user_modal').showModal()} style={{width: '90%'}} className='btn-sm border-none rounded-full text-slate-950 md:text-sm lg:text-lg font-semibold bg-gradient-to-r from-[#EF4136] to-[#fff]'>
                                    + Create User
                                    </button>
                                    {/* Open Modal For Create User Start __________________________________________________________________________ */}
                                    <dialog id="create_user_modal" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">                                    
                                            {/* User Form Components _________________________ */}
                                            <CreateUserForm/>
                                        </div>
                                    </dialog>
                                    {/* __________________________________________________________________________________________________________ */}
                                </div>
                            </div>
                        <div className='my-4 admin_dashboard_first_layoutIssue'>                             
                            {/* Admin All Nav NavLink ________________________________________________________________________________________ */}
                            <div className='pb-2'> 
                                <NavLink style={({isActive}) => activeLink(isActive)} className='text-white flex items-center py-2' to={'/admin-dashboard'} end>
                                    <HomeIcon className="h-7 w-7 pe-2" />
                                    Home
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/admin-dashboard/all-user', currentPath)} className='text-white flex items-center py-2' to={'/admin-dashboard/all-user/1/10'}>
                                    <UserIcon className="h-7 w-7 pe-2" />
                                    All User
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/admin-dashboard/release', currentPath)} className='text-white flex items-center py-2' to={'/admin-dashboard/release/1/8/All'}>
                                    <AdjustmentsHorizontalIcon className="h-7 w-7 pe-2" />
                                    Release
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/admin-dashboard/labels', currentPath)} className='text-white flex items-center py-2' to={'/admin-dashboard/labels/1/10/All'}>
                                    <UserGroupIcon className="h-7 w-7 pe-2" />    
                                    Labels
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/admin-dashboard/artist', currentPath)} className='text-white flex items-center py-2' to={'/admin-dashboard/artist/1/10'}>
                                    <UsersIcon className="h-7 w-7 pe-2" />
                                    Artist
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/admin-dashboard/withdrawal-request', currentPath)} className='text-white flex items-center py-2' to={'/admin-dashboard/withdrawal-request/1/10/All'}>
                                    <CurrencyDollarIcon className="h-7 w-7 pe-2" />
                                    Withdrawal
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/admin-dashboard/claim-release', currentPath)} className='text-white flex items-center py-2' to={'/admin-dashboard/claim-release'}>
                                    <ExclamationTriangleIcon className="h-7 w-7 pe-2" />
                                    Rights manager
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/admin-dashboard/support', currentPath)} className='text-white flex items-center py-2' to={'/admin-dashboard/support/chat/1/10/All'}>
                                    <RectangleGroupIcon className="h-7 w-7 pe-2" />
                                    Support
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/admin-dashboard/settings', currentPath)} className='text-white flex items-center py-2' to={'/admin-dashboard/settings'}>
                                    <Cog6ToothIcon className="h-7 w-7 pe-2" />
                                    Settings
                                </NavLink>
                            </div>
                        </div>
                    </div>
                     {/* __________________________________________________________________________________________________________ */}
                    <div className="bg-white col-span-4 p-2 md:p-4 md:rounded-lg overflow-y-auto">
                        {/* Admin Profile image right Side ________________________________________________________________________ */}
                        <div style={{marginTop: '-10px'}} className='hidden md:block md:flex justify-end items-center border-b'>
                            <button onClick={logOutHandle} className='btn btn-sm bg-red-300'>Log Out</button>
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
                            <Drawer className='bg-slate-950' onClose={onClose} open={open}  placement={'left'}>
                                <div className="pt-4 bg-slate-950">
                                    <div className="avatar">
                                        <div className="w-32">
                                            <img src={logo} />
                                        </div>
                                    </div>
                                    <h1 className='text-xl font-extrabold text-white'>DR Admin</h1>
                                    <p className='text-white text-sm'>Explore the site Admin. Easily Manage Your Site</p>
                                    <div className='py-4'>
                                        <NavLink to={'/admin-dashboard/create-user'}>
                                            <button onClick={onClose} style={{width: '90%'}} className='btn-sm border-none rounded-full text-slate-950 md:text-sm lg:text-lg font-semibold bg-gradient-to-r from-[#EF4136] to-[#fff]'>
                                                + Create User
                                            </button>
                                        </NavLink>
                                        
                                        <div className='mt-2 py-2'> 
                                            <NavLink style={({isActive}) => activeLink(isActive)} onClick={onClose} className='text-white flex items-center py-2' htmlFor="menu_drower" aria-label="close sidebar" to={'/admin-dashboard'}>
                                                <HomeIcon className="h-7 w-7 pe-2" />
                                                Home
                                            </NavLink>
                                            <NavLink style={() => activeLinkDynamic('/admin-dashboard/all-user', currentPath)} onClick={onClose} className='text-white flex items-center py-2' to={'/admin-dashboard/all-user/1/10'}>
                                                <UserIcon className="h-7 w-7 pe-2" />
                                                All User
                                            </NavLink>
                                            <NavLink style={() => activeLinkDynamic('/admin-dashboard/release', currentPath)} onClick={onClose} className='text-white flex items-center py-2' to={'/admin-dashboard/release/1/8/All'}>
                                                <AdjustmentsHorizontalIcon className="h-7 w-7 pe-2" />
                                                Release
                                            </NavLink>
                                            <NavLink style={() => activeLinkDynamic('/admin-dashboard/release', currentPath)} onClick={onClose} className='text-white flex items-center py-2' to={'/admin-dashboard/labels/1/10/All'}>
                                                <UserGroupIcon className="h-7 w-7 pe-2" />    
                                                Labels
                                            </NavLink>
                                            <NavLink style={() => activeLinkDynamic('/admin-dashboard/artist', currentPath)} onClick={onClose} className='text-white flex items-center py-2' to={'/admin-dashboard/artist/1/10'}>
                                                <UsersIcon className="h-7 w-7 pe-2" />
                                                Artist
                                            </NavLink>
                                            <NavLink style={() => activeLinkDynamic('/admin-dashboard/withdrawal-request', currentPath)} onClick={onClose} className='text-white flex items-center py-2' to={'/admin-dashboard/withdrawal-request/1/10/All'}>
                                                <CurrencyDollarIcon className="h-7 w-7 pe-2" />
                                                Withdrawal
                                            </NavLink>
                                            <NavLink style={() => activeLinkDynamic('/admin-dashboard/claim-release', currentPath)} onClick={onClose} className='text-white flex items-center py-2' to={'/admin-dashboard/claim-release'}>
                                                <ExclamationTriangleIcon className="h-7 w-7 pe-2" />
                                                Rights manager
                                            </NavLink>
                                            <NavLink style={() => activeLinkDynamic('/admin-dashboard//admin-dashboard/support', currentPath)} onClick={onClose} className='text-white flex items-center py-2' to={'/admin-dashboard/support/chat/1/10/All'}>
                                                <RectangleGroupIcon className="h-7 w-7 pe-2" />
                                                Support
                                            </NavLink>
                                            <NavLink style={() => activeLinkDynamic('/admin-dashboard/settings', currentPath)} onClick={onClose} className='text-white flex items-center py-2' to={'/admin-dashboard/settings'}>
                                                <Cog6ToothIcon className="h-7 w-7 pe-2" />
                                                Settings
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </Drawer>
                            {/* __________________________________________________________________________________________________________ */}
                            {/* Right Admin Profile ______________________________________________________________________________________ */}
                            <div className='flex justify-end items-center border-b'>
                                <button onClick={logOutHandle} className='btn btn-sm bg-red-300'>Log Out</button>
                            </div>
                        </div>
                        {/* __________________________________________________________________________________________________________ */}
                        {/* Admin Page Outlate Div ___________________________________________________________________________________ */}
                        <main className='outlet_layout_issue_admin'>
                            <Outlet/>
                        </main>
                    </div>
                </div>
            </div>
            </AdminAuthContext.Provider>
        </section>
    );
};

export default DashBoardForAdmin;