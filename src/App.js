import './App.css';
import Router from "./routes/routes.js";
// useEffect
import { useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "./redux/subscriptionsSlice";
import { getCompanies } from './redux/companiesSlice';

function App() {

  //retrieve state and actions from store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn){
      try {
        dispatch(getSubscriptions(token)).unwrap();
        dispatch(getCompanies(token)).unwrap();
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
