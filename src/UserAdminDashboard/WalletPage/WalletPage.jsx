import { CurrencyRupeeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Divider, Modal, Tabs, Tooltip } from "antd";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import PaymentDetails from "../../AdminDashboard/UsersList/PaymentDetails";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import MainNotices from "../UserCommonComponent/MainNotices";
import MainNoticesMobile from "../UserCommonComponent/MainNoticesMobile";
import BankAccountCreateForm from "./BankAccountCreateForm";
import WithdrawalForm from "./WithdrawalForm";
import WithdrawalList from "./WithdrawalList";

export const WalletPageContext = createContext();

const WalletPage = () => {

    const {userNameIdRoll} = useContext(AuthContext);
    const role = userNameIdRoll[2]

    const [userData, setUserData] = useState();
    const [bankData, setBankData] = useState([])

    const [reFetchBankInfo, setReFetchBankInfo] = useState(1);
    const [withdrawalReFetch, setWithdrawalReFetch] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const contextValue = {
        userNameIdRoll,
        reFetchBankInfo, setReFetchBankInfo,
        withdrawalReFetch, setWithdrawalReFetch,
        userData, 
        bankData, 
        setIsModalOpen
    }

    const [activePaymentMonth, setActivePaymentMonth] = useState(false);
    const [paymentMonthLoading, setPaymentMonthLoading] = useState(false)
    useEffect(() => {
        setPaymentMonthLoading(true)
        const currentDate = new Date();
        const month = currentDate.toLocaleString('default', { month: 'long' });
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/active-payment-month/66d80b32544c7126feb39661`)
            .then(res => {
            res.data.data.activeMonth.map(activeMonth => {
                if(activeMonth === month){
                    setActivePaymentMonth(true)
                    setPaymentMonthLoading(false)
                }
            })


            })
    },[])
    
    useEffect(() => {
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${userNameIdRoll[1]}`)
            .then(res => {
                if(res.status == 200){
                    setUserData(res.data.data);
                }
            })
            .catch(er => console.log(er)) 
    }, [userNameIdRoll, withdrawalReFetch, reFetchBankInfo]);
    // Get Bank INFO

    const [bankDataStatus, setBankDataStatus] = useState(false);
    const [bankInfoLoading, setBankInfoLoading] = useState(false);
    const [deleteFetch, setDeleteFetch] = useState(1)
    useEffect(() => {
        setBankInfoLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/bank-info/${userNameIdRoll[1]}`)
            .then(res => {
                if(res.status == 200){
                    setBankData(res.data.data);
                    if(res.data.data[0]){
                        setBankDataStatus(true)
                    }else{
                        setBankDataStatus(false)
                    }
                    setBankInfoLoading(false)
                }
            })
            .catch(er => console.log(er)) 
    }, [reFetchBankInfo, userNameIdRoll, deleteFetch]);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const deleteBankInfo = (id) => {
        setDeleteLoading(true)
        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/api/v1/bank-info/${id}`)
        .then( res => {
            if(res.status == 200){
                const f = deleteFetch + 1;
                setDeleteFetch(f)
                setDeleteLoading(false)
                toast.success('Deleted the BankInfo');
            }
        })
        .catch(er => console.log(er));
    }

    // Modal Open and Close function __________________
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const items = [
        {
          key: '1',
          label: 'Payments History',
          children: <PaymentDetails id={userNameIdRoll[1]} role={role} text='Successfully Get Payments from Dream Records' />,
        },
        {
          key: '2',
          label: 'Withdrawal History',
          children: <WithdrawalList id={userNameIdRoll[1]} text='Withdrawal Requested'/>
        },
    ];

    const sideBarShadow = {
        boxShadow: '-2px 2px 18px 0px #EFEFEF',
    }

    return (
        <WalletPageContext.Provider value={contextValue}>
        <div className="md:flex h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto px-3 bg-[#FCFCFC] md:pt-16 custom-scrollbar'> 
                <h3 className='font-bold text-xl pb-2 text-[#252525]'>Wallet</h3>
                    <div>
                        <div className="pt-1">
                            {
                                bankData.length === 0 &&
                                <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                                    <div>
                                        <h2 className="font-semibold text-sm">Add Bank Details</h2>
                                        <p className="text-sm text-[#71717A]">Dont&apos;t Have Bank Account Yet! Please Add Bank Account Then You can Withdrawal</p>
                                    </div>
                                    <button onClick={()=>document.getElementById('add_bank_info_modal').showModal()} className="btn btn-sm btn-neutral bg-[#18181B] h-9">Add Bank Acccount</button>
                                </div> 
                            }
                            {
                                bankData && bankData.map(d => 
                                    <div key={d._id} className="rounded-md border p-2 relative">
                                        <h2 className="font-bold mt-3 text-slate-600">{d.bank_name}</h2>
                                        <div className="border rounded-md p-2 bg-slate-50">
                                            <p className="text-sm font-bold text-slate-600">Account Holder: {d.account_holder_name}</p>
                                            <p className="text-sm font-bold text-slate-600">Account Number: {d.account_number}</p>
                                            <p className="text-sm font-bold text-slate-600">Branch Name: {d.branch_name}</p>
                                            <p className="text-sm font-bold text-slate-600">IFSC: {d.IFSC}</p>
                                            <p className="text-sm font-bold text-slate-600">Swift Code: {d.swift_code}</p>
                                        </div>
                                        <div className="absolute top-2 right-2 flex items-center">
                                            {
                                                deleteLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                                            }
                                            <Tooltip placement="left" title="Delete Bank Account">
                                                <TrashIcon onClick={() => deleteBankInfo(d._id)} style={{cursor: 'pointer'}} className="w-5 h-5 font-bold text-red-600"/>
                                            </Tooltip>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        
                        <dialog id="add_bank_info_modal" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <BankAccountCreateForm/>
                            </div>
                        </dialog>
                    </div>  

                    <Divider/>

                    <div className="md:flex items-center justify-between">
                    {
                        bankInfoLoading ? <div className="skeleton h-9 w-24 rounded-md"></div> :
                        <p className="font-bold text-lg py-1 px-3 border rounded-md flex items-center"><CurrencyRupeeIcon className="w-5 h-5 me-2"/>{userData?.balance?.amount ? userData.balance.amount : 0}</p>
                    }
                    {
                        activePaymentMonth && !paymentMonthLoading ?
                        <div>
                                {
                                    userData?.balance?.amount > 5000 && bankDataStatus === true && 
                                    <button onClick={showModal} className="btn btn-sm btn-neutral my-2">Withdrawal</button>
                                }
                                {
                                    userData?.balance?.amount > 5000 && bankDataStatus === false && 
                                    <div className="md:flex items-center">
                                        <p className="text-xs m-2 text-slate-600">Please add bank account then withdrawal button visible</p>
                                        <button className="btn btn-sm btn-neutral my-2" disabled>Withdrawal</button>
                                    </div>
                                }
                                {
                                    userData?.balance?.amount < 5000 && bankDataStatus === false &&
                                    <div className="md:flex items-center">
                                        <p className="text-xs m-2 text-slate-600">Have to Balance more than <span className="font-bold">5000</span> Rupee</p>
                                        <button className="btn btn-sm btn-neutral my-2" disabled>Withdrawal</button>
                                    </div>
                                }
                                
                        </div> : <div className="md:flex items-center">
                                        <p className="text-xs m-2 text-slate-600">This month not abailable for withdrawal</p>
                                        <button className="btn btn-sm btn-neutral my-2" disabled>Withdrawal</button>
                                    </div>
                    }
                    
                    <Modal title="Withdrawal Payments" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                        <WithdrawalForm/>
                    </Modal>
                </div>
                
                <div>
                    <Tabs className="mt-3" defaultActiveKey="1" items={items} />                
                </div>
            </div>

            {/* Notification Div Mobile _______________________________*/}
            <MainNoticesMobile/>

            {/* Notification Div Desktop _______________________________*/}
            <div style={sideBarShadow} className="md:basis-1/4 hidden md:block bg-white md:pt-16 px-3">
                <h3 className='font-semibold text-xl pb-2'>Notices</h3>
                <MainNotices/>
            </div>
        </div>
        </WalletPageContext.Provider>
    );
};

export default WalletPage;