import { Tabs } from 'antd';
import supportIcon from '../../assets/support-icon/support.png'
import CallSupport from './CallSupport';
import ChatSupport from "./ChatSupport";

const AdminSupportPage = () => {

    const items = [
        {
          key: '1',
          label: 'Chat Support',
          children: <ChatSupport/>
        },
        {
          key: '2',
          label: 'Call Support',
          children: <CallSupport/>
        },
    ];

    return (
        <div>
            <div>
                <div className='flex items-center mt-2 p-2 rounded-md bg-green-100'>
                    <img className='me-2' src={supportIcon} alt={supportIcon} />
                    <h1 className='font-semibold text-xl text-slate-500'>Support History...</h1>
                </div>
                <Tabs defaultActiveKey="1" items={items} />
            </div>
        </div>
    );
};

export default AdminSupportPage;