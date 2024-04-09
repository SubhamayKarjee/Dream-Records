import { Result } from "antd";
import axios from "axios";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const UpdateClaimReleaseModal = ({id, data}) => {


    const [claimStatus, setClaimStatus] = useState('Solved')
    const [actionRequired, setActionRequired] = useState();
    const [actionReqErr, setActionReqErr] = useState();
    const [hideDiv, setHideDiv] = useState(false)

    const updateClaimStatus = () => {
        setActionReqErr('');
        if(claimStatus === 'Rejected'){
            if(!actionRequired){
                setActionReqErr('Please Type Reason');
                return;
            }
        }

        const now = new Date();
        const date = now.getDate().toLocaleString();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true });

        let updatedData;
        if(claimStatus === 'Rejected'){
            updatedData = {...data, status: claimStatus, ansDate: date, ansMonth: month, ansYear: year, ansTime: time, actionRequired: actionRequired}
        }else{
            updatedData = {...data, status: claimStatus, ansDate: date, ansMonth: month, ansYear: year, ansTime: time,}
        }
        console.log(updatedData);
        axios.put(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/claim-release/${id}`, updatedData)
        .then(res => {
            if(res.status === 200){
                setHideDiv(true)
            }
        })
    }


    return (
        <div className="mt-2">
            {
                hideDiv === false &&
                <div>
                    <p className="font-bold mb-2">Select & Update Claim Status</p>
                    <select className="select select-bordered select-sm w-full my-2" onChange={(e) => setClaimStatus(e.target.value)}>
                        <option>Solved</option>
                        <option>Rejected</option>
                    </select>
                    {
                        claimStatus === 'Rejected' &&
                        <textarea onChange={(e) => setActionRequired(e.target.value)} className="textarea textarea-bordered w-full h-24" placeholder="Reason"></textarea>
                    }
                    {
                        actionReqErr && <p className="text-red-500">{actionReqErr}</p>
                    }
                    <button onClick={updateClaimStatus} className="btn btn-sm btn-neutral w-full mt-2">Update</button>
                </div>
            }
            {
                hideDiv === true &&
                <div>
                    <Result
                        status="success"
                        title="Successfully Updated Claim Status!"
                        subTitle=""
                        extra={[]}
                    />
                </div>
            }
        </div>
    );
};

export default UpdateClaimReleaseModal;