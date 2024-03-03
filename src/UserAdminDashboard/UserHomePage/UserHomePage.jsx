import { ClipboardDocumentListIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import BlogComponents from '../BlogPostPage/BlogComponents';
import { AuthContext } from '../UserAdminHomePage/UserAdminHomePage';
import UserArtistComponentForHomePage from '../UserArtistPage/UserArtistComponentForHomePage';
import PendingMusicComponent from './PendingMusicComponent';
import './UserHomePage.css';

const UserHomePage = () => {

    const { userNameIdRoll} = useContext(AuthContext)

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
                <PendingMusicComponent/>
                {/* Blog Post Component Start ________________________________________________________________ */}
                <div className="flex items-center py-3">
                    <DocumentMagnifyingGlassIcon className="h-5 w-5 text-slate-500 me-2"/>
                    <p className="text-sm font-semibold text-slate-500">Blog Post</p>
                </div>
                <BlogComponents/>
                {/* Blog Post Component End ________________________________________________________________ */}
            </div>

            {/* Blog Post Div  _______________________________*/}
            <div className="md:basis-1/4">
                <div className='p-2 border-b'>
                    <h4 className='flex items-center font-bold text-lg text-slate-500'> <ClipboardDocumentListIcon className='w-6 h-6 me-2 text-slate-500'/> Blog Post</h4>
                </div>
            </div>
        </div>
    );
};

export default UserHomePage;