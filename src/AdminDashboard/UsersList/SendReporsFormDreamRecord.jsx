/* eslint-disable react/prop-types */
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { Result } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SendReporsFormDreamRecord = ({id, isOpenModalReport, clickIdReport}) => {

    const [successHandle, setSuccessHandle] = useState(false);

    const [reportFile, setReportFile] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [upLoadLoading, setUploadLoading] = useState(false);

    // Get Report History __________________________________
    const [reportHistory, setReportHistory] = useState([])
    useEffect(() => {
      if (isOpenModalReport && id == clickIdReport) {
        const fetchPaymentData = async () => {
          try {
            axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/reports/${id}?page=${1}&limit=${3}`)
            .then(res => {
                setReportHistory(res.data.data);
            })
          } catch (error) {
            console.error('Error fetching payment data:', error);
          }
        };
  
        fetchPaymentData();
      }
    }, [id, isOpenModalReport, clickIdReport]);

    const analyticsReportsUpload = (e) => {
        setUploadLoading(true)
        const file = e[0];
        const formData = new FormData();
        formData.append('file', file);
        if(reportFile){
            axios.delete(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/reports/delete-file?key=${reportFile.key}`)
        }
        axios.post(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/reports/upload-file`, formData)
        .then(res => {
            setUploadLoading(false);
            setReportFile(res.data.data)
            toast.success('File Uploaded')
        })
    }


    const [reportDate, setReportDate] = useState();
    const [reportDateErr, setReportDateErr] = useState('');
    const [sendLoading, setSendLoading] = useState(false)

    const handleSendReport = () => {
        setErrorMessage('');
        setReportDateErr('');
        setSendLoading(true)
        if(!reportFile){
            setErrorMessage('Please Select File');
            return;
        }
        if(!reportDate){
            setReportDateErr('Please Select Date');
            return;
        }
        const now = new Date();
        const date = now.getDate().toLocaleString();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true });
        const data = {...reportFile, reportDate, masterUserId: id, date, time, month, year}
        axios.post('https://shark-app-65c5t.ondigitalocean.app/common/api/v1/reports', data)
        .then(res => {
            if(res.status === 200){
                setSendLoading(false);
                setSuccessHandle(true);
            }
        })
    }


    return (
        <div>
            {
                successHandle === false && 
                <div>
                    <h3 className="font-bold text-lg">Send Analytics Reports!</h3>
                    <div className="p-2 border rounded-lg">
                    <div>
                          <p className="text-sm font-semibold ms-2 text-slate-500">Last 3 Month Reports</p>
                          <div className="p-2 bg-gradient-to-r from-slate-100 to-slate-50 rounded-md mb-2 shadow">
                            {
                              reportHistory && reportHistory.map((data) => <div key={data._id} className='flex items-center justify-between'>
                                    <p key={data._id} className="text-base flex items-center subpixel-antialiased me-2">Report Based on {data.date} {data.month} {data.year}</p>
                                    <a className="px-2 bg-white border rounded-md flex items-center font-bold text-sm" href={data.fileUdatal} download={data.fileUrl}><ArrowDownTrayIcon className="w-4 h-4 me-2"/> Download</a>
                                </div>
                              )
                            }
                            {
                              reportHistory.length === 0 && <p className="text-center">No payment History</p>
                            }
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 mb-1 font-bold">Select File</p>
                        <div className="flex items-center ">
                            {
                                upLoadLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                            }
                            <input type="file" accept=".xls, .xlsx" id="fileInput" name='image' onChange={e => analyticsReportsUpload(e.target.files)} />
                        </div>
                        {errorMessage && <p className="font-bold text-sm text-red-500">{errorMessage}</p>}
                    </div>
                    <div className="p-2">
                        <p className="text-sm text-slate-500 mt-3 font-bold">Analytics Reports Date</p>
                        <div className="flex items-center justify-between">
                            <div>
                                <input type="date" onChange={e => setReportDate(e.target.value.slice(0,7))} className="border rounded-full px-2 py-1" />
                                {reportDateErr && <p className="font-bold text-sm text-red-500">{reportDateErr}</p>}
                            </div>
                            <div className="flex items-center">
                                {
                                    sendLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                                }
                                <button onClick={handleSendReport} className="btn btn-sm px-5 btn-neutral rounded-full">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                successHandle === true && 
                <div>
                    <Result
                        status="success"
                        title="Successfully Send Reports!"
                        subTitle=""
                        extra={[]}
                    />
                </div>
            }
        </div>
    );
};

export default SendReporsFormDreamRecord;