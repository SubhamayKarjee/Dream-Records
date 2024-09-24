// import React from 'react';

import { PlusIcon } from "@heroicons/react/24/outline";
import { BellAlertIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import { Drawer } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import ActionRequiredRelease from "./ActionRequiredRelease";
import ReleaseCardComponent from "./ReleaseCardComponent/ReleaseCardComponent";

const ReleasesPage = () => {

    // Get Data From Context API
    const { userNameIdRoll } = useContext(AuthContext);
    const navigate = useNavigate();
    const { pageNumber, status } = useParams();

    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [itemPerPage, setItemPerPage] = useState(6);
    const [searchText, setSearchText] = useState('');

    const [releaseData, setReleaseData] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);

    // Get Release List ______________________________________________________________
    useEffect(() => {
        setItemPerPage(9)
        // Calculate Pagination and Fetch__________________________________________________
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/${userNameIdRoll[1]}?page=${pageNumber}&limit=6&status=${status}`)
            .then( res => {
              if(res.status == 200){
                setFetchLoading(false);
                setTotalItems(res.data.dataCount);
                setReleaseData(res.data.data);
              }
            })
            .catch(er => console.log(er));
    }, [status, pageNumber,userNameIdRoll]);

    const handleSearch = (e) => {
        setSearchText(e)
    }


    const handlePageChange = (page) => {
        navigate(`/releases/${status}/${page}/6`)
    };

    const handleKeyPress = (event) => {
        setItemPerPage(50)
        if (event.key === 'Enter') {
          setFetchLoading(true);
          axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/search/${userNameIdRoll[1]}?status=${status}&search=${searchText}`)
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

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };



    const location = useLocation();
    const currentPath = location.pathname;


    const activeLink = (to , currentPath) => {
        return currentPath.startsWith(to)
        ? { backgroundColor: '#F1F5F9'} // Active styles
        : {};
    }

    const inputStyle ={
        height: '36px',
        border: '1px solid #E2E8F0'
    }


    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r p-2'>
                <div className="md:pt-16">
                    <h3 className='font-semibold text-xl text-[#252525]'>Releases</h3>
                    {/* Search and Create Release Section ______________________________________________________________________________ */}
                    <div className="md:flex md:justify-between md:items-center bg-slate-50 py-2 px-2 rounded-lg">
                        <div className="my-2">
                            <input style={inputStyle} type="text" onKeyPress={handleKeyPress} onChange={e => handleSearch(e.target.value)} placeholder="Type & Enter to Search" className="input input-sm w-full"/>
                        </div>
                        <div className="my-2">
                            <button onClick={()=>navigate('/create-release')} className='btn btn-neutral bg-[#18181B] 3 h-9 btn-sm'><PlusIcon className="w-5 h-5"/> Create Release</button>
                        </div>
                    </div>
                </div>

                
                {/* Show Release Section ____________________________________________ */}
                <main className="mt-3">
                    <div className="flex justify-between">
                        <div className="h-10 px-[5px] py-1 flex items-center p-1 border rounded-md">
                            <NavLink style={() => activeLink('/releases/All', currentPath)} to={'/releases/All/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">All</NavLink>
                            <NavLink style={() => activeLink('/releases/Pending', currentPath)} to={'/releases/Pending/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Pending</NavLink>
                            <NavLink style={() => activeLink('/releases/Review', currentPath)} to={'/releases/Review/1/8'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Review</NavLink>
                            <NavLink style={() => activeLink('/releases/Approved', currentPath)} to={'/releases/Approved/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Approved</NavLink>
                            <NavLink style={() => activeLink('/releases/Action', currentPath)} to={'/releases/Action Required/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Action Required</NavLink>
                            <NavLink style={() => activeLink('/releases/TakeDown', currentPath)} to={'/releases/TakeDown/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Takedown</NavLink>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <div className="flex items-center">
                                <DocumentCheckIcon className="w-4 h-4 me-1 text-slate-500"/>
                                <span className="text-sm">Release Count</span>
                            </div>
                            <div><span className="text-sm font-bold">{releaseData?.length}</span> </div>
                        </div>
                        
                    </div>

                    {
                        fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                    }
                    <ReleaseCardComponent releaseData={releaseData} totalItems={totalItems} fetchLoading={fetchLoading} currentPage={pageNumber} itemPerPage={itemPerPage} handlePageChange={handlePageChange}/>
                </main>

            </div>


            {/* Sideber Div  _______________________________*/}
            <div className="md:basis-1/4 overflow-y-auto hidden md:block">
                <div className='md:pt-16 p-2'>
                <h3 className='font-semibold text-xl pb-2'>Notices</h3>
                </div>
                <ActionRequiredRelease/>
            </div>

            {/* Sideber Div Mobile _______________________________*/}
            <BellAlertIcon onClick={showDrawer} className='w-10 h-10 p-2 text-slate-500 bg-white rounded-full border block md:hidden fixed top-[50%] right-4 pointer'/>
            <Drawer className='bg-white' title="Notification" onClose={onClose} open={open}>
                <ActionRequiredRelease onClose={onClose}/>
            </Drawer>
        </div>
    );
};

export default ReleasesPage;