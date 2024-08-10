import { ArrowTrendingUpIcon, ClockIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashbardHomePage = () => {

    const navigate = useNavigate()

    const [pendingRelease, setPendingRelease] = useState();
    const [pendingReleaseLoading, setPendingReleaseLoading] = useState(false)
    // Get Release List ______________________________________________________________
    useEffect(() => {
        setPendingReleaseLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/release?status=Pending&page=1&limit=2`)
            .then( res => {
              if(res.status == 200){
                setPendingRelease(res.data.dataCount);
                setPendingReleaseLoading(false)
              }
            })
            .catch(er => console.log(er));
    }, []);

    const [pendingLabels, setPendingLabels] = useState();
    const [pendingLabelsLoading, setPendingLabelsLoading] = useState(false)
    // Get Release List ______________________________________________________________
    useEffect(() => {
        setPendingLabelsLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/labels?page=1&limit=2&status=Pending`)
            .then( res => {
              if(res.status == 200){
                setPendingLabels(res.data.dataCount);
                setPendingLabelsLoading(false)
              }
            })
            .catch(er => console.log(er));
    }, []);

    const [pendingClaim, setPendingClaim] = useState();
    const [pendingClaimLoading, setPendingClaimLoading] = useState(false)
    // Get Release List ______________________________________________________________
    useEffect(() => {
        setPendingClaimLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/claim-release/all-claim?page=1&limit=2&status=Pending`)
            .then( res => {
              if(res.status == 200){
                setPendingClaim(res.data.dataCount);
                setPendingClaimLoading(false)
              }
            })
            .catch(er => console.log(er));
    }, []);

    const [pendingSupport, setPendingSupport] = useState();
    const [pendingSupportLoading, setPendingSupportLoading] = useState(false)
    // Get Release List ______________________________________________________________
    useEffect(() => {
        setPendingSupportLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/support/chat-support-list?page=1&limit=2&status=Pending`)
            .then( res => {
              if(res.status == 200){
                const chatCount = res.data.dataCount;
                setPendingSupportLoading(false)
                axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/support/call-support-list?page=1&limit=2&status=Pending`)
                    .then( res => {
                    if(res.status == 200){
                        const total = parseInt(chatCount) + res.data.dataCount
                        setPendingSupport(total);
                        setPendingSupportLoading(false)
                    }
                    })
                    .catch(er => console.log(er));
                    }
            })
            .catch(er => console.log(er));
        
    }, []);

    const [pendingWithdrawalReq, setPendingWithdrawalReq] = useState();
    const [pendingWithdrawalReqLoading, setPendingWithdrawalReqLoading] = useState(false)
    // Get Release List ______________________________________________________________
    useEffect(() => {
        setPendingWithdrawalReqLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/admin/withdrawal/req-list?page=1&limit=2&status=Pending`)
            .then( res => {
              if(res.status == 200){
                setPendingWithdrawalReq(res.data.dataCount);
                setPendingWithdrawalReqLoading(false)
              }
            })
            .catch(er => console.log(er));
    }, []);


    return (
        <div className="h-full">
            <div className="p-2 bg-green-200 my-2 flex items-center">
                <ArrowTrendingUpIcon className='font-extrabold w-8 h-8 me-2'/>
                <h1 className="text-2xl font-extrabold ">Dream Record Admin Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-3 my-4">
                <div style={{cursor: 'pointer'}} onClick={() => navigate('/admin-dashboard/release/1/8/Pending')} className="p-2 rounded-md shadow border">
                    <h2 className="font-extrabold text-2xl text-slate-500">Release</h2>
                    <p className="text-sm text-slate-500 flex items-center"><ClockIcon className="h-4 w-4 me-1"/>Pending</p>
                    {
                        pendingReleaseLoading === true ? <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-sm me-2"></span></div> :
                        <p className="font-extrabold text-xl border rounded-md px-2 bg-green-100">{pendingRelease}</p>
                    }
                </div>
                <div style={{cursor: 'pointer'}} onClick={() => navigate('/admin-dashboard/labels')} className="p-2 rounded-md shadow border">
                    <h2 className="font-extrabold text-2xl text-slate-500">Labels</h2>
                    <p className="text-sm text-slate-500 flex items-center"><ClockIcon className="h-4 w-4 me-1"/>Pending</p>
                    {
                        pendingLabelsLoading === true ? <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-sm me-2"></span></div> :
                        <p className="font-extrabold text-xl border rounded-md px-2 bg-green-100">{pendingLabels}</p>
                    }
                </div>
                <div style={{cursor: 'pointer'}} onClick={() => navigate('/admin-dashboard/claim-release')} className="p-2 rounded-md shadow border">
                    <h2 className="font-extrabold text-2xl text-slate-500">Rights manager</h2>
                    <p className="text-sm text-slate-500 flex items-center"><ClockIcon className="h-4 w-4 me-1"/>Pending</p>
                    {
                        pendingClaimLoading === true ? <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-sm me-2"></span></div> :
                        <p className="font-extrabold text-xl border rounded-md px-2 bg-green-100">{pendingClaim}</p>
                    }
                </div>
                <div style={{cursor: 'pointer'}} onClick={() => navigate('/admin-dashboard/support')} className="p-2 rounded-md shadow border">
                    <h2 className="font-extrabold text-2xl text-slate-500">Support</h2>
                    <p className="text-sm text-slate-500 flex items-center"><ClockIcon className="h-4 w-4 me-1"/>Pending</p>
                    {
                        pendingSupportLoading === true ? <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-sm me-2"></span></div> :
                        <p className="font-extrabold text-xl border rounded-md px-2 bg-green-100">{pendingSupport}</p>
                    }
                </div>
                <div style={{cursor: 'pointer'}} onClick={() => navigate('/admin-dashboard/withdrawal-request')} className="p-2 rounded-md shadow border">
                    <h2 className="font-extrabold text-2xl text-slate-500">Withdrawal Request</h2>
                    <p className="text-sm text-slate-500 flex items-center"><ClockIcon className="h-4 w-4 me-1"/>Pending</p>
                    {
                        pendingWithdrawalReqLoading === true ? <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-sm me-2"></span></div> :
                        <p className="font-extrabold text-xl border rounded-md px-2 bg-green-100">{pendingWithdrawalReq}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default DashbardHomePage;