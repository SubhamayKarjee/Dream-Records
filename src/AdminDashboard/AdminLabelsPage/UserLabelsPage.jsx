import { CheckBadgeIcon, ClockIcon, ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Empty, Image, Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fallbackImage from "../../assets/fallbackImage.jpg"


// eslint-disable-next-line react/prop-types
const UserLabelsPage = ({userId}) => {

    const navigate = useNavigate()

    // Paginatin and Search State __________________________________________________
    const [lebelStatus, setLabelStatus] = useState('All')
    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [searchText, setSearchText] = useState('');

    const [labelsData, setLabelsData] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);

    useEffect( () => {
        setItemPerPage(10)
        setFetchLoading(true)
        axios.get(`http://localhost:5000/api/v1/labels/${userId}?page=${currentPage}&limit=${itemPerPage}&status=${lebelStatus}`)
            .then( res => {
              if(res.status == 200){
                setFetchLoading(false);
                setTotalItems(res.data.dataCount);
                setLabelsData(res.data.data);
              }
            })
            .catch(er => console.log(er));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ currentPage, lebelStatus]);

    const handlePageChange = (page) => {
        setCurrentPage(page)
    };
  
    const handleStatus = (e) => {
        setCurrentPage(1)
        setLabelStatus(e)
    }
  
    const handleSearch = (e) => {
        setSearchText(e)
    }
  
    const handleKeyPress = (event) => {
      setItemPerPage(50)
      if (event.key === 'Enter') {          
        setFetchLoading(true);
        axios.get(`http://localhost:5000/api/v1/labels/search/${userId}?status=${lebelStatus}&search=${searchText}`)
          .then( res => {
            if(res.status == 200){
              setFetchLoading(false);
              setTotalItems(res.data.dataCount);
              setLabelsData(res.data.data);
            }
          })
          .catch(er => console.log(er));
      }
    };

    const handleUpdate = (id) => {
      const link = `/admin-dashboard/labels/${id}`
      navigate(link)
    };

    return (
        <div className="md:h-full">
            <div className='h-full overflow-y-auto p-2'>
                {/* Search Lebels Section ______________________________________________________________________________ */}
                <div className="md:flex md:justify-between md:items-center bg-slate-50 py-2 px-2 rounded-lg">
                    <div className="my-2">
                        <input type="text" onKeyPress={handleKeyPress} onChange={e => handleSearch(e.target.value)} placeholder="Type & Enter to Search" className="input input-sm rounded-full input-bordered w-full"/>
                    </div>
                </div>


                {/* Total Labels Count Section _____________________________________________________________________________________ */}
                <div className="flex justify-between items-center my-3">
                    <div className="flex items-center">
                        <ExclamationCircleIcon className="w-6 h-6 me-1 text-slate-500"/>
                        Label Count
                    </div>
                    <div><span className="text-sm font-bold">{labelsData?.length}</span> <span className="ms-1 p-2 bg-slate-50 rounded-md text-sm font-bold">{totalItems}</span> </div>
                </div>

                {/* Labels List and Relase Title Section _____________________________________________________________________________ */}
                <div className="flex justify-between items-center py-2 rounded-full bg-slate-100 px-4">
                    <h4 className="font-bold text-slate-600">Profile</h4>
                </div>

                {/* Main Div ______________________________________________Labels list */}
                <main className="my-2 p-2">
                    <div className="mb-3">
                        <button onClick={() => handleStatus('All')} className="btn btn-sm btn-neutral mx-1">All</button>
                        <button onClick={() => handleStatus('Pending')} className="btn btn-sm btn-neutral mx-1">Pending</button>
                        <button onClick={() => handleStatus('Approved')} className="btn btn-sm btn-neutral mx-1">Approved</button>
                        <button onClick={() => handleStatus('Rejected')} className="btn btn-sm btn-neutral mx-1">Rejected</button>
                    </div>
                    {
                      fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                    }
                    {
                      !fetchLoading && labelsData?.map((data) => 
                        <div style={{cursor: 'pointer'}} onClick={() => handleUpdate(data._id)} key={data._id} className="md:flex justify-between p-1 my-1 rounded-md border">
                          <div className="flex items-center">
                                <Image
                                  width={55}
                                  height={55}
                                  className="rounded-lg"
                                  src={data.imgUrl}
                                  fallback={fallbackImage}
                                />
                            <div className="ps-2">
                              <h2 className="font-bold">{data.labelName}</h2>
                              <p className="text-sm text-slate-400">ID: {data._id}</p>
                            </div>
                          </div>
                          <div className="flex gap-1 items-center">
                            {
                                data.status === 'Pending' &&
                                <span style={{width: '110px'}} className="flex justify-center bg-yellow-500 my-3 py-1 rounded-md text-sm me-2 font-bold flex items-center"><ClockIcon className="w-4 h-4 me-1"/> {data.status}</span>
                            }
                            {
                                data.status === 'Approved' &&
                                <span style={{width: '110px'}} className="flex justify-center bg-green-500 my-3 py-1 rounded-md text-sm me-2 font-bold flex items-center"><CheckBadgeIcon className="w-4 h-4 me-1"/> {data.status}</span>
                            }
                            {
                                data.status === 'Rejected' &&
                                <span style={{width: '110px'}} className="flex justify-center bg-red-500 my-3 py-1 rounded-md text-sm me-2 font-bold flex items-center"><XCircleIcon className="w-4 h-4 me-1"/> {data.status}</span>
                            }
                            {/* <span onClick={() => handleUpdate(data._id)} className="btn btn-xs btn-neutral py-1 px-2 rounded-md text-xs me-2 font-bold flex items-center">Update Status</span> */}
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
                            defaultCurrent={currentPage} 
                            total={totalItems}
                            pageSize={itemPerPage}
                            onChange={handlePageChange}
                            /> 
                      </div>
                    }
                  
                </main>

            </div>
        </div>
    );
};

export default UserLabelsPage;