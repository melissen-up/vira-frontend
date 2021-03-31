import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import PracticePoseCard from './PracticePoseCard'

import { Segment, Item, Button, Popup, Icon } from 'semantic-ui-react'


function SavedPracticeShow({ handlePracticeDelete, currentUser }) {

    const params = useParams();
    const practiceId = params.id;
    const history = useHistory();

    const [ practice, setPractice ] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ teacher, setTeacher ] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/practice/${practiceId}`)
        .then((r) => r.json())
        .then((res) => {
            setPractice(res.practice);
            setTeacher(res.teacher)
            setIsLoaded(true);
        });
    }, [practiceId]);
    
    console.log(params.id);

    function handleDeleteClick(e) {
        fetch(`http://localhost:3000/practice/${params.id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((res) => handlePracticeDelete(res.id))
        history.push(`/practices`);
    }

    if (!isLoaded) return <h2>Loading...</h2>;

    return (
        <>
            <Segment style={{ margin: '15px' }} textAlign='right'>
                <h1>{practice.name}</h1>
                
                <h4 style={{ color: 'rgba(0,0,0,.6)'}}>
                    { currentUser.id === teacher.id ? null : 
                    <>
                    Teacher: {teacher.realname} <nb />
                    <Popup
                        trigger={
                            <Icon name='info circle' />
                        }
                        position='top center'

                    >
                        <Popup.Header>{teacher.realname} | {teacher.username}</Popup.Header>
                        <Popup.Content>
                            {teacher.bio}
                        </Popup.Content>
                    </Popup>
                    </>      
                    }
                    <br/>
                    Description: {practice.description}
                </h4>
            </Segment>

            <Item.Group divided>
                {practice.poses.map((pPose) => {
                        return <PracticePoseCard key={pPose.id} pPose={pPose} />
                    })
                }
            </Item.Group>
            
            { currentUser.id === practice.teacher_id ? 
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
            </Segment> :
            null }
            
        </>
    )
};

export default SavedPracticeShow