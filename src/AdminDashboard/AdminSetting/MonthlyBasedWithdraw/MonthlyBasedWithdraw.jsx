import { Checkbox } from "antd";

const MonthlyBasedWithdraw = () => {

    const options = [
        { label: 'January', value: 0,},
        { label: 'February', value: 1,},
        { label: 'March', value: 2,},
        { label: 'April', value: 3,},
        { label: 'May', value: 4,},
        { label: 'June', value: 5,},
        { label: 'July', value: 6,},
        { label: 'August', value: 7,},
        { label: 'September', value: 8,},
        { label: 'October', value: 9,},
        { label: 'November', value: 10,},
        { label: 'December', value: 11,},
    ];

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };



    return (
        <div>
            <h2 className="font-bold text-slate-700 mb-2">Payment withdrawal Activated month</h2>
            <Checkbox.Group options={options} defaultValue={[3]} onChange={onChange} />
        </div>
    );
};

export default MonthlyBasedWithdraw;