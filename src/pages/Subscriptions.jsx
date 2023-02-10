// useEffect
import { useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "../redux/subscriptionsSlice";
// navigation
import { Navigate } from "react-router-dom";

// --------------------------------------------------------------------------

export default function Subscriptions() {

  //retrieve state and actions from store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
//   const token = useSelector((state) => state.user.token);
    let subscriptions = useSelector((state) => state.subscriptions.subscriptions);
//   console.log("Subscriptions are: ", subscriptions)
//   const dispatch = useDispatch();

//   useEffect(() => {
//     try {
//         const resultAction = dispatch(getSubscriptions(token)).unwrap();
//         //console.log("Fetched subscriptions data in Subscriptions page is: ", resultAction);
//       } catch (err) {
//         console.warn(err);
//       }
//   }, [])


  if (!isLoggedIn) return <Navigate to="/login" />;

  return <div>{subscriptions.length > 0 ? "Yass data" : "Nope"}</div>;
}
