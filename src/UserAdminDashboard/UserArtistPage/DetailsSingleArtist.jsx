import { Button, Dropdown, Image, Popconfirm, Skeleton } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import fallbackImage from "../../assets/fallbackImage.jpg";
import appleImg from '../../assets/social-icon/apple.png';
import instagramImg from '../../assets/social-icon/instagram.png';
import spotifyImg from '../../assets/social-icon/spotify.png';
import facebookImg from '../../assets/social-icon/facebook.png';
import youtubeImg from '../../assets/social-icon/youtube.png'
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import LoadingComponentsForPage from "../../LoadingComponents/LoadingComponentsForPage";
import UpdateArtistForm from "./UpdateArtistForm";
import { createContext } from 'react';
import { ArrowsUpDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import ReleaseCardComponentFourColsGrid from "../ReleasesPage/ReleaseCardComponent/ReleaseCardComponentFourColsGrid";

export const UpdateRefetch = createContext();

const DetailsSingleArtist = () => {

    const {id, pageNumber, status} = useParams();
    const navigate = useNavigate();

    const [totalItems, setTotalItems] = useState()
    const [artist, setArtist] = useState();
    const [artistFetchLoading, setArtistFetchLoading] = useState(false);
    const [artistDataRefatch, setArtistDataRefatch] = useState(1)

    const contextValue = {
        artistDataRefatch,
        setArtistDataRefatch
    }
    useEffect( () => {
        setArtistFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/artist/single-artist/${id}`)
        .then(res => {
            setArtist(res.data.data[0]);
            setArtistFetchLoading(false)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [artistDataRefatch])

    // Paginatin and Search State __________________________________________________
    const [searchText, setSearchText] = useState('');

    const [releaseData, setReleaseData] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);
    const [totalReleaseCount, setTotalReleaseCount] = useState(0);
    const [hideDeleteButton, setHideDeleteButton] = useState('none')

    // Get Release List ______________________________________________________________
    useEffect(() => {
        // Calculate Pagination and Fetch__________________________________________________
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/artist/${id}?page=${pageNumber}&limit=6&status=${status}`)
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
      }, [pageNumber, status]);

    const handleSearch = (e) => {
        setSearchText(e)
    }

    const handlePageChange = (page) => {
        navigate(`/artist/${id}/${status}/${page}/6`)
      };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          setFetchLoading(true);
          axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/artist/search/${id}?status=${status}&search=${searchText}`)
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

    const location = useLocation();
    const currentPath = location.pathname;

    const activeLink = (to , currentPath) => {
        return currentPath.startsWith(to)
        ? { backgroundColor: '#F1F5F9'} // Active styles
        : {};
    }
    const items = [
        { key: '1',label: (<a rel="noopener noreferrer" href={`/artist/${id}/All/1/6`}>All</a>),},
        { key: '2',label: (<a rel="noopener noreferrer" href={`/artist/${id}/Pending/1/6`}>Pending</a>),},
        { key: '3',label: (<a rel="noopener noreferrer" href={`/artist/${id}/Review/1/6`}>Review</a>),},
        { key: '4',label: (<a rel="noopener noreferrer" href={`/artist/${id}/Approved/1/6`}>Approved</a>),},
        { key: '5',label: (<a rel="noopener noreferrer" href={`/artist/${id}/Action Required/16`}>Action Required</a>),},
        { key: '6',label: (<a rel="noopener noreferrer" href={`/artist/${id}/Takedown/1/6`}>Takedown</a>),},
    ];
    const inputStyle ={
        height: '36px',
        border: '1px solid #E2E8F0',
        minWidth: '200px'
    }

    const cancel = () => {
      return;
    };

    if(deleteLoading){
        return <LoadingComponentsForPage/>
    }


    return (
        <div className="md:h-full">
            <div className="h-full overflow-y-auto px-3 md:pt-16">
                <h3 className='font-semibold text-xl text-[#252525]'>Artist Details</h3>
                {
                    artistFetchLoading == true && 
                    <Skeleton
                        className="py-4"
                        avatar
                        paragraph={{
                        rows: 4,
                        }}
                    />
                }
                {
                    artist && 
                    <div className="flex justify-between gap-2 flex-col md:flex-row pt-2">
                        <div className="flex">
                            <Image
                            width={194}
                            height={176}
                            className="rounded-lg"
                            src={artist.imgUrl}
                            fallback={fallbackImage}
                            />
                            <div className="ps-2 flex flex-col justify-between">
                                <div>
                                    <h2 className="font-bold">{artist.artistName}</h2>
                                    <p className="text-sm text-slate-400">{artist?.userName}</p>
                                </div>
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
                        <div className="">
                                {
                                    totalReleaseCount > 0 &&
                                    <button onClick={()=>document.getElementById('artistUpdate').showModal()} className="btn btn-sm px-3 items-center"><PencilSquareIcon className="w-4 h-4 text-slate-700"/>Edit Atrist Details</button>

                                }
                                {
                                    totalReleaseCount < 1 &&
                                    <div style={{display: `${hideDeleteButton}`}}>
                                        <div className="flex items-center gap-2">
                                            <button onClick={()=>document.getElementById('artistUpdate').showModal()}  className="btn btn-sm "><PencilSquareIcon className="w-4 h-4 text-slate-700"/>Edit Artist Details</button>
                                            <div>
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
                                                    <TrashIcon className="h-5 w-5 "/>
                                                </Popconfirm>
                                        </div>
                                        </div>
                                    </div>

                                }
                                <dialog id="artistUpdate" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <UpdateRefetch.Provider value={contextValue}>
                                            <UpdateArtistForm artist={artist} imgUrl={artist?.imgUrl} imgKey={artist?.key } artistDataRefatch={artistDataRefatch} forArtistDataRefatch={setArtistDataRefatch}/>
                                        </UpdateRefetch.Provider>
                                    </div>
                                </dialog>
                        </div>
                    </div>
                }
                {/* Release Card _______________________________________________________________ */}
                <main className="pt-3">
                    <p className="font-semibold pb-2">Releases under this Artist</p>

                    <div>
                        <div className="flex justify-between">
                            {/* Desktop Div _____________________________________ */}
                            <div className="hidden md:block">
                                <div className="h-10 px-[5px] py-1 flex items-center p-1 border rounded-md">
                                    <NavLink style={() => activeLink(`/artist/${id}/All`, currentPath)} to={`/artist/${id}/All/1/6`} className="px-[12px] py-[6px] rounded text-sm font-semibold">All</NavLink>
                                    <NavLink style={() => activeLink(`/artist/${id}/Pending`, currentPath)} to={`/artist/${id}/Pending/1/6`} className="px-[12px] py-[6px] rounded text-sm font-semibold">Pending</NavLink>
                                    <NavLink style={() => activeLink(`/artist/${id}/Review`, currentPath)} to={`/artist/${id}/Review/1/8`} className="px-[12px] py-[6px] rounded text-sm font-semibold">Review</NavLink>
                                    <NavLink style={() => activeLink(`/artist/${id}/Approved`, currentPath)} to={`/artist/${id}/Approved/1/6`} className="px-[12px] py-[6px] rounded text-sm font-semibold">Approved</NavLink>
                                    <NavLink style={() => activeLink(`/artist/${id}/Action`, currentPath)} to={`/artist/${id}/Action Required/1/6`} className="px-[12px] py-[6px] rounded text-sm font-semibold">Action Required</NavLink>
                                    <NavLink style={() => activeLink(`/artist/${id}/TakeDown`, currentPath)} to={`/artist/${id}/TakeDown/1/6`} className="px-[12px] py-[6px] rounded text-sm font-semibold">Takedown</NavLink>
                                </div>
                            </div>
                            {/* Mobile Div _____________________________________ */}
                            <div className="block md:hidden">
                                <Dropdown
                                    menu={{items,}}
                                    placement="bottomLeft"
                                    className="h-10"
                                >
                                    <Button className="text-md font-semibold flex items-center gap-2">{status} <ArrowsUpDownIcon className="w-4 h-4"/></Button>
                                </Dropdown>
                            </div>

                            <div className="">
                                <input style={inputStyle} type="text" onKeyPress={handleKeyPress} onChange={e => handleSearch(e.target.value)} placeholder="Type & Enter to Search" className="input input-sm w-full"/>
                            </div>
                            
                        </div>
                    </div>
                    

                    {
                        fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                    }
                    <ReleaseCardComponentFourColsGrid itemPerPage={6} releaseData={releaseData} totalItems={totalItems} fetchLoading={fetchLoading} currentPage={pageNumber} handlePageChange={handlePageChange}/>
                </main>
            </div>            
        </div>
    );
};

export default DetailsSingleArtist;