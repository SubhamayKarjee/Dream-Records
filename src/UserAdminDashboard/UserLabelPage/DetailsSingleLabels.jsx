import { CheckBadgeIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Image } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";
import fallbackImage from "../../assets/fallbackImage.jpg"

const DetailsSingleLabels = () => {

    const {id} = useParams();

    const [labels, setLabels] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);
    useEffect( () => {
        setFetchLoading(true)
        axios.get(`http://localhost:5000/api/v1/labels/single-labels/${id}`)
        .then(res => {
            setLabels(res.data.data[0]);
            console.log(res.data.data[0]);
            setFetchLoading(false)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const deleteLabels = (id, imgKey) => {
        setFetchLoading(true)
        axios.delete(`http://localhost:5000/api/v1/labels/delete-labels/${id}?imgKey=${imgKey}`)
          .then( res => {
            if(res.status == 200){
                Navigate('labels');
                toast.success('Deleted the Labels')
            }
          })
          .catch(er => console.log(er));
      }

    return (
        <div>
            {
                labels?.status === 'Rejected' &&
                <div className="flex justify-end mt-2">
                    <span onClick={() => deleteLabels(labels._id, labels.imgKey)} className="btn btn-xs bg-red-400 py-1 px-2 rounded-md text-xs me-2 font-bold flex items-center">Delete Label</span>
                </div>
            }
            {
                fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
            }
            {
                labels && 
                <div className="md:flex justify-between p-2 my-3 rounded-md border">
                    <div className="flex">
                        <Image
                        width={120}
                        height={120}
                        className="rounded-lg"
                        src={labels.imgUrl}
                        fallback={fallbackImage}
                        />
                        <div className="ps-2">
                            <h2 className="font-bold">{labels.labelName}</h2>
                            <p className="text-sm text-slate-400">ID: {labels._id}</p>
                            {
                                labels.status === 'Pending' &&
                                <span className="bg-yellow-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><ClockIcon className="w-4 h-4 me-1"/> {labels.status}</span>
                            }
                            {
                                labels.status === 'Approved' &&
                                <span className="bg-green-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><CheckBadgeIcon className="w-4 h-4 me-1"/> {labels.status}</span>
                            }
                            {
                                labels.status === 'Rejected' &&
                                <span className="bg-red-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><XCircleIcon className="w-4 h-4 me-1"/> {labels.status}</span>
                            }

                        </div>
                    </div>
                    
                    <div>
                        <p className="text-sm font-bold border-b text-slate-500">Labels Other Detais</p>
                        {
                            labels?.youtubeChannelLink && <a href={labels.youtubeChannelLink} target="_blank" className="flex items-center">
                               <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="me-2"
                                    width="24"
                                    height="24"
                                    >
                                    <path
                                        fill="#FF0000"
                                        d="M21.8 7.9c-.2-.8-.8-1.5-1.5-1.7C18.4 6 12 6 12 6s-6.4 0-8.3.2c-.7.2-1.3.9-1.5 1.7C2 9.8 2 12 2 12s0 2.2.2 4.1c.2.8.8 1.5 1.5 1.7 1.9.2 8.3.2 8.3.2s6.4 0 8.3-.2c.7-.2 1.3-.9 1.5-1.7.2-1.9.2-4.1.2-4.1s0-2.2-.2-4.1zM10 15V9l5.2 3-5.2 3z"
                                    />
                                </svg>
                                {labels.youtubeChannelLink}
                            </a>
                        }
                        {
                            labels?.description &&
                            <p className="text-sm text-slate-600">{labels.description}</p>
                        }
                    </div>
                    
                </div>
            }
            <div>
                <p className="font-bold text-slate-500 border-b">Releases under this label</p>
            </div>
        </div>
    );
};

export default DetailsSingleLabels;