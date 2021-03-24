import { Button, Checkbox, Form, Container, Header, Input, Image, Segment, Divider } from 'semantic-ui-react'

import { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup({ setCurrentUser }) {
    const [signupInfo, setSignupInfo]= useState({
        username:"", 
        password:"",
        realname:"" 
    })
    const history = useHistory();
    const [errors, setErrors] = useState([]);


    function handleChange(e) {
        setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
    };

    function handleSubmit(e){
        e.preventDefault()
            fetch("http://localhost:3000/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(signupInfo),
                    })
                    .then((response) => {
                        if (response.ok) {
                        return response.json();
                        } else {
                        return response.json().then((data) => {
                            throw data;
                        });
                        }
                    })
                    .then((data) => {
                        // set the user in state
                        setCurrentUser(data.teacher);
                        // save the token!
                        localStorage.setItem("token", data.token);
                        
                        setErrors([]);
                        // callGetOthersUseEffect(data.user);
                    })
                    .catch((data) => {
                        setErrors(data.errors);
                    });
                    // redirect!
                    history.push('/home');
    };

    return (
        <>
        <Container>
            <Segment textAlign='center'>
                <Header as='h2' icon textAlign='center'>
                    <Image src="../assets/vira-logo.png" />
                    <Header.Content>Signup</Header.Content>
                </Header>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Field required>
                        <label style={{ "text-align": "left" }}>Username</label>
                        <Input placeholder='Username' name="username" value={signupInfo.username} onChange ={(e) =>handleChange(e)}/>
                    </Form.Field>
                    <Form.Field required>
                        <label style={{ "text-align": "left" }}>Password</label>
                        <Input type="password" placeholder="Password" name="password" value={signupInfo.password} onChange ={(e) =>handleChange(e)} />
                    </Form.Field>
                    <Form.Field required>
                        <label style={{ "text-align": "left" }}>First Name</label>
                        <Input type="realname" placeholder="First Name" name="realname" value={signupInfo.realname} onChange ={(e) =>handleChange(e)} />
                    </Form.Field>
                    <Button 
                        type='submit'
                        color='violet'
                        content='Sign Up'
                        icon='add'
                        labelPosition='left'
                    />
                </Form>
            </Segment>
        </Container>
        </>
    );
};

export default Signup