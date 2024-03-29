import { ChartBarIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import AnalyticsReportList from "./AnalyticsReportList";

const AnalyticsPage = () => {

    const { userNameIdRoll } = useContext(AuthContext);
    const text = 'Get Analytics Reports From Dream Record!'

    return (
        <div>
            <h1 className="font-bold text-xl text-slate-600 p-2 rounded-md mt-2 bg-green-100 flex items-center"><ChartBarIcon className="w-6 h-6 me-2 text-slate-600"/>Analytics</h1>
            <div>
                <AnalyticsReportList id={userNameIdRoll[1]} text={text}/>
            </div>
        </div>
    );
};

export default AnalyticsPage;