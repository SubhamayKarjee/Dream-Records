import { GlobeAmericasIcon } from "@heroicons/react/24/solid";
import { Image, Result } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import fallbackImage from "../../assets/fallbackImage.jpg"
import toast from "react-hot-toast";

const CreateArtistForm = () => {

    const { userNameIdRoll, refatchArtistData, setRefatchArtistData } = useContext(AuthContext);
    const [modalBoxChange, setModalBoxChange] = useState(false);  

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
    const { register, handleSubmit, reset, formState: { errors }} = useForm();

    const onSubmit = async (data) => {
      setSubmitLoading(true)
      const masterUserId = userNameIdRoll[1];
      const formData = {...data, ...uploadedImage, masterUserId};
      axios.post('https://shark-app-65c5t.ondigitalocean.app/api/v1/artist/create-artist', formData)
          .then(res => {
              if(res.status == 200){
                toast.success('Successfully Created Artist!')
                reset();
                const forArtistDataRefatch = refatchArtistData + 1;
                setRefatchArtistData(forArtistDataRefatch);
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
                      <h4 className="font-bold text-slate-500">Create New Artist</h4>
                      <div className="border rounded-lg p-2">
                      <p className="my-1 text-sm font-semibold text-slate-500">Upload Artist Image</p>
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
                          <input type="file" accept="image/*" id="fileInput" name='image' onChange={e => artistImageUpload(e.target.files)} />
                      </div>
                      {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}
                  </div>
                      {/* _________________________________ */}
                      <form onSubmit={handleSubmit(onSubmit)}>
                          <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Artist Name <span className="text-red-500">*</span></p> 
                          <input type="text" className="input rounded-full input-bordered w-full" {...register("artistName", { required: true})}/>
                          {errors.artistName && <span className='text-red-600 pt-2 block'>Artist Name Required</span>}
                          <div className="border rounded-lg p-2 my-2">
                            <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Instagram ID</p> 
                            <input type="text" className="input input-sm rounded-full input-bordered w-full" {...register("instagramId")}/>
                            <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Spotify ID</p> 
                            <input type="text" className="input input-sm rounded-full input-bordered w-full" {...register("spotifyId")}/>
                            <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Apple ID</p> 
                            <input type="text" className="input input-sm rounded-full input-bordered w-full" {...register("appleId")}/>
                            <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Facebook URL</p> 
                            <label className="input input-bordered rounded-full input-sm flex items-center gap-2">
                              <GlobeAmericasIcon className="w-4 h-4 text-slate-500"/>
                              <input type="text" className="grow" {...register("facebook")}/>
                            </label>
                            <div className="flex items-center mt-3">
                            <p className="text-sm font-semibold text-slate-500 mx-2">Youtube Channel ID</p> <span className="text-xs">(YouTube OAC Request)</span>
                          </div>
                            <input type="text" className="input input-sm rounded-full input-bordered w-full" {...register("youtube")}/>
                          </div>
                          <div className="flex items-center ">
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
                    title="Successfully Created Artist"
                    subTitle="Please Back to Artist Page and See your Artist"
                    extra={[]}
                  />
              </div>
            }
        </>
    );
};

export default CreateArtistForm;