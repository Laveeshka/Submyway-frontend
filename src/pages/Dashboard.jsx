import { useEffect } from "react"
// routing
import { Navigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { autoLoginUser } from "../redux/userSlice";

// --------------------------------------------------------------------------

export default function Dashboard(){

    // retrieve actions and state from store
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    // useEffect here
    useEffect(() => {
        if (token.length > 1) {
            try {
                const resultAction = dispatch(autoLoginUser(token)).unwrap();
              } catch (err) {
                console.warn(err);
              }
        } else {
            console.log('No token found, try logging in!');
        }
    }, [])

    if (!isLoggedIn) return <Navigate to="/login"/>


    return (
        <div>Dashboard page</div>
    )
}