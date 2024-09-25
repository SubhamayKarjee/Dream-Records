import { Divider, Empty, Image, Pagination } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import CreateArtistForm from "./CreateArtistForm";
import './UserArtistPage.css'
import fallbackImage from '../../assets/fallbackImage.jpg'
import MainNotices from "../UserCommonComponent/MainNotices";
import AdvertisementNotices from "../UserCommonComponent/AdvertisementNotices";
import MainNoticesMobile from "../UserCommonComponent/MainNoticesMobile";
import { DocumentCheckIcon, PlusIcon } from "@heroicons/react/24/outline";

import appleImg from '../../assets/social-icon/apple.png' 
import spotifyImg from '../../assets/social-icon/spotify.png' 
import instagramImg from '../../assets/social-icon/instagram.png' 
import facebookImg from '../../assets/social-icon/facebook.png' 
import youtubeImg from '../../assets/social-icon/youtube.png' 


const UserArtistPage = () => {

    const navigate = useNavigate();
    const { userNameIdRoll, refatchArtistData } = useContext(AuthContext);
    const {pageNumber, perPageArtist} = useParams()

    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [searchText, setSearchText] = useState('');

    const [artistData, setArtistData] = useState();
    const [fetchLoading, setFetchLoading] = useState(false)
    useEffect( () => {
      setFetchLoading(true)
      axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/artist/${userNameIdRoll[1]}?page=${pageNumber}&limit=${perPageArtist}`)
          .then( res => {
            if(res.status == 200){
              setFetchLoading(false);
              setTotalItems(res.data.dataCount);
              setArtistData(res.data.data);
            }
          })
          .catch(er => console.log(er));
    },[refatchArtistData, userNameIdRoll, pageNumber, perPageArtist])


    const handlePageChange = (page) => {
      navigate(`/artist/${page}/8`)
    };

    const handleSearch = (e) => {
      setSearchText(e)
    }

    const handleKeyPress = (event) => {
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

    const sideBarShadow = {
      boxShadow: '-2px 2px 18px 0px #EFEFEF',
    }
    const inputStyle ={
      height: '36px',
      border: '1px solid #E2E8F0',
      minWidth: '300px'
  }



    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:pt-16 px-3 bg-[#FCFCFC]'>
                <h3 className='font-semibold text-xl text-[#252525]'>Artists</h3>
                  {/* Search and Create Artist Section ______________________________________________________________________________ */}
                  <div className="md:flex md:justify-between md:items-center">
                      <div className="mt-2">
                          <input style={inputStyle} type="text" onKeyPress={handleKeyPress} onChange={e => handleSearch(e.target.value)} placeholder="Type & Enter to Search" className="input input-sm w-full"/>
                      </div>
                      <div className="mt-2">
                          <button onClick={()=>document.getElementById('create_artist_modal').showModal()} className='btn btn-sm btn-neutral px-6 bg-[#18181B] h-9'><PlusIcon className="w-5 h-5"/>Create Artist</button>
                      </div>
                  </div>
                      {/* Create Artist form with Modal Start _______________________________________________________________________ */}
                      <dialog id="create_artist_modal" className="modal"> 
                          <div className="modal-box">
                            <CreateArtistForm/>
                          </div>
                      </dialog>
                      {/* Create Artist form with Modal End _______________________________________________________________________ */}

                    <Divider/>
                  {/* Artist page Title and Total Artist_____________________________________________________________________________ */}
                  <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-lg text-[#252525]">Profiles</h4>
                      <div className="flex justify-between items-center gap-2">
                        <div className="flex items-center">
                            <DocumentCheckIcon className="w-4 h-4 me-1 text-slate-500"/>
                            <span className="text-sm">Artist Count</span>
                        </div>
                        <div><span className="text-sm font-bold">{artistData?.length} Out Of {totalItems}</span> </div>
                      </div>
                  </div>

                {/* Show All Artist Data __________________________________________________________________________________________________ */}
                <main className="my-2">
                  <div className="grid cols sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {
                        fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                      }
                      {
                        !fetchLoading && artistData?.map((data) => 
                          <div style={{cursor: 'pointer'}} onClick={() => navigate(`/artist/${data._id}/All/1/8`)} key={data._id} className="">
                            <div className="">
                                  <Image
                                    width={'100%'}
                                    style={{borderRadius: '20px', height: '170px'}}
                                    src={data.imgUrl}
                                    fallback={fallbackImage}
                                    preview={false}
                                  />
                              <div className="">
                                  <h2 className="font-semibold text-[#252525]">{data.artistName}</h2>
                                  <div className="flex items-center gap-2">
                                    {
                                        data?.appleId &&
                                        <a target='_blank' href={`${data.appleId}`}><img src={appleImg} alt={appleImg} /></a>
                                    }
                                    {
                                        data?.spotifyId &&
                                        <a target='_blank' href={`${data.spotifyId}`}><img src={spotifyImg} alt={spotifyImg} /></a>
                                    }
                                    {
                                        data?.instagramId &&
                                        <a target='_blank' href={`${data.instagramId}`}><img src={instagramImg} alt={instagramImg} /></a>
                                    }
                                    {
                                        data?.youtube &&
                                        <a target='_blank' href={data.youtube}><img src={youtubeImg} alt={youtubeImg} /></a>
                                    }
                                    {
                                        data?.facebook &&
                                        <a target='_blank' href={data.facebook}><img src={facebookImg} alt={facebookImg} /></a>
                                    }
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      
                      {
                        !totalItems && !fetchLoading && <Empty className="pt-12" />
                      }
                  </div>
                    {
                      totalItems > 8 && !fetchLoading && <div className="flex justify-center items-center my-4">
                        <Pagination 
                          defaultCurrent={pageNumber} 
                          total={totalItems}
                          pageSize={perPageArtist}
                          onChange={handlePageChange}
                        /> 
                    </div>
                    }
                  
                </main>
            {/* _________ */}
            </div>


            {/* Blog Post Div  _______________________________*/}
            <div style={sideBarShadow} className="md:basis-1/4 hidden md:block md:pt-16 px-3">
              <h3 className='font-semibold text-xl pb-2'>Notices</h3>
                <MainNotices/>
                <AdvertisementNotices/>
            </div>

            {/* Sideber Div Mobile _______________________________*/}
            <MainNoticesMobile/>
        </div>
    );
};

export default UserArtistPage;