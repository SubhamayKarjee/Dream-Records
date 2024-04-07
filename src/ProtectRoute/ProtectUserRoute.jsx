import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import auth from "../../firebase.config";
import LoadingComponentsForPage from "../LoadingComponents/LoadingComponentsForPage";

const ProtectUserRoute = (children) => {
    const [user, loading] = useAuthState(auth);

    if(loading){
        return <LoadingComponentsForPage/>
    }
    if(user){
        let userNameIdRoll = user?.displayName?.split("'__'");
        if(userNameIdRoll[2] === 'User'){
            return children
        }
        if(userNameIdRoll[2] !== 'User'){
            return <div className="h-full flex items-center justify-center">
                <p>You are not a USER</p>
            </div>
        }
    }
    if(!user){
        return <Navigate to={'/log-in'}></Navigate>
    }
};

export default ProtectUserRoute;