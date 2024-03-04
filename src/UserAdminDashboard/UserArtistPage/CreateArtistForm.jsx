import { GlobeAmericasIcon } from "@heroicons/react/24/solid";
import { Image, Result } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../UserAdminHomePage/UserAdminHomePage";
import fallbackImage from "../../assets/fallbackImage.jpg"

const CreateArtistForm = () => {

    const { userNameIdRoll, refatchArtistData, setRefatchArtistData } = useContext(AuthContext);
    const [modalBoxChange, setModalBoxChange] = useState(false);  

    const [errorMessage, setErrorMessage] = useState('');
    const [upLoadLoading, setUploadLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState('');
    const [uploadedImageLink, setUploadedImageLink] = useState('');

    const artistImageUpload = (e) => {
      setUploadLoading(true)
      const file = e[0];
      const formData = new FormData();
      formData.append('file', file);

      // Check image size ___________________________________
      if (file.size > 1000000) {
      setErrorMessage('Image size must be less than 1 MB.');
      return;
      }

      axios.post('http://localhost:5000/api/v1/artist/upload-artist-img', formData)
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
    const { register, handleSubmit, reset, formState: { errors }} = useForm();

    const onSubmit = async (data) => {
      setSubmitLoading(true)
      const masterUserId = userNameIdRoll[1];
      const formData = {...data, ...uploadedImage, masterUserId};
      console.log(formData);
      axios.post('http://localhost:5000/api/v1/artist/create-artist', formData)
          .then(res => {
              if(res.status == 200){
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

                                      <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Artist Email <span className="text-red-500">*</span></p> 
                                      <input type="text" className="input rounded-full input-bordered w-full" {...register("artistEmail", { required: true})}/>
                                      {errors.artistEmail && <span className='text-red-600 pt-2 block'>Artist Email Required</span>}

                                      <div className="border rounded-md p-2 my-2">
                                        <p className="my-2 font-semibold text-slate-500 ms-2">Artist Link</p> 
                                        <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Facebook</p> 
                                        <label className="input input-bordered rounded-full input-sm flex items-center gap-2">
                                          <GlobeAmericasIcon className="w-4 h-4 text-slate-500"/>
                                          <input type="text" className="grow" {...register("facebook")}/>
                                        </label>
                                        <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Twitter</p> 
                                        <label className="input input-bordered rounded-full input-sm flex items-center gap-2">
                                          <GlobeAmericasIcon className="w-4 h-4 text-slate-500"/>
                                          <input type="text" className="grow" {...register("twitter")}/>
                                        </label>
                                        <p className="mt-3 text-sm font-semibold text-slate-500 ms-2">Instagram</p> 
                                        <label className="input input-bordered rounded-full input-sm flex items-center gap-2 mb-3">
                                          <GlobeAmericasIcon className="w-4 h-4 text-slate-500"/>
                                          <input type="text" className="grow" {...register("instagram")}/>
                                        </label>
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