import { Button, Divider, Drawer, Dropdown, Empty, Image, Pagination } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import fallbackImage from "../../assets/fallbackImage.jpg"
import ActionRequiredLabels from "./ActionRequiredLabels";
import { ArrowsUpDownIcon, DocumentCheckIcon, ExclamationTriangleIcon, PlusIcon, BellAlertIcon, CheckBadgeIcon, ClockIcon } from "@heroicons/react/24/outline";

const UserLabelsPage = () => {

    const navigate = useNavigate('')
    // Get Data From Context API
    const { userNameIdRoll, refatchLabelsData } = useContext(AuthContext);
    const {pageNumber, status, perPageLabels} = useParams();

    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [searchText, setSearchText] = useState('');

    const [labelsData, setLabelsData] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);

    useEffect( () => {
      setFetchLoading(true)
      axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/labels/${userNameIdRoll[1]}?page=${pageNumber}&limit=${perPageLabels}&status=${status}`)
          .then( res => {
            if(res.status == 200){
              setTotalItems(res.data.dataCount);
              setLabelsData(res.data.data);
              setFetchLoading(false);
            }
          })
          .catch(er => console.log(er));
    },[refatchLabelsData, status, perPageLabels, pageNumber, userNameIdRoll])

    const handlePageChange = (page) => {
      navigate(`/labels/${status}/${page}/${perPageLabels}`)
    };

    const handleSearch = (e) => {
        setSearchText(e)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {          
          setFetchLoading(true);
          axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/labels/search/${userNameIdRoll[1]}?status=${status}&search=${searchText}`)
            .then( res => {
              if(res.status == 200){
                setFetchLoading(false);
                setTotalItems(res.data.dataCount);
                setLabelsData(res.data.data);
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
        { key: '1',label: (<a rel="noopener noreferrer" href={'/labels/All/1/6'}>All</a>),},
        { key: '2',label: (<a rel="noopener noreferrer" href={'/labels/Pending/1/6'}>Pending</a>),},
        { key: '4',label: (<a rel="noopener noreferrer" href={'/labels/Approved/1/6'}>Approved</a>),},
        { key: '5',label: (<a rel="noopener noreferrer" href={'/labels/Rejected/1/6'}>Rejected</a>),},
        { key: '6',label: (<a rel="noopener noreferrer" href={'/labels/Locked/1/6'}>Locked</a>),},
    ];


    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r px-3 md:pt-16 custom-scrollbar'>
              <h3 className='font-bold text-xl text-[#252525]'>Labels</h3>
                {/* Search and Create Labels Section ______________________________________________________________________________ */}
                <div className="md:flex md:justify-between md:items-center">
                    <div className="mt-2">
                        <input type="text" style={inputStyle} onKeyPress={handleKeyPress} onChange={e => handleSearch(e.target.value)} placeholder="Type & Enter to Search" className="input input-sm w-full"/>
                    </div>
                    <div className="mt-2">
                        <button onClick={()=>navigate(`/create-labels`)} className='btn btn-sm btn-neutral px-6 bg-[#18181B] h-9'><PlusIcon className="w-5 h-5"/> Create Label</button>
                    </div>
                </div>
                <Divider/>
                {/* Main Div ______________________________________________Labels list */}
                <main className="">
                    <div className="flex justify-between">
                        {/* Desktop Div _____________________________________ */}
                        <div className="hidden md:block">
                            <div className="h-10 px-[5px] py-1 flex items-center p-1 border rounded-md">
                                <NavLink style={() => activeLink('/labels/All', currentPath)} to={'/labels/All/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">All</NavLink>
                                <NavLink style={() => activeLink('/labels/Pending', currentPath)} to={'/labels/Pending/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Pending</NavLink>
                                <NavLink style={() => activeLink('/labels/Approved', currentPath)} to={'/labels/Approved/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Approved</NavLink>
                                <NavLink style={() => activeLink('/labels/Rejected', currentPath)} to={'/labels/Rejected/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Rejected</NavLink>
                                <NavLink style={() => activeLink('/labels/Locked', currentPath)} to={'/labels/Locked/1/6'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Locked</NavLink>
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

                        <div className="flex justify-between items-center gap-2">
                            <div className="flex items-center">
                                <DocumentCheckIcon className="w-4 h-4 me-1 text-slate-500"/>
                                <span className="text-sm">Labels Count</span>
                            </div>
                            <div><span className="text-sm font-bold">{labelsData?.length} Out of {totalItems}</span> </div>
                        </div>
                    </div>

                    {
                      fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                    }
                    <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-3 py-4">
                      {
                        !fetchLoading && labelsData?.map((data) => 
                          <div style={{cursor: 'pointer'}} onClick={() => navigate(`/labels/${data._id}/All/1/8`)} key={data._id} className="">
                            <div style={{borderRadius: '24px', height: '265px'}} className="p-1 border">
                                  <Image
                                    width={'100%'}
                                    height={190}
                                    style={{borderRadius: '20px'}}
                                    src={data.imgUrl}
                                    preview={false}
                                    fallback={fallbackImage}
                                  />
                              <div className="ps-2 pt-1">
                                <h2 className="font-bold">{data.labelName}</h2>
                                  {
                                    data.status === 'Pending' &&
                                        <div className="flex items-center">
                                            <ClockIcon className="h-3 w-3 text-[#FEB951] me-1"/>
                                            <p className="text-xs font-semibold text-[#FEB951]">{data.status}</p>
                                        </div>
                                  }
                                  {
                                    data.status === 'Approved' &&
                                    <div className="flex items-center">
                                        <CheckBadgeIcon className="h-3 w-3 text-[#39C616] me-1"/>
                                        <p className="text-xs font-semibold text-[#39C616]">{data.status}</p>
                                    </div>
                                  }
                                  {
                                    data.status === 'Rejected' &&
                                    <div className="flex items-center">
                                        <ExclamationTriangleIcon className="h-3 w-3 text-[#FF7050] me-1"/>
                                        <p className="text-xs font-semibold text-[#FF7050]">{data.status}</p>
                                    </div>
                                  }
                                  {
                                    data.status === 'Locked' &&
                                    <div className="flex items-center">
                                        <ExclamationTriangleIcon className="h-3 w-3 text-[#71717A] me-1"/>
                                        <p className="text-xs font-semibold text-[#71717A]">{data.status}</p>
                                    </div>
                                  }
                              </div>
                            </div>
                            <div className="flex items-center">
                              {/* {
                                data.status === 'Rejected' &&
                                <button onClick={() => deleteLabels(data._id, data.key)}><TrashIcon className="w-5 h-5 text-red-500"/></button>
                              } */}
                            </div>
                          </div>
                        )
                      }
                    </div>
                    
                    {
                        !totalItems && !fetchLoading && <Empty className="pt-12" />
                    }
                    {
                        totalItems > 6 && !fetchLoading && <div className="flex justify-center items-center my-4">
                            <Pagination 
                            defaultCurrent={pageNumber}
                            pageSize={perPageLabels} 
                            total={totalItems}
                            onChange={handlePageChange}
                            /> 
                      </div>
                    }
                </main>
            </div>

            {/* Sidebar Div  _______________________________*/}
            <div style={sideBarShadow} className="md:basis-1/4 overflow-y-auto hidden md:block md:pt-16 px-3 custom-scrollbar">
              <h3 className='font-semibold text-xl pb-1'>Notices</h3>
                <ActionRequiredLabels/>
            </div>

            {/* Sideber Div Mobile _______________________________*/}
            <BellAlertIcon onClick={showDrawer} className='w-10 h-10 p-2 text-slate-500 bg-white rounded-full border block md:hidden fixed top-[50%] right-4 pointer'/>
            <Drawer className='bg-white' title="Notification" onClose={onClose} open={open}>
              <ActionRequiredLabels onClose={onClose}/>
            </Drawer>
        </div>
    );
};

export default UserLabelsPage;