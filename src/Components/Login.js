import { Button, Grid, Form, Link, Header, Input, Image, Segment, Divider } from 'semantic-ui-react'

import { useState } from "react";
import { useHistory } from "react-router-dom";

import Signup from './Signup'

// Logo
import logo from '../assets/vira-logo.png';


function Login({ setCurrentUser, setLogin, setSignup }) {
    // state
    const [loginInfo, setLoginInfo]= useState({username:"", password:""})
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    function handleChange(e) {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    };

    function handleSubmit(e){
        e.preventDefault();
            fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loginInfo),
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
                        setCurrentUser(data.teacher);
                        localStorage.setItem("token", data.token);
                        setLoginInfo({username:"", password:""});
                        setErrors([]);
                        setLogin(true);
                    })
                    .catch((data) => {
                        setErrors(data.errors);
                    });
                    // redirect!
                    history.push('/home');
    };

    function onSignupClick(e) {
        setSignup(true)

    }

    return(
        <>
        <style>{'body { background-color: #5829bb; }'}</style>

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Segment textAlign='center' raised>
                    <Image src={logo} centered size='small' />
                    {/* <Header as='h2' icon textAlign='center' color='violet'>
                        <Header.Content>Login</Header.Content>
                    </Header> */}
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Field required>
                            <label style={{ "text-align": "left" }}>Username</label>
                            <Input placeholder='Username' name="username" value={loginInfo.username} onChange ={(e) =>handleChange(e)}/>
                        </Form.Field>
                        <Form.Field required>
                            <label style={{ "text-align": "left" }}>Password</label>
                            <Input type="password" placeholder="Password" name="password" value={loginInfo.password} onChange ={(e) =>handleChange(e)} />
                        </Form.Field>
                        {errors.map((error) => (
                            <p key={error} style={{ color: "red" }}>
                                {error}
                            </p>
                        ))}
                        <Button 
                            type='submit'
                            content='Login'
                        />
                    </Form>

                    <Divider horizontal>Or</Divider>
                    
                    <Button
                        color='violet'
                        content='Sign Up'
                        icon='add'
                        labelPosition='left'
                        onClick={onSignupClick}
                    />
                </Segment>
            </Grid.Column>
        </Grid>
        </>
    );
};

export default Login