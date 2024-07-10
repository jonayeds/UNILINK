import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { useLoaderData, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";

const PostDetails = () => {
    const user = useLoaderData()
    const param = useParams()
    const postId = param.id
    const post = user.posts.find(post=> post.postId  === parseInt(postId))
    const [like,  setLike] =  useState(false)
    const axiosSecure =   useAxiosSecure()
    console.log(user)
    const handleLike = ()=>{
        setLike(!like)
        if(!like){
            axiosSecure.put(`/post/update/${user.email}/${postId}`, {    
                
            })
        }
        }
    return (
        <div className="flex flex-col md:w-max  mx-auto pt-16 px-4">
            <div className="flex items-center gap-4  mb-8">
                <img src={user.image} className="w-20 h-20 rounded-full border-2" alt="" />
                <p className="text-white font-semibold text-xl">{user.fullName}</p>
            </div>
            <div>
                <img src={post.uploadImg} alt="" className="lg:max-w-xl w-full md:w-max mx-auto rounded-2xl " />
            </div>
            <p className="mt-4 text-gray-300 mb-6">{post.caption}</p>
            <hr className="border border-gray-500" />
            <div>
            <div className="flex justify-around     pt-8 ">
            <div className="w-full border-r border-gray-600 flex justify-center">
                {
                    like? <FaHeart className="text-3xl text-red-500 cursor-pointer" onClick={handleLike}   />:  <CiHeart className=" cursor-pointer  text-4xl text-white " onClick={handleLike}  />
                }
            </div>
            <div className="w-full  flex justify-center">
            <GoComment className=" text-white text-3xl  cursor-pointer" />
            </div>
            </div>
            </div>
        </div>
    );
};

export default PostDetails;