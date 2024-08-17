import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { IoCloudUpload } from "react-icons/io5";
import useAxiosSecure from '../../custom hooks/useAxiosSecure'
import useAuth from "../../custom hooks/useAuth";
import axios from "axios";
const Upload = () => {
    const inputRef  = useRef(null)
    const [image , setImage] = useState('')
    const axiosSecure = useAxiosSecure()
    const {auth} = useAuth()
    const navigate = useNavigate()
    const user = auth.currentUser
    const handleImageInput = ()=>{
        inputRef.current.click()
    }
    const handleImageChange =(e)=>{
        const img = e.target.files[0]
        setImage(img)
    }
    const handleUpload = (e) =>{
        e.preventDefault()
        document.getElementById("loader").classList.remove("hidden")
        document.getElementById("content").classList.add("hidden")
        const formData = new FormData()
        formData.append('image', image)
        axiosSecure.get(`/users/${user.email}`)
        .then(data=>{
            const caption = e.target.caption.value
            const d = new Date()
            const hours = d.getHours()
            const currentTime = hours > 12 ? `${hours - 12}:${d.getMinutes()} pm`: `${hours}:${d.getMinutes()} am`
            if(image){
                axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`, formData)
                .then((img, pending)=>{
                    console.log(pending)
                    const uploadData ={
                        postsCount: parseInt(data.data.postsCount) + 1 ,
                        idParam: parseInt(data.data.idParam)  + 1,
                        posts:[
                            ...data.data.posts,
                            {
                                caption : caption,
                                uploadImg : img.data.data.display_url,
                                currentDate : d.getDate(),
                                currentMonth : d.getMonth() + 1,
                                currentYear : d.getFullYear(),
                                currentHours: currentTime,
                                postId : parseInt(data.data.idParam) + 1,
                                likes: 0,
                                likeAccounts: [],
                                author: user.email,
                                time: d.getTime()
                            } 
                        ]
                    } 
                    axiosSecure.put(`/users/upload/${user.email}`, uploadData)
                    .then(res=>{
                        navigate('/')
                        console.log(res.data)
                        
                    })
                })
            }else{  
                const uploadData ={
                    postsCount: parseInt(data.data.postsCount) + 1 ,
                    idParam: parseInt(data.data.idParam)  + 1,
                    posts:[
                        ...data.data.posts,
                        {
                            caption : caption,
                            currentDate : d.getDate(),
                            currentMonth : d.getMonth() + 1,
                            currentYear : d.getFullYear(),
                            currentHours: currentTime,
                            postId : parseInt(data.data.idParam) + 1,
                            likes: 0,
                            author: user.email,
                            likeAccounts: [],
                            time: d.getTime()
                        } 
                    ]
                }
                axiosSecure.put(`/users/upload/${user.email}`, uploadData)
                .then(res=>{
                    console.log(res.data)
                    navigate('/')
                })

            }
        })
    }

    const loader = <>
       
        <div id="loader" className="absolute lg:w-[calc(100vw-206px)] md:w-[calc(100vw-88px)] w-[100vw] h-screen z-10 bg-black bg-opacity-50 flex justify-center items-center hidden">
        <div className='flex   items-end   space-x-2'>
<span className='text-3xl  text-white'>Uploading</span>
<div className="flex gap-2">
<div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-4 w-4 bg-white rounded-full animate-bounce'></div>
</div>
</div>
        </div>
        
    </>


    return (
        <div >
            {
                loader
            }
            
           <form id="content" onSubmit={handleUpload} action="" className="px-4 pt-12 flex  flex-col items-center">
           <div onClick={handleImageInput} className="md:w-[500px] border-4 border-gray-500 rounded-badge h-[450px] w-full flex flex-col items-center justify-center bg-gray-800 hover:bg-black duration-500  overflow-hidden">
               {
                image? <img src={URL.createObjectURL(image)} alt="" />: <div className="flex flex-col items-center">
                <IoCloudUpload className="text-3xl mb-4" />
                <h1>Click to upload</h1>
                </div>
               }
                       
               <input onChange={handleImageChange} type="file" ref={inputRef} className="hidden"  />
                           </div>
                           <div className="md:w-[500px] w-full mt-10">
                           <div className="relative z-0 w-full group">
                     <textarea type="email" name="caption" id="floating_email" className=" block  px-0 w-full  text-sm text-white bg-transparent border-0 border-b-2  appearance-none  border-gray-600 focus:border-[#aabbff] focus:outline-none focus:ring-0  peer" placeholder=" "   />
                     <label  className="peer-focus:font-medium absolute text-lg text-gray-400  duration-300 transform -translate-y-6  scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#aabbff]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Write a Caption</label>
                 </div>
                           </div>
                           <button type="submit" className="mt-12 bg-[#909fdf] px-8 text-xl font-semibold py-2 text-white rounded-full">Post</button>
           </form >
        </div>
    );
};

export default Upload;