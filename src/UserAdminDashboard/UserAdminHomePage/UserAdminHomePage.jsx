import './UserAdminHomePage.css'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/Dream Records Logo (Dark).png';
import { 
    HomeIcon, 
    Bars3BottomLeftIcon,
    DocumentCheckIcon,
    UsersIcon,
    ChartPieIcon,
    UserCircleIcon,
    CurrencyDollarIcon,
    RectangleGroupIcon,
    TagIcon,
    InformationCircleIcon,
 } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react';
import { Drawer, Image } from 'antd';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.config';
import LoadingComponentsForPage from '../../LoadingComponents/LoadingComponentsForPage';
import { createContext } from 'react';
import fallbackImage from '../../assets/userImage.webp'
import axios from 'axios';

export const AuthContext = createContext();

const UserAdminHomePage = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const currentPath = location.pathname;

    const [signOut, error1] = useSignOut(auth);
    const [user, loading] = useAuthState(auth);
    const [uploadedProfileImg, setUploadedProfileImg] = useState(user?.photoURL);
    const [mainProfileImage, setMainProfileImage] = useState(user?.photoURL);

    useEffect(() => {
        if(loading){
            return <LoadingComponentsForPage/>
        }
        let userNameIdRoll = user?.displayName?.split("'__'");
        console.log(userNameIdRoll);
        // Create a new Date object for the current date and time
        const now = new Date();

        // Create an options object for formatting the date and time
        const options = {
            timeZone: 'Asia/Kolkata',
            hour12: true,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        // Create a new Intl.DateTimeFormat object with the specified options
        const formatter = new Intl.DateTimeFormat('en-GB', options);

        // Format the current date and time for Kolkata
        const lastLogin = formatter.format(now);
        if(user){
            axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${userNameIdRoll[1]}`)
            .then(res => {
                if(res.status === 200){
                    const data = res.data.data;
                    const formData = {...data, lastLogin}
                    axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${userNameIdRoll[1]}`, formData)
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);





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

    const activeLink = (isActive) => {
        return {
            backgroundColor: isActive ? '#EAEAEA' : '',
        }
    }

    const activeLinkDynamic = (to , currentPath) => {
        return currentPath.startsWith(to)
        ? { backgroundColor: '#EAEAEA',} // Active styles
        : {};
    }

    return (
        <section className='md:h-screenn bg-[#FAFAFA]'>
            <div className='xl:max-w-[1300px] lg:max-w-[96%] md:max-w-[96%] sm:max-w-[100%] w-[100%] mx-auto'>
                <div className="md:grid md:gap-1 grid-cols-5 md:h-screen">
                    <div className="pt-4 hidden md:block h-full relative">
                        <div className='for_height_issue_logo_div'>
                            <div className="avatar">
                                <div className="w-32">
                                    <img src={logo} alt={logo}/>
                                </div>
                            </div>
                            <div style={{marginTop: '-20px'}}>
                                <h1 className='text-xl font-extrabold'>Dream Records</h1>
                                <p className='text-sm'>Sell your music worldwide.</p>
                                <div className='pt-3'>
                                    <Link to={'/create-release'}>
                                        <button style={{width: '90%'}} className='btn text-white md:text-sm lg:text-lg font-semibold btn-neutral bg-[#252525]'>
                                        + Create
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div  className='mt-8 first_layoutIssue'>
                             {/* __________________________________________________________________________________________________________ */}
                            {/* Admin All Nav Link ________________________________________________________________________________________ */}
                            <div className='py-2'> 
                                <NavLink style={({isActive}) => activeLink(isActive)} className='flex items-center py-2 ps-3 rounded-md' to={'/'}>
                                    <HomeIcon className="h-7 w-7 pe-2" />
                                    Home
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/releases', currentPath)} className='flex items-center py-2 ps-3 rounded-md' to={'/releases/All/1/6'}>
                                    <DocumentCheckIcon className="h-7 w-7 pe-2" />
                                    Releases
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/artist', currentPath)} className='flex items-center py-2 ps-3 rounded-md' to={'/artist'}>
                                    <UsersIcon className="h-7 w-7 pe-2" />
                                    Artists
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/labels', currentPath)} className='flex items-center py-2 ps-3 rounded-md' to={'/labels'}>
                                    <TagIcon className="h-7 w-7 pe-2" />    
                                    Labels
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/analytics', currentPath)} className='flex items-center py-2 ps-3 rounded-md' to={'/analytics'}>
                                    <ChartPieIcon className="h-7 w-7 pe-2" />
                                    Analytics
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/wallet', currentPath)} className='flex items-center py-2 ps-3 rounded-md' to={'/wallet'}>
                                    <CurrencyDollarIcon className="h-7 w-7 pe-2" />
                                    Wallet
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/claim-release', currentPath)} className='flex items-center py-2 ps-3 rounded-md' to={'/claim-release'}>
                                    <InformationCircleIcon className="h-7 w-7 pe-2" />
                                    Rights manager
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/support', currentPath)} className='flex items-center py-2 ps-3 rounded-md' to={'/support'}>
                                    <RectangleGroupIcon className="h-7 w-7 pe-2" />
                                    Support
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/account', currentPath)} className='flex items-center py-2 ps-3 rounded-md' to={'/account'}>
                                    <UserCircleIcon className="h-7 w-7 pe-2" />
                                    Account
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <AuthContext.Provider value={contextValue}>
                        {/* __________________________________________________________________________________________________________ */}
                        <div style={{borderLeft: '1px solid #E0E0E0'}} className="bg-[#FCFCFC] col-span-4 h-full overflow-hidden relative">
                            {/* Admin Profile image right Side ________________________________________________________________________ */}
                            <div className='hidden md:block md:flex justify-end items-center absolute top-3 right-5'>
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
                                <Drawer className='bg-slate-950' onClose={onClose} open={open} placement={'left'}>
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
                                                <NavLink onClick={onClose} className='text-white flex items-center py-2 ps-3 rounded-md' htmlFor="menu_drower" aria-label="close sidebar" to={'/'}>
                                                    <HomeIcon className="h-7 w-7 pe-2" />
                                                    Home
                                                </NavLink>
                                                <NavLink onClick={onClose} className='text-white flex items-center py-2 ps-3 rounded-md' to={'/releases'}>
                                                    <DocumentCheckIcon className="h-7 w-7 pe-2" />
                                                    Releases
                                                </NavLink>
                                                <NavLink onClick={onClose} className='text-white flex items-center py-2 ps-3 rounded-md' to={'/artist'}>
                                                    <UsersIcon className="h-7 w-7 pe-2" />
                                                    Artists
                                                </NavLink>
                                                <NavLink onClick={onClose} className='text-white flex items-center py-2 ps-3 rounded-md' to={'/labels'}>
                                                    <TagIcon className="h-7 w-7 pe-2" />    
                                                    Labels
                                                </NavLink>
                                                <NavLink onClick={onClose} className='text-white flex items-center py-2 ps-3 rounded-md' to={'/analytics'}>
                                                    <ChartPieIcon className="h-7 w-7 pe-2" />
                                                    Analytics
                                                </NavLink>
                                                <NavLink onClick={onClose} className='text-white flex items-center py-2 ps-3 rounded-md' to={'/wallet'}>
                                                    <CurrencyDollarIcon className="h-7 w-7 pe-2" />
                                                    Wallet
                                                </NavLink>
                                                <NavLink onClick={onClose} className='text-white flex items-center py-2 ps-3 rounded-md' to={'/claim-release'}>
                                                    <InformationCircleIcon className="h-7 w-7 pe-2" />
                                                    Rights manager
                                                </NavLink>
                                                <NavLink onClick={onClose} className='text-white flex items-center py-2 ps-3 rounded-md' to={'/support'}>
                                                    <RectangleGroupIcon className="h-7 w-7 pe-2" />
                                                    Support
                                                </NavLink>
                                                <NavLink onClick={onClose} className='text-white flex items-center py-2 ps-3 rounded-md' to={'/account'}>
                                                    <UserCircleIcon className="h-7 w-7 pe-2" />
                                                    Account
                                                </NavLink>
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