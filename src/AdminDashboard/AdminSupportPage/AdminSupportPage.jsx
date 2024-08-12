import { NavLink, Outlet } from 'react-router-dom';
import supportIcon from '../../assets/support-icon/support.png';

const AdminSupportPage = () => {

    const activeLink = (isActive) => {
        return {
            color: isActive ? 'red' : '',
            borderBottom: isActive ? '2px solid red' : '',
        }
    }


    return (
        <div>
            <div>
                <div className='flex items-center mt-2 p-2 rounded-md bg-green-100'>
                    <img className='me-2' src={supportIcon} alt={supportIcon} />
                    <h1 className='font-semibold text-xl text-slate-500'>Support History...</h1>
                </div>
                <div className='py-3'>
                    <NavLink style={({isActive}) => activeLink(isActive)} className='py-2 inactive-link me-4 fw-bold transition-all duration-300' to={'/admin-dashboard/support/chat/1/10/All'} activeClassName='active-link'>
                        Chat Support
                    </NavLink>
                    <NavLink style={({isActive}) => activeLink(isActive)} className='py-2 inactive-link fw-bold' to={'/admin-dashboard/support/call/1/10/All'} activeClassName='active-link'>
                        Call Support
                    </NavLink>
                </div>
                <Outlet/>
            </div>
        </div>
    );
};

export default AdminSupportPage;