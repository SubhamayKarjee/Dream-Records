import { CheckBadgeIcon, ClockIcon, ExclamationTriangleIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Empty, Image, Modal, Pagination, Select } from 'antd';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import fallbackImage from '../../assets/fallbackImage.jpg'
import { AuthContext } from '../UserAdminHomePage/UserAdminHomePage';


const ClaimReleasePage = () => {


    const { userNameIdRoll } = useContext(AuthContext);

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
                toast.success('Successfully Submited')
            }
        })
    }


    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(12);

    const [claimData, setClaimData] = useState()
    const [loading, setLoading] = useState(false);
    const [claimStatus, setClaimStatus] = useState('All');
    useEffect(() => {
        setLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/claim-release/users-claim/${userNameIdRoll[1]}?page=${currentPage}&limit=${itemPerPage}&status=${claimStatus}`)
        .then(res => {
            if(res.status === 200){
                setLoading(false)
                setClaimData(res.data.data);
                setTotalItems(res.data.dataCount);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage, claimStatus, userNameIdRoll, reFetch])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    const handleStatus = (e) => {
        setCurrentPage(1)
        setClaimStatus(e)
    }




    return (
        <div className="md:h-full">
            <div className='h-full overflow-y-auto p-2'>
                <h2 className='font-bold text-slate-500 my-2'>Rights Manager</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='border rounded-md p-2 shadow'>

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
                            <input className='btn btn-sm rounded-full bg-info mt-4' type="submit" value="Submit" />
                        </div>
                    }


                </form>

                <div className='my-3'>
                    <h2 className='font-bold border-b text-slate-500'>Claim History...</h2>
                    <div>
                        <div className="my-2">
                            <button onClick={() => handleStatus('All')} className="btn btn-sm btn-neutral m-1">All</button>
                            <button onClick={() => handleStatus('Pending')} className="btn btn-sm btn-neutral mx-1">Pending</button>
                            <button onClick={() => handleStatus('Solved')} className="btn btn-sm btn-neutral mx-1">Solved</button>
                            <button onClick={() => handleStatus('Rejected')} className="btn btn-sm btn-neutral mx-1">Rejected</button>
                        </div>
                        {
                            loading && <div className='flex justify-center items-center'><span className="loading loading-spinner loading-md me-2"></span></div>
                        }
                        {
                            claimData && claimData.map(data => 
                                <div className='p-2 my-1 rounded-md border md:flex justify-between' key={data._id}>
                                    <div className='grow m-2'>
                                        <p>Submited Request <span className="font-bold text-slate-500">{data.date} {data.month} {data.year} || {data.time}</span></p>
                                        <p className='font-bold'>{data.claimOption}</p>

                                            <div className="flex items-center justify-between my-1 py-1 px-2 rounded-lg bg-slate-100">
                                                <div className="flex items-center">
                                                        <Image
                                                        width={35}
                                                        height={35}
                                                        className="rounded-lg"
                                                        src={data?.release?.imgUrl}
                                                        fallback={fallbackImage}
                                                        />
                                                    <div className="ps-2">
                                                    <h2 className="font-bold text-sm">{data?.release?.releaseTitle}</h2>
                                                    <p className="text-xs text-slate-400">ID: {data?.release?._id}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        <a href={data.claimLink} target='_blank' className='text-info'>{data.claimLink}</a>
                                        {
                                            data?.actionRequired &&
                                            <p className="p-2 rounded-md bg-red-200">{data.actionRequired}</p>
                                        }
                                    </div>
                                    {
                                        data.status === 'Pending' &&
                                        <div>
                                            <div className="flex items-center p-1 bg-[#ffae00] rounded-md shadow">
                                                <ClockIcon className="h-3 w-3 text-white me-1"/>
                                                <p className="text-xs font-semibold text-white">{data.status}</p>
                                            </div>
                                        </div>
                                    }
                                    {
                                        data.status === 'Solved' &&
                                        <div>
                                            <div className="flex items-center p-1 bg-[#00c90d] rounded-md shadow">
                                                <CheckBadgeIcon className="h-3 w-3 text-white me-1"/>
                                                <p className="text-xs font-semibold text-white">{data.status}</p>
                                            </div>
                                        </div>
                                    }
                                    {
                                        data.status === 'Rejected' &&
                                        <div>
                                            <div className="flex items-center p-1 bg-red-300 rounded-md shadow">
                                                <ExclamationTriangleIcon className="h-3 w-3 text-white me-1"/>
                                                <p className="text-xs font-semibold text-white">{data.status}</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        }
                        {
                            !totalItems && !loading && <Empty className="pt-12" />
                        }
                        {
                            totalItems > 12 && !loading && <div className="flex justify-center items-center my-4">
                                <Pagination 
                                defaultCurrent={currentPage} 
                                total={totalItems}
                                pageSize={itemPerPage}
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