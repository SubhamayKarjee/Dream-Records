
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import { Popconfirm } from "antd";
import { useContext } from "react";
import { WalletPageContext } from "./WalletPage";
import './WalletCommonCss.css'

const WithdrawalForm = () => {

    const {userData, bankData} = useContext(WalletPageContext);

    const confirm = () => {
        const status = "Pending"
        const bankInfo = bankData[0]
        const data = {...userData, bankInfo, status}
        console.log(data);
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
    );
};

export default WithdrawalForm;