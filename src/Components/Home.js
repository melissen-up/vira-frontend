import { useSelector } from "react-redux";


function Home() {
    const currentUser = useSelector((state) => state.currentUser);



    return(
        <>
        <h1>HOME</h1>
        { currentUser.username === "" ? <h3></h3> : <h3> Hello, {currentUser.realname}! </h3>}
        
        </>

    );
};

export default Home