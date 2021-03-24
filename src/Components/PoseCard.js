import { Card } from 'semantic-ui-react'

import { useHistory } from 'react-router-dom'


function PoseCard({ pose }) {
    const history = useHistory();

    const {
        id,
        name_english,
        name_sanskrit
    } = pose

    return (
        <Card
            link
            style={{ 'text-align': 'center' }}
            raised
            color='violet'
            header={ name_english }
            description={ name_sanskrit }

        />
    )
};

export default PoseCard