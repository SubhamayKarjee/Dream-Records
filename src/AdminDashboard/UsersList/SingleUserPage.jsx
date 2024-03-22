import { Image, Skeleton } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fallbackImage from '../../assets/fallbackImage.jpg'

const SingleUserPage = () => {
    const {id} = useParams();

    const [userData, setUserData] = useState()
    const [userLoading, setUserLoading] = useState(false)
    useEffect(() => {
        setUserLoading(true)
        axios.get(`http://localhost:5000/admin/api/v1/users/${id}`)
        .then(res => {
            setUserData(res.data.data)
            console.log(res.data.data)
            setUserLoading(false)
        })
    },[])


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
                        <h2 className="font-bold text-slate-600">{userData?.nick_name ? userData.nick_name : userData?.first_name}</h2>
                        <p className="text-sm text-slate-700">Address: {userData?.address}</p>
                        <p className="text-sm text-slate-700">ID: {userData?._id}</p>
                        <p className="text-sm text-slate-700 font-semibold pt-2">{userData?.email}</p>
                        <p className="text-sm text-slate-700 font-semibold">Roll: <span className="bg-green-500 px-2 rounded-md text-white">{userData?.roll}</span></p>
                        <p className="text-sm text-slate-700">Account Opening Date: {userData?.openingDate} || Time: {userData?.openingTime}</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default SingleUserPage;