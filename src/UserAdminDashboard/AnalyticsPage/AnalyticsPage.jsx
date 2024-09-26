import { useContext } from "react";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import AdvertisementNotices from "../UserCommonComponent/AdvertisementNotices";
import MainNotices from "../UserCommonComponent/MainNotices";
import MainNoticesMobile from "../UserCommonComponent/MainNoticesMobile";
import AnalyticsReportList from "./AnalyticsReportList";

const AnalyticsPage = () => {

    const { userNameIdRoll } = useContext(AuthContext);
    const role = userNameIdRoll[2]
    const link = '/analytics'

    const sideBarShadow = {
        boxShadow: '-2px 2px 18px 0px #EFEFEF',
    }

    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto px-3 bg-[#FCFCFC] md:pt-16'>
                <h3 className='font-bold text-xl pb-2 text-[#252525]'>Analytics</h3>
                <AnalyticsReportList id={userNameIdRoll[1]} role={role} link={link}/>
            </div>

            {/* Notification Div Mobile _______________________________*/}
            <MainNoticesMobile/>

            {/* Notification Div Desktop _______________________________*/}
            <div style={sideBarShadow} className="md:basis-1/4 hidden md:block bg-white md:pt-16 px-3">
                <h3 className='font-semibold text-xl pb-2'>Notices</h3>
                <MainNotices/>
                <AdvertisementNotices/>
            </div>
        </div>
    );
};

export default AnalyticsPage;