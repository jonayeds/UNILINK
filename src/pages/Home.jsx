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
    const [posts, setPosts] = useState([])
    const axiosSecure = useAxiosSecure()
    useEffect(()=>{
        axiosSecure.get(`users/email/${currentUser?.email}`)
        .then(data=>{
            setUser(data.data)
           setFollowing( allUsers.filter(aUser=> data.data.followingAccounts.includes(aUser.email)))
        })
    }, [currentUser, axiosSecure, allUsers])
    useEffect(()=>{
        for(let i = 0; i<following.length; i++){
            for(let j =0; j<following[i].posts.length; j++){
                posts.push(following[i].posts[j])
            }
            
        }
    //    following.map(f=>setPosts([...f.posts, ...posts])) 
    },[following])
    console.log('posts',posts.length)
    console.log('following accounts',following)
    return (
        <div>
            {
                following.map(f=> f.posts.map(post=> <div key={post.postId + post.currentHours + post.currentDate}>
                    <p>1</p>
                 </div>))
            }
        </div>
    );
};

export default Home;