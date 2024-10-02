import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import AdvertisementNotices from "../UserCommonComponent/AdvertisementNotices";
import MainNotices from "../UserCommonComponent/MainNotices";
import MainNoticesMobile from "../UserCommonComponent/MainNoticesMobile";
import './CreateMusicPage.css';

export const ReleaseContext = createContext();

const CreateMusicPage = () => {


    const [releaseFormData, setReleaseFormData] = useState()

    const [firstStep, setFirstStep] = useState();
    const [secondStep, setSecondStep] = useState([]);
    const [artist, setArtist] = useState();
    const [labels, setLabels] = useState();
    const [audioData, setAudioData] = useState();
    const [lyricsLanguage, setLyricsLanguage] = useState();
    const [composer, setComposer] = useState();
    const [authors, setAuthors] = useState();
    const [featuring, setFeaturing] = useState();
    const [genre, setGenre] = useState();
    const [uploadedImageLink, setUploadedImageLink] = useState('');
    const [uploadedImage, setUploadedImage] = useState();
    const [format, setFormat] = useState('Single')
    
    
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
   
    const sideBarShadow = {
        boxShadow: '-2px 2px 18px 0px #EFEFEF',
    }

    
    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto px-3 md:pt-16 custom-scrollbar'>
                {/* <div>
                    <button><Link className="px-2 py-1 font-semibold text-sm text-slate-500 flex items-center inline bg-slate-200 rounded-md" to={'/'}><ChevronLeftIcon className="w-4 h-4 me-1 font-bold"/>Back</Link></button>
                </div> */}
                <ReleaseContext.Provider value={releaseContextValue}>
                    <Outlet/>
                </ReleaseContext.Provider>
            </div>

            {/* Notification Div Mobile _______________________________*/}
            <MainNoticesMobile/>

            {/* Notification Div Desktop _______________________________*/}
            <div style={sideBarShadow} className="md:basis-1/4 hidden md:block bg-white md:pt-16 px-3">
                <h3 className='font-semibold text-xl pb-2'>Notices</h3>
                <MainNotices/>
                <AdvertisementNotices/>
            </div>
        </div>
    );
};

export default CreateMusicPage;