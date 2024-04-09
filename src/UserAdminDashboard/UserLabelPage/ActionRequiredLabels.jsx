import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";

const ActionRequiredLabels = () => {

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
                    <div className="m-2" key={l._id}>
                        <Link to={`/labels/${l._id}`}>
                            <div className="p-2 bg-slate-200 rounded-md relative">
                                <div style={{width: '100%', height: '100px'}} className='overflow-hidden rounded-md'>
                                    <img className="" src={l.imgUrl} alt={l.imgUrl} />
                                </div>
                                <p className="bg-red-500 text-sm rounded-md px-2 font-bold absolute top-4 right-4">{l.status}</p>
                            </div>
                        </Link>
                    </div>
                )
            }
        </div>
    );
};

export default ActionRequiredLabels;