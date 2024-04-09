import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import auth from "../../firebase.config";
import LoadingComponentsForPage from "../LoadingComponents/LoadingComponentsForPage";

// eslint-disable-next-line react/prop-types
const ProtectAdminRoute = ({children}) => {

    const [user, loading] = useAuthState(auth);

    if(loading){
        return <LoadingComponentsForPage/>
    }
    if(user){
        let userNameIdRoll = user?.displayName?.split("'__'");
        if(userNameIdRoll[2] === 'Admin'){
            return children
        }
        if(userNameIdRoll[2] !== 'Admin'){
            return <div className="h-full flex items-center justify-center">
                <p>You are not a Admin</p>
            </div>
        }
    }
    if(!user){
        return <Navigate to={'/log-in'}></Navigate>
    }
};

export default ProtectAdminRoute;