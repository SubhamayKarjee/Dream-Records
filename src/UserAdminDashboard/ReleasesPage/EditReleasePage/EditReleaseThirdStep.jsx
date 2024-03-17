import { DatePicker, Spin } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../UserAdminHomePage/UserAdminHomePage";
import { EditReleaseContext } from "./EditReleaseMainPage";


const EditReleaseThirdStep = () => {

    const [releaseFormDataError, setReleaseFormDataError] = useState('')
    const { releaseFormData, releaseId, setReleaseFormData } = useContext(EditReleaseContext);
    const { userNameIdRoll } = useContext(AuthContext);

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
        const status = 'Pending'
        const masterUserId = userNameIdRoll[1]
        const data = {...releaseFormData, releaseDate, status, masterUserId }
        axios.put(`http://localhost:5000/api/v1/release/update-release/${releaseId}`, data)
            .then(res => {
                if(res.status == 200){
                    setLoading(false);
                    setReleaseFormData('')
                    navigate('/releases/edit/thanks')
                }
            })
            .catch(er => console.log(er))        
    }

    return (
        <div>
            <ul style={{width: '100%'}} className="steps">
                <li data-content="✓" className="step step-info font-bold">Basic</li>
                <li  data-content="✓" className="step step-info font-bold">Tracks</li>
                <li  data-content="✓" className="step step-info font-bold">date</li>
            </ul>

            <div className="p-3 my-6">
                <p className="mt-3 text-sm font-semibold text-slate-500">Release Date <span className="text-red-500">*</span></p>
                <DatePicker onChange={onChange} disabledDate={disabledDate}/>
                {
                    error && <p className="text-red-500">{error}</p>
                }
                {
                    releaseFormDataError && <p className="text-red-500">{releaseFormDataError}</p>
                }
                <div className="flex items-center my-3 justify-between">
                    <button onClick={() => navigate('/releases/edit/second-step')} className="btn btn-sm px-6 btn-neutral rounded-full me-2">Previus</button> 
                    <div>
                        {
                            loading && <Spin size="small" className="me-2"/>
                        }
                        <button className="btn btn-sm btn-info rounded-full px-4" onClick={handleSubmit}>Submit</button>                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditReleaseThirdStep;