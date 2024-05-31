import { Navigate, useLocation } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";





const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    const location = useLocation()
    if (loading) {
        return <div className="flex justify-center items-center mx-auto container"><span className="loading item-center mx-auto text-center loading-spinner loading-lg"></span></div>
    }


    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;