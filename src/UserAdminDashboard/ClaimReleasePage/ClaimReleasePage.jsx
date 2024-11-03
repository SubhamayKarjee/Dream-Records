import { CheckBadgeIcon, ClockIcon, ExclamationTriangleIcon, LinkIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Button, Divider, Dropdown, Empty, Image, Modal, Pagination, Select } from 'antd';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import fallbackImage from '../../assets/fallbackImage.jpg'
import { AuthContext } from '../UserAdminHomePage/UserAdminHomePage';
import { 
    RiAddLine,
    RiFileCheckLine,
    RiExpandUpDownLine
} from "@remixicon/react";


const ClaimReleasePage = () => {


    const { userNameIdRoll } = useContext(AuthContext);
    const {status, pageNumber, perPageRights} = useParams();
    const navigate = useNavigate()

    // Claim Option Handle ________________________________________________________
    const [claimOption, setClaimOption] = useState('');
    const [claimOptionErr, setClaimOptionErr] = useState('')
    
    // Get Release List ______________________________________________________________
    const [fetchLoading, setFetchLoading] = useState();
    const [releaseData, setReleaseData] = useState();
    const [releaseForSearch, setReleaseForSearch] = useState()
    const [release, setRelease] = useState();
    const [reFetch, setReFetch] = useState(1)

    useEffect(() => {
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/${userNameIdRoll[1]}?page=1&limit=1000&status=Approved`)
            .then( res => {
              if(res.status == 200){
                setFetchLoading(false);
                setReleaseData(res.data.data);
                setReleaseForSearch(res.data.data);
              }
            })
            .catch(er => console.log(er));
    }, [userNameIdRoll]);

    const handleRelease = (data) => {
        setRelease([data]);
        toast.success('Release Added')
    }

    const handleSearch = (e) => {
      const searchData = releaseForSearch.filter(d =>d.releaseTitle.toLowerCase().includes(e.toLowerCase()));
      setReleaseData(searchData);
    }


    // Modal Function For Release __________________________________
    const [errorMessageRelease, setErrorMessageRelease] = useState('');
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const showModal2 = () => {
        setIsModalOpen2(true);
    };
    const handleOk2 = () => {
        setIsModalOpen2(false);
    };
    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

    const removeRelease = (id) => {
        const deleteRelease = release.filter(l => l._id !== id);
        setRelease(deleteRelease)
    }

    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        setClaimOptionErr('');
        setErrorMessageRelease('')
        if(!claimOption){
            setClaimOptionErr('Please Select Claim Type')
            return;
        }
        if(!release){
            setErrorMessageRelease('Please Select Release');
            // return;
        }
        setReleaseData([])
        setClaimOption('')
        const userName = userNameIdRoll[0]
        const masterUserId = userNameIdRoll[1]
        const status = 'Pending';
        const now = new Date();
        const date = now.getDate().toLocaleString();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true });
        const formData = {...data, release: release[0], claimOption, userName, masterUserId, status, date, month, year, time};
        axios.post('https://shark-app-65c5t.ondigitalocean.app/common/api/v1/claim-release', formData)
        .then(res => {
            if(res.status === 200){
                const r = reFetch + 1;
                setReFetch(r)
                setRelease([])
                setClaimOption('')
                setIsModalOpen(false);
                toast.success('Successfully Submited');
            }
        })
    }


    const [totalItems, setTotalItems] = useState();
    const [claimData, setClaimData] = useState()
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/claim-release/users-claim/${userNameIdRoll[1]}?page=${pageNumber}&limit=${perPageRights}&status=${status}`)
        .then(res => {
            if(res.status === 200){
                setLoading(false)
                setClaimData(res.data.data);
                setTotalItems(res.data.dataCount);
            }
        })
    },[perPageRights, pageNumber, userNameIdRoll, reFetch, status])

    const handlePageChange = (page) => {
        navigate(`/claim-release/${status}/${page}/8`)
    };

    const [searchText, setSearchText] = useState();
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {          
        setLoading(true)
          axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/claim-release/search/${userNameIdRoll[1]}?status=${status}&search=${searchText}`)
            .then(res => {
                setClaimData(res.data.data);
                setTotalItems(res.data.dataCount)
                setLoading(false)
            })
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const inputStyle ={
        height: '36px',
        border: '1px solid #E2E8F0',
        minWidth: '300px'
    }

    const items = [
        { key: '1',label: (<a rel="noopener noreferrer" href={'/claim-release/All/1/8'}>All</a>),},
        { key: '2',label: (<a rel="noopener noreferrer" href={'/claim-release/Pending/1/8'}>Pending</a>),},
        { key: '4',label: (<a rel="noopener noreferrer" href={'/claim-release/Solved/1/8'}>Solved</a>),},
        { key: '5',label: (<a rel="noopener noreferrer" href={'/claim-release/Rejected/1/8'}>Rejected</a>),},
    ];

    const location = useLocation();
    const currentPath = location.pathname;

    const activeLink = (to , currentPath) => {
        return currentPath.startsWith(to)
        ? { backgroundColor: '#F1F5F9'} // Active styles
        : {};
    }



    return (
        <div className="md:h-full">
            <div className='h-full overflow-y-auto px-3 bg-[#FCFCFC] md:pt-16 custom-scrollbar'>
                <h3 className='font-bold text-xl text-[#252525]'>Rights Manager</h3>

                <div className="md:flex md:justify-between md:items-center">
                    <div className="mt-2">
                        <input type="text" style={inputStyle} onKeyPress={handleKeyPress} onChange={e => setSearchText(e.target.value)} placeholder="Type & Enter to Search" className="input input-sm w-full"/>
                    </div>
                    <div className="mt-2">
                        <button onClick={showModal} className='btn btn-sm btn-neutral px-6 bg-[#18181B] h-9 text-white'>
                            <RiAddLine
                                size={22}
                                color="white"
                            />
                            Create Claim
                        </button>
                    </div>
                </div>
                    {/* Create Claim form with Modal Start _______________________________________________________________________ */}
                    <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={[]}>
                            <form onSubmit={handleSubmit(onSubmit)} className=''>
                            <p className="text-sm font-semibold text-slate-500 ms-2">Rights Issues <span className="text-red-500">*</span></p>
                            <Select
                                showSearch
                                className="w-full rounded-full"
                                placeholder="Select Claim Type"
                                onChange={e => setClaimOption(e)}
                                options={[
                                    {value: 'Release claim',label: 'Release claim',},
                                    {value: 'Manual claim',label: 'Manual claim',}, 
                                    {value: 'Takedown video',label: 'Takedown video',}, 
                                    {value: 'Audio Fingerprinting',label: 'Audio Fingerprinting',}, 
                                ]}
                            />
                            {
                                claimOptionErr && <span className='text-red-600 pt-2 block'>{claimOptionErr}</span>
                            }

                            {
                                claimOption && 
                                <div>
                                    {/* Release Select Option ______________________________________________________________ */}
                                    <div className="p-2 border rounded-md mt-3">
                                        <p className="text-sm font-semibold text-slate-500 ms-2">Select Release <span className="text-red-500">*</span></p>
                                        {
                                            release && release?.map(data => 
                                                <div key={data._id} className="flex items-center justify-between my-1 py-1 px-2 rounded-lg bg-slate-100">
                                                    <div className="flex items-center">
                                                            <Image
                                                            width={35}
                                                            height={35}
                                                            className="rounded-lg"
                                                            src={data?.imgUrl}
                                                            fallback={fallbackImage}
                                                            />
                                                        <div className="ps-2">
                                                        <h2 className="font-bold text-sm">{data?.releaseTitle}</h2>
                                                        <p className="text-xs text-slate-400">ID: {data?._id}</p>
                                                        </div>
                                                    </div>
                                                    <span style={{cursor: 'pointer'}} onClick={() => removeRelease(data._id)}><XMarkIcon className="w-5 h-5 text-red-500"/></span>
                                                </div>
                                            )
                                        }
                                        <span onClick={showModal2} style={{cursor: 'pointer', width: '180px'}} className="btn btn-sm btn-neutral rounded-full mt-3"><MagnifyingGlassIcon className="w-5 h-5 text-slate-400"/>Add Release</span>
                                            <Modal title="Search/Select Release" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} footer={[]}>
                                                <p className="text-xs bg-slate-100 mb-2 rounded-md py-1 px-3">Select Release</p>
                                                <div>
                                                    <input type="text" placeholder="Search" onChange={e => handleSearch(e.target.value)} className="input input-sm rounded-full input-bordered w-full"/>
                                                    {
                                                        fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                                                    }
                                                    {
                                                    releaseData?.map((data) => 
                                                        <div onClick={() => handleRelease(data)} key={data._id} className="flex items-center justify-between p-1 my-1 rounded-md">
                                                            <div style={{cursor: 'pointer'}} onClick={handleCancel2} className="w-full">
                                                                <div className="flex items-center">
                                                                    <Image
                                                                        width={55}
                                                                        height={55}
                                                                        className="rounded-lg"
                                                                        src={data.imgUrl}
                                                                        fallback={fallbackImage}
                                                                    />
                                                                <div className="ps-2">
                                                                    <h2 className="font-bold">{data.releaseTitle}</h2>
                                                                    <p className="text-sm text-slate-400">ID: {data._id}</p>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    }
                                                    {
                                                    !totalItems && !fetchLoading && <Empty className="pt-12" />
                                                    }
                                                </div>
                                            </Modal>
                                        {errorMessageRelease && <span className='text-red-600 pt-2 block'>{errorMessageRelease}</span>}
                                    </div>

                                    {
                                        claimOption != 'Audio Fingerprinting' && 
                                        <div>
                                            <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Paste infringing link <span className="text-red-500">*</span></p>
                                            <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("claimLink", { required: true})}/>
                                            {errors.claimLink && <span className='text-red-600 pt-2 block'>Claim Link Required</span>}
                                        </div>
                                    }
                                    <input className='btn btn-sm btn-neutral px-6 bg-[#18181B] h-9 mt-4' type="submit" value="Submit" />
                                </div>
                            }
                        </form>
                    </Modal>
                    {/* Create Claim form with Modal End _______________________________________________________________________ */}
                <Divider/>


                <div className="flex justify-between">
                    {/* Desktop Div _____________________________________ */}
                    <div className="hidden md:block">
                        <div className="h-10 px-[5px] py-1 flex items-center p-1 border rounded-md">
                            <NavLink style={() => activeLink('/claim-release/All', currentPath)} to={'/claim-release/All/1/8'} className="px-[12px] py-[6px] rounded text-sm font-semibold">All</NavLink>
                            <NavLink style={() => activeLink('/claim-release/Pending', currentPath)} to={'/claim-release/Pending/1/8'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Pending</NavLink>
                            <NavLink style={() => activeLink('/claim-release/Solved', currentPath)} to={'/claim-release/Solved/1/8'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Solved</NavLink>
                            <NavLink style={() => activeLink('/claim-release/Rejected', currentPath)} to={'/claim-release/Rejected/1/8'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Rejected</NavLink>
                        </div>
                    </div>
                    {/* Mobile Div _____________________________________ */}
                    <div className="block md:hidden">
                        <Dropdown
                            menu={{items,}}
                            placement="bottomLeft"
                            className="h-10"
                        >
                            <Button className="text-md font-semibold flex items-center gap-2">
                                {status}
                                <RiExpandUpDownLine
                                    size={18}
                                    color="#09090B"
                                />
                            </Button>
                        </Dropdown>
                    </div>

                    <div className="flex justify-between items-center gap-2">
                        <div className="flex items-center">
                            <RiFileCheckLine
                                size={16}
                                color="#252525"
                                className='me-2'
                            />
                            <span className="text-sm">Rights Manager Count</span>
                        </div>
                        <div><span className="text-sm font-bold">{claimData?.length} Out of {totalItems}</span> </div>
                    </div>
                </div>


                <div className='my-3'>
                    <div>
                        {
                            loading && <div className='flex justify-center items-center'><span className="loading loading-spinner loading-md me-2"></span></div>
                        }
                        {
                            claimData && claimData.map(data => 
                                <div className='p-2 mb-2 rounded-md  bg-[#F2F2F2]' key={data._id}>
                                    <div className=''>
                                        <p className='text-sm mb-1'>{data.claimOption}</p>
                                            <div className="flex gap-2 mb-2">
                                                    <Image
                                                    width={88}
                                                    height={83}
                                                    className="rounded-lg"
                                                    src={data?.release?.imgUrl}
                                                    fallback={fallbackImage}
                                                    />
                                                <div className="ps-2">
                                                    <h2 className="font-bold text-sm">{data?.release?.releaseTitle}</h2>
                                                    <p className="text-xs text-slate-400">UPC: {data?.release?.UPC}</p>
                                                    <div className='flex items-center gap-2'>
                                                        <LinkIcon className='w-5 h-5'/>
                                                        <a href={data.claimLink} target='_blank' className='text-info'>{data.claimLink}</a>
                                                    </div>
                                                </div>
                                            </div>

                                        {
                                            data?.actionRequired &&
                                            <p className="p-2 rounded-md bg-white text-sm">{data.actionRequired}</p>
                                        }
                                        <div className='flex items-center justify-between my-1'>
                                            {
                                                data.status === 'Pending' &&
                                                    <div className="flex items-center">
                                                        <ClockIcon className="h-3 w-3 text-[#FEB951] me-1"/>
                                                        <p className="text-xs font-semibold text-[#FEB951]">{data.status}</p>
                                                    </div>
                                            }
                                            {
                                                data.status === 'Solved' &&
                                                    <div className="flex items-center">
                                                        <CheckBadgeIcon className="h-3 w-3 text-[#39C616] me-1"/>
                                                        <p className="text-xs font-semibold text-[#39C616]">{data.status}</p>
                                                    </div>
                                            }
                                            {
                                                data.status === 'Rejected' &&
                                                    <div className="flex items-center">
                                                        <ExclamationTriangleIcon className="h-3 w-3 text-[#71717A] me-1"/>
                                                        <p className="text-xs font-semibold text-[#71717A]">{data.status}</p>
                                                    </div>
                                            }
                                            <p className='text-sm text-[#71717A]'>{data.date} {data.month} {data.year}  {data.time}</p>
                                        </div>
                                    </div>                                
                                </div>
                            )
                        }
                        {
                            !totalItems && !loading && <Empty className="pt-12" />
                        }
                        {
                            totalItems > 12 && !loading && <div className="flex justify-center items-center my-4">
                                <Pagination 
                                defaultCurrent={pageNumber} 
                                total={totalItems}
                                pageSize={perPageRights}
                                onChange={handlePageChange}
                                /> 
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClaimReleasePage;