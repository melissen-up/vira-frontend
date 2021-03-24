import { useState } from "react";

import CategoryContainer from './CategoryContainer'
import PoseContainer from './PoseContainer'
import PracticeBuild from './PracticeBuild'

import { Segment, Button, Header, Card } from 'semantic-ui-react'


function CreatePractice({ setPoseData, poseData, catData, setShowCreate }) {

    const [ clickedCat, setClickedCat ] = useState(2);
    const [ practiceCards, setPracticeCards ] = useState([]);

    function handleCategoryClick() {
        fetch(`http://localhost:3000/category/${clickedCat}`)
            .then((r) => r.json())
            .then((cat) => {
              // console.log(poses);
            setPoseData(cat.poses);
            });
    }

    function addPracticeCard(pose) {
        const newArr = [...practiceCards, pose]
        setPracticeCards(newArr)
    }

    const practicePoseCards = practiceCards.map((pCard) => {
        return <Card 
                raised header={pCard.name_english} 
                description={pCard.name_sanskrit} 
            />
    })

    return (
        <>

        <CategoryContainer catData={catData} handleCategoryClick={handleCategoryClick} />

        <div style={{ 'text-align': 'center'}}>
            <Button 
                onClick={handleCategoryClick}
                content='Click for Poses'
            />
        </div>
                    
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
                <Button
                    secondary
                    onClick={() => setShowCreate(false)}
                    content='Cancel without Saving'
                    color='violet'
                />
            </div>
        </Segment>

        </>
    )
};

export default CreatePractice;