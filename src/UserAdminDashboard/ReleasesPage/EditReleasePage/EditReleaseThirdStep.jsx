import { DatePicker, Divider, Spin, Steps } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EditReleaseContext } from "./EditReleaseMainPage";
import { AuthContext } from "../../UserAdminHomePage/UserAdminHomePage";


const EditReleaseThirdStep = () => {

    const [ releaseSubmitError, setReleaseSubmitError] = useState('')
    const { releaseId, preReleaseData, firstStep, secondStep, format } = useContext(EditReleaseContext);
    const { 
        setArtist, 
        setLabels, 
        setFeaturing,
        setAuthors,
        setComposer,
    } = useContext(AuthContext);

    const navigate = useNavigate()

    const [releaseDate, setReleaseDate] = useState(null);
    const [error, setError] = useState('');

    useEffect( () => {
        if(!preReleaseData){
            navigate(`/releases/All/1/6`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
        if(!firstStep){
            setReleaseSubmitError("Please go back to First Step and Edit properly and don't Reload the page when you edit");
            setLoading(false)
            return;
        }
        if(!secondStep){
            setReleaseSubmitError("Please go back to Second Step and Edit properly and don't Reload the page when you edit");
            setLoading(false)
            return;
        }
        const actionRequired = '';
        const status = 'ReSubmitted';
        const date = new Date().toISOString();
        const data = {...firstStep, format, tracks: secondStep, releaseDate, status, actionRequired, reSubmittedDate: date };
        // setArtist([])
        // setLabels([])
        // setFeaturing([])
        // setAuthors([])
        // setComposer([])
        // console.log(data);
        axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/update-release/${releaseId}`, data)
            .then(res => {
                if(res.status == 200){
                    setLoading(false);
                    setArtist([])
                    setLabels([])
                    setFeaturing([])
                    setAuthors([])
                    setComposer([])
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
                    releaseSubmitError && <p className="text-red-500">{releaseSubmitError}</p>
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