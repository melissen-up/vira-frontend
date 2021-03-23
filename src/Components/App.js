// import logo from './logo.svg';
// import './App.css';
import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { setCurrentUser } from "../redux/currentUserSlice"

// Components
import Home from "./Home"
import Login from "./Login"


function App() {

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  // auto-login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((user) => {
          console.log(user);
          // response => setCurrentUser
          dispatch(setCurrentUser({ 
            username: user.username, 
            password: user.password, 
            realname: user.realname,
            bio: user.bio,
            image: user.image 
          }));
        })
    }
  }, [dispatch]);

  
  return (
    <Switch >
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Home} />
    </Switch>
  );
}

export default App;
