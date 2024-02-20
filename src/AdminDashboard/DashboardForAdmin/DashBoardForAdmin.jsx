import './DashBoardForAdmin.css'
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/logo/Dream-Records Logo-(Light).png';
import { 
    HomeIcon, 
    AdjustmentsHorizontalIcon, 
    UserIcon, CheckCircleIcon, 
    ExclamationTriangleIcon, 
    ClipboardDocumentListIcon,
    Bars3BottomLeftIcon,
 } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { Drawer } from 'antd';

const DashBoardForAdmin = () => {

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
  
        <section className='md:h-screen bg-slate-950'>
            <div className='xl:max-w-[1300px] lg:max-w-[96%] md:max-w-[96%] sm:max-w-[100%] w-[100%] mx-auto'>
                <div className="md:grid md:gap-4 grid-cols-5 md:py-4 md:h-screen">
                    <div className="pt-4 hidden md:block overflow-auto">
                        <div className="avatar">
                            <div className="w-32">
                                <img src={logo} />
                            </div>
                        </div>
                        <h1 className='text-xl font-extrabold text-white'>DR Admin</h1>
                        <p className='text-white text-sm'>Explore the site Admin. Easily Manage Your Site</p>
                        <div className='py-4'>
                            <button onClick={()=>document.getElementById('create_user_modal').showModal()} style={{width: '90%'}} className='btn-sm border-none rounded-full text-slate-950 md:text-sm lg:text-lg font-semibold bg-gradient-to-r from-[#EF4136] to-[#fff]'>
                               + Create User
                            </button>
                            {/* Open Modal For Create User Start _____________________ */}
                            <dialog id="create_user_modal" className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    {/* Close Modal Icon right Corner ________________ */}
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    {/* Close Modal Icon right Corner ________________ */}
                                    <h2 className='text-lg font-bold'>Create a new User</h2>
                                    <div className="flex flex-col w-full border-opacity-50">
                                        <div className="divider mt-0"></div>
                                    </div>
                                    <form action="">
                                        <input type="email" placeholder="Enter User Email" className="input input-bordered w-full" />
                                        <br />
                                        <br />
                                        <input className='btn btn-neutral btn-sm rounded-full' type="submit" value={'Create User'}/>
                                    </form>
                                </div>
                            </dialog>
                            {/* Open Modal For Create User End --_____________________ */}
                            <div className='mt-2 py-2'> 
                                <Link className='text-white flex items-center py-2' to={'/admin-dashboard'}>
                                    <HomeIcon className="h-7 w-7 pe-2" />
                                    Home
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/admin-dashboard/all-user'}>
                                    <UserIcon className="h-7 w-7 pe-2" />
                                    All User
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/'}>
                                    <AdjustmentsHorizontalIcon className="h-7 w-7 pe-2" />
                                    Pending
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/'}>
                                    <CheckCircleIcon className="h-7 w-7 pe-2" />    
                                    Aproved
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/'}>
                                    <ExclamationTriangleIcon className="h-7 w-7 pe-2" />
                                    Correction
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/'}>
                                    <ClipboardDocumentListIcon className="h-7 w-7 pe-2" />
                                    Blog Post
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Admin Page Outlate Div __________________________________________________________________________ */}
                    <div className="bg-white col-span-4 p-2 md:p-4 md:rounded-lg">
                        {/* Admin Profile image right Side ______________________________________________________________ */}
                        <div style={{marginTop: '-10px'}} className='hidden md:block md:flex justify-end items-center border-b'>
                            <div className="flex-none gap-2">
                                <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-12 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="border mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <h3 className='text-lg font-bold px-2 border-b'>Demo Name</h3>
                                    <li><Link className='font-bold py-2 my-2' to={'/'}>Account</Link></li>
                                    <li><Link className='btn btn-sm btn-error' to={'/'}>Logout</Link></li>
                                </ul>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu ____________________________________________________________________________________________________________________________________ */}
                        <div className='block md:hidden flex justify-between items-center'>
                            {/* Left Icon Drower ____________________________________________________________________________________ */}

                            <button type="primary" onClick={showDrawer}>
                                <Bars3BottomLeftIcon className="h-10 w-10" />
                            </button>
                            <Drawer className='bg-slate-950' onClose={onClose} open={open}>
                                <div className="pt-4 bg-slate-950">
                                    <div className="avatar">
                                        <div className="w-32">
                                            <img src={logo} />
                                        </div>
                                    </div>
                                    <h1 className='text-xl font-extrabold text-white'>DR Admin</h1>
                                    <p className='text-white text-sm'>Explore the site Admin. Easily Manage Your Site</p>
                                    <div className='py-4'>
                                        <button onClick={onClose} style={{width: '90%'}} className='btn-sm border-none rounded-full text-slate-950 md:text-sm lg:text-lg font-semibold bg-gradient-to-r from-[#EF4136] to-[#fff]'>
                                        + Create User
                                        </button>
                                        {/* <button onClick={()=>document.getElementById('create_user_modal').showModal()} style={{width: '90%'}} className='btn-sm border-none rounded-full text-slate-950 md:text-sm lg:text-lg font-semibold bg-gradient-to-r from-[#EF4136] to-[#fff]'>
                                        + Create User
                                        </button> */}
                                        {/* Open Modal For Create User Start _____________________ */}
                                        <dialog id="create_user_modal" className="modal modal-bottom sm:modal-middle">
                                            <div className="modal-box">
                                                {/* Close Modal Icon right Corner ________________ */}
                                                <form method="dialog">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                </form>
                                                {/* Close Modal Icon right Corner ________________ */}
                                                <h2 className='text-lg font-bold'>Create a new User</h2>
                                                <div className="flex flex-col w-full border-opacity-50">
                                                    <div className="divider mt-0"></div>
                                                </div>
                                                <form action="">
                                                    <input type="email" placeholder="Enter User Email" className="input input-bordered w-full" />
                                                    <br />
                                                    <br />
                                                    <input className='btn btn-neutral btn-sm rounded-full' type="submit" value={'Create User'}/>
                                                </form>
                                            </div>
                                        </dialog>
                                        {/* Open Modal For Create User End --_____________________ */}
                                        <div className='mt-2 py-2'> 
                                            <Link onClick={onClose} className='text-white flex items-center py-2' htmlFor="menu_drower" aria-label="close sidebar" to={'/admin-dashboard'}>
                                                <HomeIcon className="h-7 w-7 pe-2" />
                                                Home
                                            </Link>
                                            <Link onClick={onClose} className='text-white flex items-center py-2' to={'/admin-dashboard/all-user'}>
                                                <UserIcon className="h-7 w-7 pe-2" />
                                                All User
                                            </Link>
                                            <Link onClick={onClose} className='text-white flex items-center py-2' to={'/'}>
                                                <AdjustmentsHorizontalIcon className="h-7 w-7 pe-2" />
                                                Pending
                                            </Link>
                                            <Link onClick={onClose} className='text-white flex items-center py-2' to={'/'}>
                                                <CheckCircleIcon className="h-7 w-7 pe-2" />    
                                                Aproved
                                            </Link>
                                            <Link onClick={onClose} className='text-white flex items-center py-2' to={'/'}>
                                                <ExclamationTriangleIcon className="h-7 w-7 pe-2" />
                                                Correction
                                            </Link>
                                            <Link onClick={onClose} className='text-white flex items-center py-2' to={'/'}>
                                                <ClipboardDocumentListIcon className="h-7 w-7 pe-2" />
                                                Blog Post
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Drawer>

                            {/* Right Admin Profile ____________________________________________________________________________________ */}
                            <div className='flex justify-end items-center border-b'>
                                <div className="flex-none gap-2">
                                    <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-12 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="border mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                        <h3 className='text-lg font-bold px-2 border-b'>Demo Name</h3>
                                        <li><Link className='font-bold py-2 my-2' to={'/'}>Account</Link></li>
                                        <li><Link className='btn btn-sm btn-error' to={'/'}>Logout</Link></li>
                                    </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* OutLet __________________________ */}
                        <Outlet/>
                    </div>
                    {/* ___________________________________________________________________________________________________ */}
                </div>
            </div>
        </section>
        </>
    );
};

export default DashBoardForAdmin;