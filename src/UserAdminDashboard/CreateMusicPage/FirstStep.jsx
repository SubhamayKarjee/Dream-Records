import { Image } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import fallbackImage from '../../assets/fallbackImage.jpg'
import { ReleaseContext } from "./CreateMusicPage";

const FirstStep = () => {

    const { setReleaseFormData } = useContext(ReleaseContext);

    const navigate = useNavigate('')


    const [errorMessage, setErrorMessage] = useState('');
    const [upLoadLoading, setUploadLoading] = useState(false);
    // const [submitLoading, setSubmitLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState('');
    const [uploadedImageLink, setUploadedImageLink] = useState('');

    const releaseImageUpload = (e) => {
        setUploadLoading(true)
        const file = e[0];
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
  
        // Check image size ___________________________________
        if (file.size > 1000000) {
            setErrorMessage('Image size must be less than 1 MB.');
            setUploadLoading(false)
            return;
        }
  
        axios.post('http://localhost:5000/api/v1/release/upload-release-img', formData)
            .then(res => {
                if(res.status == 200){
                  setUploadedImageLink(res.data.data.imgUrl);
                  setUploadedImage(res.data.data)
                  setUploadLoading(false)
                }
            })
            .catch(er => console.log(er))
    }



   

    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        const formData = {...data, ...uploadedImage};
        setReleaseFormData(formData)
        console.log(formData);
        navigate('/create-music/tracks')
    };


    return (
        <div>
            <ul style={{width: '100%'}} className="steps">
                <li className="step step-info font-bold">Basic</li>
                <li data-content="2" className="step font-bold">Tracks</li>
                <li data-content="●" className="step font-bold">Done</li>
            </ul>
            <div className="py-3">
                <h2 className="text-lg font-semibold text-slate-500 px-2">Besic of Track</h2>
                <div className="border rounded-lg p-2">

                    <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Artwork <span className="text-red-500">*</span></p>
                    <Image
                        width={105}
                        height={105}
                        className="rounded-lg"
                        src={uploadedImageLink}
                        fallback={fallbackImage}
                        preview={false}
                        alt="artist-image"
                    />
                    <div className="flex items-center ">
                        {
                            upLoadLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                        }
                        <input type="file" accept=".jpeg" id="fileInput" name='image' onChange={e => releaseImageUpload(e.target.files)} />
                    </div>
                    {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-3 border mt-2 rounded-lg">
                    <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Release Title <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("releaseTitle", { required: true})}/>
                    {errors.releaseTitle && <span className='text-red-600 pt-2 block'>Release Title Required</span>}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Genre <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("genre", { required: true})}/>
                    {errors.genre && <span className='text-red-600 pt-2 block'>Genre Required</span>}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">℗ line <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("pLine", { required: true})}/>
                    {errors.pLine && <span className='text-red-600 pt-2 block'>℗ line Required</span>}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">© line <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("cLine", { required: true})}/>
                    {errors.cLine && <span className='text-red-600 pt-2 block'>© line Required</span>}


                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Format <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("format", { required: true})}/>
                    {errors.format && <span className='text-red-600 pt-2 block'>Format Required</span>}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">UPC</p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("UPC")}/>
                    <div className="mt-1">
                        <span className="text-xs bg-slate-100 text-slate-500 font-bold mx-2 px-2 py-1 rounded-md">if released before upc required otherwise optional.</span>
                    </div>

                    <div className="flex justify-end">
                        <input type="submit" value={'Next'} className="btn btn-sm my-4 px-6 btn-accent rounded-full" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FirstStep;