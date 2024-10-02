import { ArrowTopRightOnSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Divider, Modal, Select, Steps } from "antd";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ReleaseContext } from "./CreateMusicPage";
import UploadTracks from "./UploadTracks/UploadTracks";


const SecondStepTrack = () => {

    const navigate = useNavigate()
    const { 
        firstStep,
        format,setFormat,
        secondStep, setSecondStep
    } = useContext(ReleaseContext);
    
    const [formateErr, setFormateErr] = useState('');

    const steps = [
        {title: 'Basic'},
        {title: 'Tracks'},
        {title: 'Date'},
    ];

    useEffect(() => {
        if(!firstStep){
            navigate('/create-release')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const next = () => {
        setFormateErr();
        if(!firstStep){
            toast.error('Please Fill The First Step')
            return;
        }
        if(!format){
            setFormateErr('Please Select Formate')
            return;
        }
        if(secondStep.length === 0){
            toast.error('Please Add Release')
            return;
        }
        navigate('/create-release/date')
    }

    const [isTrackUploadModal, setIsTrackUploadModal] = useState(false);
    const showModal = () => {
        setIsTrackUploadModal(true);
    };
    const handleOk = () => {
        setIsTrackUploadModal(false);
    };
    const handleCancel = () => {
        setIsTrackUploadModal(false);
    };

    const handleDelete = (indexToDelete) => {
        const newArray = secondStep.filter((item, index) => index !== indexToDelete);
        setSecondStep(newArray)
    }


    return (
        <div>
            <div className="px-3">
                <Steps current={1} items={steps} /> 
            </div>

            <div className="pt-4">
                <p className="text-lg font-semibold">Upload Track</p>
                <p className="text-sm text-[#71717A]">Update your account settings. Set your preferred language and timezone.</p>
            </div>
            <Divider/>
            <div className="">
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
                    {
                        formateErr && <span className='text-red-600 pt-2 block'>{formateErr}</span>
                    }

                    {
                        format === 'Single' &&
                        <UploadTracks/>
                    }
                    

                    {
                        format === 'Album' && secondStep && 
                        secondStep.map((data, index) => <>
                            <div key={index} className="p-2 rounded-md my-1 flex items-center justify-between bg-[#F4F4F5CC]">
                                <div className="flex items-center gap-2 md:gap-4">
                                    <p className="text-sm font-semibold"> Track {index + 1}</p>
                                    <p className="text-sm font-semibold">{data.albumName}</p>
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    <ArrowTopRightOnSquareIcon onClick={()=>document.getElementById(index).showModal()} className="w-4 h-4 text-[#252525] cursor-pointer"/>
                                    <TrashIcon onClick={() => handleDelete(index)} className="w-4 h-4 text-[#252525] cursor-pointer"/>
                                </div>
                            </div> 

                            <dialog id={index} className="modal ">
                                <div className="modal-box rounded-md">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <h3 className="font-bold text-lg">Tracks {index+1} Details</h3>
                                    <div className="grid grid-cols gap-2 mt-3">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-sm text-[#768298]">Format</p>
                                                <p className="font-semibold text-base">{data?.format}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#768298]">Album Name</p>
                                                <p className="font-semibold text-base">{data?.albumName}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-[#768298]">Audio</p>
                                            <p className="text-sm">{data.audioName}</p>
                                            <audio controls src={data.audioUrl}></audio>
                                        </div>
                                        <div>
                                            <p className="text-sm text-[#768298]">Lyrics language</p>
                                            <p className="font-semibold text-base">{data.lyricsLanguage}</p>
                                        </div>
                                        <div className="grid grid-cols md:grid-cols-2 gap-2">
                                            <div>
                                            <p className="text-sm text-[#768298]">Artist</p>
                                                {
                                                    data.artist && data.artist.map(d => 
                                                        <div key={d._id} className="flex items-center justify-between my-1 py-1 px-2 rounded-md border">
                                                            <div className="flex items-center">
                                                                <img className="w-8 h-8 rounded-md" src={d.imgUrl} alt="" />
                                                                <div className="ps-2">
                                                                <h2 className="font-bold text-sm">{d.artistName}</h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#768298]">Labels</p>
                                                {
                                                    data.labels && data.labels.map(d => 
                                                        <div key={d._id} className="flex items-center justify-between my-1 py-1 px-2 rounded-md border">
                                                            <div className="flex items-center">
                                                                <img className="w-8 h-8 rounded-md" src={d.imgUrl} alt="" />
                                                                <div className="ps-2">
                                                                    <h2 className="font-bold text-sm">{d.labelName}</h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="grid grid-cols md:grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-sm text-[#768298]">Authors</p>
                                                {
                                                    data.authors && data.authors.map((a, index) => 
                                                        <div key={index} className="flex items-center justify-between my-1 mx-1 py-1 px-3 border rounded-md">
                                                            <p className="font-semibold text-base">{a}</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#768298]">Composer</p>
                                                {
                                                    data.composer && data.composer.map((c, index) =>
                                                        <div key={index} className="flex items-center justify-between my-1 mx-1 py-1 px-3 border rounded-md">
                                                            <p className="font-semibold text-base">{c}</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </dialog>
                        </>)
                    }

                    {
                        format === 'Album' &&
                        <>
                            <span className="btn btn-sm w-full my-4 btn-neutral bg-[#18181B]" onClick={showModal}>
                                Add Tracks
                            </span>
                            <Modal title="Tracks" width={600} open={isTrackUploadModal} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                                <UploadTracks setIsTrackUploadModal={setIsTrackUploadModal}/>
                            </Modal>
                        </>
                    }

                    {
                        format === 'Album' &&
                        <div className="my-4 flex justify-between">
                            <button onClick={() => navigate('/create-release')} className="btn btn-sm px-6">Previous</button>
                            <button onClick={() => next()} className="btn btn-sm px-6 h-9 btn-neutral bg-[#18181B]">Next</button>
                        </div>
                    }

            </div>
        </div>
    );
};

export default SecondStepTrack;