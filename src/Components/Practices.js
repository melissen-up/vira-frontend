import { Card, Container, Header } from 'semantic-ui-react'

import PracticeCard from './PracticeCard'

function Practices({ practiceData, currentUser }) {

    const userPractices = practiceData.filter((practice) => practice.teacher_id = currentUser.id )

    const practiceCard = userPractices.map((practice) => {
        return <PracticeCard key={practice.id} practice={practice}/>
    })
    return (
        <>
            <Container>
                <Header as='h1'>
                    Practices
                </Header>
                <Card.Group>
                    {practiceCard}
                </Card.Group>
            </Container>
        </>
    )
};

export default Practices