import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import Sidebar from './Sidebar'
import CreatePractice from './CreatePractice'
import Dashboard from './Dashboard'

import { Grid, Button, Segment } from 'semantic-ui-react'

function Home({ setCurrentUser, currentUser }) {
    // const currentUser = useSelector((state) => state.currentUser);
    
    const [ catData, setCatData ] = useState([]);
    const [ showCreate, setShowCreate ] = useState(false);
    const [ showPractice, setShowPractice ] = useState(false);

     // fetch categories
    useEffect(() => {
        fetch("http://localhost:3000/category/index")
            .then((r) => r.json())
            .then((categories) => {
              // console.log(poses);
            setCatData(categories);
            });
    }, []);

    return(
        <>
            <Grid>
                <Grid.Column width={4}>
                    <Sidebar setCurrentUser={setCurrentUser} currentUser={currentUser} />
                </Grid.Column>

                <Grid.Column width={10}>
                    <Switch>
                        <Route path="/dashboard">
                            <Dashboard setShowCreate={setShowCreate} />
                        </Route>
                        <Route path="/create-practice">
                            <CreatePractice currentUser={currentUser} setCurrentUser={setCurrentUser} catData={catData} setShowCreate={setShowCreate}/>
                        </Route>
                        <Route path="/practices">
                            <Practices currentUser={currentUser} />                    
                        </Route>
                        <Route path="/practice-show/:id">
                            <PracticeShow currentUser={currentUser} />                    
                        </Route>
                    </Switch>
                </Grid.Column>

                <Grid.Column width={2}>
                    
                </Grid.Column>
            </Grid>
        
        
        </>

    );
};

export default Home