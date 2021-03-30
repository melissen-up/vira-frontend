import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import PracticePoseCard from './PracticePoseCard'

import { Icon, Segment, Item, Button } from 'semantic-ui-react'


function PracticeShow({ handlePracticeDelete }) {

    const params = useParams();
    const practiceId = params.id;
    const history = useHistory();

    const [ practice, setPractice ] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ showPose, setShowPose ] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:3000/practice/${practiceId}`)
        .then((r) => r.json())
        .then((practice) => {
            setPractice(practice);
            setIsLoaded(true);
        });
    }, [practiceId]);

    function handleDeleteClick(e) {
        fetch(`http://localhost:3000/practice/${params.id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((practice) => handlePracticeDelete(practice.id))
        history.push(`/practices`);
    }

    function handlePoseShow() {

    }

    if (!isLoaded) return <h2>Loading...</h2>;

    return (
        <>
            <Segment style={{ margin: '15px' }} textAlign='right'>
                <h1>{practice.name}</h1>
                <h4 style={{ color: 'rgba(0,0,0,.6)'}}>Description: {practice.description}</h4>
            </Segment>

            <Item.Group divided>
                {practice.poses.map((pPose) => {
                        return <PracticePoseCard key={pPose.id} pPose={pPose} setShowPose={setShowPose} handlePoseShow={handlePoseShow} />
                    })
                }
            </Item.Group>

            <Segment padded style={{ margin: '10px' }}>
                <div style={{ 'text-align': 'center'}}>
                        <Button 
                            onClick={() => handleDeleteClick()} 
                            color='violet' 
                            content='Delete Practice'
                            icon='x'
                            labelPosition='left'
                        />
                </div>
            </Segment>
        </>
    )
};

export default PracticeShow