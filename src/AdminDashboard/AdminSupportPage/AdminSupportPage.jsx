import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { Button, DatePicker, Divider, Dropdown, Empty, Pagination } from 'antd';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import SupportLIst from '../../UserAdminDashboard/SupportPage/SupportLIst';
import { AdminAuthContext } from '../DashboardForAdmin/DashBoardForAdmin';

const AdminSupportPage = () => {

    const {adminNameIdRoll} = useContext(AdminAuthContext)
    const navigate = useNavigate();
    const {pageNumber, status, perPageSupport} = useParams();

    const [loading, setLoading] = useState(true)
    const [supportData, setSupportData] = useState();
    const [totalItems, setTotalItems] = useState()
    useEffect( () => {
        setLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/ticket/admin/ticket?page=${pageNumber}&limit=${perPageSupport}&status=${status}`)
        .then(res => {
            setSupportData(res.data.data);
            setTotalItems(res.data.dataCount)
            setLoading(false)
        })
    },[pageNumber, perPageSupport, status])

    const handlePageChange = (page) => {
        navigate(`/admin-dashboard/support/${status}/${page}/8`)
    };

    const [searchText, setSearchText] = useState()
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          setLoading(true);
          axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/ticket/admin/search-ticket-title?status=${status}&search=${searchText}`)
            .then( res => {
              if(res.status == 200){
                setLoading(false);
                setSupportData(res.data.data);
                console.log(res.data.data);
              }
            })
            .catch(er => console.log(er));
        }
        setLoading(false)
    };

    const onChange = (date, dateString) => {
        console.log('date', date, 'iii', dateString);
        setLoading(true)
        // search-by-year
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/ticket/admin/search-ticket-year?search=${dateString}`)
        .then(res => {
            if(res.status == 200){
                setSupportData(res.data.data)
                setTotalItems(res.data.dataCount)
                setLoading(false)
            }
        })
    };

    const location = useLocation();
    const currentPath = location.pathname;

    const activeLink = (to , currentPath) => {
        return currentPath.startsWith(to)
        ? { backgroundColor: '#F1F5F9'} // Active styles
        : {};
    }

    const items = [
        { key: '1',label: (<a rel="noopener noreferrer" href={'/admin-dashboard/support/All/1/8'}>All</a>),},
        { key: '2',label: (<a rel="noopener noreferrer" href={'/admin-dashboard/support/Pending/1/8'}>Pending</a>),},
        { key: '4',label: (<a rel="noopener noreferrer" href={'/admin-dashboard/support/Open/1/8'}>Open</a>),},
        { key: '5',label: (<a rel="noopener noreferrer" href={'/admin-dashboard/support/Closed/1/8'}>Closed</a>),},
    ];

    const inputStyle ={
        height: '36px',
        border: '1px solid #E2E8F0'
    }


    return (
        <div>
            <div className='mt-3 flex items-center justify-between'>
                <h3 className='font-bold text-xl text-[#252525]'>Support</h3>
                <input style={inputStyle} type="text" onKeyPress={handleKeyPress} onChange={e => setSearchText(e.target.value)} className='input input-sm border w-80' placeholder='Type & Enter to Search'/>
            </div>
            <Divider className='my-2'/>
            <div className='pt-2 flex justify-between items-center'>
                <div className="hidden md:block">
                    <div className="h-10 px-[5px] py-1 flex items-center p-1 border rounded-md">
                        <NavLink style={() => activeLink('/admin-dashboard/support/All', currentPath)} to={'/admin-dashboard/support/All/1/8'} className="px-[12px] py-[6px] rounded text-sm font-semibold">All</NavLink>
                        <NavLink style={() => activeLink('/admin-dashboard/support/Pending', currentPath)} to={'/admin-dashboard/support/Pending/1/8'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Pending</NavLink>
                        <NavLink style={() => activeLink('/admin-dashboard/support/Open', currentPath)} to={'/admin-dashboard/support/Open/1/8'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Open</NavLink>
                        <NavLink style={() => activeLink('/admin-dashboard/support/Closed', currentPath)} to={'/admin-dashboard/support/Closed/1/8'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Closed</NavLink>
                    </div>
                </div>
                {/* Mobile Div _____________________________________ */}
                <div className="block md:hidden">
                    <Dropdown
                        menu={{items}}
                        placement="bottomLeft"
                        className="h-10"
                    >
                        <Button className="text-md font-semibold flex items-center gap-2">{status} <ArrowsUpDownIcon className="w-4 h-4"/></Button>
                    </Dropdown>
                </div>
                <div>
                    <DatePicker className="" onChange={onChange} picker="year" />
                </div>
            </div>

            <div className='mt-4'>
                <div className="flex flex-col gap-2">
                    {
                        loading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                    }
                   
                    <SupportLIst data={supportData} roll={adminNameIdRoll[2]}/>

                    {
                        !totalItems && !loading && <Empty className="pt-8" />
                    }
                    {
                        totalItems > 8 && !loading && <div className="flex justify-center items-center my-4">
                            <Pagination 
                            defaultCurrent={pageNumber} 
                            total={totalItems}
                            pageSize={perPageSupport}
                            onChange={handlePageChange}
                            /> 
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default AdminSupportPage;