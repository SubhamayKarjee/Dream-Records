import { ChartBarSquareIcon, CreditCardIcon, ExclamationCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Empty, Image, Pagination, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import fallbackImage from '../../assets/fallbackImage.jpg'
import LoadingComponentsInsidePage from "../../LoadingComponents/LoadingComponentsInsidePage";
import SendPaymentsFormDreamRecord from "./SendPaymentsFormDreamRecord";
import SendReporsFormDreamRecord from "./SendReporsFormDreamRecord";
import './UserList.css'

const UsersList = () => {

    const navigate = useNavigate()

    const { pageNumber, perPageUser } = useParams();

    const [isOpenModalPayment, setIsOpenModalPayment] = useState(false);
    const [clickIdPayment, setClickIdPayment] = useState('')


    const [usersData, setUsersData] = useState();
    // Paginatin and Search State __________________________________________________
    const [totalItems, setTotalItems] = useState();
    const [fetchLoading, setFetchLoading] = useState(false)
    const [refetch, setRefetch] = useState(1);
    const [activeList, setActiveList] = useState()
    useEffect( () => {
      setFetchLoading(true)
      axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/users?page=${pageNumber}&limit=${perPageUser}`)
          .then( res => {
            if(res.status == 200){
              setFetchLoading(false);
              setTotalItems(res.data.dataCount);
              setUsersData(res.data.data);
              setActiveList(res.data.data.length);
            }
          })
          .catch(er => console.log(er));
    },[pageNumber, refetch, perPageUser])

    const handlePageChange = (page) => {
        navigate(`/admin-dashboard/all-user/${page}/${perPageUser}`)
    };


    const [searchText, setSearchText] = useState();
    const handleSearch = (e) => {
        setSearchText(e)
    }

    const searchByName = () => {
      if (event.key === 'Enter') {
        setFetchLoading(true);
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/users/search-user?userName=${searchText}`)
          .then( res => {
            if(res.status == 200){
              setFetchLoading(false);
              setTotalItems(res.data.dataCount);
              setUsersData(res.data.data);
              setActiveList(res.data.data.length);
            }
          })
          .catch(er => console.log(er));
      }
    }
    const [deleteLoading, setDeleteLoading] = useState(false)
    const confirm = (id, imgKey, uid) => {
        if (!imgKey) {
            imgKey = '';
        }
        if (!uid) {
            uid = '';
        }
        setDeleteLoading(true)
        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/users/${id}?imgKey=${imgKey}&uid=${uid}`)
        .then(res => {
            if(res.status == 200){
                const r = refetch + 1;
                setRefetch(r);
                setDeleteLoading(false)
                toast.success('User Deleted')
            }
        })
    }

    const cancel = () => {
      return;
    };

    if(deleteLoading){
      return <LoadingComponentsInsidePage/>
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
                <div><span className="text-sm font-bold">{activeList}</span> <span className="ms-1 p-2 bg-slate-50 rounded-md text-sm font-bold">{totalItems}</span> </div>
            </div>

            <main className="my-2 p-2">
                {
                  fetchLoading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                }
                {
                    !fetchLoading && usersData?.map((data, index) => 
                      <div key={data._id} className="my-1 border-b pb-1">
                        <div className="md:flex justify-between items-center">
                          <div style={{cursor: 'pointer'}} onClick={() => navigate(`/admin-dashboard/user/${data._id}`)} className="flex items-center">
                                <Image
                                  width={55}
                                  height={55}
                                  className="rounded-lg"
                                  src={data.photoURL}
                                  fallback={fallbackImage}
                                />
                            <div className="ps-2">
                              <h2 className="font-bold">{data.userName}</h2>
                              <p className="text-sm text-slate-400">ID: {data._id}</p>
                            </div>
                          </div>  
                          {
                            data.roll === 'User' &&
                            <div className="flex items-center">
                              <button onClick={()=>{
                                document.getElementById(`${data._id}`).showModal(); 
                                setIsOpenModalPayment(true);
                                setClickIdPayment(data._id);
                              }} className="btn btn-sm btn-neutral m-2"><CreditCardIcon className="w-5 h-5 text-white"/>Pay</button>
                              <button onClick={()=>document.getElementById(`${index}`).showModal()} className="btn btn-sm btn-neutral m-2"><ChartBarSquareIcon className="w-5 h-5 text-white"/>Reports</button>
                              <Popconfirm
                                title="Delete"
                                placement="leftTop"
                                className="z-1000"
                                description="Are you sure to Delete User?"
                                onConfirm={() => confirm(data._id, data.imgKey, data.uid)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                                >
                                <TrashIcon style={{cursor: 'pointer'}} className="w-5 h-5 text-red-500"/>
                              </Popconfirm>
                            </div>
                          }                        
                          {
                            data.roll === 'Admin' &&
                            <div className="flex items-center">
                              <button className="btn btn-sm btn-info m-2">Admin</button>
                            </div>
                          }                        
                        </div>

                        {/* Modal Update Payments */}
                        <dialog id={`${data._id}`} className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button onClick={() => setIsOpenModalPayment(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <SendPaymentsFormDreamRecord id={data._id} isOpenModalPayment={isOpenModalPayment} clickIdPayment={clickIdPayment}/>
                          </div>
                        </dialog>  

                        {/* Modal Update Reports */}
                        <dialog id={`${index}`} className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <SendReporsFormDreamRecord id={data._id}/>
                          </div>
                        </dialog>
                      </div>
                    )
                }
                    
                    {
                        !totalItems && !fetchLoading && <Empty className="pt-12" />
                    }
                    {
                        totalItems > 9 && !fetchLoading && <div className="flex justify-center items-center my-4">
                            <Pagination 
                              defaultCurrent={pageNumber} 
                              total={totalItems}
                              pageSize={activeList}
                              onChange={handlePageChange}
                            /> 
                        </div>
                    }
                  
                </main>
        </div>
    );
};

export default UsersList;