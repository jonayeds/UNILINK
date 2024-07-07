import { useLoaderData } from "react-router-dom";
import ProfileLists from "./ProfileLists";

const FollowersList = () => {
    const profile = useLoaderData()
    const followers = profile.followerAccounts
    return (
        <div className="pt-12">
            <h1 className="text-center text-3xl mb-10 font-semibold text-white">Followers</h1>

            <ProfileLists accounts={followers}></ProfileLists>
        </div>
    );
};

export default FollowersList;