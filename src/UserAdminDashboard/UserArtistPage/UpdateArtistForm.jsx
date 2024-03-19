import { GlobeAmericasIcon } from "@heroicons/react/24/solid";
import { Image, Result } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import fallbackImage from "../../assets/fallbackImage.jpg"
import { UpdateRefetch } from "./DetailsSingleArtist";


// eslint-disable-next-line react/prop-types
const UpdateArtistForm = ({artist, imgUrl, imgKey}) => {

    const { artistDataRefatch, setArtistDataRefatch } = useContext(UpdateRefetch);

    const key = imgKey;


    const [errorMessage, setErrorMessage] = useState('');
    const [upLoadLoading, setUploadLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState({imgUrl, key});
    const [uploadedImageLink, setUploadedImageLink] = useState(imgUrl);
    const [modalBoxChange, setModalBoxChange] = useState(false);

    const artistImageUpload = (e) => {
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
          axios.delete(`http://localhost:5000/api/v1/release/delete-file?key=${uploadedImage.key}`)
          .then( res => {
          if(res.status == 200){
              setUploadedImage()
          }
          })
          .catch(er => console.log(er));
        }
  
        axios.post('http://localhost:5000/api/v1/artist/upload-artist-img', formData)
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
    const { register, handleSubmit, reset, formState: { errors }} = useForm({
        defaultValues: artist
    });
    
    const onSubmit = (data) => {
        setSubmitLoading(true)
        const formData = {...data, ...uploadedImage};
        console.log(formData);
        // eslint-disable-next-line react/prop-types
        axios.put(`http://localhost:5000/api/v1/artist/update-artist/${artist._id}`, formData)
            .then(res => {
                if(res.status == 200){
                  toast.success('Successfully Created Artist!')
                  reset();
                  const forArtistDataRefatch = artistDataRefatch + 1;
                  setModalBoxChange(true);
                  setArtistDataRefatch(forArtistDataRefatch);
                  setUploadedImageLink('');
                  setUploadedImage()
                  setSubmitLoading(false);
                }
            })
            .catch(er => console.log(er))
      }



    return (
        <div>
            {/* Modal Body and Form for Update Artist______________________________________________ */}
            {
                modalBoxChange == false && 
                <div>
                    <h4 className="font-bold text-slate-500">Update Artist</h4>
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
                        <input type="text" disabled className="input rounded-full input-bordered w-full" {...register("artistName", { required: true})}/>
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
                            <p className="text-sm font-semibold text-slate-500 mx-2">Youtube ID</p> <span className="text-xs">(YouTube OAC Request)</span>
                            </div>
                            <input type="text" className="input input-sm rounded-full input-bordered w-full" {...register("youtube")}/>
                        </div>
                        <div className="flex items-center ">
                        {
                            submitLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                        }
                        <input type="submit" className="btn btn-sm rounded-full btn-neutral" value="Update" />
                        </div>
                    </form>
                </div>
            }
            {
              modalBoxChange == true && 
              <div>
                  <Result
                    status="success"
                    title="Successfully Updated Artist"
                    subTitle="Please Back to Artist Page and See your Artist"
                    extra={[]}
                  />
              </div>
            }
        </div>
    );
};

export default UpdateArtistForm;