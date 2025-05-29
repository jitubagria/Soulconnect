import { useContext } from "react";
import useIsAdmin from "../hooks/useIsAdmin";
import { AuthContext } from "./AuthProvider";
import { PuffLoader } from "react-spinners";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AdminRoutes = ({ children }) => {
    const { loading } = useContext(AuthContext)
    const [isAdmin, isPending] = useIsAdmin()
    if (loading || isPending) {
        return <div className="h-screen flex justify-center items-center">
            <PuffLoader color="#fa005d" size={80} speedMultiplier={2} />
        </div>
    }
    if (!isAdmin) {
        return <Navigate to="/login"></Navigate>

    }
    if (isAdmin === "admin") {
        return children
    }
};

export default AdminRoutes;