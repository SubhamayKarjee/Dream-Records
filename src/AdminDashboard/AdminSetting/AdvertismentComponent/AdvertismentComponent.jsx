import { Image } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import fallbackImage from '../../../assets/fallbackImage.jpg'


const AdvertismentComponent = () => {


    const [uploadedAdvertismentImg, setUploadedAdvertismentImg] = useState()
    const [imageData, setImageData] = useState();
    const [getLoading, setGetLoading] = useState(false)

    useEffect(() => {
        setGetLoading(true)
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/advertisment/66106c5bcda450b5173c46d8`)
        .then(res => {
            if(res.status === 200){
                setUploadedAdvertismentImg(res.data.data.imgUrl)
                setImageData(res.data.data)
                setGetLoading(false)
            }
        })
    },[])


    const [errorMessage, setErrorMessage] = useState('');
    const [upLoadLoading, setUploadLoading] = useState(false);
    // Upload Profile Image Function _____________________________________________
    const handleImageChange = (e) => {
        setUploadLoading(true)
        const file = e[0];
        const formData = new FormData();
        formData.append('file', file);

        if(imageData){
            axios.delete(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/advertisment/delete-file?key=${imageData.key}`)
        }

        axios.post('https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/advertisment/upload-advertisment-image', formData)
            .then(res => {
                if(res.status == 200){
                    setUploadedAdvertismentImg(res.data.data.imgUrl);
                    setImageData(res.data.data)
                    setUploadLoading(false);
                    toast.success('Image Uploaded')
                }
            })
            .catch(er => setErrorMessage(er))
    };


    const [submitLoading, setSubmitLoading] = useState(false)
    const handleAdvertismentImageUpload = () => {
        setSubmitLoading(true)
        axios.put(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/advertisment/66106c5bcda450b5173c46d8`, imageData)
        .then(res => {
            if(res.status === 200){
                setSubmitLoading(false);
                toast.success('Successfully Advertisment Added');
            } 
        })
        .catch(er => setErrorMessage(er))
    }




    return (
        <>
            <h2 className="font-bold text-slate-700">Advertisment</h2>
            <p className="text-xs font-bold text-slate-600">If you add Advertisment Image then USER can Seen the advertisment thair Dashboard</p>
            <div className="mt-2">
                <div className="border rounded-lg p-2">
                    <p className="my-1 text-sm font-semibold text-slate-500">Advertisment Image</p>
                    {
                        getLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                    }
                    <Image
                        width={125}
                        height={125}
                        className="rounded-md"
                        src={uploadedAdvertismentImg}
                        fallback={fallbackImage}
                        preview={false}
                        alt="advertisment-image"
                    />
                    

                    <div className="flex items-center justify-between">
                    <div className="flex items-center ">
                        {
                            upLoadLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                        }
                        <input type="file" accept="image/*" id="fileInput" name='image' onChange={e => handleImageChange(e.target.files)} />
                    </div>
                        <div className="flex items-center justify-center">
                            {
                                submitLoading && <span className="block loading loading-spinner loading-md me-2"></span>
                            }
                            <button className="btn btn-sm rounded-full bg-info" onClick={handleAdvertismentImageUpload}>Submit</button>
                        </div>
                    </div>
                    {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}
                </div> 
            </div>           
        </>
    );
};

export default AdvertismentComponent;