import { BellAlertIcon, BellIcon } from "@heroicons/react/24/solid";
import { Drawer } from "antd";
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import ActionRequiredRelease from "../ReleasesPage/ActionRequiredRelease";
import './CreateMusicPage.css';

export const ReleaseContext = createContext();

const CreateMusicPage = () => {


    const [releaseFormData, setReleaseFormData] = useState()

    const [firstStep, setFirstStep] = useState();
    const [secondStep, setSecondStep] = useState();
    const [artist, setArtist] = useState();
    const [labels, setLabels] = useState();
    const [audioData, setAudioData] = useState();
    const [lyricsLanguage, setLyricsLanguage] = useState();
    const [composer, setComposer] = useState(null);
    const [authors, setAuthors] = useState(null);
    const [featuring, setFeaturing] = useState();
    const [genre, setGenre] = useState();
    const [uploadedImageLink, setUploadedImageLink] = useState('');
    const [uploadedImage, setUploadedImage] = useState();
    const [format, setFormat] = useState()
    
    
    const releaseContextValue = {
        releaseFormData, setReleaseFormData,
        firstStep, setFirstStep,
        secondStep, setSecondStep,
        artist, setArtist,
        labels, setLabels,
        audioData, setAudioData,
        lyricsLanguage, setLyricsLanguage,
        composer, setComposer,
        authors, setAuthors,
        featuring, setFeaturing,
        genre, setGenre,
        uploadedImageLink, setUploadedImageLink,
        uploadedImage, setUploadedImage,
        format, setFormat
    }

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

   


    
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
            <div className="md:basis-1/4 hidden md:block">
                <div className='p-2 border-b'>
                    <h4 className='flex items-center font-bold text-lg text-slate-500'> <BellIcon className='w-6 h-6 me-2 text-slate-500'/> Notification</h4>
                    <ActionRequiredRelease onClose={onClose}/>
                </div>
            </div>
            {/* Sideber Div Mobile _______________________________*/}
            <BellAlertIcon onClick={showDrawer} className='w-10 h-10 p-2 text-slate-500 bg-white rounded-full border block md:hidden fixed top-[50%] right-4 pointer'/>
            <Drawer className='bg-white' title="Notification" onClose={onClose} open={open}>
                <ActionRequiredRelease onClose={onClose}/>
            </Drawer>
        </div>
    );
};

export default CreateMusicPage;