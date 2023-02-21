// redux
import { useSelector } from "react-redux";
// navigate
import { Navigate } from "react-router-dom";
// components
// @mui

// --------------------------------------------------------------------------

export default function CreateCompany(){

    // retrieve state from redux store
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    // navigate user to login page if not authenticated
    if (!isLoggedIn) return <Navigate to="/login"/>

    return (
        <div>Create company subpage</div>
    )
}