import { Card, Button, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'


function PracticeCard({ practice }) {

    const history = useHistory();

    return (
        <>
            <Card>
                <Card.Content style={{'text-align': 'center'}}>
                    {/* <Icon
                    link
                    onClick={handlePracticeRemove}
                    style={{float: 'right'}}
                    size='small'
                    name="x"
                    /> */}
                    <Card.Header>{practice.name}</Card.Header>
                    <Card.Meta></Card.Meta>
                    <Card.Description>
                    {practice.description}
                    </Card.Description>
                </Card.Content>
                
                <Card.Content extra style={{'text-align': 'center'}}>
                    {/* <div className='ui two buttons'> */}
                    <Button basic color='violet' onClick={() => history.push(`/practice-show/${practice.id}`)}>
                        View Practice
                    </Button>
                    {/* </div> */}
                </Card.Content>
            </Card>
        </>
    )
};

export default PracticeCard
