import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Image, Modal, Select } from "antd";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import ArtistList from "./artistListComponent/ArtistList";
import './CreateMusicPage.css';
import LabelsList from "./labelsListComponent/LabelsList";
import fallbackImage from '../../assets/fallbackImage.jpg'

const CreateMusicSecondStep = () => {

    const navigate = useNavigate('');
    const { artist, setArtist, labels, setLabels } = useContext(AuthContext);

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


    const [selectValue, setSelectValue] = useState()
    // Select Function ______________________________________________
    const handleChange = (value) => {
        setSelectValue(value)
        console.log(`selected ${value}`);
    };

    const removeArtist = () => {
        setArtist()
    }
    const removeLabels = () => {
        setLabels()
    }



    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        const d = {...data, labels, artist}
        console.log(d);
    };



    return (
        <div>
            <ul style={{width: '100%'}} className="steps">
                <li data-content="✓" className="step step-info font-bold">Basic</li>
                <li className="step step-info font-bold">Tracks</li>
                <li data-content="●" className="step font-bold">Done</li>
            </ul>
            <div className="py-3">
                <h2 className="text-lg font-semibold text-slate-500 px-2">Tracks</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="p-3 border mt-2 rounded-lg">
                    <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Release Type</p>
                    <Select
                        defaultValue="Single"
                        size="large"
                        className="font-bold mb-2"
                        style={{
                            width: '100%',
                        }}
                        onChange={handleChange}
                        options={[
                            { value: 'Single', label: 'Single',},
                            { value: 'Album', label: 'Album',},
                        ]}
                    />

                    {
                        selectValue == 'Album' && <>
                            <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Album Name <span className="text-red-500">*</span></p>
                            <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("albumName", { required: true})}/>
                            {errors.albumName && <span className='text-red-600 pt-2 block'>Album Name Required</span>}
                        </>
                    }

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Title</p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("releaseTitle")}/>
                    {/* {errors.releaseTitle && <span className='text-red-600 pt-2 block'>Release Title Required</span>} */}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Upload <span className="text-red-500">*</span></p>
                    <div className="border rounded-full py-2 px-2">
                        <input type="file" />
                    </div>
                    {/* {errors.releaseTitle && <span className='text-red-600 pt-2 block'>Release Title Required</span>} */}

                    {/* Artist Select Option ______________________________________________________________ */}
                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Artist</p>
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
                                <input type="text" placeholder="Search" className="input input-sm rounded-full input-bordered w-full"/>
                                <div>
                                    <ArtistList handleCancel={handleCancel}/>
                                </div>
                            </div>
                        </Modal>
                    {/* Label Select Option ______________________________________________________________ */}
                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Label</p>
                    {
                        labels && 
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
                                <h2 className="font-bold">{labels.artistName}</h2>
                                <p className="text-sm text-slate-400">ID: {labels._id}</p>
                                </div>
                            </div>
                            <button onClick={removeLabels}><TrashIcon className="w-5 h-5 text-red-500"/></button>
                        </div>
                    }
                    <span onClick={showModal1} style={{cursor: 'pointer'}} className="block py-3 px-4 border rounded-full"><MagnifyingGlassIcon className="w-5 h-5 text-slate-400"/></span>
                        <Modal title="Search/Select Label" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1} footer={[]}>
                            <div>
                                <input type="text" placeholder="Search" className="input input-sm rounded-full input-bordered w-full"/>
                                <div>
                                    <LabelsList handleCancel1={handleCancel}/>
                                </div>
                            </div>
                        </Modal>

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Composer</p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("composer")}/>

                    <div className="my-4 flex justify-between">
                        <button onClick={() => navigate('/create-music')} className="btn btn-sm px-6 btn-neutral rounded-full">Previus</button>
                        <input type="submit" value={'Submit'} className="btn btn-sm px-6 btn-accent rounded-full" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMusicSecondStep;