import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import { Tabs } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PaymentDetails from "../../AdminDashboard/UsersList/PaymentDetails";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";

const WalletPage = () => {
    const {userNameIdRoll} = useContext(AuthContext);
    console.log(userNameIdRoll[1]);
    const [userData, setUserData] = useState()
    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/users/${userNameIdRoll[1]}`)
            .then(res => {
                if(res.status == 200){
                    setUserData(res.data.data);
                }
            })
            .catch(er => console.log(er)) 
    }, [])

    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
          key: '1',
          label: 'Payments History',
          children: <PaymentDetails id={userNameIdRoll[1]} text='Successfully Get Payments from Dream Records' />,
        },
        {
          key: '2',
          label: 'Withdrawal History',
          children: 'Withdrawal History',
        },
    ];
    return (
        <div>
            <h2 className="font-bold mt-2 text-slate-600">Available Balance</h2>
            <div className="md:flex justify-between items-center p-2 border rounded-md">
                <p className="font-bold text-lg py-1 px-3 border rounded-md flex items-center"><CurrencyRupeeIcon className="w-5 h-5"/>{userData?.balance?.ammount ? userData.balance.ammount : 0}</p>
                {
                    userData?.balance?.ammount > 100 &&
                    <button className="btn btn-sm btn-neutral my-2">Withdrawal</button>
                }
                {
                    userData?.balance?.ammount < 100 &&
                    <button className="btn btn-sm btn-neutral my-2" disabled>Withdrawal</button>
                }
            </div>
            <div>
                <h2 className="font-bold mt-3 text-slate-600">Add Bank Details</h2>
                <div className="p-3 bg-slate-200 rounded-md">
                    <p className="text-sm font-bold text-slate-500">Dont&apos;t Have Bank Account Yet! Please Add Bank Account Then You can Withdrawal</p>
                </div>
                <button className="btn btn-sm btn-neutral mt-2">Add Bank Acccount</button>
            </div>
            <div>
                <Tabs className="mt-3" defaultActiveKey="1" items={items} onChange={onChange} />                
            </div>
        </div>
    );
};

export default WalletPage;