import { Button, Grid, Form, Header, Input, Image, Segment } from 'semantic-ui-react'

import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

// Logo
import logo from '../assets/vira-logo.png';

function Signup({ setCurrentUser, setSignup, setLogin }) {
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
                        setLogin(true);
                        
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
        <style>{'body { background-color: #5829bb; }'}</style>

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Segment textAlign='center' raised>
                    <Image src={logo} centered size='small' />
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
                        <br />
                        <Link 
                            to='/login'
                            color='#5829bb' 
                            onClick={() => setSignup(false)}
                        >
                            Nevermind, take me back to login
                        </Link>
            </Segment>
            </Grid.Column>
        </Grid>
        </>
    );
};

export default Signup