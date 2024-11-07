import { CheckBadgeIcon, ClockIcon, ExclamationTriangleIcon, PencilSquareIcon, TrashIcon, } from "@heroicons/react/24/solid";
import { Button, Dropdown, Image, Popconfirm, Skeleton } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import youtubeImg from '../../assets/social-icon/youtube.png';
import LoadingComponentsForPage from "../../LoadingComponents/LoadingComponentsForPage";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import ReleaseCardComponentFourColsGrid from "../ReleasesPage/ReleaseCardComponent/ReleaseCardComponentFourColsGrid";
import fallbackImageLabel from '../../assets/fallbackImage/fallback-labels.png'

const DetailsSingleLabels = () => {

    const navigate = useNavigate('')
    const {id, status, pageNumber, perPageLabels} = useParams();
    const [labels, setLabels] = useState();
    const [labelsFetchLoading, setLabelsFetchLoading] = useState(false);
    useEffect( () => {
        setLabelsFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/labels/single-labels/${id}`)
        .then(res => {
            setLabels(res.data.data[0]);
            setLabelsFetchLoading(false)
        })
    }, [id])


    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [searchText, setSearchText] = useState('');

    const [releaseData, setReleaseData] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);

    // Get Release List ______________________________________________________________
    useEffect(() => {
        // Calculate Pagination and Fetch__________________________________________________
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/labels/${id}?page=${pageNumber}&limit=${perPageLabels}&status=${status}`)
            .then( res => {
              if(res.status == 200){
                setFetchLoading(false);
                setTotalItems(res.data.dataCount);
                setReleaseData(res.data.data);
              }
            })
            .catch(er => console.log(er));
    }, [ status, pageNumber, perPageLabels, id]);

    const handleSearch = (e) => {
        setSearchText(e)
    }

    const handlePageChange = (page) => {
        navigate(`/labels/${id}/${status}/${page}/${pageNumber}`)
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          setFetchLoading(true);
          axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/labels/search/${id}?status=${status}&search=${searchText}`)
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
    const [deleteLoading, setDeleteLoading] = useState(false)
    const confirm = (id, imgKey) => {
        setDeleteLoading(true)
        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/api/v1/labels/delete-labels/${id}?imgKey=${imgKey}`)
          .then( res => {
            if(res.status == 200){
                setDeleteLoading(false)
                toast.success('Deleted the Labels')
                navigate('/labels/All/1/6');
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
        { key: '1',label: (<a rel="noopener noreferrer" href={`/labels/${id}/All/1/8`}>All</a>),},
        { key: '2',label: (<a rel="noopener noreferrer" href={`/labels/${id}/Pending/1/8`}>Pending</a>),},
        { key: '3',label: (<a rel="noopener noreferrer" href={`/labels/${id}/Review/1/8`}>Review</a>),},
        { key: '4',label: (<a rel="noopener noreferrer" href={`/labels/${id}/Approved/1/8`}>Approved</a>),},
        { key: '5',label: (<a rel="noopener noreferrer" href={`/labels/${id}/Action Required/8`}>Action Required</a>),},
        { key: '6',label: (<a rel="noopener noreferrer" href={`/labels/${id}/Takedown/1/8`}>Takedown</a>),},
        { key: '6',label: (<a rel="noopener noreferrer" href={`/labels/${id}/ReSubmitted/1/8`}>ReSubmitted</a>),},
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
            <div className="md:h-full overflow-y-auto md:border-r px-3 md:pt-16 custom-scrollbar">
                <h3 className='font-bold text-xl text-[#252525]'>Label Details</h3>
                {
                    labelsFetchLoading && 
                    <Skeleton
                        className="py-4"
                        avatar
                        paragraph={{
                        rows: 4,
                        }}
                    />
                }
                {
                    labels && 
                    <div className="md:flex justify-between">
                        <div className="md:flex-1 flex flex-col md:flex-row gap-2 pt-2">
                            <Image
                            width={'auto'}
                            height={176}
                            className="rounded-lg"
                            src={labels.imgUrl}
                            fallback={fallbackImageLabel}
                            />
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h2 className="font-bold">{labels.labelName}</h2>
                                    {
                                        labels?.youtubeChannelLink && 
                                        <a href={labels?.youtubeChannelLink} target="_blank" rel="noopener noreferrer"><img src={youtubeImg} alt="youtueImg" /></a>
                                    }
                                    {
                                        labels?.actionRequired && 
                                        <div className="text-xs bg-red-200 p-1 rounded-md mt-1">{labels?.actionRequired}</div>
                                    }
                                    {
                                        labels?.description &&
                                        <div className="pt-2">
                                            <p className="text-sm text-[#71717A]">Description:</p>
                                            <p className="text-sm text-[#71717A]">{labels.description}</p>
                                        </div>
                                    }
                                </div>
                                <div className="flex items-center gap-2">
                                    {
                                        labels.status === 'Pending' &&
                                            <div className="flex items-center">
                                                <ClockIcon className="h-3 w-3 text-[#FEB951] me-1"/>
                                                <p className="text-xs font-semibold text-[#FEB951]">{labels.status}</p>
                                            </div>
                                    }
                                    {
                                        labels.status === 'Approved' &&
                                        <div className="flex items-center">
                                            <CheckBadgeIcon className="h-3 w-3 text-[#39C616] me-1"/>
                                            <p className="text-xs font-semibold text-[#39C616]">{labels.status}</p>
                                        </div>
                                    }
                                    {
                                        labels.status === 'Rejected' &&
                                        <div className="flex items-center">
                                            <ExclamationTriangleIcon className="h-3 w-3 text-[#FF7050] me-1"/>
                                            <p className="text-xs font-semibold text-[#FF7050]">{labels.status}</p>
                                        </div>
                                    }
                                    {
                                        labels.status === 'Locked' &&
                                        <div className="flex items-center">
                                            <ExclamationTriangleIcon className="h-3 w-3 text-[#71717A] me-1"/>
                                            <p className="text-xs font-semibold text-[#71717A]">{labels.status}</p>
                                        </div>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <div className="">
                            {
                                !labelsFetchLoading && labels?.status === 'Rejected' &&
                                <div className="flex items-center gap-2 bg-white py-1 px-2 rounded-md">
                                    <Popconfirm
                                        title="Delete"
                                        placement="leftTop"
                                        className="z-1000"
                                        description="Are you sure to Delete Labelse?"
                                        onConfirm={() => confirm(labels._id, labels.imgKey)}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                        >
                                        <button className="btn btn-sm w-full">
                                            <TrashIcon style={{cursor: 'pointer'}} className="w-5 h-5"/>
                                            Delete
                                        </button>
                                    </Popconfirm>
                                </div>
                            }
                            {
                                !labelsFetchLoading && labels?.status === 'Approved' &&
                                <div className="flex items-center gap-2 bg-white py-1 px-2 rounded-md">
                                    <button  onClick={()=>navigate(`/update-labels/${labels._id}`)} className="btn btn-sm w-full">
                                        <PencilSquareIcon style={{cursor: 'pointer'}} className="w-5 h-5 text-salate-500"/>
                                        Edit Labels Details
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                }
                {/* Release Card _______________________________________________________________ */}
                <main className="mt-3">
                    <p className="font-semibold pb-2">Releases under this Label</p>
                    <div>
                        <div className="flex justify-between">
                            {/* Desktop Div _____________________________________ */}
                            <div className="hidden md:block">
                                <div className="h-10 px-[5px] py-1 flex items-center p-1 border rounded-md">
                                    <NavLink style={() => activeLink(`/labels/${id}/All`, currentPath)} to={`/labels/${id}/All/1/8`} className="px-[12px] py-[6px] rounded text-sm font-semibold">All</NavLink>
                                    <NavLink style={() => activeLink(`/labels/${id}/Pending`, currentPath)} to={`/labels/${id}/Pending/1/8`} className="px-[12px] py-[6px] rounded text-sm font-semibold">Pending</NavLink>
                                    <NavLink style={() => activeLink(`/labels/${id}/Review`, currentPath)} to={`/labels/${id}/Review/1/8`} className="px-[12px] py-[6px] rounded text-sm font-semibold">Review</NavLink>
                                    <NavLink style={() => activeLink(`/labels/${id}/Approved`, currentPath)} to={`/labels/${id}/Approved/1/8`} className="px-[12px] py-[6px] rounded text-sm font-semibold">Approved</NavLink>
                                    <NavLink style={() => activeLink(`/labels/${id}/Action`, currentPath)} to={`/labels/${id}/Action Required/1/8`} className="px-[12px] py-[6px] rounded text-sm font-semibold">Action Required</NavLink>
                                    <NavLink style={() => activeLink(`/labels/${id}/TakeDown`, currentPath)} to={`/labels/${id}/TakeDown/1/8`} className="px-[12px] py-[6px] rounded text-sm font-semibold">Takedown</NavLink>
                                    <NavLink style={() => activeLink(`/labels/${id}/ReSubmitted`, currentPath)} to={`/labels/${id}/ReSubmitted/1/8`} className="px-[12px] py-[6px] rounded text-sm font-semibold">ReSubmitted</NavLink>
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
                    <ReleaseCardComponentFourColsGrid itemPerPage={perPageLabels} releaseData={releaseData} totalItems={totalItems} fetchLoading={fetchLoading} currentPage={pageNumber} handlePageChange={handlePageChange}/>
                </main>
            </div>            
        </div>
    );
};

export default DetailsSingleLabels;