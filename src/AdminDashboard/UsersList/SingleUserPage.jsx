import { Image, Skeleton, Tabs } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fallbackImage from '../../assets/fallbackImage.jpg'
import AnalyticsReportList from "../../UserAdminDashboard/AnalyticsPage/AnalyticsReportList";
import WithdrawalList from "../../UserAdminDashboard/WalletPage/WithdrawalList";
import UserArtistPageForAdmin from "../AdminArtistPage/UserArtistPageForAdmin";
import UserLabelsPage from "../AdminLabelsPage/UserLabelsPage";
import PaymentDetails from "./PaymentDetails";

const SingleUserPage = () => {
    const {id} = useParams();

    const [userData, setUserData] = useState()
    const [userLoading, setUserLoading] = useState(false)
    useEffect(() => {
        setUserLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/users/${id}`)
        .then(res => {
            setUserData(res.data.data)
            setUserLoading(false)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
          key: '1',
          label: 'Artist',
          children: <UserArtistPageForAdmin userId={id}/>,
        },
        {
          key: '2',
          label: 'Labels',
          children: <UserLabelsPage userId={id}/>,
        },
        {
          key: '3',
          label: 'Payments',
          children: <PaymentDetails id={id} text='Send Payment Successfully from Dream Records' />
        },
        {
          key: '4',
          label: 'Withdrowal',
          children: <WithdrawalList id={id} text={`Withdrawal Request From ${userData?.nick_name ? userData.nick_name : userData?.name}`}/>
        },
        {
          key: '5',
          label: 'Analytics',
          children: <AnalyticsReportList id={id} text={"Successsfully send Analytics Reports form Dream Record!"}/>
        },
    ];


    return (
        <div>
            {   userLoading &&
                <Skeleton
                    className="py-4"
                    avatar
                    paragraph={{
                    rows: 2,
                    }}
                />
            }
            {   !userLoading && userData &&
                <div className="md:flex p-3 shadow my-2 rounded-md border">
                    <div className="md:me-4">
                        <Image
                            width={135}
                            height={135}
                            className="rounded-lg"
                            src={userData?.photoURL}
                            fallback={fallbackImage}
                        />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-600">{userData?.nick_name ? userData.nick_name : userData?.name}</h2>
                        <p className="text-sm text-slate-700">Address: {userData?.address}</p>
                        <p className="text-sm text-slate-700">ID: {userData?._id}</p>
                        <p className="text-sm text-slate-700 font-semibold pt-2">{userData?.email}</p>
                        <p className="text-sm text-slate-700 font-semibold">Roll: <span className="bg-green-500 px-2 rounded-md text-white">{userData?.roll}</span></p>
                        <p className="text-sm text-slate-700">Account Opening Date: {userData?.openingDate} || Time: {userData?.openingTime}</p>
                    </div>
                </div>
            }
            <main>
                {
                    !userLoading && userData?.roll === 'User' &&
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                }
            </main>
        </div>
    );
};

export default SingleUserPage;