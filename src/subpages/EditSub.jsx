// redux
import { sub } from "date-fns";
import { useSelector } from "react-redux"
// navigation
import { Navigate, useParams } from "react-router-dom";
// components
import EditStepForm from "../components/stepform/EditStepForm";

// --------------------------------------------------------------------------

export default function EditSub(){

    //retrieve state from store
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    //retrieve the subscription id param from the URL
    const { subId } = useParams();
    console.log("Subscription id is: ", subId);

    if (!isLoggedIn) return <Navigate to="/login"/>

    return(
       <EditStepForm />
    )
}