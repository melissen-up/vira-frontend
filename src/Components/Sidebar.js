import { Container, Menu, Label, Input, Image } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import { Icon } from '@material-ui/core';

function Sidebar({ setCurrentUser, currentUser }) {
    const history = useHistory();

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

    return (
        <Menu vertical style={{ margin: "10px"}} >
        <Menu.Item
            style={{ "text-align": "center" }}
        >
            <Image onClick={handleImageClick} src={currentUser.image ?? "https://afmnoco.com/wp-content/uploads/2019/07/74046195_s.jpg"} circular />
            <h3>{currentUser.realname}</h3>
            <p>{currentUser.bio}</p>
        </Menu.Item>
        <Menu.Item
            name='logout'
            onClick={handleLogout}
        >
        <Label color='teal'>X</Label>
        Logout
        </Menu.Item>

        <Menu.Item
            name='create-practice'
            onClick={createPractice}
        >
        <Label>>></Label>
        Create Practice
        </Menu.Item>
        
        <Menu.Item>
            <Input icon='search' placeholder='Search mail...' />
        </Menu.Item>
        </Menu>
    )
};

export default Sidebar