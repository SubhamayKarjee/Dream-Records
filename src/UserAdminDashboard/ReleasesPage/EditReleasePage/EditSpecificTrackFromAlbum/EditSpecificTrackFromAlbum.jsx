/* eslint-disable react/prop-types */
import { ArrowsUpDownIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Image, Modal, Select } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ArtistList from "../../../CreateMusicPage/artistListComponent/ArtistList";
import FeaturingComponent from "../../../CreateMusicPage/FeaturingComponent/FeaturingComponent";
import LabelsList from "../../../CreateMusicPage/labelsListComponent/LabelsList";
import { AuthContext } from "../../../UserAdminHomePage/UserAdminHomePage";
import fallbackImage from '../../../../assets/fallbackImage/commonDefaultImage.png'
import { EditReleaseContext } from "../EditReleaseMainPage";
import AuthorList from '../../../CreateMusicPage/authorListComponent/AuthorList'
import ComposerList from '../../../CreateMusicPage/composerListComponent/ComposerList'

// eslint-disable-next-line react/prop-types
const EditSpecificTrackFromAlbum = ({track, index}) => {

    const { 
        firstStep,
        secondStep,
        audioData, setAudioData,
        lyricsLanguage, setLyricsLanguage,
        format,
        releaseId,
    } = useContext(EditReleaseContext);

    const { 
        artist, setArtist, 
        labels, setLabels, 
        featuring, setFeaturing,
        authors, setAuthors,
        composer, setComposer,
    } = useContext(AuthContext);

    useEffect( () => {
            setArtist(track.artist)
            setLabels(track.labels)
            setFeaturing(track.featuring)
            setAuthors(track.authors)
            setComposer(track.composer)
            setLyricsLanguage(track.lyricsLanguage)
            const audioKey = track.audioKey
            const audioName = track.audioName
            const audioUrl = track.audioUrl
            const aData = {audioKey, audioName, audioUrl}
            setAudioData(aData)
    },[])


    const navigate = useNavigate('');

    // Get Language select Option Form API__________________________
    const [options, setOptions] = useState([]);
    useEffect( () => {
        axios.get('https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/language')
        .then(res => {
            setOptions(res.data.data);
        })
    },[])

    const [reFetchArtist, setRefetchArtist] = useState(1)
    const [reFetchLabels, setRefetchLabels] = useState(1)
    const [reFetchAuthor, setRefetchAuthor] = useState(1)
    const [reFetchComposer, setRefetchComposer] = useState(1)

    // Modal Function For Featuring __________________________________
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        const re = reFetchArtist + 1;
        setRefetchArtist(re)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        const re = reFetchArtist + 1;
        setRefetchArtist(re)
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        const re = reFetchArtist + 1;
        setRefetchArtist(re)
        setIsModalOpen(false);
    };

    const removeFeaturing = (id) => {
        const deleteFeaturing = featuring.filter(a => a._id !== id);
        setFeaturing(deleteFeaturing)
    }

    // Modal Function For Artist __________________________________
    const [errorMessageArtist, setErrorMessageArtist] = useState('');
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const showModal1 = () => {
        const re = reFetchArtist + 1;
        setRefetchArtist(re)
        setIsModalOpen1(true);
    };
    const handleOk1 = () => {
        const re = reFetchArtist + 1;
        setRefetchArtist(re)
        setIsModalOpen1(false);
    };
    const handleCancel1 = () => {
        const re = reFetchArtist + 1;
        setRefetchArtist(re)
        setIsModalOpen1(false);
    };

    const removeArtist = (id) => {
        const deleteArtist = artist.filter(a => a._id !== id);
        setArtist(deleteArtist)
    }

    // Modal Function For Label __________________________________
    const [errorMessageLabels, setErrorMessageLabels] = useState('');
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const showModal2 = () => {
        const re = reFetchLabels + 1;
        setRefetchLabels(re)
        setIsModalOpen2(true);
    };
    const handleOk2 = () => {
        const re = reFetchLabels + 1;
        setRefetchLabels(re)
        setIsModalOpen2(false);
    };
    const handleCancel2 = () => {
        const re = reFetchLabels + 1;
        setRefetchLabels(re)
        setIsModalOpen2(false);
    };

    const removeLabels = (id) => {
        const deleteLabels = labels.filter(l => l._id !== id);
        setLabels(deleteLabels)
    }

    // Modal Function For Author __________________________________
    const [errorMessageAuthor, setErrorMessageAuthor] = useState('');
    const [isModalOpenAuthor, setIsModalOpenAuthor] = useState(false);
    const showModalAuthor = () => {
        const re = reFetchAuthor + 1;
        setRefetchAuthor(re)
        setIsModalOpenAuthor(true);
    };
    const handleOkAuthor = () => {
        const re = reFetchAuthor + 1;
        setRefetchAuthor(re)
        setIsModalOpenAuthor(false);
    };
    const handleCancelAuthor = () => {
        const re = reFetchAuthor + 1;
        setRefetchAuthor(re)
        setIsModalOpenAuthor(false);
    };

    const removeAuthor = (id) => {
        const deleteAuthor = authors.filter(l => l._id !== id);
        setAuthors(deleteAuthor)
    }


    // Modal Function For Composer __________________________________
    const [errorMessageComposer, setErrorMessageComposer] = useState('');
    const [isModalOpenComposer, setIsModalOpenComposer] = useState(false);
    const showModalComposer = () => {
        const re = reFetchComposer + 1;
        setRefetchComposer(re)
        setIsModalOpenComposer(true);
    };
    const handleOkComposer = () => {
        const re = reFetchComposer + 1;
        setRefetchComposer(re)
        setIsModalOpenComposer(false);
    };
    const handleCancelComposer = () => {
        const re = reFetchComposer + 1;
        setRefetchComposer(re)
        setIsModalOpenComposer(false);
    };

    const removeComposer = (id) => {
        const deleteComposer = composer.filter(l => l._id !== id);
        setComposer(deleteComposer)
    }
    
    // Handle Lyrics Language Select Input _________________________
    const [languageErr, setLanguageErr] = useState('')
    const onChange = (value) => {
        setLyricsLanguage(value)
    };
    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // Handle Audio State _______________________________________
    const [errorMessageAudio, setErrorMessageAudio] = useState('');
    // FROM SUBMIT FUNCTION_______________________________________
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, reset, formState: { errors }} = useForm({
        defaultValues: secondStep[0]
    });
    const onSubmit = (data) => {
        // console.log(data);
        setErrorMessageArtist('');
        setErrorMessageLabels('');
        setErrorMessageAudio('');
        setLanguageErr('');
        // Audio File Error Handle ________________________________________
        if(!audioData){
            setErrorMessageAudio('Audio Required')
            return;
        }
        
        // Lyrics Language Error Handle ___________________________________
        if(!lyricsLanguage){
            setLanguageErr('Language Required')
            return;
        }
        // Artist Error Handle ____________________________________________
        if(artist.length === 0){
            setErrorMessageArtist('Artist Required')
            return;
        }
        // Labels Error Handle ____________________________________________
        if(labels.length === 0){
            setErrorMessageLabels('Labels Required')
            return;
        }
        // Author Error Handle ____________________________________________
        if(authors.length === 0){
            setErrorMessageAuthor('Author Required')
            return;
        }
        // Composer Error Handle ____________________________________________
        if(composer.length === 0){
            setErrorMessageComposer('Composer Required')
            return;
        }
        
        const updatedTrack = { index: index, ISRC:data?.ISRC, albumName:data?.albumName, ...audioData, lyricsLanguage, artist, labels, featuring, composer, authors}
        console.log(updatedTrack)
        // setArtist([])
        // setFeaturing([])
        // setLabels([])
        // setAuthors([])
        // setComposer([])
        // setAudioData()
        // reset()
        // setIsTrackUploadModal(false)

 
    };

    // Handle Audio Upload AWS______________________________________________________
    const [errorMessage, setErrorMessage] = useState('');
    const [uploadLoading, setUploadLoading] = useState(false)

    const releaseAudioUpload = (event) => {
        if(!event){
            return;
        }
        setErrorMessage('')
        setUploadLoading(true)
        const file = event.target.files[0];
        if(file.type !== 'audio/wav' && file.type !== 'audio/x-wav'){
            setErrorMessage('Please Select WAV file')
            setUploadLoading(false)
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        if(audioData?.audioKey){
            axios.delete(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/delete-file?key=${audioData.audioKey}`)
            .then( res => {
            if(res.status == 200){
                setAudioData()
            }
            })
            .catch(er => console.log(er));
        }
    
        axios.post('https://shark-app-65c5t.ondigitalocean.app/api/v1/release/upload-release-audio', formData)
            .then(res => {
                if(res.status == 200){
                    event.target.value = ''
                    setUploadLoading(false);
                    setAudioData(res.data.data);
                    toast.success('Uploaded Audio')
                }
            })
            .catch(er => console.log(er))
    }
    // Delete Audio AWS____________________________________________________________
    const handleDeleteAudio = (e) => {
        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/delete-file?key=${e}`)
        .then( res => {
          if(res.status == 200){
            setAudioData('')
            toast.success('Deleted Audio!')
          }
        })
        .catch(er => console.log(er));
    }

    const inputStyle = {
        height: '36px',
        border: '1px solid #E2E8F0'
    }
    return (
        <div>
            <div>
                {/* Audio Upload ____________________ */}
                <div className="">
                    <p className="mt-3 mb-1 text-sm font-semibold text-[#09090B]">Upload <span className="text-red-500">*</span></p>
                    {
                        audioData && 
                            <div className="my-3">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p>{audioData.audioName}</p>
                                        <audio controls src={audioData.audioUrl}></audio>
                                    </div>
                                    <button onClick={() => handleDeleteAudio(audioData.key)}><TrashIcon className="w-6 h-6"/></button>
                                </div>
                            </div>
                    }
                    <div className="flex items-center ">
                        {
                            uploadLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                        }
                        <input type="file" id="audioUpload" name='audio' onChange={releaseAudioUpload} />   
                    </div>
                    <p className="text-sm text-[#71717A]">Audio Formate Only Allow WAV</p>                     
                    {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}
                    {errorMessageAudio && <p className="font-bold text-red-500">{errorMessageAudio}</p>}
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="mt-3 mb-1 text-sm font-semibold text-[#09090B]">Album Name <span className="text-red-500">*</span></p>
                    {
                        format === 'Album' &&
                        <input style={inputStyle} type="text" className="input input-sm w-full mt-1" placeholder="Enter the Album name here" {...register("albumName", { required: true})}/>
                    }
                    {
                        format !== 'Album' &&
                        <input style={inputStyle} value={firstStep.releaseTitle} type="text" className="input input-sm w-full mt-1" placeholder="Enter the Album name here" {...register("albumName", { required: true})} readOnly/>
                    }
                    {errors.albumName && <span className='text-red-600 pt-2 block'>Album Name Required</span>} 
                    
                    

                    {/* Select Language ____________________ */}
                    <p className="mb-1 text-sm font-semibold text-[#09090B] mt-3">Lyrics language <span className="text-red-500">*</span></p>
                    <Select
                        showSearch
                        className="w-full h-9 text-normal"
                        placeholder="Select Language"
                        defaultValue={lyricsLanguage}
                        optionFilterProp="children"
                        onChange={onChange}
                        filterOption={filterOption}
                        options={options.map(option => ({ value: option.language, label: option.language }))}
                    />
                    {languageErr && <span className='text-red-600 pt-2 block'>{languageErr}</span>}

                    {/* Artist Select Option ______________________________________________________________ */}
                    <div className="">
                        <p className="mb-1 text-sm font-semibold text-[#09090B] mt-3">Artist <span className="text-red-500">*</span></p>
                        {
                            artist && artist.map(data => 
                                <div key={data._id} className="flex items-center justify-between my-1 py-1 px-2 rounded-md bg-[#F2F2F2]">
                                    <div className="flex items-center">
                                            <Image
                                            width={35}
                                            height={35}
                                            className="rounded-md"
                                            src={data.imgUrl}
                                            fallback={fallbackImage}
                                            preview={false}
                                            />
                                        <div className="ps-2">
                                        <h2 className="font-bold text-sm">{data.artistName}</h2>
                                        <p className="text-xs text-slate-400">ID: {data._id}</p>
                                        </div>
                                    </div>
                                    <span style={{cursor: 'pointer'}} onClick={() => removeArtist(data._id)}><XMarkIcon className="w-5 h-5 text-red-500"/></span>
                                </div>
                            )
                        }

                        <div onClick={showModal1} style={{cursor: 'pointer'}} className="h-9 w-full border rounded-md px-3 flex items-center justify-between">
                            <span className="text-sm text-[#9c9c9c]">Add Artist</span>
                            <ArrowsUpDownIcon className="h-4 w-4 text-[#9c9c9c]"/>
                        </div>

                            <Modal title="Search/Select Artist" className='relative' open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1} footer={[]}>
                                <p className="text-xs bg-slate-100 mb-2 rounded-md py-1 px-3">You can add multiple Artist</p>
                                <div>
                                    <a className="btn btn-xs btn-neutral rounded-full absolute top-4 right-12" href="https://app.dreamrecords.in/create-artist" target={'_blank'}>Add Artist</a>
                                    <ArtistList handleCancel={handleCancel1} reFetchArtist={reFetchArtist}/>
                                </div>
                            </Modal>
                        {errorMessageArtist && <span className='text-red-600 pt-2 block'>{errorMessageArtist}</span>}
                    </div>

                    {/* Label Select Option ______________________________________________________________ */}
                    <div className="">
                        <p className="mb-1 text-sm font-semibold text-[#09090B] mt-3">Label <span className="text-red-500">*</span></p>
                        {
                            labels && labels.map(data => 
                                <div key={data._id} className="flex items-center justify-between my-1 py-1 px-2 rounded-md bg-[#F2F2F2]">
                                    <div className="flex items-center">
                                            <Image
                                            width={35}
                                            height={35}
                                            className="rounded-md"
                                            src={data.imgUrl}
                                            fallback={fallbackImage}
                                            preview={false}
                                            />
                                        <div className="ps-2">
                                        <h2 className="font-bold text-sm">{data.labelName}</h2>
                                        <p className="text-xs text-slate-400">ID: {data._id}</p>
                                        </div>
                                    </div>
                                    <span style={{cursor: 'pointer'}} onClick={() => removeLabels(data._id)}><XMarkIcon className="w-5 h-5 text-red-500"/></span>
                                </div>
                            )
                        }
                        <div onClick={showModal2} style={{cursor: 'pointer'}} className="h-9 w-full border rounded-md px-3 flex items-center justify-between">
                            <span className="text-sm text-[#9c9c9c]">Add Labels</span>
                            <ArrowsUpDownIcon className="h-4 w-4 text-[#9c9c9c]"/>
                        </div>
                            <Modal title="Search/Select Label" className="relative" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} footer={[]}>
                                <p className="text-xs bg-slate-100 mb-2 rounded-md py-1 px-3">Select Label</p>
                                <div>
                                    <a className="btn btn-xs btn-neutral rounded-full absolute top-4 right-12" href="https://app.dreamrecords.in/create-labels" target={'_blank'}>Add Labels</a>
                                    <LabelsList handleCancel={handleCancel2} reFetchLabels={reFetchLabels}/>
                                </div>
                            </Modal>
                        {errorMessageLabels && <span className='text-red-600 pt-2 block'>{errorMessageLabels}</span>}
                    </div>

                    {/* Select Featuring ___________________________________ */}
                    <div className="">
                        <p className="mb-1 text-sm font-semibold text-[#09090B] mt-3">Featuring</p>
                        {
                            featuring && featuring.map(data => 
                                <div key={data._id} className="flex items-center justify-between my-1 py-1 px-2 rounded-md bg-[#F2F2F2]">
                                    <div className="flex items-center">
                                            <Image
                                            width={35}
                                            height={35}
                                            className="rounded-md"
                                            src={data.imgUrl}
                                            fallback={fallbackImage}
                                            preview={false}
                                            />
                                        <div className="ps-2">
                                        <h2 className="font-bold text-sm">{data.artistName}</h2>
                                        <p className="text-xs text-slate-400">ID: {data._id}</p>
                                        </div>
                                    </div>
                                    <span className="me-2" style={{cursor: 'pointer'}} onClick={() => removeFeaturing(data._id)}><XMarkIcon className="w-5 h-5 text-red-500"/></span>
                                </div>
                            )
                        }
                        <div onClick={showModal} style={{cursor: 'pointer'}} className="h-9 w-full border rounded-md px-3 flex items-center justify-between">
                            <span className="text-sm text-[#9c9c9c]">Add Featuring</span>
                            <ArrowsUpDownIcon className="h-4 w-4 text-[#9c9c9c]"/>
                        </div>
                            <Modal title="Search/Select Featuring"className="relative" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                                <p className="text-xs bg-slate-100 mb-2 rounded-md py-1 px-3">You can add multiple Featuring</p>
                                <div>
                                    <a className="btn btn-xs btn-neutral rounded-full absolute top-4 right-12" href="https://app.dreamrecords.in/create-artist" target={'_blank'}>Add Featuring</a>
                                    <FeaturingComponent handleCancel={handleCancel} reFetchArtist={reFetchArtist}/>
                                </div>
                            </Modal>
                    </div>

                    {/* Select Author ___________________________________ */}
                    <div className="">
                        <p className="mb-1 text-sm font-semibold text-[#09090B] mt-3">Authors <span className="text-red-500">*</span></p>
                        {
                            authors && authors.map(data => 
                                <div key={data._id} className="flex items-center justify-between my-1 py-1 px-2 rounded-md bg-[#F2F2F2]">
                                    <div className="flex items-center">
                                            <Image
                                            width={35}
                                            height={35}
                                            className="rounded-md"
                                            src={data.imgUrl}
                                            fallback={fallbackImage}
                                            preview={false}
                                            />
                                        <div className="ps-2">
                                        <h2 className="font-bold text-sm">{data.artistName}</h2>
                                        <p className="text-xs text-slate-400">ID: {data._id}</p>
                                        </div>
                                    </div>
                                    <span className="me-2" style={{cursor: 'pointer'}} onClick={() => removeAuthor(data._id)}><XMarkIcon className="w-5 h-5 text-red-500"/></span>
                                </div>
                            )
                        }
                        <div onClick={showModalAuthor} style={{cursor: 'pointer'}} className="h-9 w-full border rounded-md px-3 flex items-center justify-between">
                            <span className="text-sm text-[#9c9c9c]">Add Authors</span>
                            <ArrowsUpDownIcon className="h-4 w-4 text-[#9c9c9c]"/>
                        </div>
                            <Modal title="Search/Select Authors"className="relative" open={isModalOpenAuthor} onOk={handleOkAuthor} onCancel={handleCancelAuthor} footer={[]}>
                                <p className="text-xs bg-slate-100 mb-2 rounded-md py-1 px-3">You can add multiple Authors</p>
                                <div>
                                    <a className="btn btn-xs btn-neutral rounded-full absolute top-4 right-12" href="https://app.dreamrecords.in/create-artist" target={'_blank'}>Add Authors</a>
                                    <AuthorList handleCancel={handleCancelAuthor} reFetchAuthor={reFetchAuthor}/>
                                </div>
                            </Modal>
                        {errorMessageAuthor && <span className='text-red-600 pt-2 block'>{errorMessageAuthor}</span>}
                    </div>


                    {/* Select Composer ___________________________________ */}
                    <div className="">
                        <p className="mb-1 text-sm font-semibold text-[#09090B] mt-3">Composer <span className="text-red-500">*</span></p>
                        {
                            composer && composer.map(data => 
                                <div key={data._id} className="flex items-center justify-between my-1 py-1 px-2 rounded-md bg-[#F2F2F2]">
                                    <div className="flex items-center">
                                            <Image
                                            width={35}
                                            height={35}
                                            className="rounded-md"
                                            src={data.imgUrl}
                                            fallback={fallbackImage}
                                            preview={false}
                                            />
                                        <div className="ps-2">
                                        <h2 className="font-bold text-sm">{data.artistName}</h2>
                                        <p className="text-xs text-slate-400">ID: {data._id}</p>
                                        </div>
                                    </div>
                                    <span className="me-2" style={{cursor: 'pointer'}} onClick={() => removeComposer(data._id)}><XMarkIcon className="w-5 h-5 text-red-500"/></span>
                                </div>
                            )
                        }
                        <div onClick={showModalComposer} style={{cursor: 'pointer'}} className="h-9 w-full border rounded-md px-3 flex items-center justify-between">
                            <span className="text-sm text-[#9c9c9c]">Add Composer</span>
                            <ArrowsUpDownIcon className="h-4 w-4 text-[#9c9c9c]"/>
                        </div>
                            <Modal title="Search/Select Composer"className="relative" open={isModalOpenComposer} onOk={handleOkComposer} onCancel={handleCancelComposer} footer={[]}>
                                <p className="text-xs bg-slate-100 mb-2 rounded-md py-1 px-3">You can add multiple Composer</p>
                                <div>
                                    <a className="btn btn-xs btn-neutral rounded-full absolute top-4 right-12" href="https://app.dreamrecords.in/create-artist" target={'_blank'}>Add Composer</a>
                                    <ComposerList handleCancel={handleCancelComposer} reFetchComposer={reFetchComposer}/>
                                </div>
                            </Modal>
                        {errorMessageComposer && <span className='text-red-600 pt-2 block'>{errorMessageComposer}</span>}
                    </div>
                    
                    <p className="mb-1 text-sm font-semibold text-[#09090B]">ISRC</p>
                    <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="" {...register("ISRC")}/>
                    <p className="text-xs text-[#71717A] mt-1">(if released before ISRC required otherwise optional)</p>
                    
                    {
                        format === 'Single' &&
                        <div className="my-4 flex justify-between">
                            <button onClick={() => navigate(`/releases/edit/${releaseId}`)} className="btn btn-sm px-6">Previous</button>
                            <input type="submit" value={'Next'} className="btn btn-sm px-6 h-9 btn-neutral bg-[#18181B]" />
                        </div>
                    }
                    {
                        format === 'Album' &&  
                        <input type="submit" value={'Add Track'} className="btn btn-sm px-6 h-9 btn-neutral bg-[#18181B] w-full mt-3" />
                    }
                </form>
            </div>
        </div>
    );
};

export default EditSpecificTrackFromAlbum;