import { Divider } from 'antd';
import uploadIcon from '../../assets/common-icons/uploadIcon.png'
import MainNotices from '../UserCommonComponent/MainNotices';
import MainNoticesMobile from '../UserCommonComponent/MainNoticesMobile';
import axios from "axios";
import { useForm } from "react-hook-form";
import { GlobeAmericasIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';



const UpdateLabelPage = () => {

    const {id} = useParams();
    const navigate = useNavigate()

    const label = useLoaderData();
    const imgUrl = label?.data?.data[0].imgUrl;
    const key = label?.data?.data[0].key;

    const [errorMessage, setErrorMessage] = useState('');
    const [upLoadLoading, setUploadLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState({imgUrl, key});
    const [uploadedImageLink, setUploadedImageLink] = useState(imgUrl);

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

    // React Hook Form For Update labels _________________________
    const { register, handleSubmit,  formState: { errors }} = useForm({
        defaultValues: label.data.data[0]
    });

    const onSubmit = async (data) => {
      setSubmitLoading(true)
      const status = 'Pending';
        const actionRequird = '';
        if(!uploadedImage){
            setUploadedImage({imgUrl, key})
        }
        let formData;
        if(label.data.data[0].status === 'Approved'){
            formData = {...data, ...uploadedImage};
        }else{
            formData = {...data, ...uploadedImage, status, actionRequird};
        }
        axios.put(`https://shark-app-65c5t.ondigitalocean.app/api/v1/labels/update-labels/${id}`, formData)
        .then(res => {
            if(res.status == 200){
              toast.success('Successfully Updated Labels. We will Review Shortly!')
              setSubmitLoading(false);
              navigate('/labels/All/1/6')
            }
        })
        .catch(er => console.log(er))
    }

    const sideBarShadow = {
        boxShadow: '-2px 2px 18px 0px #EFEFEF',
    }

    const inputStyle ={
      height: '36px',
      border: '1px solid #E2E8F0'
    }


    return (
        <div className="md:flex md:h-full">
            <div className="h-full md:basis-3/4 overflow-y-auto px-3 bg-[#FCFCFC] md:pt-16 custom-scrollbar">
                <h3 className='font-bold text-xl pb-2 text-[#252525]'>Update Labels</h3>
                <div className="pt-1">
                    <p className="text-sm font-semibold">Labels Details</p>
                    <p className="text-sm text-[#71717A]">Update your details below</p>
                </div>
                <Divider/>

                <div className="">
                    <p className="text-sm font-semibold text-[#09090B] pb-3">Upload Label Image</p>
                    <div id="fileInputDiv" className="flex items-center justify-center bg-[#F2F2F2]">
                        <div>
                            <img className="mx-auto" src={uploadIcon} alt="" />
                            <p className="text-[#71717A] py-2">Drop your image to upload</p>
                        </div>
                        <input type="file" accept="image/*" id="fileInputStyle" name='image' onChange={e => labelsImageUpload(e.target.files)} />
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
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="mt-3 text-sm font-semibold text-[#09090B]">Label Name <span className="text-red-500">*</span></p> 
                    <input style={inputStyle} type="text" className="input input-sm w-full" {...register("labelName", { required: true})} disabled/>
                    {errors.labelName && <span className='text-red-600 pt-2 block'>Label Name Required</span>}
                    {/* Youtube Channel Link ___________________ */}
                    <p className="mt-3 text-sm font-semibold text-[#09090B]">Youtube Channel Link<span className="text-red-500">*</span></p> 
                    <label style={inputStyle} className="input input-sm flex items-center gap-2">
                        <GlobeAmericasIcon className="w-4 h-4 text-slate-500"/>
                        <input type="text" className="grow" {...register("youtubeChannelLink", { required: true})}/>
                    </label>
                    {errors.youtubeChannelLink && <span className='text-red-600 pt-2 block'>YouTube Channel Link Required</span>}
                    {/* Description ____________________________ */}
                    <p className="mt-3 text-sm font-semibold text-[#09090B]">Description</p>
                    <textarea className="textarea textarea-bordered w-full" {...register("description")} placeholder="Description"></textarea>
                    <div className="flex items-center py-3">
                        {
                            submitLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                        }
                        <input type="submit" className="btn btn-sm btn-neutral px-6 h-9 my-3 bg-[#18181B]" value="Update Labels" />
                    </div>
                </form>

                
            </div>



            {/* Notification Div Mobile _______________________________*/}
            <MainNoticesMobile/>

            {/* Notification Div Desktop _______________________________*/}
            <div style={sideBarShadow} className="md:basis-1/4 hidden md:block bg-white md:pt-16 px-3">
                <h3 className='font-semibold text-xl pb-2'>Notices</h3>
                <MainNotices/>
            </div>
        </div>
    );
};

export default UpdateLabelPage;