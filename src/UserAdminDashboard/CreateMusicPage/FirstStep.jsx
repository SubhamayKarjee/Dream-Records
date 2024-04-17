import { Image, Select } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import fallbackImage from '../../assets/fallbackImage.jpg'
import { ReleaseContext } from "./CreateMusicPage";

const FirstStep = () => {

    const { 
        setReleaseFormData, 
        firstStep, setFirstStep, 
        genre, setGenre,
        uploadedImageLink, setUploadedImageLink, 
        uploadedImage, setUploadedImage,
        format, setFormat
    } = useContext(ReleaseContext);

    const navigate = useNavigate('');
    

    const [errorMessage, setErrorMessage] = useState('');
    const [upLoadLoading, setUploadLoading] = useState(false);

    const [options, setOptions] = useState([]);
    useEffect( () => {
        axios.get('https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/genre')
        .then(res => {
            setOptions(res.data.data);
        })
    },[])


    const releaseImageUpload = (event) => {
        setErrorMessage('')
        setUploadLoading(true)
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        if(uploadedImage?.key){
            axios.delete(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/delete-file?key=${uploadedImage.key}`)
            .then( res => {
            if(res.status == 200){
                console.log('delete');
            }
            })
            .catch(er => console.log(er));
        }
  
        // Check image size ___________________________________
        if (file) {
            const img = new window.Image();
            img.onload = function() {
                if (this.width === 3000 && this.height === 3000) {
                    setErrorMessage('');
                    axios.post('https://shark-app-65c5t.ondigitalocean.app/api/v1/release/upload-release-img', formData)
                    .then(res => {
                        if(res.status == 200){
                            setUploadedImageLink(res.data.data.imgUrl);
                            setUploadedImage(res.data.data);
                            setUploadLoading(false);
                            toast.success('Successfully Image Uploaded')
                        }
                    })
                    .catch(er => console.log(er))
                } else {
                    setErrorMessage('Please upload an image with dimensions 3000x3000 pixels.');
                    if (event.target) {
                        event.target.value = ''; // Clear the input field
                    }
                    setUploadLoading(false)
                    return;
                }
            };
            img.src = URL.createObjectURL(file);
        }
        
    }

    const [genreError, setGenreError] = useState('')

    const [formateErr, setFormateErr] = useState('')

    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: firstStep
    });
    const onSubmit = (data) => {
        setFormateErr('')
        if(!genre){
            setGenreError('Genre Required')
            return;
        }
        if(!format){
            setFormateErr('Please Select Formate')
            return;
        }
        if(uploadedImage){
            const formData = {...data, ...uploadedImage, genre, format};
            setReleaseFormData(formData);
            setFirstStep(data);
            navigate('/create-release/tracks')
        }else{
            setErrorMessage('Please Upload Art Image. Art Image Required');
        }
    };


    return (
        <div>
            <ul style={{width: '100%'}} className="steps">
                <li className="step step-info font-bold">Basic</li>
                <li data-content="2" className="step font-bold">Tracks</li>
                <li data-content="3" className="step font-bold">Date</li>
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
                        <input type="file" accept=".jpeg, .JPG, .jpg" id="fileInput" name='image' onChange={releaseImageUpload} />
                    </div>
                    {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-3 border mt-2 rounded-lg">
                    <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Release Title <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("releaseTitle", { required: true})}/>
                    {errors.releaseTitle && <span className='text-red-600 pt-2 block'>Release Title Required</span>}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Genre <span className="text-red-500">*</span></p>
                    <Select
                        showSearch
                        defaultValue={genre ? genre : 'Select Genre'}
                        size="large"
                        className="mb-2"
                        style={{
                            width: '100%',
                        }}
                        onChange={e => setGenre(e)}
                        options={options.map(option => ({ value: option.genre, label: option.genre }))}
                    />
                    {genreError && <span className='text-red-600 pt-2 block'>{genreError}</span>}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">℗ line <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("pLine", { required: true})}/>
                    {errors.pLine && <span className='text-red-600 pt-2 block'>℗ line Required</span>}

                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">© line <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("cLine", { required: true})}/>
                    {errors.cLine && <span className='text-red-600 pt-2 block'>© line Required</span>}


                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Format <span className="text-red-500">*</span></p>
                    <Select
                        showSearch
                        placeholder='Select Formate'
                        size="large"
                        className="mb-2"
                        style={{
                            width: '100%',
                        }}
                        onChange={e => setFormat(e)}
                        options={[
                            {label: 'Single', value: 'Single'},
                            {label: 'Album', value: 'Album'},
                        ]}
                    />
                    {
                        formateErr && <span className='text-red-600 pt-2 block'>{formateErr}</span>
                    }

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