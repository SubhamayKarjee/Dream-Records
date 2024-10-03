import {  PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Divider, Image, Modal, Select, Steps } from "antd";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EditReleaseContext } from "./EditReleaseMainPage";
import ArtistList from "../../CreateMusicPage/artistListComponent/ArtistList";
import LabelsList from "../../CreateMusicPage/labelsListComponent/LabelsList";
import fallbackImage from '../../../assets/fallbackImage.jpg'
import { AuthContext } from "../../UserAdminHomePage/UserAdminHomePage";
import toast from "react-hot-toast";
import FeaturingComponent from "../../CreateMusicPage/FeaturingComponent/FeaturingComponent";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import './EditReleaseCss.css'


const EditReleaseSecondStep = () => {


    const navigate = useNavigate('');

    const { releaseFormData, setReleaseFormData, preReleaseData } = useContext(EditReleaseContext);
    const { artist, setArtist, labels, setLabels, setFeaturing, featuring } = useContext(AuthContext);
    
    const handleGoBack = () => {
        navigate(`/releases/edit/${preReleaseData._id}`)
    };

    useEffect( () => {
        if(!preReleaseData){
            navigate(`/releases/All/1/6`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const [format, setFormat] = useState(preReleaseData.format);
    // const [formatErr, setFormatErr] = useState();

    const [audioData, setAudioData] = useState();
    const [lyricsLanguage, setLyricsLanguage] = useState();
    const [authors, setAuthors] = useState();
    const [composer, setComposer] = useState();

    useEffect(() => {
        const audioName = preReleaseData?.audioName;
        const audioUrl = preReleaseData?.audioUrl;
        const audioKey = preReleaseData?.audioKey;
        setAudioData({audioName, audioUrl, audioKey});
        setArtist(preReleaseData.artist);
        setLabels(preReleaseData.labels);
        setFeaturing(preReleaseData.featuring)
        setLyricsLanguage(preReleaseData.lyricsLanguage)
        setAuthors(preReleaseData.authors)
        setComposer(preReleaseData.composer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    

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

    // Modal Function For Featuring __________________________________
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        const re = reFetchArtist + 1;
        setRefetchArtist(re)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
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
        setIsModalOpen1(false);
    };
    const handleCancel1 = () => {
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
        setIsModalOpen2(false);
    };
    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

    const removeLabels = (id) => {
        const deleteLabels = labels.filter(l => l._id !== id);
        setLabels(deleteLabels)
    }
    
    // Handle Lyrics Language Select Input _________________________
    const [languageErr, setLanguageErr] = useState('')
    const onChange = (value) => {
        setLyricsLanguage(value)
    };
    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // Handle Author Input Value______________________________________
    const [authorFirstNameValue, setAuthorFirstNameValue] = useState();
    const [authorLastNameValue, setAuthorLastNameValue] = useState();
    const [authorFirstNameErr, setAuthorFirstNameErr] = useState();
    const [authorLastNameErr, setAuthorLastNameErr] = useState();
    const [authorsErr, setAuthorsErr] = useState('')

    const handleAuthorValue = () => {
        setAuthorFirstNameErr('');
        setAuthorLastNameErr('')
        if(!authorFirstNameValue){
            setAuthorFirstNameErr('First Name Required')
            return;
        }
        if(!authorLastNameValue){
            setAuthorLastNameErr('Last Name Required')
            return;
        }
        if(authors){
            const name = `${authorFirstNameValue} ${authorLastNameValue}`;
            const addNew = [...authors, name]
            setAuthors(addNew)
            document.getElementById('authorFirstName').value = '';
            document.getElementById('authorLastName').value = '';
            setAuthorFirstNameValue('');
            setAuthorLastNameValue('');
        }else{
            const name = `${authorFirstNameValue} ${authorLastNameValue}`;
            const data = [name]
            setAuthors(data)
            document.getElementById('authorFirstName').value = '';
            document.getElementById('authorLastName').value = '';
            setAuthorFirstNameValue('');
            setAuthorLastNameValue('');
        }
    }
    const handleDeleteAuthor = (name) => {
        const removeName = authors.filter(item => item !== name);
        setAuthors(removeName)
        if(removeName.length === 0){
            setAuthors('')
        }
    }

    // Handle Composer Input Value________________________________________
    const [composerFirstNameValue, setComposerFirstNameValue] = useState();
    const [composerLastNameValue, setComposerLastNameValue] = useState();
    const [composerFirstNameErr, setComposerFirstNameErr] = useState();
    const [composerLastNameErr, setComposerLastNameErr] = useState();
    const [composerErr, setComposerErr] = useState();

    const handleComposerValue = () => {
        setComposerFirstNameErr('');
        setComposerLastNameErr('')
        if(!composerFirstNameValue){
            setComposerFirstNameErr('First Name Required')
            return;
        }
        if(!composerLastNameValue){
            setComposerFirstNameErr('Last Name Required')
            return;
        }
        if(composer){
            const name = `${composerFirstNameValue} ${composerLastNameValue}`;
            const addNew = [...composer, name]
            setComposer(addNew)
            document.getElementById('composerFirstName').value = '';
            document.getElementById('composerLastName').value = '';
            setComposerFirstNameValue('');
            setComposerLastNameValue('');
        }else{
            const name = `${composerFirstNameValue} ${composerLastNameValue}`;
            const data = [name]
            setComposer(data)
            document.getElementById('composerFirstName').value = '';
            document.getElementById('composerLastName').value = '';
            setComposerFirstNameValue('');
            setComposerLastNameValue('');
        }
    }

    const handleDeleteComposer = (name) => {
        const removeName = composer.filter(item => item !== name);
        setComposer(removeName)
        if(removeName.length === 0){
            setComposer('')
        }
    }

    // Handle Audio State _______________________________________
    const [errorMessageAudio, setErrorMessageAudio] = useState('');

    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            albumName: releaseFormData?.albumName ? releaseFormData.albumName : preReleaseData?.albumName,
            ISRC: releaseFormData?.ISRC ? releaseFormData.ISRC : preReleaseData?.ISRC,
        }
    });
    const onSubmit = (data) => {
        setErrorMessageArtist('');
        setErrorMessageLabels('');
        setErrorMessageAudio('');
        setLanguageErr('');
        setComposerErr('');
        setAuthorsErr('');

        if(!audioData){
            setErrorMessageAudio('Audio Required')
            return;
        }
        // Author Error Handle ____________________________________________
        let authorDetails;
        if(!authors){
            if(!authorFirstNameValue){
                setAuthorsErr('Author First Name and Last Name Required')
                return;
            }
            if(!authorLastNameValue){
                setAuthorsErr('Author First Name and Last Name Required')
                return;
            }
            if(authorFirstNameValue && authorLastNameValue){
                const authorName = `${authorFirstNameValue} ${authorLastNameValue}`;
                const authorArr = [authorName]
                setAuthors(authorArr)
                authorDetails = authorArr;
                document.getElementById('authorFirstName').value = '';
                document.getElementById('authorLastName').value = '';
                setAuthorFirstNameValue('')
                setAuthorLastNameValue('')
            }
        }
        if(authors){
            if(authorFirstNameValue && authorLastNameValue){
                    const firstLastName = `${authorFirstNameValue} ${authorLastNameValue}`
                    const addName = [...authors, firstLastName,];
                    authorDetails = addName;
                    setAuthors(addName)
                    document.getElementById('authorFirstName').value = '';
                    document.getElementById('authorLastName').value = '';
                    setAuthorFirstNameValue('')
                    setAuthorLastNameValue('')
            }else{
                authorDetails = [...authors]
            }
        }
        // Composer Error Handle ____________________________________________
        let composerDetails;
        if(!composer){
            if(!composerFirstNameValue){
                setComposerErr('Composer First Name and Last Name Required')
                return;
            }
            if(!composerLastNameValue){
                setComposerErr('Composer First Name and Last Name Required')
                return;
            }
            if(composerFirstNameValue && composerLastNameValue){
                const composerName = `${composerFirstNameValue} ${composerLastNameValue}`;
                const composerArr = [composerName]
                setComposer(composerArr)
                composerDetails = composerArr;
                document.getElementById('composerFirstName').value = '';
                document.getElementById('composerLastName').value = '';
                setComposerFirstNameValue('');
                setComposerLastNameValue('');
            }
        }
        if(composer){
            if(composerFirstNameValue && composerLastNameValue){
                const firstLastName = `${composerFirstNameValue} ${composerLastNameValue}`
                const addName = [...composer, firstLastName,];
                composerDetails = addName;
                setComposer(addName)
                document.getElementById('composerFirstName').value = '';
                document.getElementById('composerLastName').value = '';
                setComposerFirstNameValue('');
                setComposerLastNameValue('');
            }else{
                composerDetails = [...composer]
            }
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

        const d = {...data, ...releaseFormData, ...audioData, lyricsLanguage, artist, labels, composer: composerDetails, authors: authorDetails, format, featuring}
        setReleaseFormData(d)
        navigate('/releases/edit/third-step')
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
  
        if(audioData?.audioKey){
            axios.delete(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/delete-file?key=${audioData.audioKey}`)
            .then( res => {
            if(res.status == 200){
                setAudioData('')
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
                    toast.success('Successfully Audio Uploaded')
                }
            })
            .catch(er => console.log(er))
    }
    
    const handleDeleteAudio = (e) => {
        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/delete-file?key=${e}`)
        .then( res => {
          if(res.status == 200){
            setAudioData('')
            toast.success('Successfully Audio Deleted')
          }
        })
        .catch(er => console.log(er));
    }

    const steps = [
        {title: 'Basic'},
        {title: 'Tracks'},
        {title: 'Date'},
    ];
    const inputStyle = {
        height: '36px',
        border: '1px solid #E2E8F0'
    }
    


    return (
        <div>
            <div className="px-3">
                <Steps current={1} items={steps} /> 
            </div>

            <div className="pt-4">
                <p className="text-lg font-semibold">Update Track</p>
                <p className="text-sm text-[#71717A]">Update your account settings. Set your preferred language and timezone.</p>
            </div>
            <Divider/>

            <div>
                <p className="mt-3 mb-1 text-sm font-semibold text-[#09090B]">Format <span className="text-red-500">*</span></p>
                    <Select
                        showSearch
                        defaultValue={format}
                        size="h-9"
                        className="mb-2"
                        style={{
                            width: '100%',
                        }}
                        onChange={e => setFormat(e)}
                        options={[
                            {label: 'Single', value: 'Single'},
                            {label: 'Album', value: 'Album'},
                        ]}
                    />
                    {/* {
                        formateErr && <span className='text-red-600 pt-2 block'>{formateErr}</span>
                    } */}
            </div>

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
                    <input type="file" accept=".wav" id="audioUpload" name='audio' onChange={releaseAudioUpload} />   
                </div>
                <p className="text-sm text-[#71717A]">Audio Formate Only Allow WAV</p>                     
                {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}
                {errorMessageAudio && <p className="font-bold text-red-500">{errorMessageAudio}</p>}
            </div>

            <div className="py-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                <p className="mt-3 mb-1 text-sm font-semibold text-[#09090B]">Album Name <span className="text-red-500">*</span></p>
                    <input style={inputStyle} type="text" className="input input-sm w-full mt-1" placeholder="Enter the Album name here" {...register("albumName", { required: true})}/>
                    {errors.albumName && <span className='text-red-600 pt-2 block'>Album Name Required</span>} 
                    
                    {/* Author Input ___________________________________ */}
                    <div className="p-3 border rounded-md mt-3">
                        <p className="mb-2 text-sm font-semibold text-[#09090B]">Author Details</p>
                        <p className="mb-1 text-sm font-semibold text-[#09090B]">Author <span className="text-red-500">*</span></p>
                        <div className="my-2">
                            {
                                authors && authors.map((a, index) => <div key={index} className="flex items-center justify-between my-1 mx-1 py-1 px-3 bg-slate-200 rounded-md">
                                    <span>{a}</span>
                                    <span className="me-2" style={{cursor: 'pointer'}} onClick={() => handleDeleteAuthor(a)}><XMarkIcon className="w-5 h-5 text-red-500"/></span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="grid grids-col md:grid-cols-2 items-center gap-2">
                                <div>
                                    <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="First Name" id="authorFirstName" onChange={e => setAuthorFirstNameValue(e.target.value)}/>
                                    {authorFirstNameErr && <span className='text-red-600 pt-2 block text-sm'>{authorFirstNameErr}</span>}
                                </div>
                                <div>
                                    <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Last Name" id="authorLastName" onChange={e => setAuthorLastNameValue(e.target.value)}/>
                                    {authorLastNameErr && <span className='text-red-600 pt-2 block text-sm'>{authorLastNameErr}</span>}
                                </div>
                        </div>
                        <span onClick={() => handleAuthorValue()} className="btn btn-sm btn-neutral my-1 bg-[#18181B] w-full mt-3"><PlusIcon className="w-4 h-4 text-white font-bold"/>Add New Author</span>
                        {authorsErr && <span className='text-red-600 pt-2 block text-sm'>{authorsErr}</span>}
                    </div>

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
                                <div key={data._id} className="flex items-center justify-between my-1 py-1 px-2 rounded-lg bg-slate-100">
                                    <div className="flex items-center">
                                            <Image
                                            width={35}
                                            height={35}
                                            className="rounded-lg"
                                            src={data.imgUrl}
                                            fallback={fallbackImage}
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
                                    <a className="btn btn-xs btn-neutral rounded-full absolute top-4 right-12" href="https://app.dreamrecords.in/artist" target={'_blank'}>Add Artist</a>
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
                                <div key={data._id} className="flex items-center justify-between my-1 py-1 px-2 rounded-lg bg-slate-100">
                                    <div className="flex items-center">
                                            <Image
                                            width={35}
                                            height={35}
                                            className="rounded-lg"
                                            src={data.imgUrl}
                                            fallback={fallbackImage}
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
                                    <a className="btn btn-xs btn-neutral rounded-full absolute top-4 right-12" href="https://app.dreamrecords.in/labels" target={'_blank'}>Add Labels</a>
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
                                <div key={data._id} className="flex items-center justify-between my-1 py-1 px-2 rounded-lg bg-slate-100">
                                    <div className="flex items-center">
                                            <Image
                                            width={35}
                                            height={35}
                                            className="rounded-lg"
                                            src={data.imgUrl}
                                            fallback={fallbackImage}
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
                                    <a className="btn btn-xs btn-neutral rounded-full absolute top-4 right-12" href="https://app.dreamrecords.in/artist" target={'_blank'}>Add Featuring</a>
                                    <FeaturingComponent handleCancel={handleCancel} reFetchArtist={reFetchArtist}/>
                                </div>
                            </Modal>
                    </div>

                    {/* Add Composer Input ____________________ */}
                    <div className="p-3 border rounded-md mt-3">
                        <p className="mb-2 text-sm font-semibold text-[#09090B]">Composer Details</p>
                        <p className="mb-1 text-sm font-semibold text-[#09090B]">Composer <span className="text-red-500">*</span></p>
                        <div className="my-2">
                            {
                                composer && composer.map((c, index) => <div key={index} className="flex items-center justify-between my-1 mx-1 py-1 px-3 bg-slate-200 rounded-md">
                                    <span>{c}</span>
                                    <span className="me-2" style={{cursor: 'pointer'}} onClick={() => handleDeleteComposer(c)}><XMarkIcon className="w-5 h-5 text-red-500"/></span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="grid grids-col md:grid-cols-2 items-center gap-2">
                            <div>
                                <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="First Name" id="composerFirstName" onChange={e => setComposerFirstNameValue(e.target.value)}/>
                                {composerFirstNameErr && <span className='text-red-600 pt-2 block text-sm'>{composerFirstNameErr}</span>}
                            </div>
                            <div>
                                <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Last Name" id="composerLastName" onChange={e => setComposerLastNameValue(e.target.value)}/>
                                {composerLastNameErr && <span className='text-red-600 pt-2 block text-sm'>{composerLastNameErr}</span>}
                            </div>
                        </div>
                        <span  onClick={ () => handleComposerValue()} className="btn btn-sm btn-neutral my-1 bg-[#18181B] w-full mt-3"><PlusIcon className="w-4 h-4 text-white font-bold"/> Add New Composer</span>
                        {composerErr && <span className='text-red-600 pt-2 block text-sm'>{composerErr}</span>}
                    </div>
                    

                    <p className="mb-1 text-sm font-semibold text-[#09090B]">ISRC</p>
                    <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="" {...register("ISRC")}/>
                    <p className="text-xs text-[#71717A] mt-1">(if released before ISRC required otherwise optional)</p>

                    <div className="my-4 flex justify-between items-center">
                        <span onClick={handleGoBack} className="btn btn-sm px-6">Previus</span>
                        <input type="submit" value={'Next'} className="btn btn-sm px-6 h-9 btn-neutral bg-[#18181B]" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditReleaseSecondStep;