import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";

const ActionRequiredRelease = () => {

    const { userNameIdRoll } = useContext(AuthContext);
    const navigate = useNavigate('')

    const [release, setRelease] = useState();
    useEffect( () => {
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/action-required/${userNameIdRoll[1]}`)
            .then( res => {
              if(res.status == 200){
                setRelease(res.data.data);
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
        <div className="p-3">
            {
                release && release.map(d => 
                    <div key={d._id} style={{cursor: 'pointer'}} onClick={() => handleNavigate(d._id)}  className="card_parent_div my-2">
                        <img src={d.imgUrl} alt="" />
                        <div className="card_child_div">
                            <div className="card_content">
                                <p className="font-bold text-white">{d.releaseTitle}</p>
                                <h3 className="text-xs font-semibold text-slate-300">ID: {d._id}</h3>
                            </div>
                        </div>
                        <div className="flex items-center p-1 music_status bg-red-700 rounded-md shadow">
                            <ExclamationTriangleIcon className="h-3 w-3 text-white me-1"/>
                            <p className="text-xs font-semibold text-white">{d.status}</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ActionRequiredRelease;