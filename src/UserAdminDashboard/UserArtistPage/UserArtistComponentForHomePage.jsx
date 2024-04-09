import { PlusIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Image } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import fallbackImage from '../../assets/fallbackImage.jpg'
import { useNavigate } from "react-router-dom";


const UserArtistComponentForHomePage = () => {

    const { userNameIdRoll } = useContext(AuthContext);
    const navigate = useNavigate()

    const [artistData, setArtistData] = useState();
    const [loading, setLoading] = useState(false)
    useEffect( () => {
        setLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/artist/${userNameIdRoll[1]}?page=1&limit=5`)
            .then( res => {
              if(res.status == 200){
                setArtistData(res.data.data);
                setLoading(false)
              }
            })
            .catch(er => console.log(er));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
    return (
        <div className="py-3">
            <div className="flex items-center">
                <UsersIcon className="h-5 w-5 text-slate-500 me-2"/>
                <p className="text-sm font-semibold text-slate-500">Artists</p>
            </div>
            <div className="flex gap-4 flex-wrap py-3">
                <p style={{cursor: 'pointer'}} onClick={() => navigate('/artist')} className="w-12 h-12 outline-dashed outline-1 outline-slate-500 rounded-full flex items-center justify-center"><PlusIcon className="w-6 h-6 text-slate-500"/></p>
                {
                    loading && <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
                }
                {
                    artistData && artistData.map((image) =>
                        <div key={image._id} className="avatar">
                            <div className="w-12 rounded-full outline outline-1 outline-offset-2 outline-[#EF4136]">
                                <Image
                                  width={48}
                                  height={48}
                                  className="rounded-lg"
                                  src={image.imgUrl}
                                  fallback={fallbackImage}
                                />
                            </div>
                        </div> 
                    ) 
                }                
            </div>
        </div>
    );
};

export default UserArtistComponentForHomePage;