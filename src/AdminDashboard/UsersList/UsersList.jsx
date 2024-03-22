import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Empty, Image, Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fallbackImage from '../../assets/fallbackImage.jpg'

const UsersList = () => {


    const navigate = useNavigate()

    const [usersData, setUsersData] = useState();

    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [fetchLoading, setFetchLoading] = useState(false)
    useEffect( () => {
      setItemPerPage(10)
      setFetchLoading(true)
      axios.get(`http://localhost:5000/admin/api/v1/users?page=${currentPage}&limit=${itemPerPage}`)
          .then( res => {
            if(res.status == 200){
              setFetchLoading(false);
              setTotalItems(res.data.dataCount);
              setUsersData(res.data.data);
            }
          })
          .catch(er => console.log(er));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    };


    const [searchText, setSearchText] = useState();
    const handleSearch = (e) => {
        setSearchText(e)
    }

    const searchByName = () => {
        console.log(searchText);
    }


    return (
        <div>
            {/* Search and Create Release Section ______________________________________________________________________________ */}
            <div className="md:flex md:justify-between md:items-center bg-slate-50 py-2 px-2 rounded-lg">
                    <div className="my-2">
                        <input type="text" onKeyPress={searchByName} onChange={e => handleSearch(e.target.value)} placeholder="Type Name & Enter to Search" className="input input-sm rounded-full input-bordered w-full"/>
                    </div>
            </div>
            {/* Total Release Count Section _____________________________________________________________________________________ */}
            <div className="flex justify-between items-center my-3">
                <div className="flex items-center">
                    <ExclamationCircleIcon className="w-6 h-6 me-1 text-slate-500"/>
                    Total Users
                </div>
                <div><span className="text-sm font-bold">{1}</span> <span className="ms-1 p-2 bg-slate-50 rounded-md text-sm font-bold">{1}</span> </div>
            </div>

            <main className="my-2 p-2">
                {
                  fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                }
                {
                    !fetchLoading && usersData?.map((data) => 
                      <div style={{cursor: 'pointer'}} onClick={() => navigate(`/admin-dashboard/user/${data._id}`)} key={data._id} className="flex items-center justify-between p-1 my-1 rounded-md">
                        <div className="flex items-center">
                              <Image
                                width={55}
                                height={55}
                                className="rounded-lg"
                                src={data.photoURL}
                                fallback={fallbackImage}
                              />
                          <div className="ps-2">
                            <h2 className="font-bold">{data.nick_name}</h2>
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
                        totalItems > 9 && !fetchLoading && <div className="flex justify-center items-center my-4">
                            <Pagination 
                            defaultCurrent={currentPage} 
                            total={totalItems}
                            pageSize={itemPerPage}
                            onChange={handlePageChange}
                            /> 
                        </div>
                    }
                  
                </main>
        </div>
    );
};

export default UsersList;