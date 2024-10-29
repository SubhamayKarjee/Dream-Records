import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import auth from "../../firebase.config";
import LoadingComponentsForPage from "../LoadingComponents/LoadingComponentsForPage";
import PropTypes from 'prop-types'; 

const ProtectUserRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [userLockedStatus, setUserLockedStatus] = useState(null);

    useEffect(() => {
        const fetchUserLockedStatus = async () => {
            if (user) {
                const userNameIdRoll = user.displayName?.split("'__'");
                try {
                    const res = await axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${userNameIdRoll[1]}`);
                    setUserLockedStatus(res.data.data.userLocked);
                } catch (error) {
                    console.error("Error fetching user locked status:", error);
                }
            }
        };
        fetchUserLockedStatus();
    }, [user]);

    if (loading) {
        return <LoadingComponentsForPage />;
    }

    if (!user) {
        return <Navigate to={'/log-in'} />;
    }

    if (userLockedStatus === null) {
        // You can also handle a loading state for fetching user locked status if desired
        return null; // or a loading indicator if you want
    }

    const userNameIdRoll = user.displayName?.split("'__'");

    if (userNameIdRoll[2] === 'User') {
        if (userLockedStatus) {
            return <Navigate to={`/locked/${userNameIdRoll[1]}`} />;
        }
        return children;
    }

    return (
        <div className="h-full flex items-center justify-center">
            <p>You are not a USER</p>
        </div>
    );
};

ProtectUserRoute.propTypes = {
    children: PropTypes.node.isRequired, // Specify that children is required
};

export default ProtectUserRoute;