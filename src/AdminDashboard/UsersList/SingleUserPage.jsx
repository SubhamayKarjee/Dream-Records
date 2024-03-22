import { useParams } from "react-router-dom";

const SingleUserPage = () => {
    const {id} = useParams();
    console.log(id);
    return (
        <div>
            <p>Single User</p>
        </div>
    );
};

export default SingleUserPage;