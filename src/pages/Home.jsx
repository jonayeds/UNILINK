import useAuth from "../custom hooks/useAuth";
import Redirector from "../sharedComponents/Redirector";

const Home = () => {
    const {auth} = useAuth()
    const user = auth.currentUser
    return (
        <div>
            {
                !user? <Redirector></Redirector>: <div></div>
            }
        </div>
    );
};

export default Home;