import { BellIcon } from "@heroicons/react/24/solid";
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import './CreateMusicPage.css';

export const ReleaseContext = createContext();

const CreateMusicPage = () => {


    const [releaseFormData, setReleaseFormData] = useState()
    const releaseContextValue = {
        releaseFormData,
        setReleaseFormData
    }

   


    
    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r p-2'>
                {/* <div>
                    <button><Link className="px-2 py-1 font-semibold text-sm text-slate-500 flex items-center inline bg-slate-200 rounded-md" to={'/'}><ChevronLeftIcon className="w-4 h-4 me-1 font-bold"/>Back</Link></button>
                </div> */}
                <ReleaseContext.Provider value={releaseContextValue}>
                    <Outlet/>
                </ReleaseContext.Provider>
            </div>

            {/* Blog Post Div  _______________________________*/}
            <div className="md:basis-1/4">
                <div className='p-2 border-b'>
                    <h4 className='flex items-center font-bold text-lg text-slate-500'> <BellIcon className='w-6 h-6 me-2 text-slate-500'/> Notification</h4>
                </div>
            </div>
        </div>
    );
};

export default CreateMusicPage;