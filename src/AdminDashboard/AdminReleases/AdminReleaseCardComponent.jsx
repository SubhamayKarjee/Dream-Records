import { CheckBadgeIcon, ClockIcon, DocumentMagnifyingGlassIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Empty, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import './AdminRleaseCardComponent.css'

// eslint-disable-next-line react/prop-types
const AdminReleaseCardComponent = ({releaseData, totalItems, fetchLoading, currentPage, handlePageChange, itemPerPage}) => {

    const navigate = useNavigate('')
    const handleNavigate = (e) => {
        const url = `/admin-dashboard/release/${e}`;
        navigate(url)
    }

    return (
        <div className="my-5">
            <div className="grid cols md:grid-cols-4 sm:grid-cols-3 gap-3">
                {
                    // eslint-disable-next-line react/prop-types
                    releaseData && releaseData.map(d => 
                        <div key={d._id} style={{cursor: 'pointer'}} onClick={() => handleNavigate(d._id)}  className="card_parent_div">
                            <img  style={{minHeight: '200px'}} src={d.imgUrl} alt={d.releaseTitle} />
                            <div className="card_child_div">
                                <div className="card_content">
                                    <p className="font-bold text-white">{d.releaseTitle}</p>
                                    <h3 className="text-xs font-semibold text-slate-300">{d?.userName}</h3>
                                    <h3 className="text-xs font-semibold text-slate-300">ID: {d._id}</h3>
                                </div>
                            </div>
                                {/* Status  */}
                                {
                                    d.status === 'Pending' &&
                                    <div className="flex items-center p-1 music_status bg-[#ffae00] rounded-md shadow">
                                        <ClockIcon className="h-3 w-3 text-white me-1"/>
                                        <p className="text-xs font-semibold text-white">{d.status}</p>
                                    </div>
                                }
                                {
                                    d.status === 'ReSubmitted' &&
                                    <div className="flex items-center p-1 music_status bg-[#ffae00] rounded-md shadow">
                                        <ClockIcon className="h-3 w-3 text-white me-1"/>
                                        <p className="text-xs font-semibold text-white">{d.status}</p>
                                    </div>
                                }
                                {
                                    d.status === 'Approved' &&
                                    <div className="flex items-center p-1 music_status bg-[#00c90d] rounded-md shadow">
                                        <CheckBadgeIcon className="h-3 w-3 text-white me-1"/>
                                        <p className="text-xs font-semibold text-white">{d.status}</p>
                                    </div>
                                }
                                {
                                    d.status === 'Action Required' &&
                                    <div className="flex items-center p-1 music_status bg-red-700 rounded-md shadow">
                                        <ExclamationTriangleIcon className="h-3 w-3 text-white me-1"/>
                                        <p className="text-xs font-semibold text-white">{d.status}</p>
                                    </div>
                                }
                                {
                                    d.status === 'Takedown' &&
                                    <div className="flex items-center p-1 music_status bg-red-500 rounded-md shadow">
                                        <ExclamationTriangleIcon className="h-3 w-3 text-white me-1"/>
                                        <p className="text-xs font-semibold text-white">{d.status}</p>
                                    </div>
                                }
                                {
                                    d.status === 'Review' &&
                                    <div className="flex items-center p-1 music_status bg-info rounded-md shadow">
                                        <DocumentMagnifyingGlassIcon className="h-3 w-3 text-white me-1"/>
                                        <p className="text-xs font-semibold text-white">{d.status}</p>
                                    </div>
                                }
                        </div>
                    )
                }
            </div>
            <div className="pt-6">
                {
                    !totalItems && !fetchLoading && <Empty className="pt-8" />
                }
                {
                    totalItems > 8 && !fetchLoading && <div className="flex justify-center items-center my-4">
                        <Pagination 
                            defaultCurrent={currentPage} 
                            total={totalItems}
                            pageSize={itemPerPage}
                            onChange={handlePageChange}
                        /> 
                  </div>
                }
            </div>
        </div>
    );
};

export default AdminReleaseCardComponent;