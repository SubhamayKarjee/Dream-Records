import { DatePicker, Divider, Spin, Steps } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EditReleaseContext } from "./EditReleaseMainPage";


const EditReleaseThirdStep = () => {

    const [releaseFormDataError, setReleaseFormDataError] = useState('')
    const { releaseFormData, releaseId, setReleaseFormData } = useContext(EditReleaseContext);

    const navigate = useNavigate()

    const [releaseDate, setReleaseDate] = useState(null);
    const [error, setError] = useState('')

    const disabledDate = (current) => {
        const today = new Date();
        return current && current < today.setHours(0, 0, 0, 0);
    };
    const onChange = (date, dateString) => {
        setReleaseDate(dateString)
    };

    const [loading, setLoading] = useState(false)
    const handleSubmit = () => {
        setLoading(true)
        setError('')
        if(!releaseDate){
            setError('Release Date Required')
            setLoading(false)
            return
        }
        if(!releaseFormData){
            setReleaseFormDataError("Please go back to First Step and Edit properly and don't Reload the page when you edit");
            setLoading(false)
            return;
        }
        const actionRequired = '';
        const status = 'ReSubmitted'
        const data = {...releaseFormData, releaseDate, status, actionRequired }
        axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/update-release/${releaseId}`, data)
            .then(res => {
                if(res.status == 200){
                    setLoading(false);
                    setReleaseFormData('')
                    navigate('/releases/edit/thanks')
                }
            })
            .catch(er => console.log(er))        
    }

    const steps = [
        {title: 'Basic'},
        {title: 'Tracks'},
        {title: 'Date'},
    ];

    return (
        <div>
            <div className="px-3">
                <Steps current={2} items={steps} /> 
            </div>

            <div className="pt-4">
                <p className="text-lg font-semibold">Pick a Release Date</p>
                <p className="text-sm text-[#71717A]">Choose your preferred Track Release Date</p>
            </div>
            <Divider/>

            <div className="p-3 my-6">
                <DatePicker style={{minWidth: '208px'}} onChange={onChange} disabledDate={disabledDate}/>
                {
                    error && <p className="text-red-500">{error}</p>
                }
                {
                    releaseFormDataError && <p className="text-red-500">{releaseFormDataError}</p>
                }
                <div className="flex items-center gap-4 my-5">
                    <button onClick={() => navigate('/releases/edit/second-step')} className="btn btn-sm px-6 h-9">Previus</button> 
                    <div>
                        {
                            loading && <Spin size="small" className="me-2"/>
                        }
                        <button className="btn btn-sm px-6 h-9 btn-neutral bg-[#18181B]" onClick={handleSubmit}>Submit</button>                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditReleaseThirdStep;