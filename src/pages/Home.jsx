import { useEffect, useState } from "react";
import useAuth from "../custom hooks/useAuth";
import useAxiosSecure from "../custom hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";

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
    for(let i=0; i<following.length; i++){
        posts.push(following[i].posts)
    }
    console.log(posts)
    console.log('following accounts',following)
    return (
        <div>
        </div>
    );
};

export default Home;