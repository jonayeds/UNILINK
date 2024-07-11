import { FaSearch } from 'react-icons/fa';
import logo from '../../assets/logoPrimaryPNG(white).png'
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../custom hooks/useAxiosSecure';
import {Link} from "react-router-dom"
import useAuth from '../../custom hooks/useAuth';
const Search = () => {
    const [value, setValue] = useState('')
    const [users, setUsers] = useState([])
    const [filtered, setFiltered] = useState([])
    const {auth} = useAuth()
    const currentUser = auth.currentUser
    const axiosSecure = useAxiosSecure()
    useEffect(()=>{
        axiosSecure.get('/users')
        .then(res=>{
            console.log(res.data)
            setUsers(res.data)
        })
    },[axiosSecure])
    console.log(value)
    const handleSearch = e=>{
        e.preventDefault()
        setValue(e.target.value)
         setFiltered(users.filter(user=> user.fullName.toLowerCase().split(" ").join('').includes(value.toLowerCase().split(' ').join('')) || user.email.includes(value)))
        console.log("filtered users",filtered)
    }
    return (
        <div className="md:pt-20 pt-10">
            
<form onSubmit={handleSearch} className="flex items-center max-w-sm mx-auto ">   
    <label className="sr-only">Search</label>
    <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <img src={logo} className='w-4' alt="" />
        </div>
        <input type="text" id="simple-search" value={value} onChange={(e)=> handleSearch(e)} className=" outline-none border border-gray-600  text-sm rounded-lg block w-full ps-10 p-2.5     " placeholder="Search Users by name or email..." required />
    </div>
    <button type='submit' className="p-2 ms-2 text-xl text-black bg-[#c5cffb] rounded-lg ">
        <FaSearch  />
    </button>
</form>
        <div className='max-w-sm mx-auto'>
            

<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
    <table className="w-full text-sm text-left rtl:text-right ">
        
        <tbody>
            {
                filtered.map(user=><tr key={user._id} className=" border-b border-gray-600 text-gray-300">
                    <Link to={currentUser?.email !== user.email? `/search/${user._id}` : `/profile`} className='hover:text-white flex items-center'>
                    <th className='px-6 py-4'>
                        <img src={user.image} className='w-12 rounded-full' alt="" />

                    </th>
                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                        {user.fullName}
                    </th>
                    
                    </Link>
                    
                </tr>)
            }
            
        </tbody>
    </table>
</div>

        </div>

        </div>
    );
};

export default Search;