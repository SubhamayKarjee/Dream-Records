import { Button, DatePicker, Dropdown, Empty, Pagination } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../UserAdminHomePage/UserAdminHomePage";
import { 
    RiExpandUpDownLine
} from "@remixicon/react";



const UserPaymentHistory = () => {


    const {userNameIdRoll} = useContext(AuthContext);
    const { pageNumber, perPagePaymentList } = useParams();
    const navigate = useNavigate();


    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [fetchLoading, setFetchLoading] = useState(false)
    
    const [paymentData, setPaymentData] = useState();
    const [reload, setReload] = useState(1)
    useEffect( () => {
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/${userNameIdRoll[1]}?page=${pageNumber}&limit=${perPagePaymentList}`)
        .then(res => {
            setPaymentData(res.data.data);
            setTotalItems(res.data.dataCount)
            setFetchLoading(false)
        })
    }, [pageNumber, reload, perPagePaymentList, userNameIdRoll])

    const handlePageChange = (page) => {
        navigate(`/wallet/payment/${page}/12`)
    };

    const onChange = (date, dateString) => {
        if(!dateString){
            const load = reload + 1 
            setReload(load)
        }else{
            setFetchLoading(true)
            axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/search/${userNameIdRoll[1]}?page=1&limit=100&search=${dateString}`)
            .then(res => {
                setPaymentData(res.data.data);
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
            <div className="flex justify-between items-center mt-4">
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
                                <Button className="text-md font-semibold flex items-center gap-2">Payments History
                                <RiExpandUpDownLine
                                    size={18}
                                    color="#09090B"
                                />
                                </Button>
                            </Dropdown>
                        </div>
                </div>
                <div>
                    <DatePicker className="payment_details" onChange={onChange} picker="year"/>
                </div>
            </div>
            
                {fetchLoading && <div className="flex justify-center items-center my-2"><span className="loading loading-spinner loading-md"></span></div>}
                <div className="overflow-x-auto hidden lg:block">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className="text-md">Title</th>
                                <th className="text-md">Payment Date</th>
                                <th className="text-md">Based on</th>
                                <th className="text-md">Ammount</th>
                                <th className="text-md text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {
                            paymentData && paymentData.map(data => 
                                <tr key={data._id} className="hover">
                                    <td className="font-semibold text-sm text-[#09090B]">Successfully Get Payments</td>
                                    <td className="font-semibold text-sm text-[#09090B]">
                                        {   data?.isoDate ? <>
                                                {new Date(data.isoDate).toLocaleDateString(undefined, {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })} 
                                            </> : <>{data?.date} {data?.month.slice(0,3)} {data?.year}</>
                                        }
                                    </td>
                                    <td className="font-semibold text-sm text-[#09090B]">{data?.paymentReportDate}</td>
                                    <td>
                                        <p className="font-semibold text-sm text-[#09090B]">₹ {data?.amount}.00</p>
                                    </td>
                                    <td className="font-semibold flex justify-end text-[#09090B]">
                                        <button onClick={()=>document.getElementById(data._id).showModal()} className="btn btn-sm">View Details</button>
                                    </td>
                                    <dialog id={data._id} className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                                <h3 className="font-bold text-xl text-[#020617]">Payment Details</h3>
                                                <p className="text-sm text-[#64748B]">Transaction Details or Rejection Details</p>
                                                <div className="py-3">
                                                    <p className="text-5xl font-bold text-center">₹ {data.amount}</p>
                                                    <p className="text-center">Completed</p>
                                                </div>
                                                <div className="grid grid-cols gap-2">
                                                    <div>
                                                        <p className="text-sm text-[#020617]">Title</p>
                                                        <p className="text-sm text-[#71717A]">Successfully Get Payments</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-[#020617]">ID</p>
                                                        <p className="text-sm text-[#71717A]">{data._id}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-[#020617]">Payment Based On</p>
                                                        <p className="text-sm text-[#71717A]">{data.paymentReportDate}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-[#020617]">Payment Date & Time</p>
                                                        <div>
                                                            {   data?.isoDate ? <div className="flex gap-2 item-center">
                                                                    <p className="text-sm text-[#71717A]">
                                                                        {new Date(data.isoDate).toLocaleDateString(undefined, {
                                                                            day: '2-digit',
                                                                            month: 'short',
                                                                            year: 'numeric',
                                                                        })} 
                                                                    </p>
                                                                    <p className="text-sm text-[#71717A]">
                                                                        {new Date(data.isoDate).toLocaleTimeString(undefined, {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                            second: '2-digit',
                                                                            hour12: true, 
                                                                        })}
                                                                    </p>
                                                                </div> : <p className="text-sm text-[#71717A]">{data?.date} {data?.month.slice(0,3)} {data?.year} || {data.time}</p>
                                                            }
                                                        </div>
                                                    </div>
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
                            <tr>
                                <th className="text-md">Based on</th>
                                <th className="text-md">Ammount</th>
                                <th className="text-md text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {
                            paymentData && paymentData.map(data => 
                                <tr key={data._id} className="hover">
                                    <td className="font-semibold text-sm text-[#09090B]">{data?.paymentReportDate}</td>
                                    <td className="font-semibold text-sm text-[#09090B]">
                                        <p className="font-semibold text-sm text-[#09090B]">₹ {data?.amount}.00</p>
                                    </td>
                                    <td className="font-semibold flex justify-end text-[#09090B]">
                                        <button onClick={()=>document.getElementById(data._id).showModal()} className="btn btn-sm">View Details</button>
                                    </td>
                                    
                                    <dialog id={data._id} className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                                <h3 className="font-bold text-xl text-[#020617]">Payment Details</h3>
                                                <p className="text-sm text-[#64748B]">Transaction Details or Rejection Details</p>
                                                <div className="py-3">
                                                    <p className="text-5xl font-bold text-center">{data.amount}</p>
                                                    <p className="text-center">Completed</p>
                                                </div>
                                                <div className="grid grid-cols gap-2">
                                                    <div>
                                                        <p className="text-sm text-[#020617]">Title</p>
                                                        <p className="text-sm text-[#71717A]">Successfully Get Payments</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-[#020617]">ID</p>
                                                        <p className="text-sm text-[#71717A]">{data._id}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-[#020617]">Payment Based On</p>
                                                        <p className="text-sm text-[#71717A]">{data.paymentReportDate}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-[#020617]">Payment Date & Time</p>
                                                            {   data?.isoDate ? <div className="flex gap-2 items-center">
                                                                    <p className="text-sm text-[#71717A]">
                                                                        {new Date(data.isoDate).toLocaleDateString(undefined, {
                                                                            day: '2-digit',
                                                                            month: 'short',
                                                                            year: 'numeric',
                                                                        })} 
                                                                    </p>
                                                                    <p className="text-sm text-[#71717A]">
                                                                        {new Date(data.isoDate).toLocaleTimeString(undefined, {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                            second: '2-digit',
                                                                            hour12: true, 
                                                                        })}
                                                                    </p>
                                                                </div> : <p className="text-sm text-[#71717A]">{data?.date} {data?.month.slice(0,3)} {data?.year} || {data.time}</p>
                                                            }
                                                    </div>
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
                    totalItems > 12 && !fetchLoading && <div className="flex justify-center items-center my-4">
                        <Pagination 
                            defaultCurrent={pageNumber} 
                            total={totalItems}
                            pageSize={perPagePaymentList}
                            onChange={handlePageChange}
                        /> 
                  </div>
                }
            </div>
        </div>
    );
};

export default UserPaymentHistory;