import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import CategoryContainer from './CategoryContainer'
import PoseContainer from './PoseContainer'
import CreatePracticeModal from "./SavePracticeModal";
// import PracticeBuild from './PracticeBuild'

import { Segment, Button, Header, Card, Icon, Divider } from 'semantic-ui-react'

function CreatePractice({ catData, currentUser, setCurrentUser, handlePracticeCreate, initPoseData }) {

    const [ clickedCat, setClickedCat ] = useState(0);
    const [ practiceCards, setPracticeCards ] = useState([]);
    const [ modal, setModal ] = useState(false)
    const [ poseData, setPoseData ] = useState([]); 

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    console.log(searchTerm);
    const history = useHistory();

    useEffect(() => {
        const results = initPoseData.filter(pose => (
            pose.name_english.toString().toLowerCase().includes(searchTerm)
            // console.log(pose.name_english.toString().toLowerCase())
        ));
        setSearchResults(results);
    }, [searchTerm])

    function handleCategoryClick(id) {        
        fetch(`http://localhost:3000/category/${id}`)
            .then((r) => r.json())
            .then((cat) => {
            setPoseData(cat.poses);
            });
    };

    function addPracticeCard(pose) {
        const newArr = [...practiceCards, pose]
        setPracticeCards(newArr)
    }

    const practicePoseCards = practiceCards.map((pCard) => {
        return (
            <Card>
                <Card.Content>
                <Card.Header>
                    <Icon color='grey' onClick={() => handlePoseRemoveClick(pCard)} size='small' name='x' style={{ float: 'right'}}/>
                    {pCard.name_english}
                </Card.Header>
                <Card.Description>
                    {pCard.name_sanskrit}
                </Card.Description>
                </Card.Content>
            </Card>
        )
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

        <Divider />

        { clickedCat !== [] ?
        <PoseContainer poseData={poseData} addPracticeCard={addPracticeCard} searchResults={searchResults} /> :
        null }

        {/* <Divider horizontal>Or</Divider> */}

        {/* <Grid textAlign='center' >
            <Grid.Column style={{ maxWidth: 300 }} >
                <Input 
                    fluid 
                    icon='search' 
                    placeholder='Search Pose by Name ...'
                    value={searchTerm}
                    onChange={handleChange}
                />    
            </Grid.Column>    
        </Grid>       */}
        
        <Segment padded>
            <Header as='h2'>Practice</Header>
            <Card.Group itemsPerRow={4}>
                {practicePoseCards === [] ? null : practicePoseCards }
            </Card.Group>
        </Segment>


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