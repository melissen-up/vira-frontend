
import { Button, Segment } from 'semantic-ui-react'


function Dashboard({ setShowCreate }) {

    return (
        <>
            <h1>DASHBOARD</h1>

            <Segment></Segment>
            
            <Segment></Segment>

            <Segment textAlign='center'>
                <Button 
                    onClick={() => setShowCreate(true)}
                    content='Create New Practice'
                    color='violet'
                />
            </Segment>
        </>

    );
};

export default Dashboard;