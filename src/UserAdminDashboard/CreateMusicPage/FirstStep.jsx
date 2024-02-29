import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FirstStep = () => {

    const navigate = useNavigate('')

    const [imageInfo, setImageInfo] = useState()
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImageInfo(selectedImage)
    console.log(imageInfo);
    if (!selectedImage) return;

    // Check image size
    if (selectedImage.size > 1000000) {
      setErrorMessage('Image size must be less than 1 MB.');
      return;
    }

   
    // Save image to local storage
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem('uploadedImage', reader.result);
      setImage(reader.result);
      setErrorMessage('');
    };
    reader.readAsDataURL(selectedImage);
  };

    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        console.log(data);
        navigate('/create-music/tracks')
    };


    return (
        <div>
            <ul style={{width: '100%'}} className="steps">
                <li className="step step-info font-bold">Basic</li>
                <li data-content="●" className="step font-bold">Tracks</li>
            </ul>
            <div className="py-3">
                <h2 className="text-lg font-semibold text-slate-500 px-2">Besic of Track</h2>
                <div className="border rounded-lg p-2">
                    {/* <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Upload/Change Profile Image</p>
                    <img className="h-16 w-16 rounded-full bg-slate-300" src="/" alt="" />
                    <input type="file" name="file" id="" onChange={e => profileImageUpload(e.target.files)} className="my-2"/>
                    {
                        uploadError && <p className="font-bold text-red">{uploadError}</p>
                    } */}
                    <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Artwork <span className="text-red-500">*</span></p>
                    {
                        !image && <img className="h-24 w-24 my-2 rounded-md bg-slate-300" src={'/'} alt="" />
                    }
                    {image && <img className="h-16 w-16 my-2 rounded-full bg-slate-300" src={image} alt="" />}
                    <input type="file" id="fileInput" accept="image/*" onChange={handleImageChange}/>
                    {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-3 border mt-2 rounded-lg">
                    <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Release Title <span className="text-red-500">*</span></p>
                    <input type="text" placeholder="" className="input rounded-full input-bordered w-full" {...register("releaseTitle", { required: true})}/>
                    {errors.releaseTitle && <span className='text-red-600 pt-2 block'>Release Title Required</span>}

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