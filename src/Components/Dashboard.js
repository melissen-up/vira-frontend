
import { Button, Segment } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'


function Dashboard({ setShowCreate }) {
    const history = useHistory();

    return (
        <>
            <h1>DASHBOARD</h1>

            <Segment></Segment>
            
            <Segment></Segment>

            <Segment textAlign='center'>
                <Button 
                    onClick={() => history.push("/create-practice")}
                    content='Create New Practice'
                    color='violet'
                />
            </Segment>
        </>

    );
};

export default Dashboard;