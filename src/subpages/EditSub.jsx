// redux
import { sub } from "date-fns";
import { useSelector } from "react-redux";
// navigation
import { Navigate, useParams } from "react-router-dom";
// components
import EditStepForm from "../components/stepform/EditStepForm";

// --------------------------------------------------------------------------

export default function EditSub() {
  //retrieve state from store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  //retrieve the subscription id param from the URL
  const { id } = useParams();
  //find the subscription
  const subscriptions = useSelector(
    (state) => state.subscriptions.subscriptions
  );
  const subscription = subscriptions.find((sub) => sub.id == id);
  if (!isLoggedIn) return <Navigate to="/login" />;

  return <EditStepForm subscription={subscription} />;
}
