import { useLoaderData } from "react-router-dom";
import ProfileLists from "./ProfileLists";

const FollowingList = () => {
    const profile = useLoaderData()
    const followings = profile.followingAccounts
    console.log(followings)

    return (
        <div className="pt-12">
            <h1 className="text-center text-3xl mb-10 font-semibold text-white">Following</h1>

            <ProfileLists accounts={followings}></ProfileLists>
        </div>
    );
};

export default FollowingList;