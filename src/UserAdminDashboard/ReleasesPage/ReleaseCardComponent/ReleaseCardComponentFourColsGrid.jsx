import { CheckBadgeIcon, ClockIcon, DocumentMagnifyingGlassIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Empty, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import './ReleaseCardComponent.css'

// eslint-disable-next-line react/prop-types
const ReleaseCardComponentFourColsGrid = ({releaseData, totalItems, fetchLoading, currentPage, handlePageChange, itemPerPage}) => {

    const navigate = useNavigate('')
    const handleNavigate = (e) => {
        const url = `/releases/${e}`;
        navigate(url)
    }


    return (
        <div className="my-5">
            <div className="grid cols md:grid-cols-4 sm:grid-cols-2 gap-3">
                {
                    // eslint-disable-next-line react/prop-types
                    releaseData && releaseData.map(d => 
                        <div key={d._id} style={{cursor: 'pointer', borderRadius: '24px', height: '276px',}} onClick={() => handleNavigate(d._id)}  className="p-1 border">
                            <img className="" style={{width: '100%', height: '191px', borderRadius: '20px'}} src={d.imgUrl} alt={d.releaseTitle} />
                            <div className="">
                                <div className="p-3">
                                    <p className="font-bold text-[#252525] pb-1">{d.releaseTitle}</p>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-[12px] text-[#252525]">UPC {d.UPC}</h3>
                                        {
                                            d.status === 'Pending' &&
                                                <div className="flex items-center">
                                                    <ClockIcon className="h-3 w-3 text-[#FEB951] me-1"/>
                                                    <p className="text-xs font-semibold text-[#FEB951]">{d.status}</p>
                                                </div>
                                        }
                                        {
                                            d.status === 'Approved' &&
                                                <div className="flex items-center">
                                                    <CheckBadgeIcon className="h-3 w-3 text-[#39C616] me-1"/>
                                                    <p className="text-xs font-semibold text-[#39C616]">{d.status}</p>
                                                </div>
                                        }
                                        {
                                            d.status === 'Action Required' &&
                                                <div className="flex items-center">
                                                    <ExclamationTriangleIcon className="h-3 w-3 text-[#71717A] me-1"/>
                                                    <p className="text-xs font-semibold text-[#71717A]">{d.status}</p>
                                                </div>
                                        }
                                        {
                                            d.status === 'Takedown' &&
                                                <div className="flex items-center">
                                                    <ExclamationTriangleIcon className="h-3 w-3 text-[#FF7050] me-1"/>
                                                    <p className="text-xs font-semibold text-[#FF7050]">{d.status}</p>
                                                </div>
                                        }
                                        {
                                            d.status === 'Review' &&
                                                <div className="flex items-center">
                                                    <DocumentMagnifyingGlassIcon className="h-3 w-3 text-[#39B5FB] me-1"/>
                                                    <p className="text-xs font-semibold text-[#39B5FB]">{d.status}</p>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
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

export default ReleaseCardComponentFourColsGrid;