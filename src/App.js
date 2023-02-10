import './App.css';
import Router from "./routes/routes.js";
// useEffect
import { useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "./redux/subscriptionsSlice";


function App() {

  //retrieve state and actions from store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = useSelector((state) => state.user.token);
  let subscriptions = useSelector((state) => state.subscriptions.subscriptions);
  console.log("Subscriptions are: ", subscriptions)
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn){
      try {
        const resultAction = dispatch(getSubscriptions(token)).unwrap();
        //console.log("Fetched subscriptions data in Subscriptions page is: ", resultAction);
      } catch (err) {
        console.warn(err);
      }
    }
  }, [isLoggedIn])

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
