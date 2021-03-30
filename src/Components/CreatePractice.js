import { useState } from "react";
import { useHistory } from "react-router-dom";

import CategoryContainer from './CategoryContainer'
import PoseContainer from './PoseContainer'
import PracticeBuild from './PracticeBuild'

import { Segment, Button, Header, Card, Icon } from 'semantic-ui-react'
import CreatePracticeModal from "./SavePracticeModal";


function CreatePractice({ catData, setShowCreate, currentUser, setCurrentUser, handlePracticeCreate }) {

    const [ clickedCat, setClickedCat ] = useState(0);
    const [ practiceCards, setPracticeCards ] = useState([]);
    const [ modal, setModal ] = useState(false)
    const [ poseData, setPoseData ] = useState([]);

    const history = useHistory();

    function handleCategoryClick(id) {        
        fetch(`http://localhost:3000/category/${id}`)
            .then((r) => r.json())
            .then((cat) => {
              // console.log(poses);
            setPoseData(cat.poses);
            });
    };

    function addPracticeCard(pose) {
        const newArr = [...practiceCards, pose]
        setPracticeCards(newArr)
    }

    const practicePoseCards = practiceCards.map((pCard) => {
        return <Card 
                raised 
                header={pCard.name_english} 
                description={pCard.name_sanskrit}
                meta={<Icon color='grey' onClick={() => handlePoseRemoveClick(pCard)} size='small' name='x' style={{ float: 'right'}}/>} 
            />
    });

    function handlePoseRemoveClick(pose) {
        const newArr = practiceCards.filter((pCard) => pCard.id !== pose.id)
        setPracticeCards([...newArr])
    };

    function handleCreatePractice() {
        setModal((modal) => !modal)
    };

    return (
        <>
        { modal === true ? <CreatePracticeModal handlePracticeCreate={handlePracticeCreate} currentUser={currentUser} setCurrentUser={setCurrentUser} modal={modal} setModal={setModal} practiceCards={practiceCards} /> : null}
        <CategoryContainer catData={catData} handleCategoryClick={handleCategoryClick} />
                    
        <Segment padded>
            <Header as='h2'>Practice</Header>
            <Card.Group itemsPerRow={4}>
                {practicePoseCards === [] ? null : practicePoseCards }
            </Card.Group>
        </Segment>

        { clickedCat !== [] ?
        <PoseContainer poseData={poseData} addPracticeCard={addPracticeCard} /> :
        null }

        <Segment >
            <div style={{ 'text-align': 'center'}}>
                <Button.Group>
                    <Button
                        onClick={() => history.push("/home")}
                        content='Cancel'
                    />
                    <Button.Or />
                    <Button onClick={() => handleCreatePractice()}color='violet' content='Save Practice'/>
                </Button.Group>
            </div>
        </Segment>

        </>
    );
};

export default CreatePractice;