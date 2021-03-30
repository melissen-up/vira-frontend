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

// Logo
import logoSmall from '../assets/vira-logo.png';

// Styling
import { Grid, Image } from 'semantic-ui-react'


function App() {

  const history = useHistory();
  const [ catData, setCatData ] = useState([]);
  const [ practiceData, setPracticeData ] = useState([]);
  const [ login, setLogin ] = useState(false)
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
          setLogin(true)
          // history.push("/home");
          
        })
    } else {
      setLogin(false)
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

      { login === false ?
        <Login setCurrentUser={setCurrentUser} setLogin={setLogin} /> :
        <>
          <Grid>
            <Grid.Column width={4}>
                <Sidebar setCurrentUser={setCurrentUser} currentUser={currentUser} setLogin={setLogin} />
            </Grid.Column>

            <Grid.Column width={10}>
              <Switch >
                <Route exact path="/login" > 
                  <Login setCurrentUser={setCurrentUser} />
                </Route> 

                <Route exact path="/signup" > 
                  <Signup setCurrentUser={setCurrentUser} />
                </Route> 

                <Route path="/home" >
                  <Dashboard practiceData={practiceData} />
                </Route>

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
              <Image src={logoSmall} tiny />
            </Grid.Column>
          </Grid>

          <Footer />
      </>
      };

      
      {/* // <Grid>
      //   <Grid.Column width={4}>
      //       <Sidebar setCurrentUser={setCurrentUser} currentUser={currentUser} />
      //   </Grid.Column>

      //   <Grid.Column width={10}>
      //     <Switch >
      //       <Route exact path="/login" > 
      //         <Login setCurrentUser={setCurrentUser} />
      //       </Route> 

      //       <Route exact path="/signup" > 
      //         <Signup setCurrentUser={setCurrentUser} />
      //       </Route> 

      //       <Route path="/home" >
      //         <Dashboard practiceData={practiceData} />
      //       </Route>

      //       <Route exact path="/create-practice">
      //         <CreatePractice currentUser={currentUser} setCurrentUser={setCurrentUser} catData={catData} handlePracticeCreate={handlePracticeCreate} />
      //       </Route>

      //       <Route exact path="/practices">
      //         <Practices currentUser={currentUser} practiceData={practiceData} />                    
      //       </Route>

      //       <Route exact path="/practice-show/:id">
      //         <PracticeShow currentUser={currentUser} handlePracticeDelete={handlePracticeDelete} />                    
      //       </Route>

      //     </Switch>
      //   </Grid.Column>

      //   <Grid.Column width={2} >
      //     <Image src={logoSmall} tiny />
      //   </Grid.Column>
      // </Grid>

      // <Footer /> */}
  </>
  );
}

export default App;
