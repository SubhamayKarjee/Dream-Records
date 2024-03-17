import { MagnifyingGlassIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
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
        axios.get('http://localhost:5000/admin/api/v1/language')
        .then(res => {
            setOptions(res.data.data);
        })
    },[])

    // Modal Function For Featuring __________________________________
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

    const removeFeaturing = (id) => {
        const deleteFeaturing = featuring.filter(a => a._id !== id);
        setFeaturing(deleteFeaturing)
    }

    // Modal Function For Artist __________________________________
    const [errorMessageArtist, setErrorMessageArtist] = useState('');
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

    const removeArtist = (id) => {
        const deleteArtist = artist.filter(a => a._id !== id);
        setArtist(deleteArtist)
    }

    // Modal Function For Label __________________________________
    const [errorMessageLabels, setErrorMessageLabels] = useState('');
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const showModal2 = () => {
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
    // const [lyricsLanguage, setLyricsLanguage] = useState();
    const [languageErr, setLanguageErr] = useState('')
    const onChange = (value) => {
        setLyricsLanguage(value)
    };
    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // Handle Author Input Value______________________________________
    const [authorValue, setAuthorValue] = useState();
    // const [authors, setAuthors] = useState();
    const [authorsErr, setAuthorsErr] = useState();
    const handleAuthorValue = () => {
        if(authors){
            const addNew = [...authors, authorValue]
            setAuthors(addNew)
            document.getElementById('author').value = ''
        }else{
            const data = [authorValue]
            setAuthors(data)
            document.getElementById('author').value = ''
        }
    }
    const handleDeleteAuthor = (name) => {
        const removeName = authors.filter(item => item !== name);
        setAuthors(removeName)
    }

    // Handle Composer Input Value________________________________________
    const [composerValue, setComposerValue] = useState();
    // const [composer, setComposer] = useState();
    const [composerErr, setComposerErr] = useState();
    const handleComposerValue = () => {
        if(composer){
            const addNew = [...composer, composerValue]
            setComposer(addNew)
            document.getElementById('composer').value = ''
        }else{
            const data = [composerValue]
            setComposer(data)
            document.getElementById('composer').value = ''
        }
    }
    const handleDeleteComposer = (name) => {
        const removeName = composer.filter(item => item !== name);
        setComposer(removeName)
    }


    // Handle Audio State _______________________________________
    // const [audioData, setAudioData] = useState();
    const [errorMessageAudio, setErrorMessageAudio] = useState('');

    // FROM SUBMIT FUNCTION_______________________________________
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: secondStep
    });
    const onSubmit = (data) => {
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
        if(!composer){
            setComposerErr('Composer Name Required')
        }
        if(!authors){
            setAuthorsErr('Author Name Required')
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
    
        axios.post('http://localhost:5000/api/v1/release/upload-release-audio', formData)
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
        axios.delete(`http://localhost:5000/api/v1/release/delete-release-audio?audioKey=${e}`)
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
                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Featuring</p>
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
                    <span onClick={showModal} style={{cursor: 'pointer'}} className="block py-3 px-4 border rounded-full"><MagnifyingGlassIcon className="w-4 h-4 text-slate-400"/></span>
                        <Modal title="Search/Select Featuring" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                            <p className="text-xs bg-slate-100 mb-2 rounded-md py-1 px-3">You can add multiple Featuring</p>
                            <div>
                                <FeaturingComponent handleCancel={handleCancel}/>
                            </div>
                        </Modal>
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
                        <div className="flex">
                            <div className="md:grow me-2">
                                <input type="text" placeholder="Type Author Name" id="author" onChange={e => setAuthorValue(e.target.value)} className="input input-bordered input-sm w-full my-1"/>
                                {authorsErr && <span className='text-red-600 pt-2 block text-sm'>{authorsErr}</span>}
                            </div>
                            <span onClick={handleAuthorValue} className="btn btn-sm btn-neutral my-1">Add Author</span>
                        </div>
                    </div>

                    {/* Select Language ____________________ */}
                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Lyrics language <span className="text-red-500">*</span></p>
                    <Select
                        showSearch
                        size="large"
                        className="w-full rounded-full"
                        defaultValue={lyricsLanguage}
                        optionFilterProp="children"
                        onChange={onChange}
                        filterOption={filterOption}
                        options={options.map(option => ({ value: option.language, label: option.language }))}
                    />
                    {languageErr && <span className='text-red-600 pt-2 block'>{languageErr}</span>}

                    {/* Artist Select Option ______________________________________________________________ */}
                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Artist <span className="text-red-500">*</span></p>
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

                    <span onClick={showModal1} style={{cursor: 'pointer'}} className="block py-3 px-4 border rounded-full"><MagnifyingGlassIcon className="w-5 h-5 text-slate-400"/></span>
                        <Modal title="Search/Select Artist" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1} footer={[]}>
                            <p className="text-xs bg-slate-100 mb-2 rounded-md py-1 px-3">You can add multiple Artist</p>
                            <div>
                                <ArtistList handleCancel={handleCancel1}/>
                            </div>
                        </Modal>
                    {errorMessageArtist && <span className='text-red-600 pt-2 block'>{errorMessageArtist}</span>}

                    {/* Label Select Option ______________________________________________________________ */}
                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Label <span className="text-red-500">*</span></p>
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
                    <span onClick={showModal2} style={{cursor: 'pointer'}} className="block py-3 px-4 border rounded-full"><MagnifyingGlassIcon className="w-5 h-5 text-slate-400"/></span>
                        <Modal title="Search/Select Label" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} footer={[]}>
                            <p className="text-xs bg-slate-100 mb-2 rounded-md py-1 px-3">You can add multiple Label</p>
                            <div>
                                <LabelsList handleCancel={handleCancel2}/>
                            </div>
                        </Modal>
                    {errorMessageLabels && <span className='text-red-600 pt-2 block'>{errorMessageLabels}</span>}

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
                        <div className="flex">
                            <div className="md:grow me-2">
                                <input type="text" placeholder="Type Composer Name" id="composer" onChange={e => setComposerValue(e.target.value)} className="input input-bordered input-sm w-full my-1"/>
                                {composerErr && <span className='text-red-600 pt-2 block text-sm'>{composerErr}</span>}
                            </div>
                            <span onClick={handleComposerValue} className="btn btn-sm btn-neutral my-1">Add Composer</span>
                        </div>
                    </div>

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