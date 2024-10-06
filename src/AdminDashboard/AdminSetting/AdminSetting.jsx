
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import { Button, Dropdown } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";


// import { useForm } from "react-hook-form";

const AdminSetting = () => {



    const items = [
        { key: '1',label: (<a rel="noopener noreferrer" href={'/admin-dashboard/settings'}>Genre</a>),},
        { key: '2',label: (<a rel="noopener noreferrer" href={'/admin-dashboard/settings/language'}>Language</a>),},
        { key: '3',label: (<a rel="noopener noreferrer" href={'/admin-dashboard/settings/advertisment'}>Advertisment</a>),},
        { key: '4',label: (<a rel="noopener noreferrer" href={'/admin-dashboard/settings/notice'}>Notice</a>),},
        { key: '5',label: (<a rel="noopener noreferrer" href={'/admin-dashboard/settings/withdraw'}>Withdraw</a>),},
    ];
    const location = useLocation();
    const currentPath = location.pathname;

    const pathSplit = currentPath.split('/').pop();
    
    console.log(pathSplit);

    const activeLink = (to , currentPath) => {
        return currentPath === to
        ? { backgroundColor: '#F1F5F9'} // Active styles
        : {};
    }

    

  
    return (
        <div className="overflow-y-auto h-full">

            <div className="flex justify-between py-3">
                {/* Desktop Div _____________________________________ */}
                <div className="hidden lg:block">
                    <div className="h-10 px-[5px] py-1 flex items-center p-1 border rounded-md">
                        <NavLink style={() => activeLink('/admin-dashboard/settings', currentPath)} to={'/admin-dashboard/settings'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Genre</NavLink>
                        <NavLink style={() => activeLink('/admin-dashboard/settings/language', currentPath)} to={'/admin-dashboard/settings/language'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Language</NavLink>
                        <NavLink style={() => activeLink('/admin-dashboard/settings/advertisment', currentPath)} to={'/admin-dashboard/settings/advertisment'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Advertisment</NavLink>
                        <NavLink style={() => activeLink('/admin-dashboard/settings/notice', currentPath)} to={'/admin-dashboard/settings/notice'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Notice</NavLink>
                        <NavLink style={() => activeLink('/admin-dashboard/settings/withdraw', currentPath)} to={'/admin-dashboard/settings/withdraw'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Withdraw</NavLink>
                    </div>
                </div>
                {/* Mobile Div _____________________________________ */}
                <div className="block lg:hidden">
                    <Dropdown
                        menu={{items,}}
                        placement="bottomLeft"
                        className="h-10"
                    >
                        <Button className="text-md font-semibold flex items-center gap-2">{pathSplit == 'settings' ? 'Genre': pathSplit} <ArrowsUpDownIcon className="w-4 h-4"/></Button>
                    </Dropdown>
                </div>
            </div>

            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default AdminSetting;