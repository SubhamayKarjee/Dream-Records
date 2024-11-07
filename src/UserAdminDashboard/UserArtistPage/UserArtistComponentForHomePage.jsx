import { 
    RiUserAddLine,
    RiGroupLine
} from "@remixicon/react";
import { Image } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import fallbackImage from '../../assets/fallbackImage/commonDefaultImage.png'
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
        <div className="px-4 pt-4 border rounded-lg shadow my-3">
            <div className="flex items-center">
                <RiGroupLine
                    size={24}
                    color="#252525"
                    className='me-2'
                />
                <p className="font-bold text-[#252525]">Artists</p>
            </div>
            <div className="flex gap-4 flex-wrap py-3">
                <div>                
                    <p style={{cursor: 'pointer', width: '90px', height: '78px', borderRadius: '12px'}} onClick={() => navigate('/create-artist')} className="outline-dashed outline-1 outline-slate-500 flex items-center justify-center">
                        <RiUserAddLine
                            size={48}
                            color="#252525"
                            className='me-2'
                        />
                    </p>
                    <p className="text-center pt-2 text-sm">Add New</p>
                </div>
                {
                    loading && 
                    <>
                        <div className="skeleton h-[78px] w-[90px] rounded-[12px]"></div> 
                        <div className="skeleton h-[78px] w-[90px] rounded-[12px]"></div> 
                        <div className="skeleton h-[78px] w-[90px] rounded-[12px]"></div> 
                        <div className="skeleton h-[78px] w-[90px] rounded-[12px]"></div> 
                        <div className="skeleton h-[78px] w-[90px] rounded-[12px]"></div> 
                    </>
                }
                {
                    artistData && artistData.map((data) =>
                        <div key={data._id} className="avatar">
                            <div className="">
                                <Image
                                  style={{width: '90px', height: '78px', borderRadius: '12px'}}
                                  className="shadow border"
                                  src={data.imgUrl}
                                  fallback={fallbackImage}
                                  preview={false}
                                />
                                {
                                    data.artistName.length > 6 ? <p className="text-sm text-center">{data.artistName.slice(0,6)}..</p>
                                    : <p className="text-sm text-center">{data.artistName}</p>
                                }
                                
                            </div>
                        </div> 
                    ) 
                }                
            </div>
        </div>
    );
};

export default UserArtistComponentForHomePage;