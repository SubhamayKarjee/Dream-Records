import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReleaseCardComponent from "../ReleasesPage/ReleaseCardComponent/ReleaseCardComponent";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";

const LatestApprovedRelease = () => {

    const { userNameIdRoll } = useContext(AuthContext);

    // Paginatin and Search State __________________________________________________
    const [releaseStatus] = useState('Approved')
    const [totalItems, setTotalItems] = useState();
    const [currentPage] = useState(1);
    const [itemPerPage] = useState(6);
    const [releaseData, setReleaseData] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);

    // Get Release List ______________________________________________________________
    useEffect(() => {
        // Calculate Pagination and Fetch__________________________________________________
        setFetchLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/${userNameIdRoll[1]}?page=${currentPage}&limit=${itemPerPage}&status=${releaseStatus}`)
            .then( res => {
              if(res.status == 200){
                setFetchLoading(false);
                setTotalItems(res.data.dataCount);
                setReleaseData(res.data.data);
              }
            })
            .catch(er => console.log(er));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="">
            <div className="flex items-center">
                <CheckBadgeIcon className="h-5 w-5 text-slate-500 me-2"/>
                <p className="text-sm font-semibold text-slate-500">Latest Approved</p>
            </div>
            <ReleaseCardComponent releaseData={releaseData} totalItems={totalItems} fetchLoading={fetchLoading} currentPage={currentPage} itemPerPage={itemPerPage}/>
        </div>
    );
};

export default LatestApprovedRelease;