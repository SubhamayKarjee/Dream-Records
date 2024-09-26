import { DatePicker, Divider, Modal, Select, Tabs } from 'antd';
import axios from 'axios';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../UserAdminHomePage/UserAdminHomePage';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ChartSupport from './ChartSupport';
import CallSupport from './CallSupport';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import './SupportPage.css'



const SupportPage = () => {

    const {userNameIdRoll} = useContext(AuthContext);
    // const navigate = useNavigate()

    const [attachment, setAttachment] = useState();
    const [upLoadLoading, setUploadLoading] = useState(false);

    const attachmentUpload = (e) => {
        setUploadLoading(true)
        const file = e[0];
        const formData = new FormData();
        formData.append('file', file);
        if(attachment){
            axios.delete(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/support/delete-file?key=${attachment.key}`)
        }
        axios.post(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/support/upload-file`, formData)
        .then(res => {
            setUploadLoading(false);
            setAttachment(res.data.data)
            toast.success('File Uploaded')
        })
    }



    const [supportText, setSupportText] = useState();
    const [supportTextErr, setSupportTextErr] = useState();
    const [supportSendLoading, setSupportSendLoading] = useState(false);
    

    const handleSupportFormSend = () => {
        setSupportSendLoading(true)
        setSupportTextErr('');
        if(!supportText){
            setSupportTextErr('Support Text Required');
            return;
        }
        const now = new Date();
        const date = now.getDate().toLocaleString();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true });

        const masterUserId = userNameIdRoll[1]
        const userName = userNameIdRoll[0]
        const status = 'Pending'
        const data = {supportText, masterUserId, date, month, year, time, userName, status, attachment}
        axios.post(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/support`, data)
        .then(res => {
            if(res.status === 200){
                document.getElementById('text_box').value = ''
                setSupportSendLoading(false)
                toast.success('Your Request Submited!')
            }
        })
    }

    const items = [
        {
          key: '1',
          label: 'Chat Support',
          children: <ChartSupport id={userNameIdRoll[1]}/>,
        },
        {
          key: '2',
          label: 'Call Support',
          children: <CallSupport id={userNameIdRoll[1]}/>,
        },
    ];


    // Select Category_____________________________________________
    const [category, setCategory] = useState();
    const [categoryErr, setCategoryErr] = useState('')
    const selectCategory = (value) => {
        setCategory(value)
    }    
    
    // Handle Lyrics Language Select Input _________________________
    const [language, setLanguage] = useState();
    const [languageErr, setLanguageErr] = useState('')
    const selectLanguage = (value) => {
        setLanguage(value)
    };

    // Phone Number Input ___________________________________________
    const [value, setValue] = useState();
    const [valueErr, setValueErr] = useState('')

    const [callReqLoading, setCallReqLoading] = useState(false)
    const handlePhoneCallRequest = () => {
        setLanguageErr('')
        setCategoryErr('')
        setValueErr('')
        setCallReqLoading(true)
        if(!category){
            setCategoryErr('Please Select Category')
            return;
        }
        if(!language){
            setLanguageErr('Please Select Language')
            return;
        }
        if(!value){
            setValueErr('Please Enter your Phone number')
        }
        const now = new Date();
        const date = now.getDate().toLocaleString();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true });

        const masterUserId = userNameIdRoll[1]
        const userName = userNameIdRoll[0]
        const status = 'Pending'
        const data = {category, language, phoneNumber: value, masterUserId, date, month, year, time, userName, status}
        axios.post(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/support/call-support`, data)
        .then(res => {
            if(res.status === 200){
                setCallReqLoading(false);
                setValue('')
                toast.success('Your Request Submited!')
            }
        })
    }

    const inputStyle ={
        height: '36px',
        border: '1px solid #E2E8F0'
    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };


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

    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = async (data) => {

        try {
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        
    }


    return (
        <div className='md:pt-16 p-2 overflow-y-auto h-full custom-scrollbar'>
            <h3 className='font-bold text-xl text-[#252525]'>Support</h3>
            <div className='flex items-center justify-between py-2'>
                <input style={inputStyle} type="text" className='input input-sm border w-80' placeholder='Type & Enter to Search'/>
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
            <Divider className='my-2'/>
            <div className='pt-2 flex justify-between items-center'>
                <div className='h-10 px-[5px] py-1 flex items-center p-1 border rounded-md'>
                    <button className='bg-[#F1F5F9] px-[12px] py-[6px] rounded text-sm font-semibold'>All</button>
                    <button className='px-[12px] py-[6px] rounded text-sm font-semibold'>Pending</button>
                    <button className='px-[12px] py-[6px] rounded text-sm font-semibold'>Solved</button>
                </div>
                <div>
                    <DatePicker className="" onChange={onChange} picker="year" />
                </div>
            </div>

            <div className='mt-2'>
                <div className="p-2">
                    <div className='border rounded-lg p-3 mb-3'>
                        <h4 className='font-bold text-[#252525]'>title</h4>
                        <p className='text-[#252525]'>text Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam unde corrupti maiores perspiciatis vero dolores.</p>
                    </div>
                    <div className='border rounded-lg p-3 mb-3'>
                        <h4 className='font-bold text-[#252525]'>title</h4>
                        <p className='text-[#252525]'>text Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam unde corrupti maiores perspiciatis vero dolores.</p>
                    </div>
                    <div className='border rounded-lg p-3 mb-3'>
                        <h4 className='font-bold text-[#252525]'>title</h4>
                        <p className='text-[#252525]'>text Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam unde corrupti maiores perspiciatis vero dolores.</p>
                    </div>
                </div>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />

            <div className='my-3 p-3 md:p-4 border rounded-lg md:flex justify-between'>
                <div className='flex-1 m-2'>
                    <p className='font-bold text-sm text-slate-500 mb-2'>Support Box</p>
                    <textarea id='text_box' onChange={e => setSupportText(e.target.value)} className="textarea textarea-bordered w-full md:h-40" placeholder="If you have a complaint or opinion about something. Please write here!"></textarea>
                    {
                        supportTextErr && <p className='text-sm text-red-500 mb-2'>{supportTextErr}</p>
                    }
                    <p className='font-bold text-sm text-slate-500 mb-2'>Attachment</p>
                    <div className="flex items-center ">
                        {
                            upLoadLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                        }
                        <input type="file" id="fileInput" name='image' onChange={e => attachmentUpload(e.target.files)} />
                    </div>
                    {/* {errorMessage && <p className="font-bold text-sm text-red-500">{errorMessage}</p>} */}
                    <div className='flex items-center mt-2'>
                        {
                            supportSendLoading && <span className="loading loading-spinner loading-md me-2"></span>
                        }
                        <button onClick={handleSupportFormSend} className='btn btn-sm rounded-full bg-info px-4'>Submit</button>
                    </div>
                </div>
                <div className='flex-1 m-2 p-2 bg-slate-200 rounded-md'>
                    <div>
                        <h2 className='font-bold text-slate-500 border-b'>Phone Call Request</h2>

                        <p className="mt-3 text-sm font-semibold text-slate-500">Select Category <span className="text-red-500">*</span></p>
                        <Select
                            showSearch
                            className="w-full rounded-full"
                            placeholder="Select Category"
                            onChange={selectCategory}
                            options={[
                                {value: 'Release',label: 'Release',},
                                {value: 'Artist',label: 'Artist',},
                                {value: 'Labels',label: 'Labels',},
                                {value: 'Analytics',label: 'Analytics',},
                                {value: 'Wallet',label: 'Wallet',},
                                {value: 'Account',label: 'Account',},
                            ]}
                        />
                        {categoryErr && <span className='text-red-600 pt-2 block'>{categoryErr}</span>}

                        <p className="mt-3 text-sm font-semibold text-slate-500">Select language <span className="text-red-500">*</span></p>
                        <Select
                            showSearch
                            className="w-full rounded-full"
                            placeholder="Select Language"
                            onChange={selectLanguage}
                            options={[
                                {value: 'Bangla',label: 'Bangla',},
                                {value: 'Hindi',label: 'Hindi',},
                            ]}
                        />
                        {languageErr && <span className='text-red-600 pt-2 block'>{languageErr}</span>}

                        <p className="mt-3 text-sm font-semibold text-slate-500">Please Enter Phone Number <span className="text-red-500">*</span></p>
                        <PhoneInput
                            placeholder="Enter phone number"
                            className='mb-3'
                            value={value}
                            onChange={setValue}
                            defaultCountry="IN"
                        />
                        {valueErr && <span className='text-red-600 pt-2 block'>{valueErr}</span>}

                        <div className='flex items-center'>
                            {
                                callReqLoading && <span className="loading loading-spinner loading-md me-2"></span>
                            }
                            <button onClick={handlePhoneCallRequest} className='btn btn-sm rounded-full px-4 btn-info'>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-2'>
                <h2 className='text-slate-500 font-semibold'>Support History...</h2>
                <Tabs defaultActiveKey="1" items={items} />
            </div>
        </div>
    );
};

export default SupportPage;