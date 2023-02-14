// redux
import { useSelector } from "react-redux"
// navigation
import { Navigate } from "react-router-dom";
// components
import StepForm from "../components/stepform/StepForm";
// --------------------------------------------------------------------------

export default function CreateSub(){

    //retrieve state from store
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    if (!isLoggedIn) return <Navigate to="/login"/>

    return(
        <StepForm />
    )
}