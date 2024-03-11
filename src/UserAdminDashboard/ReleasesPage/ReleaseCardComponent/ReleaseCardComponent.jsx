import { CheckBadgeIcon, ClockIcon } from "@heroicons/react/24/solid";
import { Empty, Pagination } from "antd";
import './ReleaseCardComponent.css'

// eslint-disable-next-line react/prop-types
const ReleaseCardComponent = ({releaseData, totalItems, fetchLoading, currentPage, handlePageChange}) => {


    return (
        <div className="my-5">
            <div className="grid cols md:grid-cols-3 sm:grid-cols-2 gap-3">
                {
                    // eslint-disable-next-line react/prop-types
                    releaseData && releaseData.map(d => 
                        <div key={d._id} style={{cursor: 'pointer'}} className="card_parent_div">
                            <img src={d.imgUrl} alt="" />
                            <div className="card_child_div">
                                <div className="card_content">
                                    <p className="font-bold text-white">{d.releaseTitle}</p>
                                    <h3 className="text-xs font-semibold text-slate-300">ID: {d._id}</h3>
                                </div>
                            </div>
                                {/* Status  */}
                                {
                                    d.status === 'Pending' &&
                                        <div className="flex items-center p-1 music_status bg-[#ffae00] rounded-md shadow">
                                            <CheckBadgeIcon className="h-3 w-3 text-white me-1"/>
                                            <p className="text-xs font-semibold text-white">{d.status}</p>
                                        </div>
                                }
                                {
                                    d.status === 'Approved' &&
                                        <div className="flex items-center p-1 music_status bg-[#3dff0d] rounded-md shadow">
                                            <CheckBadgeIcon className="h-3 w-3 text-white me-1"/>
                                            <p className="text-xs font-semibold text-white">{d.status}</p>
                                        </div>
                                }
                                {
                                    d.status === 'Action Required' &&
                                        <div className="flex items-center p-1 music_status bg-[#00eaff] rounded-md shadow">
                                            <ClockIcon className="h-3 w-3 text-white me-1"/>
                                            <p className="text-xs font-semibold text-white">{d.status}</p>
                                        </div>
                                }
                                {
                                    d.status === 'Rejected' &&
                                        <div className="flex items-center p-1 music_status bg-[#ff2a00] rounded-md shadow">
                                            <ClockIcon className="h-3 w-3 text-white me-1"/>
                                            <p className="text-xs font-semibold text-white">{d.status}</p>
                                        </div>
                                }
                        </div>
                    )
                }
            </div>
            <div className="pt-6">
                {
                    !totalItems && !fetchLoading && <Empty className="pt-12" />
                }
                {
                    totalItems > 1 && !fetchLoading && <div className="flex justify-center items-center my-4">
                        <Pagination 
                        defaultCurrent={currentPage} 
                        total={totalItems}
                        onChange={handlePageChange}
                        /> 
                  </div>
                }
            </div>
        </div>
    );
};

export default ReleaseCardComponent;