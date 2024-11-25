import LoadingComponentsInsidePage from "../../LoadingComponents/LoadingComponentsInsidePage";
import { Image, Modal, Popconfirm, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import fallbackImage from "../../assets/fallbackImage.jpg"
import { ArrowPathIcon, CheckBadgeIcon, ClockIcon, DocumentDuplicateIcon, ExclamationTriangleIcon, TrashIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import './AdminSingleReleasePage.css'
import AdminReleaseCardComponent from "./AdminReleaseCardComponent";

const AdminSingleReleasePage = () => {

    const {id} = useParams();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [releaseData, setReleaseData] = useState()
    const [releaseStatus, setReleaseStatus] = useState();

    const [albumData, setAlbumData] = useState()
    useEffect(() => {
        setLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/single/${id}`)
            .then( res => {
                if(res.status == 200){
                    setReleaseData(res.data.data[0]);
                    setReleaseStatus(res.data.data[0].status)
                    const rData = res.data.data[0]
                    if(rData.format === 'Album'){
                        axios.get(`http://localhost:5000/api/v1/release/album-release/${rData.masterUserId}?albumId=${rData.albumId}`)
                        .then(res =>{
                            console.log(res.data.data);
                            setAlbumData(res.data.data)
                            setLoading(false);
                        })
                    }else{
                        setLoading(false);
                    }
                }
            })
            .catch(er => console.log(er));
    }, [id]);


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


    const [updateLoading, setUpdateLoading] = useState(false)
    const { register, handleSubmit,reset, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        setUpdateLoading(true)
        const status = releaseStatus;
        const formData = {...releaseData, status, ...data }
            axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/update-release/${id}`, formData)
            .then(res => {
                if(res.status == 200){
                    setUpdateLoading(false);
                    reset()
                    navigate('/admin-dashboard/release/updated-status')
                }
            })
            .catch(er => console.log(er))        
    }


    const [deleteLoading, setDeleteLoading] = useState(false)
    const confirm = () => {
        setDeleteLoading(true)
        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/delete-release/${id}?imgKey=${releaseData.key}&audioKey=${releaseData.audioKey}`)
        .then(res => {
            if(res.status == 200){
                setDeleteLoading(false)
                toast.success('Release Deleted')
                navigate('/admin-dashboard/release/1/8/All')
            }
        })
    }

    const handleCopyText = (index) => {
        const inputElement = document.getElementById(index);
        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        toast.success('Coppied')
    };

    const cancel = () => {
        return;
    };

    if(deleteLoading){
        return <LoadingComponentsInsidePage/>
    }



    return (
        <div className="">
            <div className='p-2'>
                {
                  loading ? <LoadingComponentsInsidePage/> :
                  <div>
                    {
                        releaseData?.actionRequired &&
                        <p className="p-2 my-2 bg-red-200 rounded-md">{releaseData.actionRequired}</p>
                    }
                    
                    <div className="md:flex p-4 bg-neutral rounded-lg">
                        <div>
                            <Image
                                width={200}
                                height={200}
                                className="rounded-lg"
                                src={releaseData?.imgUrl}
                                preview={true}
                                alt="artist-image"
                            />
                        </div>
                        <div className="md:ps-4 grow">
                            <div className="md:flex justify-between">
                                <div>
                                    <h2 className="text-white font-bold text-lg">{releaseData?.releaseTitle}</h2>
                                    <p className="text-white text-sm">{releaseData?.userName}</p>
                                    <p className="text-white text-sm">ID: {releaseData?._id}</p>
                                </div>
                                <div>
                                    {
                                        releaseData?.status === 'Pending' &&
                                        <span className="bg-yellow-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><ClockIcon className="w-4 h-4 me-1"/> {releaseData?.status}</span>
                                    }
                                    {
                                        releaseData?.status === 'ReSubmitted' &&
                                        <span className="bg-yellow-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><ClockIcon className="w-4 h-4 me-1"/> {releaseData?.status}</span>
                                    }
                                    {
                                        releaseData?.status === 'Approved' &&
                                        <span className="bg-green-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><CheckBadgeIcon className="w-4 h-4 me-1"/> {releaseData?.status}</span>
                                    }
                                    {
                                        releaseData?.status === 'Action Required' &&
                                        <span className="bg-red-700 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><ExclamationTriangleIcon className="w-4 h-4 me-1"/> {releaseData?.status}</span>
                                    }
                                    <span onClick={showModal} style={{cursor: 'pointer'}} className="bg-cyan-400 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><ArrowPathIcon className="w-4 h-4 me-1"/> Update Status</span>
                                    <Modal title="Update Release Status!" footer={[]} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <Select
                                                defaultValue={releaseData?.status}
                                                style={{ width: '100%' }}
                                                onChange={value => setReleaseStatus(value)}
                                                options={[
                                                    { value: 'Pending', label: 'Pending' },
                                                    { value: 'Review', label: 'Review' },
                                                    { value: 'Approved', label: 'Approved' },
                                                    { value: 'Action Required', label: 'Action Required' },
                                                    { value: 'Takedown', label: 'Takedown' },
                                                ]}
                                            />
                                            {
                                                releaseStatus === 'Action Required' &&
                                                <div>
                                                    <textarea {...register("actionRequired", { required: true})} className="textarea mt-2 textarea-bordered w-full" placeholder="Release Action Required Details"></textarea>
                                                    {errors.actionReuired && <span className='text-red-600 block'>You have to Explain</span>}
                                                </div>
                                            }
                                            {
                                                releaseStatus === 'Takedown' &&
                                                <div>
                                                    <textarea {...register("actionRequired", { required: true})} className="textarea mt-2 textarea-bordered w-full" placeholder="Release Takedown Reason"></textarea>
                                                    {errors.actionReuired && <span className='text-red-600 block'>You have to Explain</span>}
                                                </div>
                                            }
                                            {
                                                releaseStatus === 'Approved' && 
                                                <div className="p-3 mt-3 border rounded-md">
                                                    <p className="text-sm font-semibold text-slate-500 ms-2">ISRC <span className="text-red-500">*</span></p>
                                                    <input {...register("ISRC", { required: true})} type="text" placeholder="ISRC" defaultValue={releaseData?.ISRC} className="input input-bordered input-sm w-full rounded-full" />
                                                    {errors.ISRC && <span className='text-red-600 block'>ISRC Required</span>}
                                                    <p className="mt-2 text-sm font-semibold text-slate-500 ms-2">UPC <span className="text-red-500">*</span></p>
                                                    <input {...register("UPC", { required: true})} type="text" placeholder="UPC" defaultValue={releaseData?.UPC} className="input input-bordered input-sm w-full rounded-full" />
                                                    {errors.UPC && <span className='text-red-600 block'>UPC Required</span>}
                                                </div>
                                            }
                                            <div className="flex items-center">
                                                {
                                                    updateLoading && <span className="loading loading-spinner loading-xs me-2"></span>
                                                }
                                                <input type="submit" className="btn btn-sm btn-neutral mt-3" value="Update Status" />
                                            </div>
                                        </form>
                                    </Modal>
                                    <Popconfirm
                                        title="Delete"
                                        placement="leftTop"
                                        className="z-1000"
                                        description="Are you sure to Delete Release?"
                                        onConfirm={confirm}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                        >
                                        <span style={{cursor: 'pointer'}} className="bg-red-400 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><TrashIcon className="w-4 h-4 me-1"/> Delete</span>
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>                                 
                  </div>

                    <div className="p-2 bg-[#EF4136] rounded-md my-2 shadow">
                        <p className="text-sm pb-2 font-bold text-white">Audio</p>
                        <audio controls src={releaseData?.audioUrl}></audio>
                    </div> 

                    <div className="border p-2 rounded-lg my-4 shadow">
                        <div className="my-3">
                            <p className="text-xs font-bold">Artist Details</p>
                            <div className=" p-2 bg-slate-100 rounded-md">
                                {
                                    releaseData?.artist.map((a, index) => 
                                        <div key={a._id} onClick={()=>document.getElementById(`${index}`).showModal()} style={{cursor: 'pointer'}} className="flex my-2">
                                            <div>
                                                <Image
                                                    width={35}
                                                    height={35}
                                                    className="rounded-md"
                                                    src={a?.imgUrl}
                                                    preview={true}
                                                    fallback={fallbackImage}
                                                    alt={a.artistName}
                                                />
                                            </div>
                                            <div className="ms-2">
                                                <h2 className="font-bold">{a?.artistName}</h2>
                                                <p className="text-xs">{a?.userName}</p>
                                            </div>
                                            <dialog id={index} className="modal">
                                                <div className="modal-box">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    </form>
                                                    <Image
                                                        width={100}
                                                        height={100}
                                                        className="rounded-md"
                                                        src={a?.imgUrl}
                                                        preview={true}
                                                        fallback={fallbackImage}
                                                        alt={a?.artistName}
                                                    />
                                                    <h3 className="font-bold text-lg">{a?.artistName}</h3>
                                                    <p className="text-sm text-slate-500">{a?.userName}</p>
                                                    {
                                                        a?.instagramId &&
                                                        <div className="my-2 p-2 border rounded-md">
                                                            <p className="text-xs font-bold text-slate-500">Instagram</p>
                                                            <div className="flex justify-between items-center">
                                                                <input className="admin_release_page_input grow" id='artist_instagram' defaultValue={a.instagramId} type="text" />
                                                                <DocumentDuplicateIcon style={{cursor: 'pointer'}} onClick={() => handleCopyText('artist_instagram')} className="w-5 h-5 text-slate-500"/>
                                                            </div>
                                                        </div>
                                                    }

                                                    {
                                                        a?.appleId &&
                                                        <div className="my-2 p-2 border rounded-md">
                                                            <p className="text-xs font-bold text-slate-500">Apple</p>
                                                            <div className="flex justify-between items-center">
                                                                <input className="admin_release_page_input grow" id='artist_apple' defaultValue={a.appleId} type="text" />
                                                                <DocumentDuplicateIcon style={{cursor: 'pointer'}} onClick={() => handleCopyText('artist_apple')} className="w-5 h-5 text-slate-500"/>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        a?.spotifyId &&
                                                        <div className="my-2 p-2 border rounded-md">
                                                            <p className="text-xs font-bold text-slate-500">Spotify</p>
                                                            <div className="flex justify-between items-center">
                                                                <input className="admin_release_page_input grow" id='artist_spotify' defaultValue={a.spotifyId} type="text" />
                                                                <DocumentDuplicateIcon style={{cursor: 'pointer'}} onClick={() => handleCopyText('artist_spotify')} className="w-5 h-5 text-slate-500"/>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        a?.facebook &&
                                                        <div className="my-2 p-2 border rounded-md">
                                                            <p className="text-xs font-bold text-slate-500">Facebook</p>
                                                            <div className="flex justify-between items-center">
                                                                <input className="admin_release_page_input grow" id='artist_facebook' defaultValue={a.facebook} type="text" />
                                                                <DocumentDuplicateIcon style={{cursor: 'pointer'}} onClick={() => handleCopyText('artist_facebook')} className="w-5 h-5 text-slate-500"/>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        a?.youtube &&
                                                        <div className="my-2 p-2 border rounded-md">
                                                            <p className="text-xs font-bold text-slate-500">Youtube</p>
                                                            <div className="flex justify-between items-center">
                                                                <input className="admin_release_page_input grow" id='artist_youtube' defaultValue={a.youtube} type="text" />
                                                                <DocumentDuplicateIcon style={{cursor: 'pointer'}} onClick={() => handleCopyText('artist_youtube')} className="w-5 h-5 text-slate-500"/>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </dialog>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="my-3">
                            <p className="text-xs font-bold">Labels Details</p>
                            <div className=" p-2 bg-slate-100 rounded-md">
                                {
                                    releaseData?.labels.map((l) => 
                                        <div key={l._id} onClick={()=>document.getElementById(`${l._id}`).showModal()} style={{cursor: 'pointer'}}>
                                            <div className="flex my-2">
                                                <div>
                                                    <Image
                                                        width={35}
                                                        height={35}
                                                        className="rounded-md"
                                                        src={l?.imgUrl}
                                                        preview={true}
                                                        fallback={fallbackImage}
                                                        alt={l.labelName}
                                                    />
                                                </div>
                                                <div className="ms-2">
                                                    <h2 className="font-bold">{l?.labelName}</h2>
                                                    <p className="text-xs">{l?.userName}</p>
                                                </div>
                                            </div>
                                            <dialog id={l._id} className="modal">
                                                <div className="modal-box">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    </form>
                                                    <Image
                                                        width={100}
                                                        height={100}
                                                        className="rounded-md"
                                                        src={l?.imgUrl}
                                                        preview={true}
                                                        fallback={fallbackImage}
                                                        alt={l.labelName}
                                                    />
                                                    <h3 className="font-bold text-lg">{l?.labelName}</h3>
                                                    <p className="text-sm text-slate-500">{l?.userName}</p>
                                                    {
                                                        l?.youtubeChannelLink &&
                                                        <div className="my-2 p-2 border rounded-md">
                                                            <p className="text-xs font-bold text-slate-500">Youtube Channel Link</p>
                                                            <div className="flex justify-between items-center">
                                                                <input className="admin_release_page_input" id='labels_channel_link' defaultValue={l?.youtubeChannelLink} type="text" />
                                                                <DocumentDuplicateIcon style={{cursor: 'pointer'}} onClick={() => handleCopyText('labels_channel_link')} className="w-5 h-5 text-slate-500"/>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </dialog>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="my-3">
                            <p className="text-xs font-bold">Featuring Details</p>
                            <div className=" p-2 bg-slate-100 rounded-md">
                                {
                                    releaseData?.featuring?.map((f) => 
                                        <div key={f._id} className="flex my-2" onClick={()=>document.getElementById(`${f._id}`).showModal()} style={{cursor: 'pointer'}}>
                                            <div>
                                                <Image
                                                    width={35}
                                                    height={35}
                                                    className="rounded-md"
                                                    src={f?.imgUrl}
                                                    preview={true}
                                                    fallback={fallbackImage}
                                                    alt={f.artistName}
                                                />
                                            </div>
                                            <div className="ms-2">
                                                <h2 className="font-bold">{f?.artistName}</h2>
                                                <p className="text-xs">{f?.userName}</p>
                                            </div>
                                            <dialog id={f._id} className="modal">
                                                <div className="modal-box">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    </form>
                                                    <Image
                                                        width={100}
                                                        height={100}
                                                        className="rounded-md"
                                                        src={f?.imgUrl}
                                                        preview={true}
                                                        fallback={fallbackImage}
                                                        alt={f.artistName}
                                                    />
                                                    <h3 className="font-bold text-lg">{f?.artistName}</h3>
                                                    <p className="text-sm text-slate-500">{f?.userName}</p>
                                                    {
                                                        f?.instagramId &&
                                                        <div className="my-2 p-2 border rounded-md">
                                                            <p className="text-xs font-bold text-slate-500">Instagram</p>
                                                            <div className="flex justify-between items-center">
                                                                <input className="admin_release_page_input grow" id='featuring_artist_instagram' defaultValue={f.instagramId} type="text" />
                                                                <DocumentDuplicateIcon style={{cursor: 'pointer'}} onClick={() => handleCopyText('featuring_artist_instagram')} className="w-5 h-5 text-slate-500"/>
                                                            </div>
                                                        </div>
                                                    }

                                                    {
                                                        f?.appleId &&
                                                        <div className="my-2 p-2 border rounded-md">
                                                            <p className="text-xs font-bold text-slate-500">Apple</p>
                                                            <div className="flex justify-between items-center">
                                                                <input className="admin_release_page_input grow" id='featuring_artist_apple' defaultValue={f.appleId} type="text" />
                                                                <DocumentDuplicateIcon style={{cursor: 'pointer'}} onClick={() => handleCopyText('featuring_artist_apple')} className="w-5 h-5 text-slate-500"/>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        f?.spotifyId &&
                                                        <div className="my-2 p-2 border rounded-md">
                                                            <p className="text-xs font-bold text-slate-500">Spotify</p>
                                                            <div className="flex justify-between items-center">
                                                                <input className="admin_release_page_input grow" id='featuring_artist_spotify' defaultValue={f.spotifyId} type="text" />
                                                                <DocumentDuplicateIcon style={{cursor: 'pointer'}} onClick={() => handleCopyText('featuring_artist_spotify')} className="w-5 h-5 text-slate-500"/>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        f?.facebook &&
                                                        <div className="my-2 p-2 border rounded-md">
                                                            <p className="text-xs font-bold text-slate-500">Facebook</p>
                                                            <div className="flex justify-between items-center">
                                                                <input className="admin_release_page_input grow" id='featuring_artist_facebook' defaultValue={f.facebook} type="text" />
                                                                <DocumentDuplicateIcon style={{cursor: 'pointer'}} onClick={() => handleCopyText('featuring_artist_facebook')} className="w-5 h-5 text-slate-500"/>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        f?.youtube &&
                                                        <div className="my-2 p-2 border rounded-md">
                                                            <p className="text-xs font-bold text-slate-500">Youtube</p>
                                                            <div className="flex justify-between items-center">
                                                                <input className="admin_release_page_input grow" id='featuring_artist_youtube' defaultValue={f.youtube} type="text" />
                                                                <DocumentDuplicateIcon style={{cursor: 'pointer'}} onClick={() => handleCopyText('featuring_artist_youtube')} className="w-5 h-5 text-slate-500"/>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </dialog>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <p className="font-bold border-b">Other Details</p>
                        <table className="table table-zebra">
                            <tbody>
                                {/* row 0 */}
                                <tr>
                                    <td>Authors Name:</td>
                                    <td>
                                        {
                                            releaseData?.authors && releaseData?.authors.map((a, index)=> <span className="mx-1 px-2 py-1 bg-slate-200 rounded-md" key={index}>{a}</span>)
                                        }
                                    </td>
                                </tr>
                                {/* row 1 */}
                                <tr><td>Album Name:</td><td>{releaseData?.albumName}</td></tr>
                                {/* row 2 */}
                                <tr><td>Genre:</td><td>{releaseData?.genre}</td></tr>
                                {/* row 3 */}
                                <tr><td>P Line:</td><td>{releaseData?.pLine}</td></tr>
                                {/* row 4 */}
                                <tr><td>C Line:</td><td>{releaseData?.cLine}</td></tr>
                                {/* row 5 */}
                                <tr>
                                    <td>Composer Name:</td>
                                    <td>
                                        {
                                            releaseData?.composer?.map((c, index)=> <span className="mx-1 px-2 py-1 bg-slate-200 rounded-md" key={index}>{c}</span>)
                                        }
                                    </td>
                                </tr>
                                {/* row 6 */}
                                <tr><td>Format:</td><td>{releaseData?.format}</td></tr>
                                {/* row 7 */}
                                <tr><td>Lyrics Language:</td><td>{releaseData?.lyricsLanguage}</td></tr>
                                {/* row 8 */}
                                <tr><td>Release Date:</td><td>{releaseData?.releaseDate}</td></tr>
                                {/* row 9 */}
                                <tr><td>UPC:</td><td>{releaseData?.UPC}</td></tr>
                                {/* row 10 */}
                                <tr><td>ISRC:</td><td>{releaseData?.ISRC}</td></tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                }

                    {
                        albumData && 
                        <div className="p-2 md:p-4">
                            <p className="font-bold">This Album Other Releases</p>
                            <AdminReleaseCardComponent releaseData={albumData} totalItems={albumData.length} fetchLoading={loading} currentPage={1} itemPerPage={20}/>                        </div>
                    }
            </div> 
        </div>
    );
};

export default AdminSingleReleasePage;