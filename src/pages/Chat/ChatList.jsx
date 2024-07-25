import { useEffect, useState } from "react";
import useAuth from "../../custom hooks/useAuth";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { IoIosChatboxes } from "react-icons/io";
import { Link } from "react-router-dom";

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
                setChatList(friendsAcc)

            })
        })
    },[currentUser, axiosSecure])
    console.log(profile)
    return (
        <div className=" px-4 pt-8">
            <div className="flex items-end gap-2 text-white bg-gray-700  py-4 px-6 text-2xl font-semibold   rounded-xl" >
                <p>
                Chats
                </p> 
                <IoIosChatboxes className="text-3xl"/>
                </div>
            {
                chatList.map(chat=> <Link to={`/chat/${currentUser.email + chat.email}`} key={chat._id} className="flex items-center gap-3 border-b-2 py-6 border-gray-500 mx-4">
                    <div className="w-12 rounded-full overflow-hidden ">
                    <img src={chat.image} className=" w-full" alt="" />
                    </div>
                    <p className="text-lg text-white">{chat.fullName}</p>
                </Link>)
            }
        </div>
    );
};

export default ChatList;