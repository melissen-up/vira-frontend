import { Sticky, Menu, Input, Image, Icon } from 'semantic-ui-react'
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

    function handleImageClick() {

    }

    function handleEditProfile() {
        setModal((modal) => !modal)
    }

    return (
        <>
            { modal === true ? <EditProfileModal modal={modal} setModal={setModal} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : null }
            <Sticky>
            <Menu
                vertical 
                style={{ margin: "10px", background: '#5829bb'}} 
                color='violet'
            >
            <Menu.Item
                style={{ "text-align": "center", color: 'white' }}
            >
                <Image onClick={handleImageClick} src={currentUser.image ?? "https://afmnoco.com/wp-content/uploads/2019/07/74046195_s.jpg"} circular size='small'/>
                <h3>{currentUser.realname}</h3>
                <p>{currentUser.bio}</p>
            </Menu.Item>

            <Menu.Item
                style={{ color: 'white' }}
                name='edit'
                onClick={handleEditProfile}
            >
            <Icon name='edit outline' />
            Edit Profile
            </Menu.Item>

            <Menu.Item
                style={{ color: 'white' }}
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
            </Sticky>
        </>
    )
};

export default Sidebar