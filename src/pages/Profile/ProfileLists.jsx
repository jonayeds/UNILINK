/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";

const ProfileLists = ({accounts}) => {
    const [allUsers, setAllUsers] = useState([])
    const axiosSecure = useAxiosSecure()
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
        <div>
            {
                filteredUsers.map(user=> <div key={user._id}>
                    <p>{user.fullName}</p>
                </div>)
            }
        </div>
    );
};

export default ProfileLists;