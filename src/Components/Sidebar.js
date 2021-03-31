import { Image, Sticky, Menu, Input, Icon } from 'semantic-ui-react'
import { useState } from 'react'
import { useHistory } from "react-router-dom";

import EditProfileModal from './EditProfileModal'

function Sidebar({ setCurrentUser, currentUser, setLogin }) {
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
        setLogin(false);
    };

    function handleImageClick() {

    }

    function handleEditProfile() {
        setModal((modal) => !modal)
    }

    function handleShowUserPractices() {
        history.push("/practices");
    }

    const practiceBtnLogic = 
        currentUser.practices !== [] ? (
            <>
                <Menu.Item 
                    style={{ color: 'white' }} 
                    name='show' 
                    onClick={handleShowUserPractices}>
                <Icon name='plus'/>
                Saved Practices
                </Menu.Item>
            </>
        ) : (
            null
        )


    return (
        <>
            { modal === true ? <EditProfileModal modal={modal} setModal={setModal} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : null }

                <Menu vertical style={{ margin: "10px", background: '#5829bb'}} >
                    <Menu.Item 
                        style={{ "text-align": "center", color: 'white' }}
                    >
                        <Image 
                            style={{ 'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}
                            onClick={handleImageClick} 
                            src={currentUser.image ?? "https://afmnoco.com/wp-content/uploads/2019/07/74046195_s.jpg"} 
                            circular size='small' 
                            centered
                        />
                        <h3 >{currentUser.realname}</h3>
                        <p>{currentUser.bio}</p>
                    </Menu.Item>

                    <Menu.Item
                        style={{ color: 'white' }}
                        name='edit'
                        onClick={() => history.push('/home')}
                    >
                        <Icon name='home' />
                        Dashboard
                    </Menu.Item>

                    <Menu.Item
                        style={{ color: 'white' }}
                        name='edit'
                        onClick={handleEditProfile}
                    >
                        <Icon name='edit' />
                        Edit Profile
                    </Menu.Item>

                    {practiceBtnLogic}

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

        </>
    )
};

export default Sidebar