// import { useState } from "react";

import AddGenreComponent from "./AddGenreComponent/AddGenreComponent";
import AddLanguageComponent from "./AddLanguageComponent/AddLanguageComponent";
import AdvertismentComponent from "./AdvertismentComponent/AdvertismentComponent";
import NoticeFromDreamRecord from "./NoticeFromDreamRecord/NoticeFromDreamRecord";

// import { useForm } from "react-hook-form";

const AdminSetting = () => {

  
    return (
        <div className="overflow-y-auto h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="m-2 p-4 bg-slate-50">
                    <AddGenreComponent/>
                </div>

                <div className="m-2 p-4 bg-slate-50">
                    <AddLanguageComponent/>
                </div>

                <div className="m-2 p-4 bg-slate-50">
                    <AdvertismentComponent/>
                </div>

                <div className="m-2 p-4 bg-slate-50">
                    <NoticeFromDreamRecord/>
                </div>
            </div>
        </div>
    );
};

export default AdminSetting;