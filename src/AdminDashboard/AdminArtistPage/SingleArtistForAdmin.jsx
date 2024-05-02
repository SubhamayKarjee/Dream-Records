import { Image, Popconfirm, Skeleton } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import fallbackImage from "../../assets/fallbackImage.jpg";
import appleImg from '../../assets/social-icon/apple.png';
import instagramImg from '../../assets/social-icon/instagram.png';
import spotifyImg from '../../assets/social-icon/spotify.png';
import facebookImg from '../../assets/social-icon/facebook.png';
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingComponentsForPage from "../../LoadingComponents/LoadingComponentsForPage";
import AdminReleaseCardComponent from "../AdminReleases/AdminReleaseCardComponent";



const SingleArtistForAdmin = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [artist, setArtist] = useState();
    const [artistFetchLoading, setArtistFetchLoading] = useState(false);

    useEffect( () => {
        setArtistFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/artist/single-artist/${id}`)
        .then(res => {
            setArtist(res.data.data[0]);
            setArtistFetchLoading(false)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Paginatin and Search State __________________________________________________
    const [releaseStatus, setReleaseStatus] = useState('All')
    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(9);
    const [searchText, setSearchText] = useState('');

    const [releaseData, setReleaseData] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);
    const [totalReleaseCount, setTotalReleaseCount] = useState(0);
    const [hideDeleteButton, setHideDeleteButton] = useState('none')

    // Get Release List ______________________________________________________________
    useEffect(() => {
        setItemPerPage(9)
        // Calculate Pagination and Fetch__________________________________________________
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/artist/${id}?page=${currentPage}&limit=${itemPerPage}&status=${releaseStatus}`)
            .then( res => {
              if(res.status == 200){
                setFetchLoading(false);
                setTotalItems(res.data.dataCount);
                setTotalReleaseCount(res.data.totalCount);
                if(!res.data.totalCount){
                    setHideDeleteButton('block')
                }
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
        setItemPerPage(50)
        if (event.key === 'Enter') {
          setFetchLoading(true);
          axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/artist/search/${id}?status=${releaseStatus}&search=${searchText}`)
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

    // Delete Artist________________________
    const [deleteLoading, setDeleteLoading] = useState(false)
    const confirm = (id, imgKey) => {
        setDeleteLoading(true)
        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/api/v1/artist/delete-artist/${id}?imgKey=${imgKey}`)
        .then( res => {
            if(res.status == 200){
                setDeleteLoading(false)
                toast.success('Deleted the Artist');
                navigate('/artist')
            }
        })
        .catch(er => console.log(er));
    }

    const cancel = () => {
      return;
    };

    if(deleteLoading){
        return <LoadingComponentsForPage/>
    }


    return (
        <div className="p-2">
            <div className="">
                {
                    artistFetchLoading == true && 
                    <Skeleton
                        className="py-4"
                        avatar
                        paragraph={{
                        rows: 2,
                        }}
                    />
                }
                {
                    artist && 
                    <div className="md:flex justify-between my-3 rounded-md border">
                        <div className="flex p-2">
                            <Image
                            width={100}
                            height={100}
                            className="rounded-lg"
                            src={artist.imgUrl}
                            fallback={fallbackImage}
                            />
                            <div className="ps-2">
                                <h2 className="font-bold">{artist.artistName}</h2>
                                <p className="text-sm text-slate-400">ID: {artist._id}</p>
                                <p className="font-bold text-sm text-slate-600">Youtube ID : <span>{artist?.youtubeChannelId}</span></p>
                                <div className="flex items-center gap-3 my-2">
                                    {
                                        artist?.appleId &&
                                        <a target='_blank' href={`https://music.apple.com/profile/${artist.appleId}`}><img src={appleImg} alt={appleImg} /></a>
                                    }
                                    {
                                        artist?.spotifyId &&
                                        <a target='_blank' href={`https://open.spotify.com/user/${artist.spotifyId}`}><img src={spotifyImg} alt={spotifyImg} /></a>
                                    }
                                    {
                                        artist?.instagramId &&
                                        <a target='_blank' href={`https://www.instagram.com/${artist.instagramId}`}><img src={instagramImg} alt={instagramImg} /></a>
                                    }
                                    {
                                        artist?.facebook &&
                                        <a target='_blank' href={artist.facebook}><img src={facebookImg} alt={facebookImg} /></a>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="p-2">
                                {
                                    totalReleaseCount < 1 &&
                                    <div style={{display: `${hideDeleteButton}`}}>
                                        <Popconfirm
                                            title="Delete"
                                            placement="leftTop"
                                            className="z-1000"
                                            description="Are you sure to Delete Artist?"
                                            onConfirm={() => confirm(artist._id, artist.key)}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                            >
                                            <button  className="btn btn-xs bg-red-400 flex text-slate-700 px-3 items-center font-bold text-sm w-full md:w-[120px] mb-2">Delete Artist</button>
                                        </Popconfirm>
                                    </div>

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
                    <p className="font-bold text-slate-500 border-b">Releases under this Artist</p>
                    <div className="my-3">
                        <button onClick={() => handleStatus('All')} className="btn btn-sm btn-neutral m-1">All</button>
                        <button onClick={() => handleStatus('Pending')} className="btn btn-sm btn-neutral m-1">Pending</button>
                        <button onClick={() => handleStatus('Review')} className="btn btn-sm btn-neutral m-1">Review</button>
                        <button onClick={() => handleStatus('Approved')} className="btn btn-sm btn-neutral m-1">Approved</button>
                        <button onClick={() => handleStatus('Action Required')} className="btn btn-sm btn-neutral m-1">Action Required</button>
                        <button onClick={() => handleStatus('Takedown')} className="btn btn-sm btn-neutral m-1">Takedown</button>
                    </div>
                    {
                        fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                    }
                    <AdminReleaseCardComponent itemPerPage={itemPerPage} releaseData={releaseData} totalItems={totalItems} fetchLoading={fetchLoading} currentPage={currentPage} handlePageChange={handlePageChange}/>
                </main>
            </div>
        </div>
    );
};

export default SingleArtistForAdmin;