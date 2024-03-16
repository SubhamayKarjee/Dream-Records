// import { useState } from "react";

import AddGenreComponent from "./AddGenreComponent/AddGenreComponent";
import AddLanguageComponent from "./AddLanguageComponent/AddLanguageComponent";

// import { useForm } from "react-hook-form";

const AdminSetting = () => {

  
    return (
        <div className="overflow-y-auto h-full">
            <div className="md:flex">
                <div className="md:flex-1 m-2 p-4 bg-slate-50">
                    <AddGenreComponent/>
                </div>

                <div className="md:flex-1 m-2 p-4 bg-slate-50">
                    <AddLanguageComponent/>
                </div>
            </div>
        </div>
    );
};

export default AdminSetting;