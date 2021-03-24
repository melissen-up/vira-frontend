import { Card, Container } from 'semantic-ui-react'

import PoseCard from './PoseCard'

function PoseContainer({ poseData, addPracticeCard }) {

    const poseCard = poseData.map((pose) => {
        return <PoseCard key={pose.id} pose={pose} addPracticeCard={addPracticeCard} />
    })

    return (
        <Container style={{ margin: '50px'}}>
            <Card.Group centered itemsPerRow={3}>
                {poseCard}
            </Card.Group>
        </Container>

    );
};

export default PoseContainer