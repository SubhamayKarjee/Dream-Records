import { BellIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

export const EditReleaseContext = createContext();

const EditReleaseMainPage = () => {

    const {id} = useParams();

    const [releaseFormData, setReleaseFormData] = useState();
    const [preReleaseData, setPreReleaseData] = useState();
    const [uploadedImageLink, setUploadedImageLink] = useState();
    const [uploadedImage, setUploadedImage] = useState('');

    const releaseContextValue = {
        releaseFormData,
        setReleaseFormData,
        preReleaseData,
        setPreReleaseData,
        uploadedImageLink,
        setUploadedImageLink,
        uploadedImage,
        setUploadedImage
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/release/single/${id}`)
            .then( res => {
              if(res.status == 200){
                setPreReleaseData(res.data.data[0]);
                setUploadedImageLink(res.data.data[0].imgUrl)
                const imgUrl = res.data.data[0].imgUrl;
                const key = res.data.data[0].key;
                setUploadedImage({imgUrl, key})
              }
            })
            .catch(er => console.log(er));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    

    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r p-2'>
                <div>
                    <button><Link className="px-2 py-1 font-semibold text-sm text-slate-500 flex items-center inline bg-slate-200 rounded-md" to={'/'}><ChevronLeftIcon className="w-4 h-4 me-1 font-bold"/>Back</Link></button>
                </div>
                <EditReleaseContext.Provider value={releaseContextValue}>
                    {
                        preReleaseData && <Outlet/>
                    }
                </EditReleaseContext.Provider>
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

export default EditReleaseMainPage;