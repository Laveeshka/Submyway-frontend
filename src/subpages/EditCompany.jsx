// redux
import { useSelector } from "react-redux";
// navigate
import { Navigate, useParams } from "react-router-dom";
// components
// @mui

// --------------------------------------------------------------------------

export default function EditCompany(){

    // retrieve state from redux store
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const companies = useSelector((state) => state.companies.companies);

    // retrieve the company id from the URL
    const { companyId } = useParams();

    // find the company with companyId
    const company = companies.find((element) => element.id == companyId)

    // navigate user to login page if not authenticated
    if (!isLoggedIn) return <Navigate to="/login"/>;

    return (
        <div>Edit company subpage</div>
    )
}