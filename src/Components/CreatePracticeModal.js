import { Button, Modal, Form, Input, TextArea } from 'semantic-ui-react';
import { useState } from 'react';

function CreatePracticeModal({ setModal, modal, currentUser, setCurrentUser }) {
        
        const [open, setOpen] = useState({modal});

        const {
            id
        } = currentUser

        const [formData, setFormData]= useState({
            teacher_id: id

        })
    function handleSubmit(e) {
        console.log("Practice Created");
        // const token = localStorage.getItem("token");
        //     if (token) {
        //     fetch("http://localhost:3000/current-user", {
        //         method: "PATCH",
        //         headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`,
        //         },
        //         body: JSON.stringify(formData),
        //         })
        //         .then((r) => r.json())
        //         .then((user) => {
        //         // response => update the user in state
        //         setCurrentUser(user);
        //         setModal(false)
        //         });
        //     }
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
                        <Input placeholder='Practice Name' name="name" value={formData.username} onChange ={(e) =>handleChange(e)}/>
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