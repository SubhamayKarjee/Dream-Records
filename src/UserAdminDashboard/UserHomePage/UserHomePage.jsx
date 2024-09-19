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
import { BellAlertIcon } from '@heroicons/react/24/outline';
import { DocumentCheckIcon, PlusIcon } from '@heroicons/react/24/outline';

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
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r p-2 bg-[#FCFCFC] border-right md:pt-16'>
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
            <div className="md:basis-1/4 hidden md:block bg-white md:pt-16 px-2">
            <h3 className='font-semibold text-xl pb-2'>Notices</h3>
                    {
                        getDataLoading && <div className="flex justify-center items-center my-2"><span className="loading loading-spinner loading-sm me-2"></span></div>
                    }
                <div className='flex bg-[#F2F2F2] rounded-md'>
                    <BellAlertIcon className='w-12 h-12 ps-1 '/>
                    <div className=''>
                        <div style={{cursor: 'pointer'}} onClick={() => navigate(`/notice/661089403281a4347e1d3498`)} className="p-2">
                            <p className=" font-semibold text-[#252525]">{noticeData?.noticeTitle}</p>
                            <p className="text-[#71717A]">{noticeData?.noticeDescription.slice(0, 50)}...</p>
                            <div className='flex justify-between items-center pt-2'>
                                <p className="text-sm text-[#71717A]">{noticeData?.date}</p>
                                <p className="text-sm text-[#71717A]">{noticeData?.time}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pt-3'>
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
                
            </div>
        </div>
    );
};

export default UserHomePage;