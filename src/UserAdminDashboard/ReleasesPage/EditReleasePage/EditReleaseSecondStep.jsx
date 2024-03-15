import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Image, Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EditReleaseContext } from "./EditReleaseMainPage";
import ArtistList from "../../CreateMusicPage/artistListComponent/ArtistList";
import LabelsList from "../../CreateMusicPage/labelsListComponent/LabelsList";
import fallbackImage from '../../../assets/fallbackImage.jpg'
import { AuthContext } from "../../UserAdminHomePage/UserAdminHomePage";


const EditReleaseSecondStep = () => {


    const navigate = useNavigate('');
    const { releaseFormData, setReleaseFormData, preReleaseData } = useContext(EditReleaseContext);
    const { artist, setArtist, labels, setLabels } = useContext(AuthContext);
    const [audioData, setAudioData] = useState();

    useEffect(() => {
        const artistName = preReleaseData?.artistName;
        const artistId = preReleaseData?.artistId
        const artistImgUrl = preReleaseData?.artistImg;
        const artistImgKey = preReleaseData?.artistImgKey;
        setArtist({artistName, artistId, artistImgUrl, artistImgKey});
        const labelName = preReleaseData?.labelName;
        const labelId = preReleaseData?.labelId
        const labelImgUrl = preReleaseData?.labelImg;
        const labelImgKey = preReleaseData?.labelImgKey;
        setLabels({labelName, labelId, labelImgUrl, labelImgKey});
        const audioName = preReleaseData?.audioName;
        const audioUrl = preReleaseData?.audioUrl;
        const audioKey = preReleaseData?.audioKey;
        setAudioData({audioName, audioUrl, audioKey})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    console.log(preReleaseData);

    

    // Modal Function For Artist __________________________________
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Modal Function For Label __________________________________
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const showModal1 = () => {
        setIsModalOpen1(true);
    };
    const handleOk1 = () => {
        setIsModalOpen1(false);
    };
    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };

    const removeArtist = () => {
        setArtist()
    }
    const removeLabels = () => {
        setLabels()
    }


    const [errorMessageArtist, setErrorMessageArtist] = useState('');
    const [errorMessageLabels, setErrorMessageLabels] = useState('');
    const [errorMessageAudio, setErrorMessageAudio] = useState('');
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            albumName: preReleaseData?.albumName,
            author: preReleaseData?.author,
            lyricsLanguage: preReleaseData?.lyricsLanguage,
            composer: preReleaseData?.composer,
            ISRC: preReleaseData?.ISRC,
        }
    });
    const onSubmit = (data) => {
        if(!artist){
            setErrorMessageArtist('Artist Required')
            return;
        }
        if(!labels){
            setErrorMessageLabels('Labels Required')
            return;
        }
        if(!audioData){
            setErrorMessageAudio('Audio Required')
            return;
        }
        if(!releaseFormData){
            navigate('/create-release')
        }

        const artistId = artist._id;
        const artistName = artist.artistName;
        const artistImgUrl = artist.imgUrl;
        const artistImgKey = artist.key;
        let labelId;
        let labelName;
        let labelImgUrl;
        let labelImgKey;
        if(labels){
            labelId = labels._id;
            labelName = labels.LabelName;
            labelImgUrl = labels.imgUrl;
            labelImgKey = labels.key;
        }
        const d = {...data, ...releaseFormData, ...audioData, artistId, artistName, labelId, labelName, artistImgUrl, artistImgKey, labelImgUrl, labelImgKey}
        setReleaseFormData(d)
        console.log(d);
        // navigate('/create-release/date')
    };

    
    const [errorMessage, setErrorMessage] = useState('');
    const [uploadLoading, setUploadLoading] = useState(false)
    

    const releaseAudioUpload = (event) => {
        if(!event){
            return;
        }
        setErrorMessage('')
        setUploadLoading(true)
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
  
        console.log(file);
  
        axios.post('http://localhost:5000/api/v1/release/upload-release-audio', formData)
            .then(res => {
                if(res.status == 200){
                    event.target.value = ''
                    setUploadLoading(false);
                    setAudioData(res.data.data);
                }
            })
            .catch(er => console.log(er))
    }
    
    const handleDeleteAudio = (e) => {
        axios.delete(`http://localhost:5000/api/v1/release/delete-release-audio?audioKey=${e}`)
        .then( res => {
          if(res.status == 200){
            setAudioData('')
          }
        })
        .catch(er => console.log(er));
    }



    return (
        <div>
            <ul style={{width: '100%'}} className="steps">
                <li data-content="✓" className="step step-info font-bold">Basic</li>
                <li className="step step-info font-bold">Tracks</li>
                <li data-content="3" className="step font-bold">Date</li>
            </ul>
            <div className="py-3">
                <h2 className="text-lg font-semibold text-slate-500 px-2">Tracks</h2>

                <div className="p-3 border rounded-lg">
                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Upload <span className="text-red-500">*</span></p>
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
                    <div className="my-1">
                        <span className="text-xs bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded-md">Audio Formate Only Allow WEV</span>
                    </div>
                    <div className="flex items-center ">
                        {
                            uploadLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                        }
                        <input type="file" accept=".wev" id="fileInput" name='audio' onChange={releaseAudioUpload} />                        
                    </div>
                    {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}
                    {errorMessageAudio && <p className="font-bold text-red-500">{errorMessageAudio}</p>}
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="p-3 border mt-2 rounded-lg">
                    
                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Album Name <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("albumName", { required: true})}/>
                    {errors.albumName && <span className='text-red-600 pt-2 block'>Album Name Required</span>}                    

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Featuring</p>
                    {/* {
                        artist && 
                        <div className="flex items-center justify-between my-1 py-1 px-2 rounded-lg bg-slate-100">
                            <div className="flex items-center">
                                    <Image
                                    width={55}
                                    height={55}
                                    className="rounded-lg"
                                    src={artist.imgUrl}
                                    fallback={fallbackImage}
                                    />
                                <div className="ps-2">
                                <h2 className="font-bold">{artist.artistName}</h2>
                                <p className="text-sm text-slate-400">ID: {artist._id}</p>
                                </div>
                            </div>
                            <button onClick={removeArtist}><TrashIcon className="w-5 h-5 text-red-500"/></button>
                        </div>
                    } */}

                    {/* <span onClick={showModal} style={{cursor: 'pointer'}} className="block py-3 px-4 border rounded-full"><MagnifyingGlassIcon className="w-5 h-5 text-slate-400"/></span>
                        <Modal title="Search/Select Artist" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                            <div>
                                <ArtistList handleCancel={handleCancel}/>
                            </div>
                        </Modal> */}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Author <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("author", { required: true})}/>
                    {errors.author && <span className='text-red-600 pt-2 block'>Author Required</span>}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Lyrics language <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("lyricsLanguage", { required: true})}/>
                    {errors.lyricsLanguage && <span className='text-red-600 pt-2 block'>Lyrics language Required</span>}

                    {/* Artist Select Option ______________________________________________________________ */}
                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Artist <span className="text-red-500">*</span></p>
                    {
                        artist && 
                        <div className="flex items-center justify-between my-1 py-1 px-2 rounded-lg bg-slate-100">
                            <div className="flex items-center">
                                    <Image
                                    width={55}
                                    height={55}
                                    className="rounded-lg"
                                    src={artist.imgUrl}
                                    fallback={fallbackImage}
                                    />
                                <div className="ps-2">
                                <h2 className="font-bold">{artist.artistName}</h2>
                                <p className="text-sm text-slate-400">ID: {artist._id}</p>
                                </div>
                            </div>
                            <button onClick={removeArtist}><TrashIcon className="w-5 h-5 text-red-500"/></button>
                        </div>
                    }

                    <span onClick={showModal} style={{cursor: 'pointer'}} className="block py-3 px-4 border rounded-full"><MagnifyingGlassIcon className="w-5 h-5 text-slate-400"/></span>
                        <Modal title="Search/Select Artist" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                            <div>
                                <ArtistList handleCancel={handleCancel}/>
                            </div>
                        </Modal>
                    {errorMessageArtist && <span className='text-red-600 pt-2 block'>{errorMessageArtist}</span>}
                    {/* Label Select Option ______________________________________________________________ */}
                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Label <span className="text-red-500">*</span></p>
                    {
                        labels && 
                        <div className="flex items-center justify-between my-1 py-1 px-2 rounded-lg bg-slate-100">
                            <div className="flex items-center">
                                    <Image
                                    width={55}
                                    height={55}
                                    className="rounded-lg"
                                    src={labels.imgUrl}
                                    fallback={fallbackImage}
                                    />
                                <div className="ps-2">
                                <h2 className="font-bold">{labels.labelName}</h2>
                                <p className="text-sm text-slate-400">ID: {labels._id}</p>
                                </div>
                            </div>
                            <button onClick={removeLabels}><TrashIcon className="w-5 h-5 text-red-500"/></button>
                        </div>
                    }
                    <span onClick={showModal1} style={{cursor: 'pointer'}} className="block py-3 px-4 border rounded-full"><MagnifyingGlassIcon className="w-5 h-5 text-slate-400"/></span>
                        <Modal title="Search/Select Label" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1} footer={[]}>
                            <div>
                                <LabelsList handleCancel1={handleCancel}/>
                            </div>
                        </Modal>
                    {errorMessageLabels && <span className='text-red-600 pt-2 block'>{errorMessageLabels}</span>}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Composer <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("composer", { required: true})}/>
                    {errors.composer && <span className='text-red-600 pt-2 block'>Composer Required</span>}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">ISRC</p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("ISRC")}/>
                    <div className="mt-1">
                        <span className="text-xs bg-slate-100 text-slate-500 font-bold mx-2 px-2 py-1 rounded-md">(if released before ISRC required otherwise optional)</span>
                    </div>

                    <div className="my-4 flex justify-end">
                        {/* <button onClick={() => navigate('/create-music')} className="btn btn-sm px-6 btn-neutral rounded-full">Previus</button> */}
                        <input type="submit" value={'Next'} className="btn btn-sm px-6 btn-accent rounded-full" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditReleaseSecondStep;