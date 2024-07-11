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
    const handleSearch = e=>{
        console.log("value",e.target.value)
        setFiltered(users.filter(user=> user.fullName.toLowerCase().split(" ").join('').includes(value.toLowerCase().split(' ').join('')) || user.email.includes(value)))
        console.log("filtered users",filtered)
        setValue(e.target.value)
    }
    const handleSearchButton = e =>{
        e.preventDefault()
        setValue(e.target.search.value)
        console.log("value ", e.target.search.value)
        setFiltered(users.filter(user=> user.fullName.toLowerCase().split(" ").join('').includes(value.toLowerCase().split(' ').join('')) || user.email.includes(value)))

    }
    return (
        <div className="md:pt-20 pt-10">
            
<form onSubmit={handleSearchButton} className="flex items-center max-w-sm mx-auto px-4">   
    <label className="sr-only">Search</label>
    <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <img src={logo} className='w-4' alt="" />
        </div>
        <input type="text" name='search' id="simple-search" value={value} onChange={(e)=> handleSearch(e)} className=" outline-none border border-gray-600  text-sm rounded-lg block w-full ps-10 p-2.5     " placeholder="Search Users by name or email..." required />
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
                    <tr  className='hover:text-white flex items-center'>
                    <Link to={currentUser?.email !== user.email? `/search/${user._id}` : `/profile`} className='flex items-center' >
                    <p className='px-6 py-4'>
                        <img src={user.image} className='w-12 rounded-full' alt="" />

                    </p>
                    <p scope="row" className="px-6 py-4 font-medium   ">
                        {user.fullName}
                    </p>
                    </Link>
                    
                    </tr>
                    
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