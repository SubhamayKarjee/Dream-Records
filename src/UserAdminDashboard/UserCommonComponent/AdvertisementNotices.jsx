import { Image } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import fallbackImage from '../../assets/fallbackImage.jpg'


const AdvertisementNotices = () => {

    const [imageData, setImageData] = useState();
    useEffect(() => {
        axios.get(`https://shark-app-65c5t.ondigitalocean.app/admin/api/v1/advertisment/66106c5bcda450b5173c46d8`)
        .then(res => {
            if(res.status === 200){
                setImageData(res.data.data)
            }
        })
    },[]);


    return (
        <div className='pt-3'>
            <Image
                width={'100%'}
                height={'auto'}
                className="rounded-md"
                src={imageData?.imgUrl}
                fallback={fallbackImage}
                preview={true}
                alt="advertisment-image"
            />
        </div>
    );
};

export default AdvertisementNotices;