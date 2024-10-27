import { Button, DatePicker, Divider, Dropdown, Empty, Modal } from 'antd';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../UserAdminHomePage/UserAdminHomePage';
import 'react-phone-number-input/style.css'
import { ArrowsUpDownIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import './SupportPage.css'
import { NavLink, useLocation, useParams } from 'react-router-dom';
import SupportLIst from './SupportLIst';




const SupportPage = () => {

    const {userNameIdRoll} = useContext(AuthContext);

    const [attachment, setAttachment] = useState();
    const [upLoadLoading, setUploadLoading] = useState(false);

    const attachmentUpload = (e) => {
        setUploadLoading(true)
        const file = e[0];
        const formData = new FormData();
        formData.append('file', file);
        if(attachment){
            axios.delete(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/ticket/delete-ticket-file?key=${attachment.key}`)
        }
        axios.post(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/ticket/upload-ticket-file`, formData)
        .then(res => {
            if(res.status === 200){
                setUploadLoading(false);
                setAttachment(res.data.data)
                toast.success('File Uploaded')
            }else{
                setUploadLoading(false);
                toast.error('Please Try Again')
            }
        })
    }

    

    // Create Ticket Modal __________________________________
    const {pageNumber, status, perPageSupport} = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [loading, setLoading] = useState(true)
    const [supportData, setSupportData] = useState();
    const [totalItems, setTotalItems] = useState();
    const [reFetch, setReFetch] = useState(1)
    useEffect( () => {
        setLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/ticket/ticket-list/${userNameIdRoll[1]}?page=${pageNumber}&limit=${perPageSupport}&status=${status}`)
        .then(res => {
            setSupportData(res.data.data);
            setTotalItems(res.data.dataCount)
            console.log(res.data.data);
            setLoading(false)
        })
    },[userNameIdRoll, pageNumber, perPageSupport, status])

    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const onSubmit = async (data) => {
        try {
            const title = data.title;
            const firstText = data.text;
            const masterUserId = userNameIdRoll[1]
            const userName = userNameIdRoll[0]
            const status = 'Pending';
            const date = new Date();
            const issue = [{message: firstText, attachment, date, userName}];
            const formData = {title, issue, status, date, firstText, masterUserId, userName}
            axios.post('https://shark-app-65c5t.ondigitalocean.app/common/api/v1/ticket', formData)
            .then(res => {
                if(res.status == 200){
                    toast.success('Succesfully Created The Ticket');
                    reset();
                    setAttachment()
                    setIsModalOpen(false)
                    const r = reFetch + 1;
                    setReFetch(r)
                }
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    const [searchText, setSearchText] = useState()
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          setLoading(true);
          axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/ticket/search-ticket/${userNameIdRoll[1]}?status=${status}&search=${searchText}`)
            .then( res => {
              if(res.status == 200){
                setLoading(false);
                setSupportData(res.data.data);
                console.log(res.data.data);
              }
            })
            .catch(er => console.log(er));
        }
        setLoading(false)
    };

    const onChange = (date, dateString) => {
        setLoading(true)
        // search-by-year
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/ticket/search-by-year/${userNameIdRoll[1]}?search=${dateString}`)
        .then(res => {
            if(res.status == 200){
                setSupportData(res.data.data)
                setTotalItems(res.data.dataCount)
                setLoading(false)
            }
        })
    };

    const location = useLocation();
    const currentPath = location.pathname;

    const activeLink = (to , currentPath) => {
        return currentPath.startsWith(to)
        ? { backgroundColor: '#F1F5F9'} // Active styles
        : {};
    }

    const inputStyle ={
        height: '36px',
        border: '1px solid #E2E8F0'
    }


    const items = [
        { key: '1',label: (<a rel="noopener noreferrer" href={'/support/All/1/8'}>All</a>),},
        { key: '2',label: (<a rel="noopener noreferrer" href={'/support/Pending/1/8'}>Pending</a>),},
        { key: '4',label: (<a rel="noopener noreferrer" href={'/support/Open/1/8'}>Open</a>),},
        { key: '5',label: (<a rel="noopener noreferrer" href={'/support/Closed/1/8'}>Closed</a>),},
    ];



    return (
        <div className='md:pt-16 px-3 overflow-y-auto h-full custom-scrollbar'>
            <h3 className='font-bold text-xl text-[#252525]'>Support</h3>
            {/* <ReactTimeAgo date={dateTime}/> */}
            <div className='flex items-center justify-between py-2'>
                <input style={inputStyle} type="text" onKeyPress={handleKeyPress} onChange={e => setSearchText(e.target.value)} className='input input-sm border w-80' placeholder='Type & Enter to Search'/>
                <button onClick={showModal} className='btn btn-sm btn-neutral flex items-center bg-[#18181B] w-40 h-9'> <PlusIcon className='w-4 h-4'/> Create</button>

                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                    <h2 className='font-bold text-xl text-[#020617]'>Support Box</h2>
                    <p className='text-sm text-[#64748B]'>If you have a complaint or opinion about something, you can let us know. We will try to answer your message as soon as possible</p>
                    <div className='py-3'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <p className="text-sm text-[#020617] font-semibold pb-1 pt-2">Support Title</p>
                                <input style={inputStyle} type="text" className="input-sm w-full input" placeholder='Issue name here' {...register("title", { required: true})}/>
                                {errors.title && <span className='text-red-600 pt-2 block'>Support Title Required</span>}

                                <p className="text-sm text-[#020617] font-semibold pb-1 pt-2">Describe Issue here</p>
                                <textarea type="text" className="rounded-md w-full textarea textarea-bordered" placeholder='Type your message here' {...register("text", { required: true})}/>
                                {errors.title && <span className='text-red-600 pt-2 block'>Issue Required</span>}

                                <p className="text-sm text-[#020617] font-semibold pb-1 pt-2">Attach issue image</p>
                                <div className="flex items-center ">
                                    {
                                        upLoadLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                                    }
                                    <input type="file" id="fileInput" name='image' onChange={e => attachmentUpload(e.target.files)} />
                                </div>
                                <p className='text-sm text-slate-500'>Supported files JPG, JPEG, PDF and PNG</p>
                                <input id="fileInput" className='btn btn-sm mt-3 w-full rounded-md btn-neutral' type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </Modal>


            </div>
            <Divider/>
            <div className='pt-2 flex justify-between items-center'>
                <div className="hidden md:block">
                    <div className="h-10 px-[5px] py-1 flex items-center p-1 border rounded-md">
                        <NavLink style={() => activeLink('/support/All', currentPath)} to={'/support/All/1/8'} className="px-[12px] py-[6px] rounded text-sm font-semibold">All</NavLink>
                        <NavLink style={() => activeLink('/support/Pending', currentPath)} to={'/support/Pending/1/8'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Pending</NavLink>
                        <NavLink style={() => activeLink('/support/Open', currentPath)} to={'/support/Open/1/8'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Open</NavLink>
                        <NavLink style={() => activeLink('/support/Closed', currentPath)} to={'/support/Closed/1/8'} className="px-[12px] py-[6px] rounded text-sm font-semibold">Closed</NavLink>
                    </div>
                </div>
                {/* Mobile Div _____________________________________ */}
                <div className="block md:hidden">
                    <Dropdown
                        menu={{items}}
                        placement="bottomLeft"
                        className="h-10"
                    >
                        <Button className="text-md font-semibold flex items-center gap-2">{status} <ArrowsUpDownIcon className="w-4 h-4"/></Button>
                    </Dropdown>
                </div>
                <div>
                    <DatePicker className="" onChange={onChange} picker="year" />
                </div>
            </div>

            <div className='mt-4'>
                {
                    loading == true && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-md me-2"></span></div>
                }

                <SupportLIst data={supportData} roll={userNameIdRoll[2]}/>
                {
                    !totalItems && !loading && <Empty className="pt-8" />
                }

            </div>
        </div>
    );
};

export default SupportPage;