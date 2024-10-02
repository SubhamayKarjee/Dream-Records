/* eslint-disable react/prop-types */
import { Result } from "antd";
import { useNavigate } from "react-router-dom";

const SuccessPage = ({link, heading, text}) => {

    const navigate = useNavigate('')
    const handleNavigate = (e) => {
        navigate(e)
    }

    return (
        <div className="flex items-center justify-center my-4">
            <Result
                status="success"
                title={heading}
                subTitle={text}
                extra={[
                    <button className="btn btn-sm my-4 px-6 h-9 btn-neutral bg-[#18181B]" onClick={() => handleNavigate(link)} type="primary" key="console">
                        Check Your Release Status
                    </button>
                ]}
            />
        </div>
    );
};

export default SuccessPage;