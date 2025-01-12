import { Result } from "antd";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";
import { AuthContext } from "../../UserAdminHomePage/UserAdminHomePage";
import MainNotices from "../../UserCommonComponent/MainNotices";
import MainNoticesMobile from "../../UserCommonComponent/MainNoticesMobile";

export const EditReleaseContext = createContext();

const EditReleaseMainPage = () => {

    // const customData = [{
    //     _id: "673a17dc81efade8917e7f01",
    //     userName: "Mehedi(dev)",
    //     releaseTitle: "Gg",
    //     imgUrl: "https://dream-records-2024.s3.ap-south-1.amazonaws.com/release-image/1731860207816-74252537-received_563886096588336.png",
    //     key: "release-image/1731860207816-74252537-received_563886096588336.png",
    //     genre: "Blues",
    //     pLine: "Yy",
    //     cLine: "Ty",
    //     UPC: "ff",
    //     releaseDate: "2024-11-21",
    //     status: "Approved",
    //     masterUserId: "662b71650a78738b0334837f",
    //     actionReqHistory: ['jkhgjhgkjhkjhkljh', 'kjhghgkg'],
    //     actionRequired: "",
    //     format: "Single",
    //     tracks: [
    //         {
    //             ISRC: "ff",
    //             albumName: "Dd",
    //             artist: [
    //                 { 
    //                     _id: "66f3f4a79b1f85c4a3a588b8",
    //                     appleId: "apple.com",
    //                     artistName: "Artist",
    //                     facebook: "facebook.com",
    //                     imgUrl: "https://dream-records-2024.s3.ap-south-1.amazonaws.com/artist-image/1727263891155-580896161-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     instagramId: "instagram.com",
    //                     key: "artist-image/1727263891155-580896161-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     masterUserId: "662b71650a78738b0334837f",
    //                     spotifyId: "spotify.com",
    //                     userName: "Mehedi(dev)",
    //                     youtube: "youtube.com",
    //                 },
    //                 { 
    //                     _id: "66f3f4a79b1f85c4a3a588b9",
    //                     appleId: "apple.com",
    //                     artistName: "update artist",
    //                     facebook: "facebook.com",
    //                     imgUrl: "https://dream-records-2024.s3.ap-south-1.amazonaws.com/artist-image/1727263891155-580896161-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     instagramId: "instagram.com",
    //                     key: "artist-image/1727263891155-580896161-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     masterUserId: "662b71650a78738b0334837f",
    //                     spotifyId: "spotify.com",
    //                     userName: "Mehedi(dev)",
    //                     youtube: "youtube.com",
    //                 }
    //             ],
    //             audioKey: "release-audio/1731860402889-643468749-twisterion-b1-221376.wav",
    //             audioName: "twisterion-b1-221376.wav",
    //             audioUrl: "https://dream-records-2024.s3.ap-south-1.amazonaws.com/release-audio/1731860402889-643468749-twisterion-b1-221376.wav",
    //             authors: [
    //                 { 
    //                     _id: "66f3f4a79b1f85c4a3a588b8",
    //                     appleId: "apple.com",
    //                     artistName: "Artist",
    //                     facebook: "facebook.com",
    //                     imgUrl: "https://dream-records-2024.s3.ap-south-1.amazonaws.com/artist-image/1727263891155-580896161-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     instagramId: "instagram.com",
    //                     key: "artist-image/1727263891155-580896161-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     masterUserId: "662b71650a78738b0334837f",
    //                     spotifyId: "spotify.com",
    //                     userName: "Mehedi(dev)",
    //                     youtube: "youtube.com",
    //                 },
    //                 { 
    //                     _id: "66f3f4a79b1f85c4a3a588b9",
    //                     appleId: "apple.com",
    //                     artistName: "update artist",
    //                     facebook: "facebook.com",
    //                     imgUrl: "https://dream-records-2024.s3.ap-south-1.amazonaws.com/artist-image/1727263891155-580896161-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     instagramId: "instagram.com",
    //                     key: "artist-image/1727263891155-580896161-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     masterUserId: "662b71650a78738b0334837f",
    //                     spotifyId: "spotify.com",
    //                     userName: "Mehedi(dev)",
    //                     youtube: "youtube.com",
    //                 },
    //             ],
    //             composer: ['Dd Xx'],
    //             featuring: [
    //                 { 
    //                     _id: "66f3f4a79b1f85c4a3a588b8",
    //                     appleId: "apple.com",
    //                     artistName: "Artist",
    //                     facebook: "facebook.com",
    //                     imgUrl: "https://dream-records-2024.s3.ap-south-1.amazonaws.com/artist-image/1727263891155-580896161-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     instagramId: "instagram.com",
    //                     key: "artist-image/1727263891155-580896161-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     masterUserId: "662b71650a78738b0334837f",
    //                     spotifyId: "spotify.com",
    //                     userName: "Mehedi(dev)",
    //                     youtube: "youtube.com",
    //                 },
    //                 { 
    //                     _id: "66f3f4a79b1f85c4a3a588b9",
    //                     appleId: "apple.com",
    //                     artistName: "update artist",
    //                     facebook: "facebook.com",
    //                     imgUrl: "https://dream-records-2024.s3.ap-south-1.amazonaws.com/artist-image/1727263891155-580896161-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     instagramId: "instagram.com",
    //                     key: "artist-image/1727263891155-580896161-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     masterUserId: "662b71650a78738b0334837f",
    //                     spotifyId: "spotify.com",
    //                     userName: "Mehedi(dev)",
    //                     youtube: "youtube.com",
    //                 }
    //             ],
    //             format: "Single",
    //             labels: [
    //                 {
    //                     _id: "6693be9f0a78738b03348998",
    //                     actionRequird: "",
    //                     description: "New Description",
    //                     imgUrl: "https://dream-records-2024.s3.ap-south-1.amazonaws.com/label-image/1720958600094-274869658-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     key: "label-image/1720958600094-274869658-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     labelName: "Demo Label",
    //                     masterUserId: "662b71650a78738b0334837f",
    //                     status: "Approved",
    //                     userName: "Mehedi(dev)",
    //                     youtubeChannelLink: "Youtube.com",
    //                 },
    //                 {
    //                     _id: "6693be9f0a78738b03348999",
    //                     actionRequird: "",
    //                     description: "New Description another",
    //                     imgUrl: "https://dream-records-2024.s3.ap-south-1.amazonaws.com/label-image/1720958600094-274869658-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     key: "label-image/1720958600094-274869658-entertainment-2015-03-zayn-malik-one-direction-main.webp",
    //                     labelName: "Demo Label another",
    //                     masterUserId: "662b71650a78738b0334837f",
    //                     status: "Approved",
    //                     userName: "Mehedi(dev)",
    //                     youtubeChannelLink: "Youtube.com",
    //                 },
    //             ],
    //             lyricsLanguage: "Italian"
    //         },
    //     ]
    // }];



    




    const {id} = useParams();
    const [releaseId] = useState(id)

    const [preReleaseData, setPreReleaseData] = useState();
    const [firstStep, setFirstStep] = useState();
    const [secondStep, setSecondStep] = useState();
    const [audioData, setAudioData] = useState();
    const [lyricsLanguage, setLyricsLanguage] = useState();
    const [genre, setGenre] = useState();
    const [uploadedImageLink, setUploadedImageLink] = useState('');
    const [uploadedImage, setUploadedImage] = useState();
    const [format, setFormat] = useState()

    const releaseContextValue = {
        releaseId,
        preReleaseData, setPreReleaseData,
        firstStep, setFirstStep,
        secondStep, setSecondStep,
        audioData, setAudioData,
        lyricsLanguage, setLyricsLanguage,
        genre, setGenre,
        uploadedImageLink, setUploadedImageLink,
        uploadedImage, setUploadedImage,
        format, setFormat
    }

    const { 
        setArtist, 
        setLabels, 
        setFeaturing,
        setAuthors,
        setComposer,
    } = useContext(AuthContext);


    const [loading, setLoading] = useState(false)
    useEffect(() => {
        
        setLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/single/${id}`)
            .then( res => {
              if(res.status == 200){
                setLoading(false)
                setPreReleaseData(res.data.data[0]);
                setUploadedImageLink(res.data.data[0].imgUrl)
                const imgUrl = res.data.data[0].imgUrl;
                const key = res.data.data[0].key;
                setUploadedImage({imgUrl, key})
                setSecondStep(res.data.data[0].tracks)
                setFormat(res.data.data[0].format)
                if(res.data.data[0].format === 'Single'){
                    setArtist(res.data.data[0].tracks[0].artist)
                    setLabels(res.data.data[0].tracks[0].labels)
                    setFeaturing(res.data.data[0].tracks[0].featuring)
                    setAuthors(res.data.data[0].tracks[0].authors)
                    setComposer(res.data.data[0].tracks[0].composer)
                    setLyricsLanguage(res.data.data[0].tracks[0].lyricsLanguage)
                    const audioKey = res.data.data[0].tracks[0].audioKey
                    const audioName = res.data.data[0].tracks[0].audioName
                    const audioUrl = res.data.data[0].tracks[0].audioUrl
                    const aData = {audioKey, audioName, audioUrl}
                    setAudioData(aData)
                }
              }
            })
            .catch(er => console.log(er));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

 

    if(loading){
        return <LoadingComponentsInsidePage/>
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
                <EditReleaseContext.Provider value={releaseContextValue}>
                    {
                        preReleaseData && <Outlet/>
                    }
                    {
                        !preReleaseData && 
                        <div>
                            <Result
                                title="Something went wrong"
                            />
                            <p>Please Go Back to release page and Edit Release Step by Step. Please don&apos;t reload the site when you updateting Release. If you reload the site when you updateing then you have to edit release again</p>
                        </div>
                    }
                </EditReleaseContext.Provider>
            </div>

            {/* Notification Div Mobile _______________________________*/}
            <MainNoticesMobile/>

            {/* Notification Div Desktop _______________________________*/}
            <div style={sideBarShadow} className="md:basis-1/4 hidden md:block bg-white md:pt-16 px-3">
                <h3 className='font-semibold text-xl pb-2'>Notices</h3>
                <MainNotices/>
            </div>
        </div>
    );
};

export default EditReleaseMainPage;