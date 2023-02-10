// redux
import { useSelector } from "react-redux"
// navigation
import { Navigate } from "react-router-dom";

// --------------------------------------------------------------------------

export default function Companies(){

    //retrieve state from store
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    if (!isLoggedIn) return <Navigate to="/login"/>

    return(
        <div>Companies page</div>
    )
}