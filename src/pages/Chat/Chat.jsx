import useAuth from "../../custom hooks/useAuth";

const Chat = () => {
    const {auth} = useAuth()
    const user = auth.currentUser

    return (
        <div>

        </div>
    );
};

export default Chat;