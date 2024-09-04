import { Checkbox, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const MonthlyBasedWithdraw = () => {

    const [activePaymentMonth, setActivePaymentMonth] = useState();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
      setLoading(true)
      axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/active-payment-month/66d80b32544c7126feb39661`)
        .then(res => {
          setActivePaymentMonth(res.data.data.activeMonth);
          setLoading(false)
        })
    },[])

    const options = [
        { label: 'January', value: 'January'},
        { label: 'February', value: 'February'},
        { label: 'March', value: 'March'},
        { label: 'April', value: 'April'},
        { label: 'May', value: 'May'},
        { label: 'June', value: 'June'},
        { label: 'July', value: 'July'},
        { label: 'August', value: 'August'},
        { label: 'September', value: 'September'},
        { label: 'October', value: 'October'},
        { label: 'November', value: 'November'},
        { label: 'December', value: 'December'},
    ];

    


    const onChange = (checkedValues) => {
      const value = checkedValues;
      console.log(value);
      const formData = {activeMonth: value}
      axios.put(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/active-payment-month/66d80b32544c7126feb39661`, formData)
      .then(res => console.log(res.status))
    };



    return (
        <div>
            <h2 className="font-bold text-slate-700 mb-2">Payment withdrawal Activated month</h2>
            {
              loading && <Spin/>
            }
            {
              !loading && activePaymentMonth &&
            <Checkbox.Group options={options} defaultValue={activePaymentMonth}  onChange={onChange} />
            }
        </div>
    );
};

export default MonthlyBasedWithdraw;