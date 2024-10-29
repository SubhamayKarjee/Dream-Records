import { LockClosedIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserLockedPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${id}`)
        .then(res => {
            if(res.status == 200){
                if(res.data.data.userLocked === false){
                    return navigate('/')
                }
            }
        })
    }, [id, navigate])

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex justify-center items-center flex-col">
                <LockClosedIcon className="w-10 h-10 cursor-pointer mx-2"/>
                <h1 className="font-bold text-xl">Your Profile Locked</h1>
                <p>Your Profile Locked Please contact to Dream Records Support</p>
            </div>
        </div>
    );
};

export default UserLockedPage;