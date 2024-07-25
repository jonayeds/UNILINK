import { useEffect, useState } from "react";
import useAuth from "../custom hooks/useAuth";
import useAxiosSecure from "../custom hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";
import FollowingPost from "./Home Contents/FollowingPost";

const Home = () => {
    const {auth} = useAuth()
    const currentUser = auth.currentUser
    const allUsers = useLoaderData()
    console.log(allUsers)
    const [user, setUser] = useState({})
    const [following, setFollowing] = useState([])
    const axiosSecure = useAxiosSecure()
    const fPosts = []
    useEffect(()=>{
        axiosSecure.get(`users/email/${currentUser?.email}`)
        .then(data=>{
            setUser(data.data)
            const fAccounts = allUsers.filter(aUser=> data.data.followingAccounts.includes(aUser.email))
           fAccounts.map(A=>A.posts.map(P=> fPosts.push(P)))
           const finalPosts =  fPosts.filter((post, index)=> fPosts.indexOf(post) ===  index)
           console.log(finalPosts)
           setFollowing(finalPosts)
        })
        
    }, [currentUser, axiosSecure, allUsers])
    console.log('following accounts',following)
    return (
        <div>
            {
                following.map(f=> <div className="" key={f.postId + f.currentHours + f.currentDate}>
                   <div className="w-full flex flex-col items-center px-4" >
                            <FollowingPost post={f} currentUser={user} ></FollowingPost>
                         </div>
                </div>)
            }
        </div>
    );
};

export default Home;