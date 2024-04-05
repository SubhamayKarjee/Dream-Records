import { Select, Tabs } from 'antd';
import axios from 'axios';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
import supportIcon from '../../assets/support-icon/support.png'
import { AuthContext } from '../UserAdminHomePage/UserAdminHomePage';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ChartSupport from './ChartSupport';
import CallSupport from './CallSupport';



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
            axios.delete(`http://localhost:5000/common/api/v1/support/delete-file?key=${attachment.key}`)
        }
        axios.post(`http://localhost:5000/common/api/v1/support/upload-file`, formData)
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
        axios.post(`http://localhost:5000/common/api/v1/support`, data)
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
        axios.post(`http://localhost:5000/common/api/v1/support/call-support`, data)
        .then(res => {
            if(res.status === 200){
                setCallReqLoading(false);
                setValue('')
                toast.success('Your Request Submited!')
            }
        })
    }


    return (
        <div className='overflow-y-auto h-full'>
            <div className='flex items-center mt-2 p-2 rounded-md bg-green-100'>
                <img className='me-2' src={supportIcon} alt={supportIcon} />
                <h1 className='font-semibold text-xl text-slate-500'>Support</h1>
            </div>
            <p className='text-sm text-slate-500 px-2 mt-1'>If you have a complaint or opinion about something, you can let us know. We will try to answer your message as soon as possible</p>
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