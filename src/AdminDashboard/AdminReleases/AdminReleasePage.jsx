import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import AdminReleaseCardComponent from "./AdminReleaseCardComponent";

const AdminReleasePage = () => {

    // const navigate = useNavigate()

    // Paginatin and Search State __________________________________________________
    const [releaseStatus, setReleaseStatus] = useState('All')
    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(12);
    const [searchText, setSearchText] = useState('');

    const [releaseData, setReleaseData] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);
    // const [hideShow, setHideShow] = useState('none');

    // Get Release List ______________________________________________________________
    useEffect(() => {
        setItemPerPage(12)
        // Calculate Pagination and Fetch__________________________________________________
        setFetchLoading(true)
        axios.get(`http://localhost:5000/admin/api/v1/release?status=${releaseStatus}&page=${currentPage}&limit=${itemPerPage}`)
            .then( res => {
              if(res.status == 200){
                setFetchLoading(false);
                setTotalItems(res.data.dataCount);
                setReleaseData(res.data.data);
                if(!res.data.totalCount){
                    // setHideShow('block')
                }
              }
            })
            .catch(er => console.log(er));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currentPage, releaseStatus]);

    const handleSearch = (e) => {
        setSearchText(e)
    }

    const handleStatus = (e) => {
        setCurrentPage(1)
        setReleaseStatus(e)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    const handleKeyPress = (event) => {
        setItemPerPage(50)
        if (event.key === 'Enter') {
          setFetchLoading(true);
          axios.get(`http://localhost:5000/api/v1/release/labels/search?status=${releaseStatus}&search=${searchText}`)
            .then( res => {
              if(res.status == 200){
                setFetchLoading(false);
                setTotalItems(res.data.dataCount);
                setReleaseData(res.data.data);
              }
            })
            .catch(er => console.log(er));
        }
    };


    return (
        <div className="">
            <div className=''>
                {/* Search and Create Release Section ______________________________________________________________________________ */}
                <div className="md:flex md:justify-between md:items-center bg-slate-50 py-2 px-2 rounded-lg">
                    <div className="my-2">
                        <input type="text" onKeyPress={handleKeyPress} onChange={e => handleSearch(e.target.value)} placeholder="Type & Enter to Search" className="input input-sm rounded-full input-bordered w-full"/>
                    </div>
                    {/* <div className="my-2">
                        <button onClick={()=>navigate('/create-release')} className='btn btn-neutral py-1 px-6 rounded-full btn-sm border-none me-2 w-full'>Create Release</button>
                    </div> */}
                </div>

                {/* Total Release Count Section _____________________________________________________________________________________ */}
                <div className="flex justify-between items-center my-3">
                    <div className="flex items-center">
                        <ExclamationCircleIcon className="w-6 h-6 me-1 text-slate-500"/>
                        Release Count
                    </div>
                    <div><span className="text-sm font-bold">{releaseData?.length}</span> <span className="ms-1 p-2 bg-slate-50 rounded-md text-sm font-bold">{totalItems}</span> </div>
                </div>
                {/* Show Release Section ____________________________________________ */}
                <main>
                    <div>
                        <button onClick={() => handleStatus('All')} className="btn btn-sm btn-neutral m-1">All</button>
                        <button onClick={() => handleStatus('Pending')} className="btn btn-sm btn-neutral mx-1">Pending</button>
                        <button onClick={() => handleStatus('Approved')} className="btn btn-sm btn-neutral mx-1">Approved</button>
                        <button onClick={() => handleStatus('Action Required')} className="btn btn-sm btn-neutral mx-1">Action Required</button>
                    </div>

                    {
                        fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                    }
                    <AdminReleaseCardComponent releaseData={releaseData} totalItems={totalItems} fetchLoading={fetchLoading} currentPage={currentPage} itemPerPage={itemPerPage} handlePageChange={handlePageChange}/>
                </main>

            </div>
        </div>
    );
};

export default AdminReleasePage;