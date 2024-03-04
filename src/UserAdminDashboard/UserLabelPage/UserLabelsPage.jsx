import { BellIcon, ChevronLeftIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const UserLabelsPage = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [upLoadLoading, setUploadLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState('');
    const [uploadedImageLink, setUploadedImageLink] = useState('')

    const labelsImageUpload = (e) => {
      setUploadLoading(true)
      const file = e[0];
      const formData = new FormData();
      formData.append('file', file);

      // Check image size ___________________________________
      if (file.size > 1000000) {
      setErrorMessage('Image size must be less than 1 MB.');
      return;
      }

      axios.post('http://localhost:5000/api/v1/users/upload-labels-img', formData)
          .then(res => {
              if(res.status == 200){
                setUploadedImageLink(res.data.data.imgUrl);
                setUploadedImage(res.data.data)
                setUploadLoading(false)
              }
          })
          .catch(er => console.log(er))
    }

  



    // React Hook Form For Create New Artist _________________________
    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = async (data) => {
        console.log(data, uploadedImage);
    }



    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r p-2'>

                <div className="mb-4">
                    <button><Link className="px-2 py-1 font-semibold text-sm text-slate-500 flex items-center inline bg-slate-200 rounded-md" to={'/'}><ChevronLeftIcon className="w-4 h-4 me-1 font-bold"/>Back</Link></button>
                </div>
                {/* Search and Create Artist Section ______________________________________________________________________________ */}
                <div className="md:flex md:justify-between md:items-center bg-slate-50 py-2 px-2 rounded-lg">
                    <div className="my-2">
                        <input type="text" placeholder="Type to Search" className="input input-sm rounded-full input-bordered w-full"/>
                    </div>
                    <div className="my-2">
                        <button onClick={()=>document.getElementById('create_artist_modal').showModal()} className='btn btn-neutral py-1 px-6 rounded-full btn-sm border-none me-2 w-full'>Create Label</button>
                    </div>
                </div>
                    {/* Create Artist form with Modal Start _______________________________________________________________________ */}
                    <dialog id="create_artist_modal" className="modal"> 
                        <div className="modal-box">
                            {/* Modal Close Right top Side Icon ___________________________________________________ */}
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            {/* Modal Body and Form for create Artist______________________________________________ */}
                            <div>
                                <h4 className="font-bold text-slate-500">Create New Label</h4>
                                <div className="border rounded-lg p-2">

                                <p className="my-1 text-sm font-semibold text-slate-500">Upload Label Image</p>
                                <img className="h-24 w-24 my-2 rounded-md bg-slate-300" src={uploadedImageLink} alt="" />
                                <div className="flex items-center ">
                                    {
                                        upLoadLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                                    }
                                    <input type="file" accept="image/*" id="fileInput" name='image' onChange={e => labelsImageUpload(e.target.files)} />
                                </div>
                                {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}

                            </div>
                                {/* _________________________________ */}
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Label Name <span className="text-red-500">*</span></p> 
                                    <input type="text" className="input rounded-full input-bordered w-full" {...register("labelName", { required: true})}/>
                                    {errors.artistName && <span className='text-red-600 pt-2 block'>Label Name Required</span>}

                                    <div className="flex items-center py-3">
                                      {
                                          upLoadLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                                      }
                                      <input type="submit" className="btn btn-sm rounded-full btn-neutral" value="Create" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </dialog>
                    {/* Create Artist form with Modal End _______________________________________________________________________ */}







                {/* Total Artist Count Section _____________________________________________________________________________________ */}
                <div className="flex justify-between items-center my-3">
                    <div className="flex items-center">
                        <ExclamationCircleIcon className="w-6 h-6 me-1 text-slate-500"/>
                        Label Count
                    </div>
                    <div><span className="text-sm font-bold">10</span> <span className="ms-1 p-2 bg-slate-50 rounded-md text-sm font-bold">50</span> </div>
                </div>

                {/* Artist List and Relase Title Section _____________________________________________________________________________ */}
                <div className="flex justify-between items-center py-2 rounded-full bg-slate-100 px-4">
                    <h4 className="font-bold text-slate-600">Profile</h4>
                    <h4 className="font-bold text-slate-600">Releases</h4>
                </div>
            </div>

            {/* Blog Post Div  _______________________________*/}
            <div className="md:basis-1/4">
                <div className='p-2 border-b'>
                    <h4 className='flex items-center font-bold text-lg text-slate-500'> <BellIcon className='w-6 h-6 me-2 text-slate-500'/> Notification</h4>
                </div>
            </div>
        </div>
    );
};

export default UserLabelsPage;