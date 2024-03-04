import { BellIcon, ChevronLeftIcon, ExclamationCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Empty, Image } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import CreateArtistForm from "./CreateArtistForm";
import './UserArtistPage.css'
import fallbackImage from '../../assets/fallbackImage.jpg'

const UserArtistPage = () => {

    const { userNameIdRoll, refatchArtistData } = useContext(AuthContext);

    const [artistData, setArtistData] = useState();
    const [searchArtistData, setSearchArtistData] = useState();
    // const [refatchData, setRefatchData] = useState(1)
    useEffect( () => {
      axios.get(`http://localhost:5000/api/v1/artist/${userNameIdRoll[1]}`)
          .then( res => {
              setSearchArtistData(res.data.data)
              setArtistData(res.data.data)
          })
          .catch(er => console.log(er));
    },[refatchArtistData])

    const handleSearch = (e) => {
      const search = searchArtistData.filter(d =>d.artistName.toLowerCase().includes(e.toLowerCase()));
      setArtistData(search)
    }




    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r p-2'>
                <div className="mb-4">
                    <button><Link className="px-2 py-1 font-semibold text-sm text-slate-500 flex items-center inline bg-slate-200 rounded-md" to={'/'}><ChevronLeftIcon className="w-4 h-4 me-1 font-bold"/>Back</Link></button>
                </div>
                {/* Search and Create Artist Section ______________________________________________________________________________ */}
                <div className="md:flex md:justify-between md:items-center bg-slate-50 py-2 px-2 rounded-lg">
                    <div className="my-2">
                        <input type="text" onChange={e => handleSearch(e.target.value)} placeholder="Type to Search" className="input input-sm rounded-full input-bordered w-full"/>
                    </div>
                    <div className="my-2">
                        <button onClick={()=>document.getElementById('create_artist_modal').showModal()} className='btn btn-neutral py-1 px-6 rounded-full btn-sm border-none me-2 w-full'>Create Artist</button>
                    </div>
                </div>
                    {/* Create Artist form with Modal Start _______________________________________________________________________ */}
                    <dialog id="create_artist_modal" className="modal"> 
                        <div className="modal-box">
                          <CreateArtistForm/>
                        </div>
                    </dialog>
                    {/* Create Artist form with Modal End _______________________________________________________________________ */}

                {/* Total Artist Count Section _____________________________________________________________________________________ */}
                <div className="flex justify-between items-center my-3">
                    <div className="flex items-center">
                        <ExclamationCircleIcon className="w-6 h-6 me-1 text-slate-500"/>
                        Artist Count
                    </div>
                    <div><span className="text-sm font-bold">10</span> <span className="ms-1 p-2 bg-slate-50 rounded-md text-sm font-bold">50</span> </div>
                </div>

                {/* Artist List and Relase Title Section _____________________________________________________________________________ */}
                <div className="flex justify-between items-center py-2 rounded-full bg-slate-100 px-4">
                    <h4 className="font-bold text-slate-600">Profile</h4>
                    <h4 className="font-bold text-slate-600">Releases</h4>
                </div>
                
                {/* Show All Artist Data __________________________________________________________________________________________________ */}
                <main className="my-4">
                  {
                    artistData?.map((data) => 
                      <div key={data._id} className="flex items-center justify-between p-1 my-1 rounded-md">
                        <div className="flex items-center">
                          {/* <div className="avatar">
                            <div className="w-14 mask mask-squircle">
                              <img src={data.imgUrl} alt={data.artistName}/>
                            </div>
                          </div> */}
                              <Image
                                width={55}
                                height={55}
                                className="rounded-lg"
                                src={data.imgUrl}
                                fallback={fallbackImage}
                              />
                          <div className="ps-2">
                            <h2 className="font-bold">{data.artistName}</h2>
                            <p className="text-sm text-slate-400">ID: {data._id}</p>
                          </div>
                        </div>
                        <div>
                          <button><TrashIcon className="w-5 h-5 text-red-500"/></button>
                        </div>
                      </div>
                    )
                  }
                  {
                    !artistData &&  <Empty className="pt-12" />
                  }
                  
                </main>



            {/* _________ */}
            </div>


            {/* Blog Post Div  _______________________________*/}
            <div className="md:basis-1/4">
                <div className='p-2 border-b'>
                    <h4 className='flex items-center font-bold text-lg text-slate-500'> <BellIcon className='w-6 h-6 me-2 text-slate-500'/> Notification</h4>
                </div>
            </div>
        </div>
    );
};

export default UserArtistPage;