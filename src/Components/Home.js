import { useEffect, useState } from "react";
import { useHistory, Switch, Route } from "react-router-dom";

import Sidebar from './Sidebar'
import CategoryContainer from '.CategoryContainer'

import { Container} from 'semantic-ui-react'

function Home({ setCurrentUser, currentUser }) {
    // const currentUser = useSelector((state) => state.currentUser);
    const [ poseData, setPoseData ] = useState([])

    console.log(currentUser);

    // fetch poses
    useEffect(() => {
        console.log("Hello");
    
        const token = localStorage.getItem("token");
        if (token) {
            fetch("http://localhost:3000/pose/index", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
            .then((r) => r.json())
            .then((poses) => {
              // console.log(poses);
            setPoseData(poses);
            });
        }
    }, []);

    return(
        <>
        <Sidebar setCurrentUser={setCurrentUser} currentUser={currentUser} />
        <Switch >
            <Route exact path="/create" > 
                <CategoryContainer currentUser={currentUser} setCurrentUser={setCurrentUser} />
            </Route> 
        </Switch>
        </>

    );
};

export default Home