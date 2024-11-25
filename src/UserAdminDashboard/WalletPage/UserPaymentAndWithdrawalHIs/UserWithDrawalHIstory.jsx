import { CheckBadgeIcon, ClockIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Button, DatePicker, Dropdown, Empty, Pagination } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../UserAdminHomePage/UserAdminHomePage";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { 
    RiExpandUpDownLine
} from "@remixicon/react";



const UserWithDrawalHIstory = () => {

    const {userNameIdRoll} = useContext(AuthContext);
    const { pageNumber, perPageWithdrawalList } = useParams();
    const navigate = useNavigate();

    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [fetchLoading, setFetchLoading] = useState(false)
    
    const [withdrawalData, setWithdrawalData] = useState();
    const [reload, setReload] = useState(1)
    useEffect( () => {
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/withdrawal/${userNameIdRoll[1]}?page=${pageNumber}&limit=${perPageWithdrawalList}`)
        .then(res => {
            setWithdrawalData(res.data.data);
            console.log(res.data.data);
            setTotalItems(res.data.dataCount)
            setFetchLoading(false)
        })
    }, [pageNumber, reload, userNameIdRoll, perPageWithdrawalList])

    const handlePageChange = (page) => {
        navigate(`/wallet/withdrawal/${page}/12`)
    };

    const onChange = (date, dateString) => {
        if(!dateString){
            const load = reload + 1 
            setReload(load)
        }else{
            setFetchLoading(true)
            axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/withdrawal/search/${userNameIdRoll[1]}?page=1&limit=100&search=${dateString}`)
            .then(res => {
                setWithdrawalData(res.data.data);
                setTotalItems(res.data.dataCount)
                setFetchLoading(false)
            })
        }
    };

    const location = useLocation();
    const currentPath = location.pathname;

    const activeLink = (to , currentPath) => {
        return currentPath.startsWith(to)
        ? { backgroundColor: '#F1F5F9'} // Active styles
        : {};
    }

    const items = [
        { key: '1',label: (<a rel="noopener noreferrer" href={'/wallet/payment/1/12'}>Payments History</a>),},
        { key: '2',label: (<a rel="noopener noreferrer" href={'/wallet/withdrawal/1/12'}>Withdrawal History</a>),},
    ];

    return (
        <div className="">
            <div  className="flex justify-between items-center mt-4">
                <div>
                    <div>
                        {/* Desktop Div _____________________________________ */}
                        <div className="hidden lg:block">
                                <div className="h-10 px-[5px] py-1 flex items-center p-1 border rounded-md">
                                    <NavLink style={() => activeLink('/wallet/payment', currentPath)} to={'/wallet/payment/1/12'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Payments History</NavLink>
                                    <NavLink style={() => activeLink('/wallet/withdrawal', currentPath)} to={'/wallet/withdrawal/1/12'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Withdrawal History</NavLink>
                                </div>
                            </div>
                            {/* Mobile Div _____________________________________ */}
                            <div className="block lg:hidden">
                                <Dropdown
                                    menu={{items,}}
                                    placement="bottomLeft"
                                    className="h-10"
                                >
                                    <Button className="text-md font-semibold flex items-center gap-2">Withdrawal History 
                                    <RiExpandUpDownLine
                                        size={18}
                                        color="#09090B"
                                    />
                                    </Button>
                                </Dropdown>
                            </div>
                    </div>
                </div>
                <DatePicker className="payment_details" onChange={onChange} picker="year" />
            </div>


                {fetchLoading && <div className="flex justify-center items-center my-2"><span className="loading loading-spinner loading-md"></span></div>}
                <div className="overflow-x-auto hidden lg:block">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="">
                                <th className="text-md">Title</th>
                                <th className="text-md">Date</th>
                                <th className="text-md">Ammount</th>
                                <th className="text-md">Status</th>
                                <th className="text-md text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {
                            withdrawalData && withdrawalData.map(data => 
                                <tr key={data._id} className="hover">
                                    <td className="font-semibold text-sm text-[#09090B]">Withdrawal Requested !</td>
                                    <td className="font-semibold text-sm text-[#09090B]">{data?.withdrawalDate} {data?.withdrawalMonth.slice(0,3)} {data?.withdrawalYear}</td>
                                    <td className="">
                                        <p className="font-semibold text-sm text-[#09090B]">₹ {data?.balance?.amount}</p>
                                    </td>
                                    <td className="font-semibold text-sm text-[#09090B]">
                                    {
                                        data?.status === 'Pending' &&
                                            <div className="flex items-center p-1">
                                                <ClockIcon className="h-3 w-3 me-1"/>
                                                <p className="text-sm font-semibold">{data.status}</p>
                                            </div>
                                    }
                                    {
                                        data?.status === 'Approved' &&
                                            <div className="flex items-center p-1">
                                                <CheckBadgeIcon className="h-3 w-3 me-1 text-[#39C616]"/>
                                                <p className="text-sm font-semibold text-[#39C616]">{data.status}</p>
                                            </div>
                                    }
                                    {
                                        data?.status === 'Rejected' &&
                                            <div className="flex items-center p-1">
                                                <ExclamationTriangleIcon className="h-3 w-3 me-1 text-[#FF7050]"/>
                                                <p className="text-sm font-semibold text-[#FF7050]">{data.status}</p>
                                            </div>
                                    }
                                    </td>
                                    
                                    <td className="flex justify-end">
                                        <button onClick={()=>document.getElementById(data._id).showModal()} className="btn btn-sm">View Details</button>
                                    </td>

                                    <dialog id={data._id} className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                                <h3 className="font-bold text-xl text-[#020617]">Withdrawal Details</h3>
                                                <p className="text-sm text-[#64748B]">Transaction Details or Rejection Details</p>
                                                <div className="py-3">
                                                    <p className="text-5xl font-bold text-center">₹ {data.withdrawalAmount}</p>
                                                    <div className="flex justify-center">
                                                        {
                                                            data?.status === 'Pending' &&
                                                                <div className="flex items-center p-1">
                                                                    <ClockIcon className="h-3 w-3 me-1 text-[#FEB951]"/>
                                                                    <p className="text-sm font-semibold text-[#FEB951]">{data.status}</p>
                                                                </div>
                                                        }
                                                        {
                                                            data?.status === 'Approved' &&
                                                                <div className="flex items-center p-1">
                                                                    <CheckBadgeIcon className="h-3 w-3 me-1 text-[#39C616]"/>
                                                                    <p className="text-sm font-semibold text-[#39C616]">{data.status}</p>
                                                                </div>
                                                        }
                                                        {
                                                            data?.status === 'Rejected' &&
                                                                <div className="flex items-center p-1">
                                                                    <ExclamationTriangleIcon className="h-3 w-3 me-1 text-[#FF7050]"/>
                                                                    <p className="text-sm font-semibold text-[#FF7050]">{data.status}</p>
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols gap-2">
                                                    <div>
                                                        <p className="text-sm text-[#020617]">Title</p>
                                                        {
                                                            data?.status === 'Pending' &&
                                                            <p className="text-sm text-[#71717A]">Withdrawal Pending</p>
                                                        }
                                                        {
                                                            data?.status === 'Approved' &&
                                                            <p className="text-sm text-[#71717A]">Successfully Completed Withdrawal</p>
                                                        }
                                                        {
                                                            data?.status === 'Rejected' &&
                                                            <p className="text-sm text-[#71717A]">Withdrawal Rejected</p>
                                                        }
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-[#020617]">ID</p>
                                                        <p className="text-sm text-[#71717A]">{data._id}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-[#020617]">To</p>
                                                        <p className="text-sm text-[#71717A]">***********{data.bankInfo.account_number.toString().slice(-4)} {data?.bankInfo?.bank_name}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-[#020617]">Date and Time</p>
                                                        <p className="text-sm text-[#71717A]">{data.withdrawalDate} {data.withdrawalMonth} {data.withdrawalYear}</p>
                                                    </div>
                                                    {
                                                        data?.rejectResoan && 
                                                        <div className="p-2 my-2 rounded-md bg-[#F1F1F1] flex gap-2">
                                                            <QuestionMarkCircleIcon className="w-5 h-5"/>
                                                            <div>
                                                                <p className="text-sm font-semibold text-[#252525]">Rejection Reason</p>
                                                                <p className="text-sm text-[#71717A]">{data.rejectResoan}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="flex items-center justify-center py-3">
                                                    {
                                                        data?.invoice?.fileUrl &&
                                                        <a className="border py-2 px-4 rounded-md" href={data?.invoice?.fileUrl} download={data?.invoice?.fileUrl}>Download Invoice</a>
                                                    }
                                                </div>
                                        </div>
                                    </dialog>
                                </tr>
                            )
                        }                        
                        </tbody>
                    </table>
                </div>
                <div className="overflow-x-auto block lg:hidden">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="">
                                <th className="text-md">Status</th>
                                <th className="text-md">Ammount</th>
                                <th className="text-md text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {
                            withdrawalData && withdrawalData.map(data => 
                                <tr key={data._id} className="hover">
                                    <td className="font-semibold text-sm text-[#09090B]">
                                    {
                                        data?.status === 'Pending' &&
                                            <div className="flex items-center p-1">
                                                <ClockIcon className="h-3 w-3 me-1"/>
                                                <p className="text-sm font-semibold">{data.status}</p>
                                            </div>
                                    }
                                    {
                                        data?.status === 'Approved' &&
                                            <div className="flex items-center p-1">
                                                <CheckBadgeIcon className="h-3 w-3 me-1 text-[#39C616]"/>
                                                <p className="text-sm font-semibold text-[#39C616]">{data.status}</p>
                                            </div>
                                    }
                                    {
                                        data?.status === 'Rejected' &&
                                            <div className="flex items-center p-1">
                                                <ExclamationTriangleIcon className="h-3 w-3 me-1 text-[#FF7050]"/>
                                                <p className="text-sm font-semibold text-[#FF7050]">{data.status}</p>
                                            </div>
                                    }
                                    </td>
                                    <td className="">
                                        <p className="font-semibold text-sm text-[#09090B]">₹ {data?.balance?.amount}</p>
                                    </td>
                                    <td className="flex justify-end">
                                        <button onClick={()=>document.getElementById(data._id).showModal()} className="btn btn-sm">View Details</button>
                                    </td>

                                    <dialog id={data._id} className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                                <h3 className="font-bold text-xl text-[#020617]">Withdrawal Details</h3>
                                                <p className="text-sm text-[#64748B]">Transaction Details or Rejection Details</p>
                                                <div className="py-3">
                                                    <p className="text-5xl font-bold text-center">{data.withdrawalAmount}</p>
                                                    <div className="flex justify-center">
                                                        {
                                                            data?.status === 'Pending' &&
                                                                <div className="flex items-center p-1">
                                                                    <ClockIcon className="h-3 w-3 me-1 text-[#FEB951]"/>
                                                                    <p className="text-sm font-semibold text-[#FEB951]">{data.status}</p>
                                                                </div>
                                                        }
                                                        {
                                                            data?.status === 'Approved' &&
                                                                <div className="flex items-center p-1">
                                                                    <CheckBadgeIcon className="h-3 w-3 me-1 text-[#39C616]"/>
                                                                    <p className="text-sm font-semibold text-[#39C616]">{data.status}</p>
                                                                </div>
                                                        }
                                                        {
                                                            data?.status === 'Rejected' &&
                                                                <div className="flex items-center p-1">
                                                                    <ExclamationTriangleIcon className="h-3 w-3 me-1 text-[#71717A]"/>
                                                                    <p className="text-sm font-semibold text-[#71717A]">{data.status}</p>
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols gap-2">
                                                    <div>
                                                        <p className="text-sm text-[#020617]">Title</p>
                                                        {
                                                            data?.status === 'Pending' &&
                                                            <p className="text-sm text-[#71717A]">Withdrawal Pending</p>
                                                        }
                                                        {
                                                            data?.status === 'Approved' &&
                                                            <p className="text-sm text-[#71717A]">Successfully Completed Withdrawal</p>
                                                        }
                                                        {
                                                            data?.status === 'Rejected' &&
                                                            <p className="text-sm text-[#71717A]">Withdrawal Rejected</p>
                                                        }
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-[#020617]">ID</p>
                                                        <p className="text-sm text-[#71717A]">{data._id}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-[#020617]">To</p>
                                                        <p className="text-sm text-[#71717A]">***********{data.bankInfo.account_number.toString().slice(-4)} {data?.bankInfo?.bank_name}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-[#020617]">Date and Time</p>
                                                        <p className="text-sm text-[#71717A]">{data.withdrawalDate} {data.withdrawalMonth} {data.withdrawalYear}</p>
                                                    </div>
                                                    {
                                                        data?.rejectResoan && 
                                                        <div className="p-2 my-2 rounded-md bg-[#F1F1F1] flex gap-2">
                                                            <QuestionMarkCircleIcon className="w-5 h-5"/>
                                                            <div>
                                                                <p className="text-sm font-semibold text-[#252525]">Rejection Reason</p>
                                                                <p className="text-sm text-[#71717A]">{data.rejectResoan}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                        </div>
                                    </dialog>
                                </tr>
                            )
                        }                        
                        </tbody>
                    </table>
                </div>
            
            <div className="pt-6">
                {
                    !totalItems && !fetchLoading && <Empty className="pt-8" />
                }
                {
                    totalItems > 14 && !fetchLoading && <div className="flex justify-center items-center my-4">
                        <Pagination 
                            defaultCurrent={pageNumber} 
                            total={totalItems}
                            pageSize={perPageWithdrawalList}
                            onChange={handlePageChange}
                        /> 
                  </div>
                }
            </div>
        </div>
    );
};

export default UserWithDrawalHIstory;