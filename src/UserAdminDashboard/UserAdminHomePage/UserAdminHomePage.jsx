import './UserAdminHomePage.css'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/Dream-Records Logo-(Light).png';
import { 
    HomeIcon, 
    Bars3BottomLeftIcon,
    DocumentCheckIcon,
    UserGroupIcon,
    UsersIcon,
    ChartPieIcon,
    UserCircleIcon,
    CurrencyDollarIcon,
    RectangleGroupIcon,
    ExclamationTriangleIcon,
 } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { Drawer, Image } from 'antd';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.config';
import LoadingComponentsForPage from '../../LoadingComponents/LoadingComponentsForPage';
import { createContext } from 'react';
import fallbackImage from '../../assets/userImage.webp'

export const AuthContext = createContext();

const UserAdminHomePage = () => {

    const navigate = useNavigate()


    const [signOut, error1] = useSignOut(auth);
    const [user, loading] = useAuthState(auth);
    const [uploadedProfileImg, setUploadedProfileImg] = useState(user?.photoURL);
    const [mainProfileImage, setMainProfileImage] = useState(user?.photoURL);

    // State for Labels and Artist for Create Release ___________________________
    const [artist, setArtist] = useState();
    const [labels, setLabels] = useState();
    const [featuring, setFeaturing] = useState();

    // Refetch API Data Handle ___________________________________________________
    const [refatchArtistData, setRefatchArtistData] = useState(1)
    const [refatchLabelsData, setRefatchLabelsData] = useState(1)

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
    
    let userNameIdRoll = user?.displayName?.split("'__'");
    

    const contextValue = {
        user,
        userNameIdRoll,
        uploadedProfileImg,
        setUploadedProfileImg,
        mainProfileImage,
        setMainProfileImage,
        refatchArtistData,
        setRefatchArtistData,
        refatchLabelsData,
        setRefatchLabelsData,
        artist,
        setArtist,
        labels,
        setLabels,
        featuring,
        setFeaturing
    }

    const signOutHandle = () => {
        signOut();
        navigate('/log-in')
    }
    return (
        <section className='md:h-screen bg-slate-950'>
            <div className='xl:max-w-[1300px] lg:max-w-[96%] md:max-w-[96%] sm:max-w-[100%] w-[100%] mx-auto'>
                <div className="md:grid md:gap-4 grid-cols-5 md:py-4 md:h-screen">
                    <div className="pt-4 hidden md:block h-full relative">
                        <div className='for_height_issue_logo_div'>
                            <div className="avatar">
                                <div className="w-32">
                                    <img src={logo} alt={logo}/>
                                </div>
                            </div>
                            <div style={{marginTop: '-20px'}}>
                                <h1 className='text-xl font-extrabold text-white'>Dream Records</h1>
                                <p className='text-white text-sm'>Sell your music worldwide.</p>
                                <div className='pt-3'>
                                    <Link to={'/create-release'}>
                                        <button style={{width: '90%'}} className='btn-sm border-none rounded-full text-slate-950 md:text-sm lg:text-lg font-semibold bg-gradient-to-r from-[#EF4136] to-[#fff]'>
                                        + Create
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div  className='my-4 first_layoutIssue'>
                             {/* __________________________________________________________________________________________________________ */}
                            {/* Admin All Nav Link ________________________________________________________________________________________ */}
                            <div className='py-2'> 
                                <Link className='text-white flex items-center py-2' to={'/'}>
                                    <HomeIcon className="h-7 w-7 pe-2" />
                                    Home
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/releases'}>
                                    <DocumentCheckIcon className="h-7 w-7 pe-2" />
                                    Releases
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/artist'}>
                                    <UsersIcon className="h-7 w-7 pe-2" />
                                    Artists
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/labels'}>
                                    <UserGroupIcon className="h-7 w-7 pe-2" />    
                                    Labels
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/analytics'}>
                                    <ChartPieIcon className="h-7 w-7 pe-2" />
                                    Analytics
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/wallet'}>
                                    <CurrencyDollarIcon className="h-7 w-7 pe-2" />
                                    Wallet
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/claim-release'}>
                                    <ExclamationTriangleIcon className="h-7 w-7 pe-2" />
                                    Rights manager
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/support'}>
                                    <RectangleGroupIcon className="h-7 w-7 pe-2" />
                                    Support
                                </Link>
                                <Link className='text-white flex items-center py-2' to={'/account'}>
                                    <UserCircleIcon className="h-7 w-7 pe-2" />
                                    Account
                                </Link>
                            </div>
                        </div>
                    </div>

                    <AuthContext.Provider value={contextValue}>
                        {/* __________________________________________________________________________________________________________ */}
                        <div className="bg-white col-span-4 p-2 md:p-4 md:rounded-lg h-full overflow-hidden">
                            {/* Admin Profile image right Side ________________________________________________________________________ */}
                            <div style={{marginTop: '-10px'}} className='hidden md:block md:flex justify-end items-center border-b'>
                                <div className="flex-none gap-2">
                                    <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-12 rounded-full">
                                        {
                                            mainProfileImage ? <Image
                                                width={'100%'}
                                                height={'100%'}
                                                className="rounded-full p-2 bg-slate-100"
                                                src={mainProfileImage}
                                                fallback={fallbackImage}
                                                preview={false}
                                                alt="profile-image"
                                            /> : <Image
                                                    width={'100%'}
                                                    height={'100%'}
                                                    className="rounded-full p-2 bg-slate-100"
                                                    src={user.photoURL}
                                                    fallback={fallbackImage}
                                                    preview={false}
                                                    alt="profile-image"
                                                /> 
                                        }
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="border mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                        {
                                           userNameIdRoll?  <h3 className='text-lg font-bold px-2 border-b'>{userNameIdRoll[0]}</h3> : ''
                                        }
                                        <li><Link className='font-bold py-2 my-2' to={'/account'}>Account</Link></li>
                                        <li><button onClick={signOutHandle} className='btn btn-sm btn-error'>Logout</button></li>
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
                                        <h1 className='text-xl font-extrabold text-white'>Dream Records</h1>
                                        <p className='text-white text-sm'>Sell your music worldwide.</p>
                                        <div className='py-4'>
                                            <Link to={'/create-release'}>
                                                <button onClick={onClose} style={{width: '90%'}} className='btn-sm border-none rounded-full text-slate-950 md:text-sm lg:text-lg font-semibold bg-gradient-to-r from-[#EF4136] to-[#fff]'>
                                                    + Create
                                                </button>
                                            </Link>
                                            
                                            <div className='mt-2 py-2'> 
                                                <Link onClick={onClose} className='text-white flex items-center py-2' htmlFor="menu_drower" aria-label="close sidebar" to={'/'}>
                                                    <HomeIcon className="h-7 w-7 pe-2" />
                                                    Home
                                                </Link>
                                                <Link onClick={onClose} className='text-white flex items-center py-2' to={'/releases'}>
                                                    <DocumentCheckIcon className="h-7 w-7 pe-2" />
                                                    Releases
                                                </Link>
                                                <Link onClick={onClose} className='text-white flex items-center py-2' to={'/artist'}>
                                                    <UsersIcon className="h-7 w-7 pe-2" />
                                                    Artists
                                                </Link>
                                                <Link onClick={onClose} className='text-white flex items-center py-2' to={'/labels'}>
                                                    <UserGroupIcon className="h-7 w-7 pe-2" />    
                                                    Labels
                                                </Link>
                                                <Link onClick={onClose} className='text-white flex items-center py-2' to={'/analytics'}>
                                                    <ChartPieIcon className="h-7 w-7 pe-2" />
                                                    Analytics
                                                </Link>
                                                <Link onClick={onClose} className='text-white flex items-center py-2' to={'/wallet'}>
                                                    <CurrencyDollarIcon className="h-7 w-7 pe-2" />
                                                    Wallet
                                                </Link>
                                                <Link onClick={onClose} className='text-white flex items-center py-2' to={'/claim-release'}>
                                                    <ExclamationTriangleIcon className="h-7 w-7 pe-2" />
                                                    Rights manager
                                                </Link>
                                                <Link onClick={onClose} className='text-white flex items-center py-2' to={'/support'}>
                                                    <RectangleGroupIcon className="h-7 w-7 pe-2" />
                                                    Support
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
                                                {
                                                    mainProfileImage ? <Image
                                                        width={'100%'}
                                                        height={'100%'}
                                                        className="rounded-full bg-slate-100"
                                                        src={mainProfileImage}
                                                        fallback={fallbackImage}
                                                        preview={false}
                                                        alt="profile-image"
                                                    /> : <Image
                                                            width={'100%'}
                                                            height={'100%'}
                                                            className="rounded-full bg-slate-100"
                                                            src={user.photoURL}
                                                            fallback={fallbackImage}
                                                            preview={false}
                                                            alt="profile-image"
                                                        /> 
                                                }
                                            </div>
                                        </div>
                                        <ul tabIndex={0} className="border mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                            {
                                               userNameIdRoll?  <h3 className='text-lg font-bold px-2 border-b'>{userNameIdRoll[0]}</h3> : ''
                                            }
                                            <li><Link className='font-bold py-2 my-2' to={'/account'}>Account</Link></li>
                                            <li><button onClick={async () => { const success = await signOut();
                                                                                if (success) {
                                                                                    alert('You are sign out');
                                                                                }
                                                                                if(error1){
                                                                                    alert(error1.message)
                                                                                }
                                                                                }} className='btn btn-sm btn-error'>Logout</button></li>
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
                    </AuthContext.Provider> 
                </div>
            </div>
        </section>
    );
};

export default UserAdminHomePage;