import { useLoaderData } from "react-router-dom";
import ProfileLists from "./ProfileLists";

const FollowingList = () => {
    const profile = useLoaderData()
    const followings = profile.followingAccounts
    console.log(followings)

    return (
        <div>
            <ProfileLists accounts={followings}></ProfileLists>
        </div>
    );
};

export default FollowingList;