// import React from 'react';

import { ArrowsUpDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import { BellAlertIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import { Button, Divider, Drawer, Dropdown } from "antd";
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
        border: '1px solid #E2E8F0',
        minWidth: '300px'
    }

    const sideBarShadow = {
        boxShadow: '-2px 2px 18px 0px #EFEFEF',
    }

    const items = [
        { key: '1',label: (<a rel="noopener noreferrer" href={'/releases/All/1/6'}>All</a>),},
        { key: '2',label: (<a rel="noopener noreferrer" href={'/releases/Pending/1/6'}>Pending</a>),},
        { key: '3',label: (<a rel="noopener noreferrer" href={'/releases/Review/1/6'}>Review</a>),},
        { key: '4',label: (<a rel="noopener noreferrer" href={'/releases/Approved/1/6'}>Approved</a>),},
        { key: '5',label: (<a rel="noopener noreferrer" href={'/releases/Action Required/1/6'}>Action Required</a>),},
        { key: '6',label: (<a rel="noopener noreferrer" href={'/releases/Takedown/1/6'}>Takedown</a>),},
        { key: '6',label: (<a rel="noopener noreferrer" href={'/releases/ReSubmitted/1/6'}>ReSubmitted</a>),},
    ];


    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:pt-16 px-3 custom-scrollbar'>
                <div className="">
                    <h3 className='font-bold text-xl text-[#252525]'>Releases</h3>
                    {/* Search and Create Release Section ______________________________________________________________________________ */}
                    <div className="md:flex md:justify-between md:items-center">
                        <div className="mt-2">
                            <input style={inputStyle} type="text" onKeyPress={handleKeyPress} onChange={e => handleSearch(e.target.value)} placeholder="Type & Enter to Search" className="input input-sm w-full"/>
                        </div>
                        <div className="mt-2">
                            <button onClick={()=>navigate('/create-release')} className='btn btn-neutral bg-[#18181B] h-9 btn-sm w-full'><PlusIcon className="w-5 h-5"/> Create Release</button>
                        </div>
                    </div>
                </div>

                <Divider/>
                {/* Show Release Section ____________________________________________ */}
                <main className="mt-3">
                    <div className="flex justify-between">
                        {/* Desktop Div _____________________________________ */}
                        <div className="hidden lg:block">
                            <div className="h-10 px-[5px] py-1 flex items-center p-1 border rounded-md">
                                <NavLink style={() => activeLink('/releases/All', currentPath)} to={'/releases/All/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">All</NavLink>
                                <NavLink style={() => activeLink('/releases/Pending', currentPath)} to={'/releases/Pending/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Pending</NavLink>
                                <NavLink style={() => activeLink('/releases/Review', currentPath)} to={'/releases/Review/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Review</NavLink>
                                <NavLink style={() => activeLink('/releases/Approved', currentPath)} to={'/releases/Approved/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Approved</NavLink>
                                <NavLink style={() => activeLink('/releases/Action', currentPath)} to={'/releases/Action Required/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Action Required</NavLink>
                                <NavLink style={() => activeLink('/releases/TakeDown', currentPath)} to={'/releases/TakeDown/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Takedown</NavLink>
                                <NavLink style={() => activeLink('/releases/ReSubmitted', currentPath)} to={'/releases/ReSubmitted/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">ReSubmitted</NavLink>
                            </div>
                        </div>
                        {/* Mobile Div _____________________________________ */}
                        <div className="block lg:hidden">
                            <Dropdown
                                menu={{items,}}
                                placement="bottomLeft"
                                className="h-10"
                            >
                                <Button className="text-md font-semibold flex items-center gap-2">{status} <ArrowsUpDownIcon className="w-4 h-4"/></Button>
                            </Dropdown>
                        </div>

                        <div className="flex justify-between items-center gap-2">
                            <div className="flex items-center">
                                <DocumentCheckIcon className="w-4 h-4 me-1 text-slate-500"/>
                                <span className="text-sm">Releases</span>
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
            <div style={sideBarShadow} className="md:basis-1/4 overflow-y-auto hidden md:block px-3 md:pt-16 custom-scrollbar">
                <h3 className='font-semibold text-xl'>Notices</h3>
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