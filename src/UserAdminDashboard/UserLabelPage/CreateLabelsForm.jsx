import { Image, Result } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import fallbackImage from '../../assets/fallbackImage.jpg'
import { useForm } from "react-hook-form";
import { GlobeAmericasIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

const CreateLabelsForm = () => {

    const { userNameIdRoll, refatchLabelsData, setRefatchLabelsData, } = useContext(AuthContext);
    const [modalBoxChange, setModalBoxChange] = useState(false);  

    const [errorMessage, setErrorMessage] = useState('');
    const [upLoadLoading, setUploadLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState('');
    const [uploadedImageLink, setUploadedImageLink] = useState('');

    const labelsImageUpload = (e) => {
      setErrorMessage('');
      setUploadLoading(true)
      const file = e[0];
      const formData = new FormData();
      formData.append('file', file);
      // Check image size ___________________________________
      if (file.size > 1000000) {
        setErrorMessage('Image size must be less than 1 MB.');
        setUploadLoading(false)
        return;
      }

      if(uploadedImage?.key){
        axios.delete(`https://shark-app-65c5t.ondigitalocean.app/api/v1/release/delete-file?key=${uploadedImage.key}`)
        .then( res => {
        if(res.status == 200){
            setUploadedImage()
        }
        })
        .catch(er => console.log(er));
    }

      axios.post('https://shark-app-65c5t.ondigitalocean.app/api/v1/labels/upload-labels-img', formData)
          .then(res => {
              if(res.status == 200){
                setUploadedImageLink(res.data.data.imgUrl);
                setUploadedImage(res.data.data);
                setUploadLoading(false);
                toast.success('Successfully Label image Uploaded');
              }
          })
          .catch(er => console.log(er))
    }

    // React Hook Form For Create New Artist _________________________
    const { register, handleSubmit, reset, formState: { errors }} = useForm();

    const onSubmit = async (data) => {
      setSubmitLoading(true)
      const status = 'Pending';
      const masterUserId = userNameIdRoll[1];
      const formData = {...data, ...uploadedImage, masterUserId, status};
      axios.post('https://shark-app-65c5t.ondigitalocean.app/api/v1/labels/create-labels', formData)
          .then(res => {
              if(res.status == 200){
                toast.success('Successfully Created Labels. We will Review Shortly!')
                reset();
                const forLabelsDataRefatch = refatchLabelsData + 1;
                setRefatchLabelsData(forLabelsDataRefatch);
                setModalBoxChange(true);
                setUploadedImageLink('');
                setUploadedImage()
                setSubmitLoading(false);
              }
          })
          .catch(er => console.log(er))
    }

    const handleModalCondition = () => {
      setModalBoxChange(false)
    }

    return (
        <>
            {/* Modal Close Right top Side Icon ___________________________________________________ */}
                        <form onClick={handleModalCondition} method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        {
                          modalBoxChange == false && 
                          <div>
                              {/* Modal Body and Form for create Artist______________________________________________ */}
                              <div>
                                  <h4 className="font-bold text-slate-500">Create New Labels</h4>
                                  <div className="border rounded-lg p-2">

                                  <p className="my-1 text-sm font-semibold text-slate-500">Upload Labels Image</p>
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
                                      <input type="file" accept="image/*" id="fileInput" name='image' onChange={e => labelsImageUpload(e.target.files)} />
                                  </div>
                                  {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}

                              </div>
                                  {/* _________________________________ */}
                                  <form onSubmit={handleSubmit(onSubmit)}>
                                        <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Label Name <span className="text-red-500">*</span></p> 
                                        <input type="text" className="input rounded-full input-bordered w-full" {...register("labelName", { required: true})}/>
                                        {errors.labelName && <span className='text-red-600 pt-2 block'>Label Name Required</span>}

                                        <div className="border rounded-lg p-2 my-3">
                                            {/* Youtube Channel Link ___________________ */}
                                            <p className="mt-2 text-sm font-semibold text-slate-500 ms-2">Youtube Channel Link<span className="text-red-500">*</span></p> 
                                            <label className="input input-bordered rounded-full input-sm flex items-center gap-2">
                                            <GlobeAmericasIcon className="w-4 h-4 text-slate-500"/>
                                            <input type="text" className="grow" {...register("youtubeChannelLink", { required: true})}/>
                                            </label>
                                            {errors.youtubeChannelLink && <span className='text-red-600 pt-2 block'>YouTube Channel Link Required</span>}
                                            {/* Description ____________________________ */}
                                            <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Description</p>
                                            <textarea className="textarea textarea-bordered w-full" {...register("description")} placeholder="Description"></textarea>
                                        </div>

                                        <div className="flex items-center py-3">
                                        {
                                            submitLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                                        }
                                        <input type="submit" className="btn btn-sm rounded-full btn-neutral" value="Create" />
                                        </div>
                                    </form>
                              </div>
                          </div>
                        }
                        {
                          modalBoxChange == true && 
                          <div>
                              <Result
                                status="success"
                                title="Your Label Pending Now"
                                subTitle="We will review your label shortly and will UPDATE your label status"
                                extra={[]}
                              />
                          </div>
                        }
        </>
    );
};

export default CreateLabelsForm;