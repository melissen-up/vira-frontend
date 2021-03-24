// import logo from './logo.svg';
// import './App.css';
import { Switch, Route, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

// Redux ish
// import { setCurrentUser } from "../redux/currentUserSlice"
// import { useDispatch, useSelector } from "react-redux";

// Components
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"


function App() {
  // Redux variables 
  // const dispatch = useDispatch();
  // const currentUser = useSelector((state) => state.currentUser);

  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({
    username: "",
    realname: "",
    image: "https://afmnoco.com/wp-content/uploads/2019/07/74046195_s.jpg",
    bio: ""
  });

  console.log(currentUser);

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
          setCurrentUser(user)
          history.push("/home");
          
        })
    } else {
      history.push("/login")
    }
  }, []);



  return (
    <Switch >
      <Route exact path="/login" > 
        <Login setCurrentUser={setCurrentUser} />
      </Route> 

      <Route exact path="/signup" > 
        <Signup setCurrentUser={setCurrentUser} />
      </Route> 

      <Route path="/home">
        <Home setCurrentUser={setCurrentUser} currentUser={currentUser} />
      </Route>
    </Switch>
  );
}

export default App;
