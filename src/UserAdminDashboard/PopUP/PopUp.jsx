import { Button, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";


// eslint-disable-next-line react/prop-types
const PopUp = ({ visible, onClose }) => {

    const [imageData, setImageData] = useState();
    const [getImageLoading, setGetImageLoading] = useState(false)

    useEffect(() => {
        setGetImageLoading(true)
        axios.get(`http://localhost:5000/admin/api/v1/advertisment/66106c5bcda450b5173c46d8`)
        .then(res => {
            if(res.status === 200){
                setImageData(res.data.data)
                setGetImageLoading(false)
            }
        })
    },[]);


    return (
        <div>
            {
                getImageLoading && <div className="mt-4 flex items-center justify-center"><span className="loading loading-spinner loading-sm me-2"></span></div>
            }
            <Modal
                visible={visible}
                title=""
                onCancel={onClose}
                footer={[
                    <Button key="close" onClick={onClose}>
                    Close
                    </Button>
                ]}
                >
                <img style={{width: '100%', height: 'auto'}} className='rounded-md mt-6' src={imageData?.imgUrl} alt={imageData?.imgUrl} />
            </Modal>
        </div>
    );
};

export default PopUp;