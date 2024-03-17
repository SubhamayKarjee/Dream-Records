import { DatePicker } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import { ReleaseContext } from "./CreateMusicPage";

const ThirdStepDate = () => {
    const [releaseFormDataError, setReleaseFormDataError] = useState('')
    const { 
        releaseFormData,
        setReleaseFormData,
        setFirstStep,
        setSecondStep,
        setAudioData,
        setLyricsLanguage,
        setComposer,
        setAuthors,
    } = useContext(ReleaseContext);
    const { userNameIdRoll, setArtist, setLabels, setFeaturing } = useContext(AuthContext);

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
        setArtist();
        setLabels();
        setFeaturing(); 
        setReleaseFormData();
        setFirstStep();
        setSecondStep();
        setAudioData();
        setLyricsLanguage();
        setComposer();
        setAuthors();

        setLoading(true)
        setError('')
        if(!releaseDate){
            setError('Release Date Required')
            setLoading(false)
            return
        }
        if(!releaseFormData){
            setReleaseFormDataError('Please go back to First Step to Fill Properly Then you can able submit Release');
            setLoading(false)
            return;
        }
        const status = 'Pending'
        const masterUserId = userNameIdRoll[1]
        const data = {...releaseFormData, releaseDate, status, masterUserId }
        axios.post('http://localhost:5000/api/v1/release/create-release', data)
            .then(res => {
                if(res.status == 200){
                    setLoading(false);
                    navigate('/create-release/thenks')
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
                <div className="flex items-center my-3">
                    <button onClick={() => navigate('/create-release/tracks')} className="btn btn-sm px-6 btn-neutral rounded-full me-2">Previus</button> 
                    <div className="flex items-center justify-end">
                        {
                            loading && <span className="block loading loading-spinner loading-md me-2"></span>
                        }
                        <button className="btn btn-sm btn-info rounded-full px-4" onClick={handleSubmit}>Submit</button>                       
                    </div>   
                </div>
            </div>
        </div>
    );
};

export default ThirdStepDate;