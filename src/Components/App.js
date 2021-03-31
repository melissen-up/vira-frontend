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
import Practices from "./SavedPractices"
import SavedPracticeShow from "./SavedPracticeShow"

// Logo
import logoSmall from '../assets/vira-logo.png';

// Styling
import { Grid, Image, Container, Sticky } from 'semantic-ui-react'


function App() {

  const history = useHistory();
  const [ catData, setCatData ] = useState([]);
  const [ practiceData, setPracticeData ] = useState([]);
  const [ teacherData, setTeacherData ] = useState([]);
  const [ login, setLogin ] = useState(false);
  const [ signup, setSignup ] = useState(false);
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
          setPracticeData(practices);
          });
  }, []);

  // fetch users
  useEffect(() => {
      fetch("http://localhost:3000/teacher/index")
      .then((r) => r.json())
      .then((teachers) => {
        setTeacherData(teachers);
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
        <div 
          style={{
            backgroundColor: '#5829bb',
            height: '100%'
            }}>
          { 
            signup === false ? 
            <Login setCurrentUser={setCurrentUser} setLogin={setLogin} setSignup={setSignup} /> :
            <Signup setCurrentUser={setCurrentUser} setLogin={setLogin} setSignup={setSignup} /> 
          }
        </div> :
        <>
          <Grid >
            <Grid.Column width={4}>
              <Sticky>
                <Sidebar setCurrentUser={setCurrentUser} currentUser={currentUser} setLogin={setLogin} />
              </Sticky>
            </Grid.Column>

            <Grid.Column width={10}>
              <Switch >
                {/* <Route exact path="/login" > 
                  <Login setCurrentUser={setCurrentUser} />
                </Route> 

                <Route exact path="/signup" > 
                  <Signup setCurrentUser={setCurrentUser} />
                </Route>  */}

                <Route path="/home" >
                  <Dashboard practiceData={practiceData} currentUser={currentUser} teacherData={teacherData} />
                </Route>

                <Route exact path="/create-practice">
                  <CreatePractice currentUser={currentUser} setCurrentUser={setCurrentUser} catData={catData} handlePracticeCreate={handlePracticeCreate} />
                </Route>

                <Route exact path="/practices">
                  <Practices currentUser={currentUser} practiceData={practiceData} />                    
                </Route>

                <Route exact path="/practice-show/:id">
                  <SavedPracticeShow currentUser={currentUser} handlePracticeDelete={handlePracticeDelete} />                    
                </Route>

              </Switch>
            </Grid.Column>

            <Grid.Column width={2} >
              <Container style={{ 'margin-top': '10px' }}>
                <Sticky>
                  <Image src={logoSmall} size='tiny' centered />
                </Sticky>
              </Container>
            </Grid.Column>
          </Grid>

          <Footer />
      </>
      }
  </>
  );
}

export default App;
