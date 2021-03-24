import { Button, Image, Modal, Form, Input, TextArea } from 'semantic-ui-react'
import { useState } from 'react'

function EditProfileModal({ setModal, modal, currentUser, setCurrentUser }) {
    const [open, setOpen] = useState({modal});
    const {
        username,
        realname,
        image,
        bio
    } = currentUser
    const [formData, setFormData]= useState({
        username: username, 
        realname: realname,
        bio: bio,
        image: image
    })
    function handleSubmit() {
        const token = localStorage.getItem("token");
            if (token) {
            fetch("http://localhost:3000/current-user", {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
                })
                .then((r) => r.json())
                .then((user) => {
                // response => update the user in state
                setCurrentUser(user);
                setModal(false)
                });
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
            size='tiny'
            // trigger={<Button>Show Modal</Button>}
        >
            <Modal.Header>Update Profile</Modal.Header>
            <Modal.Content image>
                <Image size='small' src={formData.image} alt={username} wrapped />
                <Modal.Description>
                <Form onSubmit={(e) => handleSubmit(e)}>

                    <Form.Field required>
                        <label style={{ "text-align": "left" }}>Username</label>
                        <Input placeholder='Username' name="username" value={formData.username} onChange ={(e) =>handleChange(e)}/>
                    </Form.Field>
                    
                    <Form.Field required>
                        <label style={{ "text-align": "left" }}>First Name</label>
                        <Input type="realname" placeholder="First Name" name="realname" value={formData.realname} onChange ={(e) =>handleChange(e)} />
                    </Form.Field>
                    
                    <Form.Field >
                        <label style={{ "text-align": "left" }}>Bio</label>
                        <TextArea placeholder="Bio" name="bio" value={formData.bio} onChange ={(e) =>handleChange(e)} />
                    </Form.Field>

                    <Form.Field required>
                        <label style={{ "text-align": "left" }}>Image Address</label>
                        <Input placeholder="http://" name="image" value={formData.image} onChange ={(e) =>handleChange(e)} />
                    </Form.Field>

                    <Button 
                        type='submit'
                        color='violet'
                        content='Update Profile'
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
                {/* <Button
                type='submit'
                content='Update Profile'
                labelPosition='right'
                icon='checkmark'
                onClick={() => setModal(false)}
                positive
                /> */}
            </Modal.Actions>
        </Modal>
    );
};

export default EditProfileModal