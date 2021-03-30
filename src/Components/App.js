// import logo from './logo.svg';
// import './App.css';
import { Switch, Route, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

// Redux ish
// import { setCurrentUser } from "../redux/currentUserSlice"
// import { useDispatch, useSelector } from "react-redux";

// Components
import Footer from "./Footer"
import Login from "./Login"
import Signup from "./Signup"
import Sidebar from "./Sidebar";
import CreatePractice from './CreatePractice'
import Dashboard from './Dashboard'
import Practices from "./Practices"
import PracticeShow from "./PracticeShow"

// Styling
import { Grid } from 'semantic-ui-react'


function App() {

  // const { MediaContextProvider, Media } = createMedia({
  //   breakpoints: {
  //     mobile: 0,
  //     tablet: 768,
  //     computer: 1024,
  //   },
  // })
  
  // Redux variables 
  // const dispatch = useDispatch();
  // const currentUser = useSelector((state) => state.currentUser);

  const history = useHistory();
  const [ catData, setCatData ] = useState([]);
  const [ practiceData, setPracticeData ] = useState([]);
  const [ currentUser, setCurrentUser ] = useState({
    username: "",
    realname: "",
    image: "https://afmnoco.com/wp-content/uploads/2019/07/74046195_s.jpg",
    bio: ""
  });

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

   // fetch categories
  useEffect(() => {
      fetch("http://localhost:3000/category/index")
          .then((r) => r.json())
          .then((categories) => {
            // console.log(poses);
          setCatData(categories);
          });
  }, []);

  // fetch practices
  useEffect(() => {
      fetch("http://localhost:3000/practice/index")
          .then((r) => r.json())
          .then((practices) => {
              // console.log(poses);
          setPracticeData(practices);
          });
  }, []);

  function handlePracticeDelete(id) {
    const newPracticeArr = practiceData.filter((practice) => practice.id !== id)
    // console.log(newPracticeArr);
    setPracticeData(newPracticeArr)
  }

  function handlePracticeCreate(newPractice) {
    const newPracticeArr = practiceData.filter((practice) => practice.id !== newPractice.id)
    setPracticeData([...newPracticeArr, newPractice])
  }

  return (
    <>
      <Grid>
        <Grid.Column width={4}>
            <Sidebar setCurrentUser={setCurrentUser} currentUser={currentUser} />
        </Grid.Column>

        <Grid.Column width={10}>
          <Switch >
            <Route exact path="/login" > 
              <Login setCurrentUser={setCurrentUser} />
            </Route> 

            <Route exact path="/signup" > 
              <Signup setCurrentUser={setCurrentUser} />
            </Route> 

            <Route path="/home" component={Dashboard}/>

            <Route exact path="/create-practice">
                <CreatePractice currentUser={currentUser} setCurrentUser={setCurrentUser} catData={catData} handlePracticeCreate={handlePracticeCreate} />
            </Route>

            <Route exact path="/practices">
                <Practices currentUser={currentUser} practiceData={practiceData} />                    
            </Route>

            <Route exact path="/practice-show/:id">
                <PracticeShow currentUser={currentUser} handlePracticeDelete={handlePracticeDelete} />                    
            </Route>

          </Switch>
        </Grid.Column>

        <Grid.Column width={2} >
          
        </Grid.Column>
      </Grid>

      <Footer />
    </>
  );
}

export default App;
