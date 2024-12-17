/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

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
                                    <div className="flex gap-2">
                                        <span>
                                            {new Date(d.date).toLocaleDateString()} 
                                        </span>
                                        <span>
                                            {new Date(d.date).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                hour12: true, // Ensures 12-hour format with AM/PM
                                            })}
                                        </span>
                                    </div>

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
                                <td className="font-semibold text-sm text-[#09090B]">{d.date.slice(0,10)}</td>
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