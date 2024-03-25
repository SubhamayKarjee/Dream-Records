import { Result } from "antd";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const SendPaymentsFormDreamRecord = ({id}) => {

    const [successHandle, setSuccessHandle] = useState(false)
    const [payAmmount, setPayAmmount] = useState(0);
    const [payAmmountError, setPayAmmountError] = useState();
    const [payLoading, setPayLoading] = useState(false)
    const paymentSend = (id) => {
      setPayAmmountError('');
      setPayLoading(true)
      if(!payAmmount){
        setPayAmmountError('Please Add Ammount');
        return
      }
      const now = new Date();
      const date = now.getDate().toLocaleString();
      const month = now.toLocaleString('default', { month: 'long' });
      const year = now.getFullYear();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true });

      axios.get(`http://localhost:5000/admin/api/v1/users/${id}`)
      .then(res => {
        if(res.status === 200){
          const preData = res.data.data;
          if(preData.balance){
            const preAmmount = preData.balance.ammount;
            const newAmmount = parseInt(preAmmount) + parseInt(payAmmount);
            const newData = {...preData, balance:{ammount: newAmmount, year: year, month: month, time: time, date: date,}}
            axios.put(`http://localhost:5000/api/v1/users/${id}`, newData)
            .then(res => {
              if(res.status === 200){
                const formData = {ammount: payAmmount, date, time, month, year, masterUserId: id }
                axios.post(`http://localhost:5000/common/api/v1/payment`, formData)
                .then(res => {
                  if(res.status === 200){
                    toast.success('Successfully paid')
                    console.log(res.data.data);
                    setPayLoading(false)
                    setSuccessHandle(true)
                  }
                })
              }
            })
          }else{
            const newData = {...preData, balance:{ammount: payAmmount, year: year, month: month, time: time, date: date,}}
            axios.put(`http://localhost:5000/api/v1/users/${id}`, newData)
            .then(res => {
              if(res.status === 200){
                const formData = {ammount: payAmmount, date, time, month, year, masterUserId: id }
                axios.post(`http://localhost:5000/common/api/v1/payment`, formData)
                .then(res => {
                  if(res.status === 200){
                    toast.success('Successfully paid')
                    console.log(res.data.data);
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
                        <p className="text-sm font-semibold ms-2 text-slate-500">Ammount</p>
                        <div className="flex justify-between items-center">
                            <div>
                            <input onChange={(e) => setPayAmmount(e.target.value)} type="number" className="border rounded-lg py-1 px-2"/>
                            {payAmmountError && <span className='text-red-600 pt-2 block'>{payAmmountError}</span>}
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