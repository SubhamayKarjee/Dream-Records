import { MagnifyingGlassIcon, PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Image, Modal, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import ArtistList from "./artistListComponent/ArtistList";
import './CreateMusicPage.css';
import LabelsList from "./labelsListComponent/LabelsList";
import fallbackImage from '../../assets/fallbackImage.jpg'
import { ReleaseContext } from "./CreateMusicPage";
import axios from "axios";
import FeaturingComponent from "./FeaturingComponent/FeaturingComponent";
import toast from "react-hot-toast";

const SecondStepTrack = () => {

    const { 
        releaseFormData, setReleaseFormData,
        secondStep, setSecondStep,
        audioData, setAudioData,
        lyricsLanguage, setLyricsLanguage,
        composer, setComposer,
        authors, setAuthors,
    } = useContext(ReleaseContext);

    const { artist, setArtist, labels, setLabels, featuring, setFeaturing } = useContext(AuthContext);


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
        console.log(removeName);
        setAuthors(removeName)
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
            setComposerLastNameErr('Last Name Required')
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
    }

    // Handle Audio State _______________________________________
    const [errorMessageAudio, setErrorMessageAudio] = useState('');

    // FROM SUBMIT FUNCTION_______________________________________
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: secondStep
    });
    const onSubmit = (data) => {
        console.log(data);
        setErrorMessageArtist('');
        setErrorMessageLabels('');
        setErrorMessageAudio('');
        setLanguageErr('');
        setComposerErr('');
        setAuthorsErr('');

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
        if(!lyricsLanguage){
            setLanguageErr('Language Required')
            return;
        }
        if(composer === null){
            setComposerErr('Composer Name Required')
            return
        }
        if(authors === null) {
            setAuthorsErr('Author Name Required')
            return
        }
        if(!releaseFormData){
            navigate('/create-release')
            toast.error('You have to feel First Step after that you can Go Next Step')
            return;
        }

        const d = {...data, ...releaseFormData, ...audioData, lyricsLanguage, artist, labels, featuring, composer, authors}
        setSecondStep(data)
        setReleaseFormData(d)
        navigate('/create-release/date')
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


    return (
        <div>
            <ul style={{width: '100%'}} className="steps">
                <li data-content="✓" className="step step-info font-bold">Basic</li>
                <li className="step step-info font-bold">Tracks</li>
                <li data-content="3" className="step font-bold">Date</li>
            </ul>
            <div className="py-3">
                <h2 className="text-lg font-semibold text-slate-500 px-2">Tracks</h2>
                {/* Audio Upload ____________________ */}
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
                        <span className="text-xs bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded-md">Audio Formate Only Allow WAV</span>
                    </div>
                    <div className="flex items-center ">
                        {
                            uploadLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                        }
                        <input type="file" accept=".wav" id="fileInput" name='audio' onChange={releaseAudioUpload} />                        
                    </div>
                    {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}
                    {errorMessageAudio && <p className="font-bold text-red-500">{errorMessageAudio}</p>}
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="p-3 border mt-2 rounded-lg">
                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Album Name <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("albumName", { required: true})}/>
                    {errors.albumName && <span className='text-red-600 pt-2 block'>Album Name Required</span>} 
                    {/* Select Featuring ___________________________________ */}
                    <div className="p-2 border rounded-md mt-3">
                        <p className="text-sm font-semibold text-slate-500 ms-2">Featuring</p>
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
                        <span onClick={showModal} style={{cursor: 'pointer', width: '180px'}} className="btn btn-sm btn-neutral rounded-full mt-3"><MagnifyingGlassIcon className="w-4 h-4 text-slate-400"/>Add Featuring</span>
                            <Modal title="Search/Select Featuring"className="relative" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                                <p className="text-xs bg-slate-100 mb-2 rounded-md py-1 px-3">You can add multiple Featuring</p>
                                <div>
                                    <a className="btn btn-xs btn-neutral rounded-full absolute top-4 right-12" href="http://localhost:5173/artist" target={'_blank'}>Add Featuring</a>
                                    <FeaturingComponent handleCancel={handleCancel} reFetchArtist={reFetchArtist}/>
                                </div>
                            </Modal>
                    </div>
                    {/* Author Input ___________________________________ */}
                    <div className="p-3 border rounded-md mt-3">
                        <p className="text-sm font-semibold text-slate-500 ms-2">Author <span className="text-red-500">*</span></p>
                        <div className="my-2">
                            {
                                authors && authors.map((a, index) => <div key={index} className="flex items-center justify-between my-1 mx-1 py-1 px-3 bg-slate-200 rounded-md">
                                    <span>{a}</span>
                                    <span className="me-2" style={{cursor: 'pointer'}} onClick={() => handleDeleteAuthor(a)}><XMarkIcon className="w-5 h-5 text-red-500"/></span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="md:flex">
                            <div className="md:grow me-2 md:flex itmems-center gap-2">
                                <div className="md:flex-1">
                                    <input type="text" placeholder="First Name" id="authorFirstName" onChange={e => setAuthorFirstNameValue(e.target.value)} className="input input-bordered input-sm w-full my-1"/>
                                    {authorFirstNameErr && <span className='text-red-600 pt-2 block text-sm'>{authorFirstNameErr}</span>}
                                </div>
                                <div className="md:flex-1">
                                    <input type="text" placeholder="Last Name" id="authorLastName" onChange={e => setAuthorLastNameValue(e.target.value)} className="input input-bordered input-sm w-full my-1"/>
                                    {authorLastNameErr && <span className='text-red-600 pt-2 block text-sm'>{authorLastNameErr}</span>}
                                </div>
                            </div>
                            <span style={{width: '150px'}} onClick={handleAuthorValue} className="btn btn-sm btn-neutral my-1"><PlusIcon className="w-4 h-4 text-white font-bold"/> Add Author</span>
                        </div>
                    </div>
                    {authorsErr && <span className='text-red-600 pt-2 block text-sm'>{authorsErr}</span>}

                    {/* Select Language ____________________ */}
                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Lyrics language <span className="text-red-500">*</span></p>
                    <Select
                        showSearch
                        size="large"
                        className="w-full rounded-full text-normal"
                        placeholder="Select Language"
                        defaultValue={lyricsLanguage}
                        optionFilterProp="children"
                        onChange={onChange}
                        filterOption={filterOption}
                        options={options.map(option => ({ value: option.language, label: option.language }))}
                    />
                    {languageErr && <span className='text-red-600 pt-2 block'>{languageErr}</span>}

                    {/* Artist Select Option ______________________________________________________________ */}
                    <div className="p-2 border rounded-md mt-3">
                        <p className="text-sm font-semibold text-slate-500 ms-2">Artist <span className="text-red-500">*</span></p>
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

                        <span onClick={showModal1} style={{cursor: 'pointer', width: '180px'}} className="btn btn-sm btn-neutral rounded-full mt-3"><MagnifyingGlassIcon className="w-5 h-5 text-slate-400"/>Add Artist</span>
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
                    <div className="p-2 border rounded-md mt-3">
                        <p className="text-sm font-semibold text-slate-500 ms-2">Label <span className="text-red-500">*</span></p>
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
                        <span onClick={showModal2} style={{cursor: 'pointer', width: '180px'}} className="btn btn-sm btn-neutral rounded-full mt-3"><MagnifyingGlassIcon className="w-5 h-5 text-slate-400"/>Add Labels</span>
                            <Modal title="Search/Select Label" className="relative" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} footer={[]}>
                                <p className="text-xs bg-slate-100 mb-2 rounded-md py-1 px-3">Select Label</p>
                                <div>
                                    <a className="btn btn-xs btn-neutral rounded-full absolute top-4 right-12" href="https://app.dreamrecords.in/labels" target={'_blank'}>Add Labels</a>
                                    <LabelsList handleCancel={handleCancel2} reFetchLabels={reFetchLabels}/>
                                </div>
                            </Modal>
                        {errorMessageLabels && <span className='text-red-600 pt-2 block'>{errorMessageLabels}</span>}
                    </div>

                    {/* Add Composer Input ____________________ */}
                    <div className="p-3 border rounded-md mt-3">
                        <p className="text-sm font-semibold text-slate-500 ms-2">Composer <span className="text-red-500">*</span></p>
                        <div className="my-2">
                            {
                                composer && composer.map((c, index) => <div key={index} className="flex items-center justify-between my-1 mx-1 py-1 px-3 bg-slate-200 rounded-md">
                                    <span>{c}</span>
                                    <span className="me-2" style={{cursor: 'pointer'}} onClick={() => handleDeleteComposer(c)}><XMarkIcon className="w-5 h-5 text-red-500"/></span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="md:flex">
                            <div className="md:grow me-2 md:flex itmems-center gap-2">
                                <div className="md:flex-1">
                                    <input type="text" placeholder="First Name" id="composerFirstName" onChange={e => setComposerFirstNameValue(e.target.value)} className="input input-bordered input-sm w-full my-1"/>
                                    {composerFirstNameErr && <span className='text-red-600 pt-2 block text-sm'>{composerFirstNameErr}</span>}
                                </div>
                                <div className="md:flex-1">
                                    <input type="text" placeholder="Last Name" id="composerLastName" onChange={e => setComposerLastNameValue(e.target.value)} className="input input-bordered input-sm w-full my-1"/>
                                    {composerLastNameErr && <span className='text-red-600 pt-2 block text-sm'>{composerLastNameErr}</span>}
                                </div>
                            </div>
                            <span style={{width: '150px'}} onClick={handleComposerValue} className="btn btn-sm btn-neutral my-1"><PlusIcon className="w-4 h-4 text-white font-bold"/> Add Composer</span>
                        </div>
                    </div>
                    {composerErr && <span className='text-red-600 pt-2 block text-sm'>{composerErr}</span>}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">ISRC</p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("ISRC")}/>
                    <div className="mt-1">
                        <span className="text-xs bg-slate-100 text-slate-500 font-bold mx-2 px-2 py-1 rounded-md">(if released before ISRC required otherwise optional)</span>
                    </div>

                    <div className="my-4 flex justify-between">
                        <button onClick={() => navigate('/create-release')} className="btn btn-sm px-6 btn-neutral rounded-full">Previus</button>
                        <input type="submit" value={'Next'} className="btn btn-sm px-6 btn-accent rounded-full" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SecondStepTrack;