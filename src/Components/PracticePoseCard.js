import { Card, Button, Item } from 'semantic-ui-react'

import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import PoseCard from './PoseCard';


function PracticePoseCard({ pPose, setShowPose, handlePoseShow }) {
    const history = useHistory();

    const {
        id,
        image,
        breaths,
        name_english,
        name_sanskrit,
        description
    } = pPose

    function onShowClick() {
        setShowPose(pPose);
        handlePoseShow(id);
    };

    // const showPose 

    return (
        // <Button
        //     // onClick={}
        //     inverted
        //     style={{ 'text-align': 'center', margin: '5px', 'background-color': '#2d18f0'}}
        //     content={ name_english }
        //     description={ name_sanskrit }
        //     onClick={() => onShowClick}
        // />
        <>
            <Item>
                <Item.Image size='small' src={image} />

                <Item.Content verticalAlign='middle'>
                    <Item.Header>{name_english} | <i>{name_sanskrit}</i></Item.Header>
                    <Item.Meta>Breaths: {breaths}</Item.Meta>
                    <Item.Description>{description}</Item.Description>
                    <Item.Extra>
                    <Button floated='right'>Remove Pose</Button>
                    </Item.Extra>
                </Item.Content>
            </Item>
        </>
    )
};

export default PracticePoseCard