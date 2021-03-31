
import { Button, Segment, Card, Header } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import PracticeCard from './PracticeCard';

// import { Card } from '@material-ui/core';


function Dashboard({ practiceData, currentUser }) {
    const history = useHistory();
    const [startIndex, setStartIndex] = useState(0);

    console.log(practiceData);

    const notUserPractices = practiceData.filter((practice) => practice.teacher_id !== currentUser.id)

    console.log(notUserPractices);

    const practiceComponents = notUserPractices
        .slice(startIndex, startIndex + 3)
        .map((practice) => {
            return (
                <PracticeCard 
                    key={practice.id}
                    practice={practice}
                />
            );
        });

    return (
        <>
            <Segment style={{ 'margin-top': '5em' }}>
                <Header as='h1' color='yellow'>
                    Explore Practices
                </Header>

                <Card.Group>
                    {practiceComponents}
                </Card.Group>
            </Segment>
            
            <Segment>
                <Header as='h1' color='yellow'>
                    Explore Teachers
                </Header>
            </Segment>

            <Segment textAlign='center'>
                <Button 
                    onClick={() => history.push("/create-practice")}
                    content='Create New Practice'
                    color='yellow'
                />
            </Segment>
        </>

    );
};

export default Dashboard;