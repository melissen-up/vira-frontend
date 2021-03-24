import { useState } from "react";

import CategoryContainer from './CategoryContainer'
import PoseContainer from './PoseContainer'
import PracticeBuild from './PracticeBuild'

import { Segment, Button } from 'semantic-ui-react'


function CreatePractice({ setPoseData, poseData, catData, setShowCreate }) {

    const [ clickedCat, setClickedCat ] = useState(2);

    function handleCategoryClick() {
        fetch(`http://localhost:3000/category/${clickedCat}`)
            .then((r) => r.json())
            .then((cat) => {
              // console.log(poses);
            setPoseData(cat.poses);
            });
    }

    return (
        <>
        <CategoryContainer catData={catData} handleCategoryClick={handleCategoryClick} />

        <Button 
            onClick={handleCategoryClick}
            content='Click for Poses'
        />
                    
        <Segment>
            <PracticeBuild />
        </Segment>

        { clickedCat !== [] ?
        <PoseContainer poseData={poseData} /> :
        null }

        <Segment>
            <div style={{ 'text-align': 'center'}}>
                <Button 
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