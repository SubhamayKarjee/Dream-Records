import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Empty, Image, Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fallbackImage from '../../assets/fallbackImage.jpg'

const AdminArtistPage = () => {

    const navigate = useNavigate();

    const { pageNumber, perPageAritst } = useParams();

    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [itemPerPage, setItemPerPage] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [artistData, setArtistData] = useState();
    const [fetchLoading, setFetchLoading] = useState(false)
    const [activeList, setActiveList] = useState()
    useEffect( () => {
      setItemPerPage(10)
      setFetchLoading(true)
      axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/artist?page=${pageNumber}&limit=${itemPerPage}`)
          .then( res => {
            if(res.status == 200){
              setFetchLoading(false);
              setTotalItems(res.data.dataCount);
              setArtistData(res.data.data);
              setActiveList(res.data.data.length);
            }
          })
          .catch(er => console.log(er));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pageNumber, perPageAritst])


    const handlePageChange = (page) => {
      navigate(`/admin-dashboard/artist/${page}/${perPageAritst}`)
    };

    const handleSearch = (e) => {
      setSearchText(e)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setFetchLoading(true);
            axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/artist/search-artist?search=${searchText}`)
            .then( res => {
                if(res.status == 200){
                  setFetchLoading(false);
                  setTotalItems(res.data.dataCount);
                  setArtistData(res.data.data);
                  setActiveList(res.data.data.length);
                }
            })
            .catch(er => console.log(er));
        }
    };


    return (
        <div className='p-2'>
            <div>
                  {/* Search and Create Artist Section ______________________________________________________________________________ */}
                  <div className="md:flex md:justify-between md:items-center bg-slate-50 py-2 px-2 rounded-lg mt-2">
                      <div className="my-2">
                          <input type="text" onKeyPress={handleKeyPress} onChange={e => handleSearch(e.target.value)} placeholder="Type & Enter to Search" className="input input-sm rounded-full input-bordered w-full"/>
                      </div>
                  </div>

                  {/* Total Artist Count Section _____________________________________________________________________________________ */}
                  <div className="flex justify-between items-center my-3">
                      <div className="flex items-center">
                          <ExclamationCircleIcon className="w-6 h-6 me-1 text-slate-500"/>
                          Artist Count
                      </div>
                      <div><span className="text-sm font-bold">{activeList}</span> <span className="ms-1 p-2 bg-slate-50 rounded-md text-sm font-bold">{totalItems}</span> </div>
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
                        <div style={{cursor: 'pointer'}} onClick={() => navigate(`/admin-dashboard/artist/${data._id}`)} key={data._id} className="flex items-center justify-between p-1 my-1 rounded-md">
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
                              <p className="text-sm text-slate-400">{data?.userName}</p>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    
                    {
                      !totalItems && !fetchLoading && <Empty className="pt-12" />
                    }
                    {
                      totalItems > 10 && !fetchLoading && <div className="flex justify-center items-center my-4">
                        <Pagination 
                          defaultCurrent={pageNumber} 
                          total={totalItems}
                          pageSize={activeList}
                          onChange={handlePageChange}
                        /> 
                    </div>
                    }
                  
                </main>
            {/* _________ */}
            </div>
        </div>
    );
};

export default AdminArtistPage;