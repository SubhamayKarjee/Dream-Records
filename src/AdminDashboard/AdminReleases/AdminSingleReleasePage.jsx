import LoadingComponentsInsidePage from "../../LoadingComponents/LoadingComponentsInsidePage";
import { Image, Modal, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import fallbackImage from "../../assets/fallbackImage.jpg"
import { ArrowPathIcon, CheckBadgeIcon, ClockIcon, ExclamationTriangleIcon, TrashIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const AdminSingleReleasePage = () => {

    const {id} = useParams();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [releaseData, setReleaseData] = useState()

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/api/v1/release/single/${id}`)
            .then( res => {
                if(res.status == 200){
                    setLoading(false);
                    setReleaseData(res.data.data[0]);
                }
            })
            .catch(er => console.log(er));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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


    const [releaseStatus, setReleaseStatus] = useState(releaseData?.status);
    const [updateLoading, setUpdateLoading] = useState(false)
    const { register, handleSubmit,reset, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        setUpdateLoading(true)
        const status = releaseStatus;
        const formData = {...releaseData, status, ...data }
            axios.put(`http://localhost:5000/api/v1/release/update-release/${id}`, formData)
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
    const handleDeleteRelease = () => {
        setDeleteLoading(true)
        axios.delete(`http://localhost:5000/api/v1/release//delete-release/${id}?imgKey=${releaseData.key}&audioKey=${releaseData.audioKey}`)
        .then(res => {
            if(res.status == 200){
                setDeleteLoading(false)
                toast.success('Release Deleted')
                navigate('/admin-dashboard/release')
            }
        })
    }
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
                                    <p className="text-white text-sm">ID: {releaseData?._id}</p>
                                </div>
                                <div>
                                    {
                                        releaseData?.status === 'Pending' &&
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
                                                onChange={(value) => setReleaseStatus(value)}
                                                options={[
                                                    { value: 'Pending', label: 'Pending' },
                                                    { value: 'Approved', label: 'Approved' },
                                                    { value: 'Action Required', label: 'Action Required' },
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
                                    <span style={{cursor: 'pointer'}} onClick={handleDeleteRelease} className="bg-red-400 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><TrashIcon className="w-4 h-4 me-1"/> Delete</span>
                                </div>
                            </div>
                        </div>                                 
                  </div>

                    <div className="p-2 bg-gradient-to-r from-[#EF4136] to-[#fff] rounded-md my-2 shadow">
                        <p className="text-sm pb-2 font-bold">Audio</p>
                        <audio controls src={releaseData?.audioUrl}></audio>
                    </div> 

                    <div className="border p-2 rounded-lg my-4 shadow">
                        <div className="my-3">
                            <p className="text-xs font-bold">Artist Details</p>
                            <div className=" p-2 bg-slate-100 rounded-md">
                                {
                                    releaseData?.artist.map(a => 
                                        <div key={a._id} className="flex my-2">
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
                                                <p className="text-xs">ID: {a?._id}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="my-3">
                            <p className="text-xs font-bold">Labels Details</p>
                            <div className=" p-2 bg-slate-100 rounded-md">
                                {
                                    releaseData?.labels.map(l => 
                                        <div key={l._id} className="flex my-2">
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
                                                <p className="text-xs">ID: {l?._id}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="my-3">
                            <p className="text-xs font-bold">Featuring Details</p>
                            <div className=" p-2 bg-slate-100 rounded-md">
                                {
                                    releaseData?.featuring?.map(f => 
                                        <div key={f._id} className="flex my-2">
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
                                                <p className="text-xs">ID: {f?._id}</p>
                                            </div>
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
                                            releaseData?.authors.map((a, index)=> <span className="mx-1 px-2 py-1 bg-slate-200 rounded-md" key={index}>{a}</span>)
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
            </div>
        </div>
    );
};

export default AdminSingleReleasePage;