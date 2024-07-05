import useAuth from "../../custom hooks/useAuth";
import Redirector from "../../sharedComponents/Redirector";

const Notifications = () => {
    const {auth} = useAuth()
    const user = auth.currentUser
    return (
        <div>

        </div>
    );
};

export default Notifications;