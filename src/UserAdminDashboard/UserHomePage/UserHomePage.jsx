import { BellIcon } from '@heroicons/react/24/solid';
import './UserHomePage.css';

const UserHomePage = () => {
    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r p-2'>
                    <div className='home_banner_image'>
                        <div className='h-full bg-gradient-to-r from-[#EF4136] '>
                            <div className='p-3 h-full flex items-end '>
                                <div>
                                    <h1 className='text-xl font-bold'>Dream Records Private Limited</h1>
                                    <p className='font-semibold text-sm text-white'>Create and manage releases</p>
                                    <div className='py-1'>
                                        <button className='btn btn-neutral py-1 rounded-full btn-sm border-none me-2'>Create</button>
                                        <button className='btn btn-neutral py-1 rounded-full btn-sm border-none '>Releases</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>

            {/* Blog Post Div  _______________________________*/}
            <div className="p-2 md:basis-1/4">
                <h4 className='flex items-center font-bold text-lg text-slate-500 border-b'> <BellIcon className='w-6 h-6 me-2 text-slate-500'/> Blog Post</h4>
            </div>
        </div>
    );
};

export default UserHomePage;