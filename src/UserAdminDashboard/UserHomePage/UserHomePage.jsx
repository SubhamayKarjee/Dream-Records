import { Image } from 'antd';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../UserAdminHomePage/UserAdminHomePage';
import UserArtistComponentForHomePage from '../UserArtistPage/UserArtistComponentForHomePage';
import LatestApprovedRelease from './LatestApprovedRelease';
import './UserHomePage.css';
import fallbackImage from '../../assets/fallbackImage.jpg'

const UserHomePage = () => {

    const { userNameIdRoll} = useContext(AuthContext);

    const navigate = useNavigate()

    const [imageData, setImageData] = useState();
    const [getImageLoading, setGetImageLoading] = useState(false)

    useEffect(() => {
        setGetImageLoading(true)
        axios.get(`http://localhost:5000/admin/api/v1/advertisment/66106c5bcda450b5173c46d8`)
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
        axios.get(`http://localhost:5000/admin/api/v1/notice/661089403281a4347e1d3498`)
        .then(res => {
            if(res.status === 200){
                setGetDataLoading(false)
                setNoticeData(res.data.data)
            }
        })
    },[])
    
    return (
        <div className="md:flex md:h-full">
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
                                    <button className='btn btn-neutral py-1 rounded-full btn-sm border-none me-2'>Create</button>
                                    <button className='btn btn-neutral py-1 rounded-full btn-sm border-none '>Releases</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UserArtistComponentForHomePage/>
                <LatestApprovedRelease/>
            </div>

            {/* Blog Post Div  _______________________________*/}
            <div className="md:basis-1/4">
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
                        <p className="text-slate-500 text-sm font-bold bg-green-200 p-2 rounded-md">Current Notice {noticeData?.date} || {noticeData?.time}</p>
                        <div style={{cursor: 'pointer'}} onClick={() => navigate(`/notice/661089403281a4347e1d3498`)} className="p-2">
                            <p className="text-sm text-slate-500 font-bold">{noticeData?.noticeTitle}</p>
                            <p className="text-xs text-slate-500">{noticeData?.noticeDescription.slice(0, 50)}...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHomePage;