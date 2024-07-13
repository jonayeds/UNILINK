/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";

const FollowingPost = ({post, author, currentUser}) => {
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [comments, setComments] = useState([]);
    const axiosSecure = useAxiosSecure();
    const posts = author.posts
    
      const idx = author.posts.indexOf(post);
      useEffect(() => {
        axiosSecure
          .get(`/comments/${author.email}/${post.postId}`)
          .then((commentsData) => {
            console.log("comments", commentsData.data);
            setComments(commentsData.data);
          });
      }, [author, post, axiosSecure]);
      useEffect(() => {
        const liked = post.likeAccounts.filter(
            (liker) => liker === currentUser?.email
          );
        setLike(liked.length ? true : false);
        console.log(liked)
      }, [currentUser, post]);
      const handleLike = () => {
        setLike(!like);
    
        if (!like) {
          posts[idx] = {
            ...post,
            likes: post.likes + 1,
            likeAccounts: [...post.likeAccounts, currentUser.email],
          };
          axiosSecure
            .put(`/post/update/${author.email}`, {
              posts: posts,
            })
            .then((res) => {
              console.log(res.data);
              setLikeCount(likeCount + 1);
            });
        } else {
          posts[idx] = {
            ...post,
            likes: post.likes - 1,
            likeAccounts: post.likeAccounts.filter(
              (account) => account !== currentUser.email
            ),
          };
          axiosSecure
            .put(`/post/update/${author.email}`, {
              posts: posts,
            })
            .then((res) => {
              console.log(res.data);
              setLikeCount(likeCount - 1);
            });
        }
      };
    return (
        <div>
            <div className="flex items-center">
                <div className="w-10 h-10 overflow-hidden rounded-full border-white border-[3px] hover:border-[#aabbff] duration-500">
                <img src={author.image} alt="" className="w-10 " />
                </div>
                <Link to={`/search/${author._id}` } className="ml-2 text-white font-semibold ">{author.fullName}</Link>
            </div>
            <Link to={`/post/${author.email}/${post.postId}`}>
                <img src={post.uploadImg} className="md:max-w-md w-full rounded-xl mt-4" alt="" />
            </Link>
            <p className="mt-4 text-gray-300 mb-6">{post.caption}</p>
      <hr className="border border-gray-500" />
      <div>
        <div className="flex justify-around     pt-8 ">
          <div className="w-full border-r border-gray-600 flex  items-center justify-center">
            {like ? (
              <FaHeart
                className="md:text-3xl text-2xl text-red-500 cursor-pointer"
                onClick={handleLike}
              />
            ) : (
              <CiHeart
                className=" cursor-pointer  md:text-4xl text-3xl text-white "
                onClick={handleLike}
              />
            )}
            <p className="ml-3 text-xl ">{likeCount ? likeCount : ""}</p>
          </div>
          <Link to={`/post/${author.email}/${post.postId}`} className="w-full  flex justify-center">
            <GoComment className=" text-white md:text-3xl text-2xl  cursor-pointer" />
            <p className="ml-2">{comments.length ? comments.length : ""}</p>
          </Link>
        </div>
      </div>
        </div>
    );
};

export default FollowingPost;