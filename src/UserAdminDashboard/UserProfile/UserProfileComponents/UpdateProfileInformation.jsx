import {  ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const UpdateProfileInformation = () => {


    const [imageInfo, setImageInfo] = useState()
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImageInfo(selectedImage)
    console.log(selectedImage);
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

  // React Hook Form Submit Function For Create User _________________________
  const { register, handleSubmit, formState: { errors }} = useForm();
  const onSubmit = (data) => {

    // Clear image from local storage
    const formData = {...data, imageInfo}
    console.log(formData);
    localStorage.removeItem('uploadedImage');
    setImage(null);


    //   setLoading(true)
    //   axios.post('http://localhost:5000/api/v1/users', formData).then(res => {
    //       if(res.status == 200){
              
    //       }
    //   })
  };



    return (
        <div>
            <div className="my-4">
                <button><Link className="px-2 py-1 font-semibold text-sm text-slate-500 flex items-center inline bg-slate-200 rounded-md" to={'/account'}><ChevronLeftIcon className="w-4 h-4 me-1 font-bold"/>Back</Link></button>
            </div>
            <div>
                <div className="border rounded-lg p-2">
                    {/* <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Upload/Change Profile Image</p>
                    <img className="h-16 w-16 rounded-full bg-slate-300" src="/" alt="" />
                    <input type="file" name="file" id="" onChange={e => profileImageUpload(e.target.files)} className="my-2"/>
                    {
                        uploadError && <p className="font-bold text-red">{uploadError}</p>
                    } */}
                    <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Upload/Change Profile Image</p>
                    {
                        !image && <img className="h-16 w-16 my-2 rounded-full bg-slate-300" src={'/'} alt="" />
                    }
                    {image && <img className="h-16 w-16 my-2 rounded-full bg-slate-300" src={image} alt="" />}
                    <input type="file" id="fileInput" accept="image/*" onChange={handleImageChange}/>
                    {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap gap-2 md:flex-nowrap justify-between items-center">
                        <div className="flex-1">
                            <p className="my-1 text-sm font-semibold text-slate-500 ms-2">First Name</p>
                            <input type="text" placeholder="Firs Name" className="input rounded-full input-bordered w-full" {...register("first_name")}/>
                            {/* {errors.first_name && <span className='text-red-600 pt-2 block'>First Name Required</span>} */}
                        </div>
                        <div className="flex-1">
                            <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Last Name</p>
                            <input type="text" placeholder="Last Name" className="input rounded-full input-bordered w-full" {...register("last_name")}/>
                            {/* {errors.last_name && <span className='text-red-600 pt-2 block'>Last Name Required</span>} */}
                        </div>                        
                    </div>
                    <div className="mt-2">
                        <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Display Name/Nick Name</p>
                        <input type="text" placeholder="Last Name" className="input rounded-full input-bordered w-full" {...register("nick_name", { required: true})}/>
                        {errors.nick_name && <span className='text-red-600 pt-2 block'>Nick/Display Name Required</span>}

                        <p className="my-1 text-sm font-semibold text-slate-500 ms-2">Address</p>
                        <input type="text" placeholder="Full Address" className="input rounded-full input-bordered w-full" {...register("address")}/>
                    </div>   
                    <input type="submit" value={'Update'} className="btn btn-sm my-4 px-6 btn-accent rounded-full" />
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileInformation;