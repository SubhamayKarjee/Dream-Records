import { DatePicker, Divider, Steps } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import { ReleaseContext } from "./CreateMusicPage";

const ThirdStepDate = () => {

    const { 
        firstStep,
        secondStep,
        setReleaseFormData,
        setFirstStep,
        setSecondStep,
        setAudioData,
        setLyricsLanguage,
        setComposer,
        setAuthors,
        setUploadedImageLink,
        setUploadedImage,
    } = useContext(ReleaseContext);
    const { userNameIdRoll, 
        setArtist, setLabels, setFeaturing 
    } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if(!firstStep){
            navigate('/create-release')
        }
        if(firstStep && !secondStep){
            navigate('/create-release/tracks')
        }
    },[])

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

        const status = 'Pending'
        const masterUserId = userNameIdRoll[1];
        const userName = userNameIdRoll[0];
        const firstAndThird = {...firstStep, releaseDate, status, masterUserId, userName };
        const formData = []
        secondStep.map(secondStepData => {
            const combineData = {...secondStepData, ...firstAndThird}
            formData.push(combineData);
        })
        axios.post('https://shark-app-65c5t.ondigitalocean.app/api/v1/release/create-release', formData)
            .then(res => {
                if(res.status == 200){
                    setLoading(false);
                    navigate('/create-release/thenks');
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
                    setUploadedImageLink();
                    setUploadedImage();
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
                <div className="flex items-center my-5 gap-4">
                    <button onClick={() => navigate('/create-release/tracks')} className="btn btn-sm px-6 h-9">Previus</button> 
                    <div className="flex items-center justify-end">
                        {
                            loading && <span className="block loading loading-spinner loading-md me-2"></span>
                        }
                        <button className="btn btn-sm px-6 h-9 btn-neutral bg-[#18181B]" onClick={handleSubmit}>Submit</button>                       
                    </div>   
                </div>
            </div>
        </div>
    );
};

export default ThirdStepDate;