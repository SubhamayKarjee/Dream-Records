import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Empty } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";

// eslint-disable-next-line react/prop-types
const ActionRequiredRelease = ({onClose}) => {

    const { userNameIdRoll } = useContext(AuthContext);
    const navigate = useNavigate('')

    const [release, setRelease] = useState();
    const [noData, setNoData] = useState(false);
    useEffect( () => {
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/action-required/${userNameIdRoll[1]}`)
            .then( res => {
              if(res.status == 200){
                setRelease(res.data.data);
                if(res.data.data.length === 0){
                    setNoData(true);
                }
                console.log(res.data.data);
              }
            })
            .catch(er => console.log(er));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
    const handleNavigate = (e) => {
        const url = `/releases/${e}`;
        navigate(url)
    }

    return (
        <div className="p-2">
            {
                release && release.map(d => 
                    <div key={d._id} style={{cursor: 'pointer'}} onClick={() => handleNavigate(d._id)}  className="mb-1 bg-[#F2F2F2] p-2 rounded-md">
                        <div onClick={onClose} className='flex items-center gap-2'>
                            <img style={{width: '88px', height: '65px', borderRadius: '8px'}} src={d.imgUrl} alt="" />
                            <div className="">
                                <div className="">
                                    <h3 className="font-semibold text-[#252525]">{d.releaseTitle.slice(0,10)}..</h3>
                                    <p className="text-sm text-[#252525]">UPC {d.UPC}</p>
                                    {
                                        d.status === 'Action Required' &&
                                                <div className="flex items-center">
                                                    <ExclamationTriangleIcon className="h-3 w-3 text-[#71717A] me-1"/>
                                                    <p className="text-xs font-semibold text-[#71717A]">{d.status}</p>
                                                </div>
                                    }
                                    {
                                        d.status === 'Takedown' &&
                                            <div className="flex items-center">
                                                <ExclamationTriangleIcon className="h-3 w-3 text-[#FF7050] me-1"/>
                                                <p className="text-xs font-semibold text-[#FF7050]">{d.status}</p>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                noData && <Empty description={false} />
            }
        </div>
    );
};

export default ActionRequiredRelease;