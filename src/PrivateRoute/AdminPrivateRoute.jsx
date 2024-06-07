import { Navigate, useLocation } from "react-router-dom";


import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";





const AdminPrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [role, roleLoading] = useRole()
    const location = useLocation()
    if (loading || roleLoading) {
        return <div className="flex justify-center items-center mx-auto container"><span className="loading item-center mx-auto text-center loading-spinner loading-lg"></span></div>
    }


    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    if(role !== "Admin"){
        return <Navigate to='/'></Navigate>
    }
    
    return (
        <div>
            {children}
        </div>
    );
};

export default AdminPrivateRoute;