import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";

// eslint-disable-next-line react/prop-types
const ActionRequiredLabels = ({onClose}) => {

    const { userNameIdRoll } = useContext(AuthContext);

    const [labels, setLabels] = useState();

    useEffect( () => {
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/labels/action-required/${userNameIdRoll[1]}`)
            .then( res => {
              if(res.status == 200){
                setLabels(res.data.data);
              }
            })
            .catch(er => console.log(er));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    return (
        <div>
            {
                labels && labels.map(l => 
                    <div className="mt-1" onClick={onClose} key={l._id}>
                        <Link to={`/labels/${l._id}`}>
                            <div className="p-2 bg-[#F2F2F2] rounded-md">
                                <div className='flex gap-2'>
                                    <img style={{width: '80px', height: '50px',}} className='rounded-md' src={l.imgUrl} alt={l.imgUrl} />
                                    <div className="flex flex-col justify-between">
                                        <h4 className="font-semibold">{l.labelName}</h4>
                                        {
                                            l.status === 'Rejected' &&
                                            <div className="flex items-center">
                                                <ExclamationTriangleIcon className="h-3 w-3 text-[#FF7050] me-1"/>
                                                <p className="text-xs font-semibold text-[#FF7050]">{l.status}</p>
                                            </div>
                                        }
                                        {
                                            l.status === 'Locked' &&
                                            <div className="flex items-center">
                                                <ExclamationTriangleIcon className="h-3 w-3 text-[#71717A] me-1"/>
                                                <p className="text-xs font-semibold text-[#71717A]">{l.status}</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            }
        </div>
    );
};

export default ActionRequiredLabels;