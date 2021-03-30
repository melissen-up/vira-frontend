import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import PracticePoseCard from './PracticePoseCard'

import { Icon, Segment, Item, Container } from 'semantic-ui-react'


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
    console.log(practice);

    // const poseCards = practice.poses.map((pPose) => {
    //     return <PracticePoseCard pPose={pPose} key={pPose.id} />
    // })

    function handlePoseShow() {

    }

    if (!isLoaded) return <h2>Loading...</h2>;

    return (
        <>
            <Segment style={{ margin: '15px' }}>
                <h1>{practice.name}</h1>
                <Icon 
                link
                onClick={handleDeleteClick}
                style={{float: 'right'}}
                size='large'
                name="x"
                />
                <h4>Description: {practice.description}</h4>
            </Segment>

            <Item.Group divided>
                {practice.poses.map((pPose) => {
                        return <PracticePoseCard key={pPose.id} pPose={pPose} setShowPose={setShowPose} handlePoseShow={handlePoseShow} />
                    })
                }
            </Item.Group>
        </>
    )
};

export default PracticeShow