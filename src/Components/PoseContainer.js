import { Card, Container } from 'semantic-ui-react'

import PoseCard from './PoseCard'

function PoseContainer({ poseData }) {

    const poseCard = poseData.map((pose) => {
        return <PoseCard key={pose.id} pose={pose} />
    })

    return (
        <Container>
            <Card.Group centered itemsPerRow={3}>
                {poseCard}
            </Card.Group>
        </Container>

    );
};

export default PoseContainer