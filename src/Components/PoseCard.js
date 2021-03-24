import { Card, Button } from 'semantic-ui-react'

import { useHistory } from 'react-router-dom'


function PoseCard({ pose, addPracticeCard }) {
    const history = useHistory();

    const {
        id,
        name_english,
        name_sanskrit
    } = pose

    function handleClick(e) {
        console.log(e);
        addPracticeCard(pose)
    }

    return (
        <Button
            onClick={() => handleClick()}
            style={{ 'text-align': 'center', margin: '5px' }}
            color='violet'
            content={ name_english }
            description={ name_sanskrit }

        />
    )
};

export default PoseCard