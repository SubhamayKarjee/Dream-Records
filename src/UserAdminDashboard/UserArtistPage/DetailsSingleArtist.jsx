import { Image, Skeleton } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import fallbackImage from "../../assets/fallbackImage.jpg";
import appleImg from '../../assets/social-icon/apple.png';
import instagramImg from '../../assets/social-icon/instagram.png';
import spotifyImg from '../../assets/social-icon/spotify.png';
import facebookImg from '../../assets/social-icon/facebook.png';
import youtubeImg from '../../assets/social-icon/youtube.png';
import ReleaseCardComponent from "../ReleasesPage/ReleaseCardComponent/ReleaseCardComponent";
import { useParams } from "react-router-dom";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";

const DetailsSingleArtist = () => {

    const {id} = useParams();

    const [artist, setArtist] = useState();
    const [artistFetchLoading, setArtistFetchLoading] = useState(false);
    useEffect( () => {
        setArtistFetchLoading(true)
        axios.get(`http://localhost:5000/api/v1/artist/single-artist/${id}`)
        .then(res => {
            setArtist(res.data.data[0]);
            console.log(res.data.data[0]);
            setArtistFetchLoading(false)
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
    const [totalReleaseCount, setTotalReleaseCount] = useState()

    // Get Release List ______________________________________________________________
    useEffect(() => {
        // Calculate Pagination and Fetch__________________________________________________
        setFetchLoading(true)
        axios.get(`http://localhost:5000/api/v1/release/artist/${id}?page=${currentPage}&limit=${itemPerPage}&status=${releaseStatus}`)
            .then( res => {
              if(res.status == 200){
                setFetchLoading(false);
                setTotalItems(res.data.dataCount);
                setTotalReleaseCount(res.data.totalCount)
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
          axios.get(`http://localhost:5000/api/v1/release/artist/search/${id}?status=${releaseStatus}&search=${searchText}`)
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


    const deleteArtist = (id, imgKey) => {
        setFetchLoading(true)
        axios.delete(`http://localhost:5000/api/v1/artist/delete-artist/${id}?imgKey=${imgKey}`)
          .then( res => {
            if(res.status == 200){
              setFetchLoading(false)
              console.log(res.data.message);
            }
          })
          .catch(er => console.log(er));
      }

    return (
        <div className="md:flex md:h-full">
            <div className="h-full md:basis-3/4 overflow-y-auto md:border-r p-2">
                {
                    artistFetchLoading == true && 
                    <Skeleton
                        className="py-9"
                        avatar
                        paragraph={{
                        rows: 2,
                        }}
                    />
                }
                {
                    artist && !totalReleaseCount &&
                    <div className="mt-1 flex justify-end">
                        <button className="btn btn-sm flex items-center font-bold text-sm bg-red-400" onClick={() => deleteArtist(artist._id, artist.key)}>Delete Artist</button>
                    </div>
                }
                {
                    artist && 
                    <div className="md:flex justify-between p-2 my-3 rounded-md border">
                        <div className="flex">
                            <Image
                            width={120}
                            height={120}
                            className="rounded-lg"
                            src={artist.imgUrl}
                            fallback={fallbackImage}
                            />
                            <div className="ps-2">
                                <h2 className="font-bold">{artist.artistName}</h2>
                                <p className="text-sm text-slate-400">ID: {artist._id}</p>
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
                                    {
                                        artist?.youtube &&
                                        <a target='_blank' href={artist.youtube}><img src={youtubeImg} alt={youtubeImg} /></a>
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-slate-100 rounded-md p-3">
                                <p className="font-bold text-sm text-slate-600">Youtube Channel ID : <span>{artist?.youtubeChannelId}</span></p>
                                <p className="font-bold text-sm text-slate-600">youtube OAC : <span>{artist?.youtubeOac}</span></p>
                            </div>
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
                        <button onClick={() => handleStatus('All')} className="btn btn-sm btn-neutral mx-1">All</button>
                        <button onClick={() => handleStatus('Pending')} className="btn btn-sm btn-neutral mx-1">Pending</button>
                        <button onClick={() => handleStatus('Approved')} className="btn btn-sm btn-neutral mx-1">Approved</button>
                        <button onClick={() => handleStatus('Action Required')} className="btn btn-sm btn-neutral mx-1">Action Required</button>
                        <button onClick={() => handleStatus('Rejected')} className="btn btn-sm btn-neutral mx-1">Rejected</button>
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

export default DetailsSingleArtist;