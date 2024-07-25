import { useEffect, useState } from "react";
import useAuth from "../../custom hooks/useAuth";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";

const ChatList = () => {
    const {auth} = useAuth()
    const {currentUser} = auth
    const axiosSecure = useAxiosSecure()
    const [profile, setProfile]= useState([])
    const [chatList, setChatList] = useState([])
    useEffect(()=>{
        axiosSecure.get(`/users/${currentUser.email}`)
        .then(res=>{
            setProfile(res.data)
            const friends = res.data.followingAccounts.filter(acc=> res.data.followerAccounts.map(f=> f ===acc))
            console.log('friends',friends)
            axiosSecure.get('/users')
            .then(data=>{
                console.log(data.data)
                const friendsAcc = data.data.filter(acc=> friends.find(f=> {
                    if(f ===acc.email){
                        return acc
                    }
                }))
                console.log(friendsAcc)

            })
        })
    },[currentUser, axiosSecure])
    console.log(profile)
    return (
        <div>
            
        </div>
    );
};

export default ChatList;