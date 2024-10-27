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
                            <tr key={d._id} onClick={() => navigate(`/support/${d._id}`)} className="hover cursor-pointer">
                                {
                                    roll !== 'User' &&
                                    <td className="font-semibold text-sm text-[#09090B]">
                                        
                                    </td>
                                }
                                <td className="font-semibold text-sm text-[#09090B]">{d.title}</td>
                                <td className="font-semibold text-sm text-[#09090B]">{d.status}</td>
                                <td className="font-semibold text-sm text-[#09090B]">{d.date.slice(0,10)} {d.date.slice(11,19)}</td>
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
                            <tr key={d._id} onClick={() => navigate(`/support/${d._id}`)} className="hover cursor-pointer">
                                {
                                    roll !== 'User' &&
                                    <td className="font-semibold text-sm text-[#09090B]">
                                        
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