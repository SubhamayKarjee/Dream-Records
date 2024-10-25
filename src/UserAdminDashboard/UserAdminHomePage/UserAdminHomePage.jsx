import './UserAdminHomePage.css'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/Dream Records Logo (Dark).png';
import { useEffect, useState } from 'react';
import { Drawer, Image } from 'antd';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.config';
import LoadingComponentsForPage from '../../LoadingComponents/LoadingComponentsForPage';
import { createContext } from 'react';
import fallbackImage from '../../assets/userImage.webp'
import axios from 'axios';
import { 
    RiAddLine,
    RiArrowDownSLine,
    RiHome2Line,
    RiFileCheckLine,
    RiGroupLine,
    RiPriceTag3Line,
    RiPieChartLine,
    RiWallet3Line,
    RiErrorWarningLine,
    RiServiceLine,
    RiUserLine,
    RiMenu2Line
} from "@remixicon/react";


export const AuthContext = createContext();

const UserAdminHomePage = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const currentPath = location.pathname;

    const [signOut, error1] = useSignOut(auth);
    const [user, loading] = useAuthState(auth);
    const [uploadedProfileImg, setUploadedProfileImg] = useState(user?.photoURL);
    const [mainProfileImage, setMainProfileImage] = useState(user?.photoURL);

    const [userFirstName, setUserFirstName] = useState()

    useEffect(() => {
        if(loading){
            return <LoadingComponentsForPage/>
        }
        let userNameIdRoll = user?.displayName?.split("'__'");
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
                    setUserFirstName(res.data.data.first_name)
                    const formData = {...data, lastLogin}
                    axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${userNameIdRoll[1]}`, formData)
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // State for Labels and Artist for Create Release ___________________________
    const [artist, setArtist] = useState([]);
    const [labels, setLabels] = useState([]);
    const [featuring, setFeaturing] = useState([]);

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
        userFirstName,
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
                                    <Link to={'/create-release'} className='w-full'>
                                        <button style={{width: '90%'}} className='btn text-white md:text-sm lg:text-lg font-semibold btn-neutral bg-[#252525] w-full'>
                                        <RiAddLine
                                            size={24}
                                            color="white"
                                        />
                                        Create
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div  className='mt-8 first_layoutIssue custom-scrollbar'>
                             {/* __________________________________________________________________________________________________________ */}
                            {/* Admin All Nav Link ________________________________________________________________________________________ */}
                            <div className='py-2'> 
                                <NavLink style={({isActive}) => activeLink(isActive)} className='flex items-center py-[12px] ps-3 rounded-md' to={'/'}>
                                    <RiHome2Line
                                        size={24}
                                        color="#252525"
                                        className='me-2'
                                    />
                                    Home
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/releases', currentPath)} className='flex items-center py-[12px] ps-3 rounded-md' to={'/releases/All/1/6'}>
                                    <RiFileCheckLine
                                        size={24}
                                        color="#252525"
                                        className='me-2'
                                    />
                                    Releases
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/artist', currentPath)} className='flex items-center py-[12px] ps-3 rounded-md' to={'/artist/1/8'}>
                                    <RiGroupLine
                                        size={24}
                                        color="#252525"
                                        className='me-2'
                                    />
                                    Artists
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/labels', currentPath)} className='flex items-center py-[12px] ps-3 rounded-md' to={'/labels/All/1/6'}>
                                    <RiPriceTag3Line
                                        size={24}
                                        color="#252525"
                                        className='me-2'
                                    />  
                                    Labels
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/analytics', currentPath)} className='flex items-center py-[12px] ps-3 rounded-md' to={'/analytics/1/12'}>
                                    <RiPieChartLine
                                        size={24}
                                        color="#252525"
                                        className='me-2'
                                    />
                                    Analytics
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/wallet', currentPath)} className='flex items-center py-[12px] ps-3 rounded-md' to={'/wallet'}>
                                    <RiWallet3Line
                                        size={24}
                                        color="#252525"
                                        className='me-2'
                                    />
                                    Wallet
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/claim-release', currentPath)} className='flex items-center py-[12px] ps-3 rounded-md' to={'/claim-release/All/1/8'}>
                                    <RiErrorWarningLine
                                        size={24}
                                        color="#252525"
                                        className='me-2'
                                    />
                                    Rights manager
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/support', currentPath)} className='flex items-center py-[12px] ps-3 rounded-md' to={'/support/All/1/8'}>
                                    <RiServiceLine
                                        size={24}
                                        color="#252525"
                                        className='me-2'
                                    />
                                    Support
                                </NavLink>
                                <NavLink style={() => activeLinkDynamic('/account', currentPath)} className='flex items-center py-[12px] ps-3 rounded-md' to={'/account'}>
                                    <RiUserLine
                                        size={24}
                                        color="#252525"
                                        className='me-2'
                                    />
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
                                        <div tabIndex={0} role="button" className="">
                                            <div className="flex gap-2 items-center justify-between h-[48px] bg-[#F1F1F1] border border-[#E0E0E0] rounded-[64px] p-1">
                                                <div className='flex gap-2 items-center'>
                                                    {
                                                        mainProfileImage ? <Image
                                                            width={'40px'}
                                                            height={'40px'}
                                                            className="rounded-full"
                                                            src={mainProfileImage}
                                                            fallback={fallbackImage}
                                                            preview={false}
                                                            alt="profile-image"
                                                        /> : <Image
                                                                width={'40px'}
                                                                height={'40px'}
                                                                className="rounded-full"
                                                                src={user.photoURL}
                                                                fallback={fallbackImage}
                                                                preview={false}
                                                                alt="profile-image"
                                                            /> 
                                                    }
                                                    <h2>{userFirstName}</h2>
                                                </div>
                                                <div>
                                                    <RiArrowDownSLine
                                                        size={24}
                                                        color="#252525"
                                                    />
                                                </div>
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
                                    <RiMenu2Line
                                        size={40}
                                        color="#252525"
                                        className='me-2'
                                    />
                                </button>
                                {/* __________________________________________________________________________________________________________ */}
                                {/* Drawer____________________________________________________________________________________________________ */}
                                <Drawer className='' onClose={onClose} open={open} placement={'left'}>
                                    <div className="pt-4">
                                        <div className="avatar">
                                            <div className="w-32">
                                                <img src={logo} />
                                            </div>
                                        </div>
                                        <h1 className='text-xl font-extrabold'>Dream Records</h1>
                                        <p className='text-sm'>Sell your music worldwide.</p>
                                        <div className='py-4'>
                                            <Link to={'/create-release'}>
                                                <button onClick={onClose} style={{width: '90%'}} className='btn text-white md:text-sm lg:text-lg font-semibold btn-neutral bg-[#252525] w-full'>
                                                    <RiAddLine
                                                        size={24}
                                                        color="white"
                                                    />
                                                    Create
                                                </button>
                                            </Link>
                                            
                                            <div className='mt-2 py-2'> 
                                                <NavLink onClick={onClose} className='flex items-center py-2 ps-3 rounded-md' htmlFor="menu_drower" aria-label="close sidebar" to={'/'}>
                                                    <RiHome2Line
                                                        size={24}
                                                        color="#252525"
                                                        className='me-2'
                                                    />
                                                    Home
                                                </NavLink>
                                                <NavLink onClick={onClose} className='flex items-center py-2 ps-3 rounded-md' to={'/releases/All/1/6'}>
                                                    <RiFileCheckLine
                                                        size={24}
                                                        color="#252525"
                                                        className='me-2'
                                                    />
                                                    Releases
                                                </NavLink>
                                                <NavLink onClick={onClose} className='flex items-center py-2 ps-3 rounded-md' to={'/artist/1/8'}>
                                                    <RiGroupLine
                                                        size={24}
                                                        color="#252525"
                                                        className='me-2'
                                                    />
                                                    Artists
                                                </NavLink>
                                                <NavLink onClick={onClose} className='flex items-center py-2 ps-3 rounded-md' to={'/labels/All/1/6'}>
                                                    <RiPriceTag3Line
                                                        size={24}
                                                        color="#252525"
                                                        className='me-2'
                                                    />  
                                                    Labels
                                                </NavLink>
                                                <NavLink onClick={onClose} className='flex items-center py-2 ps-3 rounded-md' to={'/analytics/1/8'}>
                                                    <RiPieChartLine
                                                        size={24}
                                                        color="#252525"
                                                        className='me-2'
                                                    />
                                                    Analytics
                                                </NavLink>
                                                <NavLink onClick={onClose} className='flex items-center py-2 ps-3 rounded-md' to={'/wallet'}>
                                                    <RiWallet3Line
                                                        size={24}
                                                        color="#252525"
                                                        className='me-2'
                                                    />
                                                    Wallet
                                                </NavLink>
                                                <NavLink onClick={onClose} className='flex items-center py-2 ps-3 rounded-md' to={'/claim-release/All/1/8'}>
                                                    <RiErrorWarningLine
                                                        size={24}
                                                        color="#252525"
                                                        className='me-2'
                                                    />
                                                    Rights manager
                                                </NavLink>
                                                <NavLink onClick={onClose} className='flex items-center py-2 ps-3 rounded-md' to={'/support/All/1/8'}>
                                                    <RiServiceLine
                                                        size={24}
                                                        color="#252525"
                                                        className='me-2'
                                                    />
                                                    Support
                                                </NavLink>
                                                <NavLink onClick={onClose} className='flex items-center py-2 ps-3 rounded-md' to={'/account'}>
                                                    <RiUserLine
                                                        size={24}
                                                        color="#252525"
                                                        className='me-2'
                                                    />
                                                    Account
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </Drawer>
                                {/* __________________________________________________________________________________________________________ */}
                                {/* Right Admin Profile ______________________________________________________________________________________ */}
                                <div className='flex justify-end items-center'>
                                    <div className="flex-none gap-2">
                                        <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="">
                                            <div className="flex gap-2 items-center justify-between h-[48px] bg-[#F1F1F1] border border-[#E0E0E0] rounded-[64px] p-1 mt-2">
                                                <div className='flex gap-2 items-center'>
                                                    {
                                                        mainProfileImage ? <Image
                                                            width={'40px'}
                                                            height={'40px'}
                                                            className="rounded-full"
                                                            src={mainProfileImage}
                                                            fallback={fallbackImage}
                                                            preview={false}
                                                            alt="profile-image"
                                                        /> : <Image
                                                                width={'40px'}
                                                                height={'40px'}
                                                                className="rounded-full"
                                                                src={user.photoURL}
                                                                fallback={fallbackImage}
                                                                preview={false}
                                                                alt="profile-image"
                                                            /> 
                                                    }
                                                    <h2>{userFirstName}</h2>
                                                </div>
                                                <div>
                                                    <RiArrowDownSLine
                                                        size={24} // set custom `width` and `height`
                                                        color="#252525" // set `fill` color
                                                    />
                                                </div>
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