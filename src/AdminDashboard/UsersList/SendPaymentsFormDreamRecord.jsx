import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import { Result } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
const SendPaymentsFormDreamRecord = ({id, isOpenModalPayment, clickIdPayment}) => {


    const [successHandle, setSuccessHandle] = useState(false)
    const [payAmount, setPayAmount] = useState(0);
    const [payAmountError, setPayAmountError] = useState();
    const [paymentReportDate, setPaymentReportDate] = useState();
    const [paymentReportDateErr, setPaymentReportDateErr] = useState('');
    const [payLoading, setPayLoading] = useState(false);

    const [paymentHistory, setPaymentHistory] = useState([])
    useEffect(() => {
      if (isOpenModalPayment && id == clickIdPayment) {
        const fetchPaymentData = async () => {
          try {
            axios.get(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment/${id}?page=${1}&limit=${3}`)
            .then(res => {
                setPaymentHistory(res.data.data);
            })
          } catch (error) {
            console.error('Error fetching payment data:', error);
          }
        };
  
        fetchPaymentData();
      }
    }, [id, isOpenModalPayment, clickIdPayment]);


    const paymentSend = (id) => {
      setPayAmountError('');
      setPayLoading(true)
      if(!payAmount){
        setPayAmountError('Please Add Ammount');
        return
      }
      if(!paymentReportDate){
        setPaymentReportDateErr('Please Select Date');
        return;
      }
      const date = new Date().toISOString();

      axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/users/${id}`)
      .then(res => {
        if(res.status === 200){
          const preData = res.data.data;
          if(preData.balance){
            const preAmount = preData.balance.amount;
            const newAmount = parseInt(preAmount) + parseInt(payAmount);
            const newData = {...preData, balance:{amount: parseInt(newAmount), isoDate: date,}}
            axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${id}`, newData)
            .then(res => {
              if(res.status === 200){
                const formData = {amount: parseInt(payAmount), isoDate: date, masterUserId: id, paymentReportDate }
                axios.post(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment`, formData)
                .then(res => {
                  if(res.status === 200){
                    setPayLoading(false)
                    setSuccessHandle(true)
                  }
                })
              }
            })
          }else{
            const newData = {...preData, balance:{amount: parseInt(payAmount), isoDate: date}}
            axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${id}`, newData)
            .then(res => {
              if(res.status === 200){
                const formData = {amount: parseInt(payAmount), isoDate: date, masterUserId: id, paymentReportDate }
                axios.post(`https://shark-app-65c5t.ondigitalocean.app/common/api/v1/payment`, formData)
                .then(res => {
                  if(res.status === 200){
                    setPayLoading(false)
                    setSuccessHandle(true)
                  }
                })
              }
            })
          }
        }
      })
    }


    return (
        <div>
            {
                successHandle === false &&
                <div>
                    <h3 className="font-bold text-lg">Payments!</h3>
                    <div className="py-2 px-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-semibold ms-2 text-slate-500">Last 3 Month Payments</p>
                          <div className="p-2 bg-gradient-to-r from-slate-100 to-slate-50 rounded-md mb-2 shadow">
                            {
                              paymentHistory && paymentHistory.map((data) => 
                                  <p key={data._id} className="text-base flex items-center subpixel-antialiased">Payment Based on <span className="font-bold px-2">{data.paymentReportDate}</span><span className="font-medium flex items-center subpixel-antialiased"><CurrencyRupeeIcon className="w-4 h-4 mx-2"/> {data.amount}.00</span></p>
                              )
                            }
                            {
                              paymentHistory.length === 0 && <p className="text-center">No payment History</p>
                            }
                          </div>
                        </div>
                        <p className="text-sm font-semibold ms-2 text-slate-500">Ammount</p>
                        <div className="flex justify-between items-end">
                            <div>
                              <input onChange={(e) => setPayAmount(e.target.value)} type="number" className="border rounded-lg py-1 px-2"/>
                              {payAmountError && <span className='text-red-600 pt-2 block'>{payAmountError}</span>}
                              <div>
                                <p className="text-sm font-bold mt-2 ms-2 text-slate-500">Payment Report Date</p>
                                <input type="date" onChange={e => {
                                    const inputValue = e.target.value.slice(0, 7); // Get "YYYY-MM" format
                                    const [year, month] = inputValue.split('-'); 
                                    const date = new Date(year, month - 1); // Create a Date object
                                    const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(date);
                                    setPaymentReportDate(formattedDate); // Set the formatted date
                                }} className="border rounded-full px-2 py-1" />
                                {paymentReportDateErr && <p className="font-bold text-sm text-red-500">{paymentReportDateErr}</p>}
                              </div>
                            </div>
                            <div className="flex items-center">
                            {
                                payLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                            }
                            <button onClick={() => paymentSend(id)} className="btn btn-sm btn-neutral">Send</button> 
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
                        title="Successfully Send Payments!"
                        subTitle=""
                        extra={[]}
                    />
                </div>
            }
        </div>
    );
};

export default SendPaymentsFormDreamRecord;