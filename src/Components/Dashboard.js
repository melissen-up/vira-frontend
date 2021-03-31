
import { Button, Segment, Card, Header, Image } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import PracticeCard from './PracticeCard';

// import { Card } from '@material-ui/core';


function Dashboard({ practiceData, teacherData, currentUser }) {
    const history = useHistory();
    const [startIndex, setStartIndex] = useState(0);

    const notUserPractices = practiceData.filter((practice) => practice.teacher_id !== currentUser.id)

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

    const otherTeachers = teacherData.filter((teacher) => teacher.id !== currentUser.id)

    const teacherComponents = otherTeachers
        .slice(startIndex, startIndex + 3)
        .map((teacher) => {
            const year = new Date(teacher.created_at).getFullYear()
            return (
                <Card>
                <Card.Content>
                    <Image
                    circular
                    floated='right'
                    size='mini'
                    src={teacher.image}
                    />
                    <Card.Header>{teacher.realname}</Card.Header>
                    <Card.Meta>
                        Username: {teacher.username}
                        <br />
                        User since {year}
                    </Card.Meta>
                    <Card.Description>
                    {teacher.bio}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra style={{'text-align': 'center'}}>
                    <div>
                    <Button basic color='yellow'>
                        View Practices
                    </Button>
                    </div>
                </Card.Content>
                </Card>
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

                <Card.Group>
                    {teacherComponents}
                </Card.Group>
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