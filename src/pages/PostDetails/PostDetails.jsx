import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { useLoaderData, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import useAuth from "../../custom hooks/useAuth";

const PostDetails = () => {
    const author = useLoaderData()
    const {auth}  = useAuth()
    const {currentUser}= auth
    const param = useParams()
    const postId = param.id
    const post = author.posts.find(post=> post.postId  === parseInt(postId))
    const liked = post.likeAccounts.filter(liker=> liker === currentUser?.email) 
    console.log(liked.length)
    const [like,  setLike] =  useState(false)
    const [likeCount,  setLikeCount]  = useState(post.likes)
    const axiosSecure =   useAxiosSecure()
    useEffect(()=>{
        setLike(liked.length ? true: false)
        axiosSecure.get(`/comments/${author.email}/${postId}`)
        .then(commentsData=>{
            console.log('comments',commentsData.data)
        })
    },[liked,axiosSecure,  postId, author])
    console.log(like)
    console.log(author)
    const posts = author.posts
    const idx = author.posts.indexOf(post)
    const handleLike = ()=>{
        setLike(!like)
        
        if(!like){
            posts[idx] = {
                ...post,
                likes: post.likes +1,
                likeAccounts: [...post.likeAccounts, currentUser.email]
            }
            axiosSecure.put(`/post/update/${author.email}`, {    
                posts: posts,
            })
            .then(res=>{
                console.log(res.data)
                setLikeCount(likeCount  + 1)
            })
        }else{
            posts[idx] = {
                ...post,
                likes: post.likes -1 ,
                likeAccounts: post.likeAccounts.filter(account => account !== currentUser.email )
            }
            axiosSecure.put(`/post/update/${author.email}`, {    
                posts: posts,
            })
            .then(res=>{
                console.log(res.data)
                setLikeCount(likeCount  -  1)
            })
        }
        }
        const handleComment =(e)=>{
            e.preventDefault()
            const comment  = {
                comment: e.target.comment.value,
                commentAccount: currentUser.email,
                commentImg: currentUser.photoURL,
                commentName : currentUser.displayName,
                author: author.email,
                postId: post.postId 
            }
            axiosSecure.post('/comments', comment)
            .then((res)=>{
                console.log(res.data)
            })
            }
    return (
        <div className="flex flex-col md:w-max  mx-auto pt-16 px-4">
            <div className="flex items-center gap-4  mb-8">
                <img src={author.image} className="w-20 h-20 rounded-full border-2" alt="" />
                <p className="text-white font-semibold text-xl">{author.fullName}</p>
            </div>
            <div>
                <img src={post.uploadImg} alt="" className="lg:max-w-xl w-full md:w-max mx-auto rounded-2xl " />
            </div>
            <p className="mt-4 text-gray-300 mb-6">{post.caption}</p>
            <hr className="border border-gray-500" />
            <div>
            <div className="flex justify-around     pt-8 ">
            <div className="w-full border-r border-gray-600 flex  items-center justify-center">
                {
                    like? <FaHeart className="text-3xl text-red-500 cursor-pointer" onClick={handleLike}   />:  <CiHeart className=" cursor-pointer  text-4xl text-white " onClick={handleLike}  />
                }
                <p className="ml-3 text-xl ">{likeCount ? likeCount : ''}</p>
            </div>
            <div className="w-full  flex justify-center">
            <GoComment className=" text-white text-3xl  cursor-pointer" />
            </div>
            </div>
            </div>
            <form onSubmit={handleComment} className="flex  items-center mb-8">
            <div className="relative z-0 w-full flex mt-8 group border-opacity-70  border-[#54608d] border-0 border-b-2  gap-2">
        <div className="w-full">
        <input type="text" name="comment" id="floating_first_name" className=" block py-2.5 px-0 w-full   text-sm text-white  bg-transparent  appearance-none   focus:outline-none focus:ring-0  peer"  placeholder=" " required />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-400  duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#aabbff]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Leave a comment</label>
        </div>
        <div className="">
        <button type="submit" className="relative   px-4 py-1 top-0 bg-[#8493cd] rounded-xl  text-white hover:bg-[#aabbff] duration-500 hover:-top-1">post</button>
        </div>
    </div>
    
            </form>
        </div>
    );
};

export default PostDetails;