import { Card, Container, Header } from 'semantic-ui-react'

import PoseCard from './PoseCard'

function PoseContainer({ poseData, addPracticeCard }) {

    const poseCard = poseData.map((pose) => {
        return <PoseCard key={pose.id} pose={pose} addPracticeCard={addPracticeCard} />
    })

    // Conditional logic for search feature? NOT WORKING
    // const poseCard = 
    //     searchResults === "" ? (
    //         poseData.map((pose) => {
    //             return <PoseCard key={pose.id} pose={pose} addPracticeCard={addPracticeCard} />
    //             })
    //     ) : (
    //         searchResults.map((pose) => {
    //             return <PoseCard key={pose.id} pose={pose} addPracticeCard={addPracticeCard} />
    //         })
    //     )

    return (
        <Container style={{ margin: '50px'}}>
            <Header as='h2'>Poses</Header>
            <Card.Group centered itemsPerRow={3}>
                {poseCard}
            </Card.Group>
        </Container>

    );
};

export default PoseContainer