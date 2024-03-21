// import React from 'react';

import { BellAlertIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import ActionRequiredRelease from "./ActionRequiredRelease";
import ReleaseCardComponent from "./ReleaseCardComponent/ReleaseCardComponent";

const ReleasesPage = () => {

    // Get Data From Context API
    const { userNameIdRoll } = useContext(AuthContext);
    const navigate = useNavigate()

    // Paginatin and Search State __________________________________________________
    const [releaseStatus, setReleaseStatus] = useState('All')
    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(9);
    const [searchText, setSearchText] = useState('');

    const [releaseData, setReleaseData] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);

    // Get Release List ______________________________________________________________
    useEffect(() => {
        setItemPerPage(9)
        // Calculate Pagination and Fetch__________________________________________________
        setFetchLoading(true)
        axios.get(`http://localhost:5000/api/v1/release/${userNameIdRoll[1]}?page=${currentPage}&limit=${itemPerPage}&status=${releaseStatus}`)
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
        setItemPerPage(50)
        if (event.key === 'Enter') {
          setFetchLoading(true);
          axios.get(`http://localhost:5000/api/v1/release/search/${userNameIdRoll[1]}?status=${releaseStatus}&search=${searchText}`)
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


    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r p-2'>
                {/* Search and Create Release Section ______________________________________________________________________________ */}
                <div className="md:flex md:justify-between md:items-center bg-slate-50 py-2 px-2 rounded-lg">
                    <div className="my-2">
                        <input type="text" onKeyPress={handleKeyPress} onChange={e => handleSearch(e.target.value)} placeholder="Type & Enter to Search" className="input input-sm rounded-full input-bordered w-full"/>
                    </div>
                    <div className="my-2">
                        <button onClick={()=>navigate('/create-release')} className='btn btn-neutral py-1 px-6 rounded-full btn-sm border-none me-2 w-full'>Create Release</button>
                    </div>
                </div>

                {/* Total Release Count Section _____________________________________________________________________________________ */}
                <div className="flex justify-between items-center my-3">
                    <div className="flex items-center">
                        <ExclamationCircleIcon className="w-6 h-6 me-1 text-slate-500"/>
                        Release Count
                    </div>
                    <div><span className="text-sm font-bold">{releaseData?.length}</span> <span className="ms-1 p-2 bg-slate-50 rounded-md text-sm font-bold">{totalItems}</span> </div>
                </div>
                {/* Show Release Section ____________________________________________ */}
                <main>
                    <div>
                        <button onClick={() => handleStatus('All')} className="btn btn-sm btn-neutral m-1">All</button>
                        <button onClick={() => handleStatus('Pending')} className="btn btn-sm btn-neutral mx-1">Pending</button>
                        <button onClick={() => handleStatus('Approved')} className="btn btn-sm btn-neutral mx-1">Approved</button>
                        <button onClick={() => handleStatus('Action Required')} className="btn btn-sm btn-neutral mx-1">Action Required</button>
                    </div>

                    {
                        fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                    }
                    <ReleaseCardComponent releaseData={releaseData} totalItems={totalItems} fetchLoading={fetchLoading} currentPage={currentPage} itemPerPage={itemPerPage} handlePageChange={handlePageChange}/>
                </main>

            </div>


            {/* Sideber Div  _______________________________*/}
            <div className="md:basis-1/4 overflow-y-auto">
                <div className='p-2'>
                    <h4 className='flex items-center font-bold text-md text-slate-500'> <BellAlertIcon className='w-5 h-5 me-2 text-slate-500'/> Notification</h4>
                </div>
                <ActionRequiredRelease/>
            </div>
        </div>
    );
};

export default ReleasesPage;