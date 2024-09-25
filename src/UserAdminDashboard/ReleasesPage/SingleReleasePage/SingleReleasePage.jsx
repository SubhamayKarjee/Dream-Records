import { CheckBadgeIcon, ClockIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Divider, Image, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";
import fallbackImage from "../../../assets/fallbackImage.jpg"
import toast from "react-hot-toast";
import { DocumentMagnifyingGlassIcon, ExclamationTriangleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './SingleReleasePage.css'


const SingleReleasePage = () => {

    const {id} = useParams();
    const navigate = useNavigate()
    



    const [loading, setLoading] = useState(false);
    const [data, setData] = useState()

    useEffect(() => {
        setLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/single/${id}`)
            .then( res => {
                if(res.status == 200){
                    setLoading(false);
                    setData(res.data.data[0]);
                }
            })
            .catch(er => console.log(er));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNavigate = (id) => {
        const link = `/releases/edit/${id}`
        navigate(link)
    }

    const [deleteLoading, setDeleteLoading] = useState(false)
    const confirm = () => {
        setDeleteLoading(true)
        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/delete-release/${id}?imgKey=${data.key}&audioKey=${data.audioKey}`)
        .then(res => {
            if(res.status == 200){
                setDeleteLoading(false)
                toast.success('Release Deleted')
                navigate('/releases')
            }
        })
    }

    const cancel = () => {
      return;
    };


    if(deleteLoading){
        return <LoadingComponentsInsidePage/>
    }

    


    return (
        <div className="md:h-full">
            <div className='h-full overflow-y-auto'>
                <div className="md:pt-16 px-2">
                    <h3 className='font-semibold text-xl text-[#252525]'>Release Details</h3>
                    {/* Single Release page hero Section____________________________ */}
                    {
                    loading ? <LoadingComponentsInsidePage/> :
                    <div className="pt-3 px-1">
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex-1 flex gap-2">
                                <div>
                                    <div style={{borderRadius: '20px'}} className="hidden md:block overflow-hidden">
                                        <Image
                                            width={194}
                                            height={176}
                                            style={{borderRadius: '20px'}}
                                            src={data?.imgUrl}
                                            preview={true}
                                            alt="artist-image"
                                        />
                                    </div>
                                    <div className="block md:hidden">
                                        <Image
                                            width={143.3}
                                            height={130}
                                            style={{borderRadius: '20px'}}
                                            src={data?.imgUrl}
                                            preview={true}
                                            alt="artist-image"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between mb-2">
                                    <div>
                                        <h2 className="font-bold text-lg">{data?.releaseTitle}</h2>
                                        {
                                           data?.actionRequired && <p className="text-xs p-1 bg-[#F2F2F2] rounded-md">{data.actionRequired}</p>
                                        }
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {
                                            data?.status === 'Pending' &&
                                                <div className="flex items-center">
                                                    <ClockIcon className="h-3 w-3 text-[#FEB951] me-1"/>
                                                    <p className="text-xs font-semibold text-[#FEB951]">{data.status}</p>
                                                </div>
                                        }
                                        {
                                            data?.status === 'Approved' &&
                                                <div className="flex items-center">
                                                    <CheckBadgeIcon className="h-3 w-3 text-[#39C616] me-1"/>
                                                    <p className="text-xs font-semibold text-[#39C616]">{data.status}</p>
                                                </div>
                                        }
                                        {
                                            data?.status === 'Action Required' &&
                                                <div className="flex items-center">
                                                    <ExclamationTriangleIcon className="h-3 w-3 text-[#71717A] me-1"/>
                                                    <p className="text-xs font-semibold text-[#71717A]">{data.status}</p>
                                                </div>
                                        }
                                        {
                                            data?.status === 'Takedown' &&
                                                <div className="flex items-center">
                                                    <ExclamationTriangleIcon className="h-3 w-3 text-[#FF7050] me-1"/>
                                                    <p className="text-xs font-semibold text-[#FF7050]">{data.status}</p>
                                                </div>
                                        }
                                        {
                                            data?.status === 'Review' &&
                                                <div className="flex items-center">
                                                    <DocumentMagnifyingGlassIcon className="h-3 w-3 text-[#39B5FB] me-1"/>
                                                    <p className="text-xs font-semibold text-[#39B5FB]">{data.status}</p>
                                                </div>
                                        }
                                        <div>
                                            {
                                                data?.status === 'Action Required' && 
                                                <div className="flex items-center gap-2">
                                                    <PencilSquareIcon style={{cursor: 'pointer'}} onClick={() => handleNavigate(data?._id)} className="h-4 w-4"/>
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
                                                        <TrashIcon style={{cursor: 'pointer'}} className="w-4 h-4 me-1"/>
                                                    </Popconfirm>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex-1">
                                <div id="audioPlayerDiv">
                                    <AudioPlayer
                                        style={{height: '100%'}}
                                        src={data?.audioUrl}
                                        onPlay={e => console.log(e)}
                                        // other props here
                                    />
                                </div>
                            </div>                                 
                        </div>

                        <Divider/>
                        {/* Single Release page Second Section Artist and Labels____________________________ */}
                        <div className="flex gap-2 flex-col md:flex-row mt-3">
                            <div className="md:flex-1">
                                <p className="text-sm font-semibold text-[#768298]">Artist Details</p>
                                {
                                    data?.artist && data?.artist?.map(a => 
                                        <div key={a._id} className="flex my-1 items-center">
                                            <div>
                                                <Image
                                                    width={48}
                                                    height={48}
                                                    className="rounded-full"
                                                    src={a?.imgUrl}
                                                    preview={true}
                                                    fallback={fallbackImage}
                                                    alt={a.artistName}
                                                />
                                            </div>
                                            <div className="ms-2">
                                                <h2 className="text-md">{a?.artistName}</h2>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="md:flex-1">
                                <p className="text-sm font-semibold text-[#768298]">Labels Details</p>
                                    {
                                        data?.labels && data?.labels?.map((l) => 
                                            <div key={l._id}>
                                                <div className="flex my-1">
                                                    <div>
                                                        <Image
                                                            width={48}
                                                            height={48}
                                                            className="rounded-full"
                                                            src={l?.imgUrl}
                                                            preview={true}
                                                            fallback={fallbackImage}
                                                            alt={l.labelName}
                                                        />
                                                    </div>
                                                    <div className="ms-2">
                                                        <h2 className="font-bold">{l?.labelName}</h2>
                                                        <div className="flex items-center">
                                                            <CheckBadgeIcon className="h-3 w-3 text-[#39C616] me-1"/>
                                                            <p className="text-xs font-semibold text-[#39C616]">{l.status}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                            </div>
                        </div>

                        {/* Other Details about Release _________________________________________ */}
                        <div className="pt-2">
                            <h4 className="font-bold text-lg">Other Details</h4>

                            <div className="grid grid-cols-2 pt-2 gap-2">
                                <div>
                                    <p className="font-semibold text-sm text-[#768298]">Authors Name:</p>
                                    {
                                        data?.authors && data?.authors?.map((a, index)=> <span className="font-semibold me-2" key={index}>{a}</span>)
                                    }
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[#768298]">Composer Name:</p>
                                    {
                                        data?.composer && data?.composer?.map((c, index)=> <span className="font-semibold me-2" key={index}>{c}</span>)
                                    }
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[#768298]">Genre:</p>
                                    <p className="font-semibold">{data?.genre}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[#768298]">Album Name:</p>
                                    <p className="font-semibold">{data?.albumName}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[#768298]">P Line:</p>
                                    <p className="font-semibold">{data?.pLine}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[#768298]">C Line:</p>
                                    <p className="font-semibold">{data?.cLine}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[#768298]">Format:</p>
                                    <p className="font-semibold">{data?.format}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[#768298]">Lyrics Language:</p>
                                    <p className="font-semibold">{data?.lyricsLanguage}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[#768298]">Release Date:</p>
                                    <p className="font-semibold">{data?.releaseDate}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[#768298]">UPC:</p>
                                    <p className="font-semibold">{data?.UPC}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[#768298]">ISRC:</p>
                                    <p className="font-semibold">{data?.ISRC}</p>
                                </div>
                            </div>

                            
                            </div>
                        </div>
                    }
                </div>
            </div>

        </div>
    );
};

export default SingleReleasePage;