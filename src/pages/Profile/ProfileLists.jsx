/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useAuth from "../../custom hooks/useAuth";

const ProfileLists = ({accounts}) => {
    const [allUsers, setAllUsers] = useState([])
    const axiosSecure = useAxiosSecure()
    const {auth} = useAuth()
    const currentUser = auth.currentUser
    useEffect(()=>{
        
        axiosSecure.get('/users')
        .then(res=>{
            setAllUsers(res.data)
        })
    },[axiosSecure])
    console.log(allUsers)
    const filteredUsers = allUsers.filter(user=> accounts.find(account=>account === user.email))
    console.log(filteredUsers)
    return (
        <div className="">
            {
                filteredUsers.map(user=> <Link to={currentUser?.email !== user.email? `/search/${user._id}` : `/profile`} key={user._id} className="border-t border-gray-600 py-4 flex items-center hover:text-white  justify-center gap-4">
                    <img src={user.image} className="w-12 h-12  rounded-full" alt="" />
                    <p className="text-center text-xl ">{user.fullName}</p>
                </Link>)
            }
        </div>
    );
};

export default ProfileLists;