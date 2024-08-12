import { NavLink, Outlet, useLocation } from 'react-router-dom';
import supportIcon from '../../assets/support-icon/support.png';

const AdminSupportPage = () => {


    const location = useLocation();
    const currentPath = location.pathname;

    const activeLink = (to , currentPath) => {
        console.log(currentPath);
        return currentPath.startsWith(to)
        ? { color: 'red', borderBottom: '1.5px solid red' } // Active styles
        : {};
    }


    return (
        <div>
            <div>
                <div className='flex items-center mt-2 p-2 rounded-md bg-green-100'>
                    <img className='me-2' src={supportIcon} alt={supportIcon} />
                    <h1 className='font-semibold text-xl text-slate-500'>Support History...</h1>
                </div>
                <div className='py-3'>
                    <NavLink style={() => activeLink('/admin-dashboard/support/chat', currentPath)} className='py-2 inactive-link me-4 fw-bold transition-all duration-300' to={'/admin-dashboard/support/chat/1/10/All'}>
                        Chat Support
                    </NavLink>
                    <NavLink style={() => activeLink('/admin-dashboard/support/call', currentPath)} className='py-2 inactive-link fw-bold' to={'/admin-dashboard/support/call/1/10/All'}>
                        Call Support
                    </NavLink>
                </div>
                <Outlet/>
            </div>
        </div>
    );
};

export default AdminSupportPage;