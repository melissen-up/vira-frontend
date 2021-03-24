import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Sidebar from './Sidebar'
import CreatePractice from './CreatePractice'
import Dashboard from './Dashboard'

import { Grid, Button, Segment } from 'semantic-ui-react'

function Home({ setCurrentUser, currentUser }) {
    // const currentUser = useSelector((state) => state.currentUser);
    
    const [ catData, setCatData ] = useState([]);
    const [ showCreate, setShowCreate ] = useState(false);

    console.log(currentUser);

     // fetch categories
    useEffect(() => {
        console.log("I'm running?");
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
                    {   showCreate === false ?
                        <Dashboard setShowCreate={setShowCreate} /> :
                        <CreatePractice currentUser={currentUser} setCurrentUser={setCurrentUser} catData={catData} setShowCreate={setShowCreate}/>
                    }
                </Grid.Column>

                <Grid.Column width={2}>
                    
                </Grid.Column>
            </Grid>
        
        
        </>

    );
};

export default Home