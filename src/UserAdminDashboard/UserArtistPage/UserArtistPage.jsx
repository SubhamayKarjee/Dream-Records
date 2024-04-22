import { BellIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Empty, Image, Pagination } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import CreateArtistForm from "./CreateArtistForm";
import './UserArtistPage.css'
import fallbackImage from '../../assets/fallbackImage.jpg'

const UserArtistPage = () => {

    const navigate = useNavigate();
    const { userNameIdRoll, refatchArtistData } = useContext(AuthContext);

    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);

    const [searchText, setSearchText] = useState('');

    const [artistData, setArtistData] = useState();
    const [fetchLoading, setFetchLoading] = useState(false)
    useEffect( () => {
      setItemPerPage(10)
      setFetchLoading(true)
      axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/artist/${userNameIdRoll[1]}?page=${currentPage}&limit=${itemPerPage}`)
          .then( res => {
            if(res.status == 200){
              setFetchLoading(false);
              setTotalItems(res.data.dataCount);
              setArtistData(res.data.data);
            }
          })
          .catch(er => console.log(er));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[refatchArtistData, currentPage])


    const handlePageChange = (page) => {
      setCurrentPage(page)
    };

    const handleSearch = (e) => {
      setSearchText(e)
    }

    const handleKeyPress = (event) => {
      setItemPerPage(50)
      if (event.key === 'Enter') {
        setFetchLoading(true);
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/artist/search/${userNameIdRoll[1]}?search=${searchText}`)
          .then( res => {
            if(res.status == 200){
              setFetchLoading(false);
              setTotalItems(res.data.dataCount);
              setArtistData(res.data.data);
            }
          })
          .catch(er => console.log(er));
      }
    };


    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r'>
                  {/* Search and Create Artist Section ______________________________________________________________________________ */}
                  <div className="md:flex md:justify-between md:items-center bg-slate-50 py-2 px-2 rounded-lg mt-2">
                      <div className="my-2">
                          <input type="text" onKeyPress={handleKeyPress} onChange={e => handleSearch(e.target.value)} placeholder="Type & Enter to Search" className="input input-sm rounded-full input-bordered w-full"/>
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
                      <div><span className="text-sm font-bold">{artistData?.length}</span> <span className="ms-1 p-2 bg-slate-50 rounded-md text-sm font-bold">{totalItems}</span> </div>
                  </div>

                  {/* Artist List and Relase Title Section _____________________________________________________________________________ */}
                  <div className="flex justify-between items-center py-2 rounded-full bg-slate-100 px-4">
                      <h4 className="font-bold text-slate-600">Profile</h4>
                      {/* <h4 className="font-bold text-slate-600">Releases</h4> */}
                  </div>
                
                {/* Show All Artist Data __________________________________________________________________________________________________ */}
                <main className="my-2 p-2">
                    {
                      fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                    }
                    {
                      !fetchLoading && artistData?.map((data) => 
                        <div style={{cursor: 'pointer'}} onClick={() => navigate(`/artist/${data._id}`)} key={data._id} className="flex items-center justify-between p-1 my-1 rounded-md">
                          <div className="flex items-center">
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
                        </div>
                      )
                    }
                    
                    {
                      !totalItems && !fetchLoading && <Empty className="pt-12" />
                    }
                    {
                      totalItems > 1 && !fetchLoading && <div className="flex justify-center items-center my-4">
                        <Pagination 
                          defaultCurrent={currentPage} 
                          total={totalItems}
                          pageSize={itemPerPage}
                          onChange={handlePageChange}
                        /> 
                    </div>
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