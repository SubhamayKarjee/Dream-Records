import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../UserAdminHomePage/UserAdminHomePage';
import UserArtistComponentForHomePage from '../UserArtistPage/UserArtistComponentForHomePage';
import LatestApprovedRelease from './LatestApprovedRelease';
import './UserHomePage.css';
import PopUp from '../PopUP/PopUp';
import { DocumentCheckIcon, PlusIcon } from '@heroicons/react/24/outline';
import MainNotices from '../UserCommonComponent/MainNotices';
import AdvertisementNotices from '../UserCommonComponent/AdvertisementNotices';
import MainNoticesMobile from '../UserCommonComponent/MainNoticesMobile';

const UserHomePage = () => {

    const { userNameIdRoll} = useContext(AuthContext);

    const navigate = useNavigate()

    const [showPopup, setShowPopup] = useState(false);
    const hasPopupBeenShown = localStorage.getItem('popupShown');
    useEffect(() => {
        if (hasPopupBeenShown == 'false') {
            setShowPopup(true);
        }
    }, [hasPopupBeenShown]);

    const handleClosePopup = () => {
        setShowPopup(false);
        localStorage.setItem('popupShown', 'true');
    };

    const sideBarShadow = {
        boxShadow: '-2px 2px 18px 0px #EFEFEF',
    }
    
    return (
        <div className="md:flex md:h-full">
            {showPopup && <PopUp visible={showPopup} onClose={handleClosePopup} />}
            <div className='h-full md:basis-3/4 overflow-y-auto p-2 bg-[#FCFCFC] md:pt-16'>
                <h3 className='font-semibold text-xl pb-2 text-[#252525]'>Dashboard</h3>
                <div className='home_banner_image'>
                    <div className='h-full'>
                        <div className='p-4 h-full flex items-end '>
                            <div>
                                {
                                    userNameIdRoll ? <h1 className='text-xl font-bold text-white'>Hi, {userNameIdRoll[0]}</h1> : <h1 className='text-xl font-bold text-white'>No User</h1>
                                }
                                <p className='font-semibold text-sm text-white'>Welcome to Dream Records</p>
                                <div className='py-1 flex items-center'>
                                    <button onClick={() => navigate('/create-release')} className='btn btn-neutral py-1 rounded btn-sm border-none me-2 flex items-center bg-[#252525]'><PlusIcon className='w-5 h-5'/> Create</button>
                                    <button onClick={() => navigate('/releases')} className='btn btn-neutral py-1 rounded btn-sm border-none flex items-center bg-[#252525]'><DocumentCheckIcon className='w-5 h-5'/> Releases</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UserArtistComponentForHomePage/>
                <LatestApprovedRelease/>
            </div>

            {/* Notification Div Mobile _______________________________*/}
            <MainNoticesMobile/>

            {/* Notification Div Desktop _______________________________*/}
            <div style={sideBarShadow} className="md:basis-1/4 hidden md:block bg-white md:pt-16 px-2">
                <h3 className='font-semibold text-xl pb-2'>Notices</h3>
                <MainNotices/>
                <AdvertisementNotices/>
            </div>
        </div>
    );
};

export default UserHomePage;