import { Divider, Select, Steps } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { EditReleaseContext } from "./EditReleaseMainPage";
import uploadIcon from '../../../assets/common-icons/uploadIcon.png'

const EditReleaseFirstStep = () => {


    const { setFirstStep, preReleaseData, uploadedImageLink, setUploadedImageLink,  uploadedImage, setUploadedImage } = useContext(EditReleaseContext);

    const navigate = useNavigate('')

    const [errorMessage, setErrorMessage] = useState('');
    const [upLoadLoading, setUploadLoading] = useState(false);
    
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
                            toast.success('Successfully Image Uploded')
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

    const [genre, setGenre] = useState()
    const [genreError, setGenreError] = useState('')
    const [options, setOptions] = useState([]);
    useEffect( () => {
        axios.get('https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/genre')
        .then(res => {
            setOptions(res.data.data);
            setGenre(preReleaseData.genre)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            releaseTitle: preReleaseData.releaseTitle,
            pLine: preReleaseData.pLine,
            cLine: preReleaseData.cLine,
            UPC: preReleaseData.UPC,
        }
    });
    const onSubmit = (data) => {
        setGenre('')
        if(!genre){
            setGenreError('Genre Required')
            return;
        }
        if(uploadedImage){
            const formData = {...data, ...uploadedImage, genre};
            setFirstStep(formData)
            console.log(formData);
            navigate('/releases/edit/second-step')
        }else{
            setErrorMessage('Please Upload Art Image. Art Image Required');
        }
    };

    const steps = [
        {title: 'Basic'},
        {title: 'Tracks'},
        {title: 'Date'},
    ];
    const inputStyle = {
        height: '36px',
        border: '1px solid #E2E8F0'
    }


    return (
        <div>
            <div className="px-3">
                <Steps current={0} items={steps} /> 
            </div>

            <div className="pt-4">
                <p className="text-lg font-semibold">Update Besic of Track</p>
                <p className="text-sm text-[#71717A]">Update your account settings. Set your preferred language and timezone.</p>
            </div>
            <Divider/>
            
            {
                preReleaseData && 
                    <div className="pb-3">
                        <div className="">
                            <p className="text-sm font-semibold text-[#09090B] pb-1 flex items-center gap-2">Artwork <span className="text-red-500">*</span></p>
                            <div id="fileInputDiv" className="flex items-center justify-center bg-[#F2F2F2]">
                                <div>
                                    <img className="mx-auto" src={uploadIcon} alt="" />
                                    <p className="text-[#71717A] py-2">Drop your image to upload</p>
                                </div>
                                <input type="file" accept=".jpeg, .JPG, .jpg" id="fileInputStyle" name='image' onChange={e => releaseImageUpload(e)} />
                            </div>
                            {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}
                            {
                                upLoadLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                            }
                            {
                            uploadedImageLink && 
                            <div className="mb-2 mt-3">
                                <img style={{height: '48px', width: '48px', borderRadius: '8px'}} src={uploadedImageLink} alt="" />
                            </div>
                            }
                            {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}
                        </div>


                        <div className="py-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <p className="mt-3 text-sm font-semibold text-[#09090B]">Release Title <span className="text-red-500">*</span></p>
                                <input style={inputStyle} type="text" className="input input-sm w-full mt-1" placeholder="Enter the song tittle here" {...register("releaseTitle", { required: true})}/>
                                <p className="text-xs text-[#71717A] mt-1">This is the tittle that will be displayed as song tittle.</p>
                                {errors.releaseTitle && <span className='text-red-600 pt-2 block'>Release Title Required</span>}

                                <p className="mt-3 text-sm font-semibold text-[#09090B]">Genre <span className="text-red-500">*</span></p>
                                <Select
                                    showSearch
                                    defaultValue={preReleaseData.genre}
                                    // size="large"
                                    className="mb-2 h-9"
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={e => setGenre(e)}
                                    options={options.map(option => ({ value: option.genre, label: option.genre }))}
                                />
                                {genreError && <span className='text-red-600 pt-2 block'>{genreError}</span>}

                                <p className="mt-3 text-sm font-semibold text-[#09090B]">℗ line <span className="text-red-500">*</span></p>
                                <input style={inputStyle} type="text" className="input input-sm w-full mt-1" placeholder="Enter the ℗line here" {...register("pLine", { required: true})}/>
                                {errors.pLine && <span className='text-red-600 pt-2 block'>℗ line Required</span>}

                                <p className="mt-3 text-sm font-semibold text-[#09090B]">© line <span className="text-red-500">*</span></p>
                                <input style={inputStyle} type="text" className="input input-sm w-full mt-1" placeholder="Enter the ©line here" {...register("cLine", { required: true})}/>
                                {errors.cLine && <span className='text-red-600 pt-2 block'>© line Required</span>}

                                <p className="mt-3 text-sm font-semibold text-[#09090B]">UPC</p>
                                <input style={inputStyle} type="text" className="input input-sm w-full mt-1" placeholder="Enter the UPC number here" {...register("UPC")}/>
                                <p className="text-xs text-[#71717A] mt-1">if released before upc required otherwise optional.</p>

                                <input type="submit" value={'Next'} className="btn btn-sm my-4 px-6 h-9 btn-neutral bg-[#18181B]" />
                            </form>
                        </div>
                    </div>
            }
        </div>
    );
};

export default EditReleaseFirstStep;