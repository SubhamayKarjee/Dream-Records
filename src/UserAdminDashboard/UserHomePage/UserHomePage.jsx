import { Drawer, Image } from 'antd';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../UserAdminHomePage/UserAdminHomePage';
import UserArtistComponentForHomePage from '../UserArtistPage/UserArtistComponentForHomePage';
import LatestApprovedRelease from './LatestApprovedRelease';
import './UserHomePage.css';
import fallbackImage from '../../assets/fallbackImage.jpg'
import PopUp from '../PopUP/PopUp';
import { BellAlertIcon } from '@heroicons/react/24/solid';

const UserHomePage = () => {

    const { userNameIdRoll} = useContext(AuthContext);

    const navigate = useNavigate()

    const [imageData, setImageData] = useState();
    const [getImageLoading, setGetImageLoading] = useState(false)

    useEffect(() => {
        setGetImageLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/advertisment/66106c5bcda450b5173c46d8`)
        .then(res => {
            if(res.status === 200){
                setImageData(res.data.data)
                setGetImageLoading(false)
            }
        })
    },[]);


    const [noticeData, setNoticeData] = useState();
    const [getDataLoading, setGetDataLoading] = useState(false)
    useEffect(() => {
        setGetDataLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/notice/661089403281a4347e1d3498`)
        .then(res => {
            if(res.status === 200){
                setGetDataLoading(false)
                setNoticeData(res.data.data)
            }
        })
    },[])

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

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    
    return (
        <div className="md:flex md:h-full">
            {showPopup && <PopUp visible={showPopup} onClose={handleClosePopup} />}
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r p-2'>
                <div className='home_banner_image'>
                    <div className='h-full bg-gradient-to-r from-[#EF4136]'>
                        <div className='p-3 h-full flex items-end '>
                            <div>
                                {
                                    userNameIdRoll ? <h1 className='text-xl font-bold text-white'>Hi, {userNameIdRoll[0]}</h1> : <h1 className='text-xl font-bold text-white'>No User</h1>
                                }
                                <p className='font-semibold text-sm text-white'>Welcome to Dream Records</p>
                                <div className='py-1'>
                                    <button onClick={() => navigate('/create-release')} className='btn btn-neutral py-1 rounded-full btn-sm border-none me-2'>Create</button>
                                    <button onClick={() => navigate('/releases')} className='btn btn-neutral py-1 rounded-full btn-sm border-none '>Releases</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UserArtistComponentForHomePage/>
                <LatestApprovedRelease/>
            </div>

            {/* Notification Div Mobile _______________________________*/}
            <BellAlertIcon onClick={showDrawer} className='w-10 h-10 p-2 text-slate-500 bg-white rounded-full border block md:hidden fixed top-[50%] right-4 pointer'/>
            <Drawer className='bg-white' title="Notification" onClose={onClose} open={open}>
                <div onClick={onClose}>
                    {
                        getImageLoading && <div className="flex justify-center items-center my-2"><span className="loading loading-spinner loading-sm me-2"></span></div>
                    }
                    <Image
                        width={'100%'}
                        height={'auto'}
                        className="rounded-md"
                        src={imageData?.imgUrl}
                        fallback={fallbackImage}
                        preview={true}
                        alt="advertisment-image"
                    />
                </div>
                <div onClick={onClose} className='pt-2'>
                    {
                        getDataLoading && <div className="flex justify-center items-center my-2"><span className="loading loading-spinner loading-sm me-2"></span></div>
                    }
                    <div className='bg-slate-100 rounded-md'>
                        <p className="text-sm font-bold bg-green-200 p-2 rounded-md">Current Notice {noticeData?.date} || {noticeData?.time}</p>
                        <div style={{cursor: 'pointer'}} onClick={() => navigate(`/notice/661089403281a4347e1d3498`)} className="p-2">
                            <p className=" font-bold">{noticeData?.noticeTitle}</p>
                            <p className="">{noticeData?.noticeDescription.slice(0, 50)}...</p>
                        </div>
                    </div>
                </div>
            </Drawer>


            {/* Notification Div Desktop _______________________________*/}
            <div className="md:basis-1/4 hidden md:block">
                <div className='p-2 border-b'>
                    {
                        getImageLoading && <div className="flex justify-center items-center my-2"><span className="loading loading-spinner loading-sm me-2"></span></div>
                    }
                    <Image
                        width={'100%'}
                        height={'auto'}
                        className="rounded-md"
                        src={imageData?.imgUrl}
                        fallback={fallbackImage}
                        preview={true}
                        alt="advertisment-image"
                    />
                </div>
                <div className='p-2 border-b'>
                    {
                        getDataLoading && <div className="flex justify-center items-center my-2"><span className="loading loading-spinner loading-sm me-2"></span></div>
                    }
                    <div className='bg-slate-100 rounded-md'>
                        <p className="text-sm font-bold bg-green-200 p-2 rounded-md">Current Notice {noticeData?.date} || {noticeData?.time}</p>
                        <div style={{cursor: 'pointer'}} onClick={() => navigate(`/notice/661089403281a4347e1d3498`)} className="p-2">
                            <p className=" font-bold">{noticeData?.noticeTitle}</p>
                            <p className="">{noticeData?.noticeDescription.slice(0, 50)}...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHomePage;