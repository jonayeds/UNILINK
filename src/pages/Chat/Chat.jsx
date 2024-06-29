import useAuth from "../../custom hooks/useAuth";
import Redirector from "../../sharedComponents/Redirector";

const Chat = () => {
    const {auth} = useAuth()
    const user = auth.currentUser

    return (
        <div>
            {
                !user? <Redirector></Redirector> : <div></div>
            }
        </div>
    );
};

export default Chat;