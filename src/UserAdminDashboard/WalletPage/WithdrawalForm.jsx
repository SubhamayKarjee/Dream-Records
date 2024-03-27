
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import { Popconfirm } from "antd";
import { useContext, useState } from "react";
import { WalletPageContext } from "./WalletPage";
import './WalletCommonCss.css'
import axios from "axios";
import toast from "react-hot-toast";

const WithdrawalForm = () => {

    const {userData, bankData, withdrawalReFetch, setWithdrawalReFetch, setIsModalOpen} = useContext(WalletPageContext);

    const [withdrawalLoading, setWithdrawalLoading] = useState(false)
    const confirm = () => {
        setWithdrawalLoading(true)
        const status = "Pending"
        const bankInfo = bankData[0]
        const updateUserBalance = {...userData, balance: {...userData.balance, ammount: 0}}

        axios.put(`http://localhost:5000/api/v1/users/${userData._id}`, updateUserBalance)
        .then(res => {
          if(res.status === 200){
            const now = new Date();
            const withdrawalDate = now.getDate().toLocaleString();
            const withdrawalMonth = now.toLocaleString('default', { month: 'long' });
            const withdrawalYear = now.getFullYear();
            const withdrawalTime = now.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true });
            const data = {...userData,  masterUserId: userData._id, bankInfo, status, withdrawalMonth, withdrawalYear, withdrawalTime, withdrawalDate};
            axios.post(`http://localhost:5000/common/api/v1/payment/withdrawal`, data)
            .then(res => {
              if(res.status === 200){
                const reloadAPI = withdrawalReFetch + 1;
                setWithdrawalReFetch(reloadAPI);
                setWithdrawalLoading(false);
                setIsModalOpen(false);
                console.log(res.data.data);
                toast.success('Withdrawal Request Submited. We will review shortly!');
              }
            })
          }
        })
    };

    const cancel = () => {
      return;
    };

    
    return (
        <div>
            <div className="my-2 p-3 bg-slate-100 rounded-lg">
                {
                    bankData?.map(data =>
                        <div key={data?._id}>
                            <h2 className="font-bold text-slate-600">{data?.bank_name}</h2>
                            <p className="text-sm font-semibold text-slate-600">Account Number: {data?.account_number}</p>
                            <p className="text-sm font-semibold text-slate-600">Branch Name: {data?.branch_name}</p>
                            <p className="text-sm font-semibold text-slate-600">IFSC: {data?.IFSC}</p>
                            <p className="text-sm font-semibold text-slate-600">Swift Code: {data?.swift_code}</p>
                        </div>
                    )
                }
            </div>
            <div className="mt-3 p-2 border rounded-md md:flex items-center justify-between">
                <p className="text-slate-500 flex items-center">Ammount: <span className="px-2 py-1 font-bold text-black border rounded-md flex items-center ms-2"><CurrencyRupeeIcon className="w-5 h-5 me-1"/> {userData?.balance?.ammount}</span></p>
                <div className="flex items-center">
                    {
                        withdrawalLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                    }
                    <Popconfirm
                        title="Withdrawal"
                        className="z-1000"
                        description="Are you sure to Withdrawal Payments?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        >
                        <button className="btn btn-sm btn-neutral">Withdrawal</button>
                    </Popconfirm>
                </div>
            </div>
        </div>
    );
};

export default WithdrawalForm;