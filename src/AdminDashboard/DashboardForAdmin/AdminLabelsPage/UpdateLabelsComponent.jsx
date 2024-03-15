/* eslint-disable react/prop-types */

import { CheckBadgeIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Image, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fallbackImage from "../../../assets/fallbackImage.jpg"

const UpdateLabelsComponent = () => {

    const {id} = useParams();

    const [labels, setLabels] = useState();
    const [labelsStatus, setLabesStatus] = useState();
    const [fetchLoading, setFetchLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(true);
    const [refetch, setRefetch] = useState(1)

    useEffect( () => {
        setFetchLoading(true)
        axios.get(`http://localhost:5000/admin/api/v1/labels/single/${id}`)
        .then(res => {
            setLabels(res.data.data[0]);
            setLabesStatus(res.data.data[0].status)
            setFetchLoading(false)
        })
    
    },[refetch])
    // console.log(labels);

    const handleUpdateStatus = () => {
        setUpdateLoading(true)
        const data = {...labels, status: labelsStatus };
        axios.put(`http://localhost:5000/admin/api/v1/labels/update/${id}`, data)
        .then(res => {
            if(res.status == 200){
                const count = refetch + 1;
                setRefetch(count)
                setUpdateLoading(false)
            }
        })
    }
    return (
        <div>
            {
                fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
            }
            {
                labels && 
                <div className="flex justify-between p-2 my-3 rounded-md border">
                    <div className="flex">
                        <Image
                        width={120}
                        height={120}
                        className="rounded-lg"
                        src={labels.imgUrl}
                        fallback={fallbackImage}
                        />
                        <div className="ps-2">
                            <h2 className="font-bold">{labels.labelName}</h2>
                            <p className="text-sm text-slate-400">ID: {labels._id}</p>
                            {
                                labels.status === 'Pending' &&
                                <span className="bg-yellow-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><ClockIcon className="w-4 h-4 me-1"/> {labels.status}</span>
                            }
                            {
                                labels.status === 'Approved' &&
                                <span className="bg-green-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><CheckBadgeIcon className="w-4 h-4 me-1"/> {labels.status}</span>
                            }
                            {
                                labels.status === 'Rejected' &&
                                <span className="bg-red-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><XCircleIcon className="w-4 h-4 me-1"/> {labels.status}</span>
                            }

                        </div>
                    </div>

                    <div className="flex gap-1 flex-col">
                        <div className="mt-2">
                            <p className="font-bold mb-2">Select & Update Status</p>
                            <Select
                                defaultValue={labelsStatus}
                                style={{ width: '100%' }}
                                onChange={(value) => setLabesStatus(value)}
                                options={[
                                    { value: 'Pending', label: 'Pending' },
                                    { value: 'Approved', label: 'Approved' },
                                    { value: 'Rejected', label: 'Rejected' },
                                ]}
                            />
                            <div className="flex items-center">
                                {
                                    updateLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                                }
                                <button onClick={handleUpdateStatus} className="btn btn-sm btn-neutral w-full mt-2">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default UpdateLabelsComponent;