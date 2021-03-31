import { Button, Modal, Form, Input, TextArea } from 'semantic-ui-react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'

function CreatePracticeModal({ setModal, modal, currentUser, practiceCards, handlePracticeCreate }) {
        
    const [open, setOpen] = useState({modal});
    const history = useHistory();

    const {
        id
    } = currentUser

    const [formData, setFormData]= useState({
        teacher_id: id,
        poses: practiceCards,
        description: "", 
        name: ""
    });

    function handleSubmit(e) {
        console.log("In handleSubmit");
        const token = localStorage.getItem("token");
            if (token) {
            fetch("http://localhost:3000/practice/new", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
                })
                .then((r) => r.json())
                .then((practice) => {
                handlePracticeCreate(practice);
                setModal(false)
                setFormData(
                    {
                        teacher_id: id,
                        poses: practiceCards,
                        description: "", 
                        name: ""
                    }
                )
                history.push("/practices")
                });
            } else {
                console.log("No Token");
            }
        
    };

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            // trigger={<Button>Show Modal</Button>}
        >
            <Modal.Header>Create Practice</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Field required>
                        <label style={{ "text-align": "left" }}>Practice Name</label>
                        <Input placeholder='Practice Name' name="name" value={formData.name} onChange ={(e) =>handleChange(e)}/>
                    </Form.Field>
                    
                    <Form.Field required>
                        <label style={{ "text-align": "left" }}>Practice Description</label>
                        <TextArea placeholder="Describe your practice . . . " name="description" value={formData.description} onChange ={(e) =>handleChange(e)} />
                    </Form.Field>

                    <Button 
                        type='submit'
                        color='violet'
                        content='Create Practice'
                        icon='add'
                        labelPosition='left'
                    />
                </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setModal(false)}>
                Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    )
};

export default CreatePracticeModal