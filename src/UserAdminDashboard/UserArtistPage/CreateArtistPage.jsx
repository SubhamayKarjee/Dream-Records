import { Divider } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import MainNotices from "../UserCommonComponent/MainNotices";
import MainNoticesMobile from "../UserCommonComponent/MainNoticesMobile";
import { GlobeAmericasIcon } from "@heroicons/react/24/solid";
import './UserArtistPage.css'
import uploadIcon from '../../assets/common-icons/uploadIcon.png'
import { useNavigate } from "react-router-dom";

const CreateArtistPage = () => {

    const { userNameIdRoll } = useContext(AuthContext);
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [upLoadLoading, setUploadLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState('');
    const [uploadedImageLink, setUploadedImageLink] = useState('');

    const artistImageUpload = (e) => {
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

      axios.post('https://shark-app-65c5t.ondigitalocean.app/api/v1/artist/upload-artist-img', formData)
          .then(res => {
              if(res.status == 200){
                setUploadedImageLink(res.data.data.imgUrl);
                setUploadedImage(res.data.data);
                setUploadLoading(false);
                toast.success('Arist Image Uploaded')
              }
          })
          .catch(er => console.log(er))
    }

    // React Hook Form For Create New Artist _________________________
    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async (data) => {
      setSubmitLoading(true)
      const masterUserId = userNameIdRoll[1];
      const userName = userNameIdRoll[0]
      const formData = {...data, ...uploadedImage, masterUserId, userName};
      axios.post('https://shark-app-65c5t.ondigitalocean.app/api/v1/artist/create-artist', formData)
          .then(res => {
              if(res.status == 200){
                toast.success('Successfully Created Artist!')
                setUploadedImageLink('');
                setUploadedImage()
                setSubmitLoading(false);
                navigate('/artist/1/8')
                
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
            <div className='h-full md:basis-3/4 overflow-y-auto px-3 bg-[#FCFCFC] md:pt-16 custom-scrollbar'>
                <h3 className='font-bold text-xl pb-2 text-[#252525]'>Create New Artist</h3>
                <div className="pt-1">
                    <p className="text-sm font-semibold">Artist’s Details</p>
                    <p className="text-sm text-[#71717A]">Update your Artist’s all details below</p>
                </div>
                <Divider/>
                <div>
                    <div className="">
                        <p className="text-sm font-semibold text-[#09090B] pb-3">Upload Artist Image</p>
                        <div id="fileInputDiv" className="flex items-center justify-center bg-[#F2F2F2]">
                            <div>
                                <img className="mx-auto" src={uploadIcon} alt="" />
                                <p className="text-[#71717A] py-2">Drop your image to upload</p>
                            </div>
                            <input type="file" accept="image/*" id="fileInputStyle" name='image' onChange={e => artistImageUpload(e.target.files)} />
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
                      {/* _________________________________ */}
                      <form onSubmit={handleSubmit(onSubmit)}>
                          <p className="mt-3 text-sm font-semibold text-[#09090B]">Artist Name <span className="text-red-500">*</span></p> 
                          <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Enter Artist Name" {...register("artistName", { required: true})}/>
                          <p className="text-xs text-[#71717A] mt-1">This is the tittle that will be displayed as artist’s profile image.</p>
                          {errors.artistName && <span className='text-red-600 pt-2 block'>Artist Name Required</span>}
                          <p className="mt-3 text-sm font-semibold text-[#09090B]">Instagram</p> 
                          <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Instagram Profile URL" {...register("instagramId")}/>
                          <p className="mt-3 text-sm font-semibold text-[#09090B]">Spotify</p> 
                          <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Spotify Profile URL" {...register("spotifyId")}/>
                          <p className="mt-3 text-sm font-semibold text-[#09090B]">Apple</p> 
                          <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Apple Profile URL" {...register("appleId")}/>
                          <p className="mt-3 text-sm font-semibold text-[#09090B]">Facebook</p> 
                          <label style={inputStyle} className="input input-sm flex items-center gap-2">
                              <GlobeAmericasIcon className="w-4 h-4 text-slate-500"/>
                              <input type="text" className="grow" placeholder="Facebook Profile URL" {...register("facebook")}/>
                          </label>
                          <div className="flex items-center mt-3">
                              <p className="text-sm text-sm font-semibold text-[#09090B]">Youtube Channel</p> <span className="text-xs">(YouTube OAC Request)</span>
                          </div>
                              <input style={inputStyle} type="text" className="input input-sm w-full" placeholder="Youtube Channel Profile URL" {...register("youtube")}/>
                          <div className="flex items-center ">
                              {
                                  submitLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                              }
                              <input type="submit" className="btn btn-sm btn-neutral px-6 h-9 my-3 bg-[#18181B]" value="Create Artist" />
                          </div>
                      </form>
                </div>
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

export default CreateArtistPage;