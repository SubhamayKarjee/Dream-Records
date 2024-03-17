import { CheckBadgeIcon, ClipboardDocumentListIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Image, Skeleton } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";
import fallbackImage from "../../assets/fallbackImage.jpg"
import ReleaseCardComponent from "../ReleasesPage/ReleaseCardComponent/ReleaseCardComponent";
import youtubeImg from '../../assets/social-icon/youtube.png';

const DetailsSingleLabels = () => {

    const {id} = useParams();

    const [labels, setLabels] = useState();
    const [labelsFetchLoading, setLabelsFetchLoading] = useState(false);
    useEffect( () => {
        setFetchLoading(true)
        axios.get(`http://localhost:5000/api/v1/labels/single-labels/${id}`)
        .then(res => {
            setLabels(res.data.data[0]);
            console.log(res.data.data[0]);
            setLabelsFetchLoading(false)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Paginatin and Search State __________________________________________________
    const [releaseStatus, setReleaseStatus] = useState('All')
    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(9);
    const [searchText, setSearchText] = useState('');

    const [releaseData, setReleaseData] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);

    // Get Release List ______________________________________________________________
    useEffect(() => {
        // Calculate Pagination and Fetch__________________________________________________
        setFetchLoading(true)
        axios.get(`http://localhost:5000/api/v1/release/labels/${id}?page=${currentPage}&limit=${itemPerPage}&status=${releaseStatus}`)
            .then( res => {
              if(res.status == 200){
                setFetchLoading(false);
                setTotalItems(res.data.dataCount);
                setReleaseData(res.data.data);
              }
            })
            .catch(er => console.log(er));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currentPage, releaseStatus]);

    const handleSearch = (e) => {
        setSearchText(e)
    }

    const handleStatus = (e) => {
        setCurrentPage(1)
        setReleaseStatus(e)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
      };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          setFetchLoading(true);
          axios.get(`http://localhost:5000/api/v1/release/labels/search/${id}?status=${releaseStatus}&search=${searchText}`)
            .then( res => {
              if(res.status == 200){
                setFetchLoading(false);
                setTotalItems(res.data.dataCount);
                setReleaseData(res.data.data);
              }
            })
            .catch(er => console.log(er));
        }
    };
    // Delete Labels
    const deleteLabels = (id, imgKey) => {
        setFetchLoading(true)
        axios.delete(`http://localhost:5000/api/v1/labels/delete-labels/${id}?imgKey=${imgKey}`)
          .then( res => {
            if(res.status == 200){
                Navigate('/labels');
                toast.success('Deleted the Labels')
            }
          })
          .catch(er => console.log(er));
      }

    return (
        <div className="md:flex md:h-full">
            <div className="h-full md:basis-3/4 overflow-y-auto md:border-r p-2">
                {
                    labelsFetchLoading == true && 
                    <Skeleton
                        className="py-4"
                        avatar
                        paragraph={{
                        rows: 2,
                        }}
                    />
                }
                {
                    !labelsFetchLoading && labels?.status === 'Rejected' &&
                    <div className="flex justify-end mt-2">
                        <span onClick={() => deleteLabels(labels._id, labels.imgKey)} className="btn btn-xs bg-red-400 py-1 px-2 rounded-md text-xs me-2 font-bold flex items-center">Delete Label</span>
                    </div>
                }
                {
                    labels && 
                    <div className="md:flex justify-between my-3 rounded-md border">
                        <div className="flex p-2">
                            <Image
                            width={100}
                            height={100}
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
                        <div className="p-2">
                            <p className="text-sm font-bold border-b text-slate-500">Labels Other Detais</p>
                            {
                                labels?.youtubeChannelLink && <a href={labels.youtubeChannelLink} target="_blank" className="flex items-center">
                                    <img className="me-2" src={youtubeImg} alt={youtubeImg} />
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
                {/* Release Card _______________________________________________________________ */}
                <main>
                    {/* Search and Create Release Section ______________________________________________________________________________ */}
                    <div className="md:flex md:justify-between md:items-center bg-slate-50 py-2 px-2 rounded-lg">
                        <div className="my-2">
                            <input type="text" onKeyPress={handleKeyPress} onChange={e => handleSearch(e.target.value)} placeholder="Type & Enter to Search" className="input input-sm rounded-full input-bordered w-full"/>
                        </div>
                    </div>
                    <p className="font-bold text-slate-500 border-b">Releases under this Labels</p>
                    <div className="my-3">
                        <button onClick={() => handleStatus('All')} className="btn btn-sm btn-neutral m-1">All</button>
                        <button onClick={() => handleStatus('Pending')} className="btn btn-sm btn-neutral m-1">Pending</button>
                        <button onClick={() => handleStatus('Approved')} className="btn btn-sm btn-neutral m-1">Approved</button>
                        <button onClick={() => handleStatus('Action Required')} className="btn btn-sm btn-neutral m-1">Action Required</button>
                        <button onClick={() => handleStatus('Rejected')} className="btn btn-sm btn-neutral m-1">Rejected</button>
                    </div>
                    {
                        fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                    }
                    <ReleaseCardComponent releaseData={releaseData} totalItems={totalItems} fetchLoading={fetchLoading} currentPage={currentPage} handlePageChange={handlePageChange}/>
                </main>
            </div>

            {/* Sideber Div  _______________________________*/}
            <div className="md:basis-1/4">
                <div className='p-2 border-b'>
                    <h4 className='flex items-center font-bold text-slate-500'> <ClipboardDocumentListIcon className='w-5 h-5 me-2 text-slate-500'/>Notification</h4>
                </div>
            </div>
        </div>
    );
};

export default DetailsSingleLabels;