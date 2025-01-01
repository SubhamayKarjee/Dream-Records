/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import localDate from "../../Hooks/localDate";
import localTime from "../../Hooks/localTime";

const SupportLIst = ({data, roll}) => {
    const navigate = useNavigate()
    return (
        <div>
            {/* DeskTop Version ____________________________ */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            {
                                roll !== 'User' &&
                                <th className="text-md">
                                    User Name
                                </th>
                            }
                            <th className="text-md">Subject</th>
                            <th className="text-md">Status</th>
                            <th className="text-md">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        data && data.map(d => 
                            <tr key={d._id} onClick={() =>{
                                if(roll === 'User'){
                                    navigate(`/support/${d._id}`)
                                }else{
                                    navigate(`/admin-dashboard/support/${d._id}`)
                                }
                            }} className="hover cursor-pointer">
                                {
                                    roll !== 'User' &&
                                    <td className="font-semibold text-sm text-[#09090B]">
                                        {d.userName}
                                    </td>
                                }
                                {
                                    d.title.length > 50 ? <td className="font-semibold text-sm text-[#09090B]">{d.title.slice(0,50)}...</td>
                                    : <td className="font-semibold text-sm text-[#09090B]">{d.title}</td>
                                }
                                <td className="font-semibold text-sm text-[#09090B]">{d.status}</td>
                                <td className="font-semibold text-sm text-[#09090B]">
                                    {localDate(d?.date)} &nbsp; {localTime(d?.date)}
                                </td>
                            </tr>
                        )
                    }                        
                    </tbody>
                </table>
            </div>
            {/* Mobile Version ____________________________ */}
            <div className="overflow-x-auto lg:hidden">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            {
                                roll !== 'User' &&
                                <th className="text-md">
                                    User Name
                                </th>
                            }
                            <th className="text-md">Subject</th>
                            <th className="text-md">Status</th>
                            <th className="text-md">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        data && data.map(d => 
                            <tr key={d._id} onClick={() => {
                                if(roll === 'User'){
                                    navigate(`/support/${d._id}`)
                                }else{
                                    navigate(`/admin-dashboard/support/${d._id}`)
                                }
                            }} className="hover cursor-pointer">
                                {
                                    roll !== 'User' &&
                                    <td className="font-semibold text-sm text-[#09090B]">
                                        {d.userName}
                                    </td>
                                }
                                <td className="font-semibold text-sm text-[#09090B]">{d.title.slice(0,10)}..</td>
                                <td className="font-semibold text-sm text-[#09090B]">{d.status}</td>
                                <td className="font-semibold text-sm text-[#09090B]">{localDate(d?.date)} {localTime(d?.date)}</td>
                            </tr>
                        )
                    }                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupportLIst;