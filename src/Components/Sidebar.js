import { Container, Menu, Label, Input, Image, Icon } from 'semantic-ui-react'
import { useState } from 'react'
import { useHistory } from "react-router-dom";

import EditProfileModal from './EditProfileModal'

function Sidebar({ setCurrentUser, currentUser }) {
    const history = useHistory();
    const [ modal, setModal ] = useState(false)

    function handleLogout() {
        setCurrentUser({
            username: "",
            realname: "",
            image: "https://afmnoco.com/wp-content/uploads/2019/07/74046195_s.jpg",
            bio: ""
        });
        localStorage.removeItem("token");
        history.push('/login');
    };

    function createPractice() {
        console.log("You clicked Create Practice");
    };

    function handleImageClick() {

    }

    function handleEditProfile() {
        setModal((modal) => !modal)
    }

    return (
        <>
            { modal === true ? <EditProfileModal modal={modal} setModal={setModal} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : null }
            <Menu vertical style={{ margin: "10px"}} >
            <Menu.Item
                style={{ "text-align": "center" }}
            >
                <Image onClick={handleImageClick} src={currentUser.image ?? "https://afmnoco.com/wp-content/uploads/2019/07/74046195_s.jpg"} circular size='small'/>
                <h3>{currentUser.realname}</h3>
                <p>{currentUser.bio}</p>
            </Menu.Item>

            <Menu.Item
                name='edit'
                onClick={handleEditProfile}
            >
            <Icon name='edit outline' />
            Edit Profile
            </Menu.Item>

            <Menu.Item
                name='create-practice'
                onClick={createPractice}
            >
            <Icon name='plus square outline' />
            Create Practice
            </Menu.Item>

            <Menu.Item
                name='logout'
                onClick={handleLogout}
            >
            <Icon name='delete' />
            Logout
            </Menu.Item>
            
            <Menu.Item>
                <Input icon='search' placeholder='Search other users...' />
            </Menu.Item>
            </Menu>
        </>
    )
};

export default Sidebar