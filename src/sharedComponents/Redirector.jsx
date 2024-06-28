import { Link } from "react-router-dom";

const Redirector = () => {
    return (
        <div className="text-center flex-col min-h-screen flex items-center justify-center">
            <h1 className="text-xl font-medium">Please Sign In To Access This section</h1>
            <Link to={'/signIn'} className="bg-white text-black px-4 py-2 mt-4 rounded-sm font-medium text-xl">Sign In</Link>
        </div>
    );
};

export default Redirector;