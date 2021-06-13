import { Segment, Header, Card } from 'semantic-ui-react'

import PracticeCard from './PracticeCard'

function Practices({ practiceData, currentUser }) {

    const userPractices = practiceData.filter((practice) => practice.teacher_id === currentUser.id )

    console.log(userPractices);

    const practiceCard = userPractices.map((practice) => {
        return <PracticeCard key={practice.id} practice={practice}/>
    })
    return (
        <>
            <Segment style={{ 'margin-top': '5em' }}>
                <Header as='h1' color='violet' >
                    Saved Practices
                </Header>
            </Segment>
                <Card.Group centered >
                    {practiceCard}
                </Card.Group>
        </>
    )
};

export default Practices