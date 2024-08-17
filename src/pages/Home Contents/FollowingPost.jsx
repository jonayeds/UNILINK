/* eslint-disable react/prop-types */
import { motion, useScroll } from "framer-motion"
import { useEffect, useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { BsThreeDots } from "react-icons/bs";
import { MdBookmarkAdd, MdOutlineBookmarkRemove } from "react-icons/md";
const FollowingPost = ({ post, currentUser }) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeAccounts.length);
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState({});
  const axiosSecure = useAxiosSecure();
  const [idx, setIdx] = useState(0);
  const [posts, setPosts] = useState();
  useEffect(() => {
    axiosSecure.get(`/users/${post.author}`).then((au) => {
      // console.log("author",au.data.posts.findIndex(x=>x.postId ===  post.postId))
      setAuthor(au.data);
      setIdx(au.data.posts.findIndex((x) => x.postId === post.postId));
      setPosts(au.data.posts);
      axiosSecure
        .get(`/comments/${au.data.email}/${post.postId}`)
        .then((commentsData) => {
          // console.log("comments", commentsData.data);
          setComments(commentsData.data);
        });
    });
  }, [post, axiosSecure]);

  useEffect(() => {
    const liked = post.likeAccounts.filter(
      (liker) => liker === currentUser?.email
    );
    setLike(liked.length ? true : false);
    // console.log(liked)
  }, [currentUser, post]);
  const handleLike = () => {
    setLike(!like);
    // console.log(idx);
    if (!like) {
      posts[idx] = {
        ...post,
        likes: (post.likeAccounts.length) + 1,
        likeAccounts: [...post.likeAccounts, currentUser.email],
      };
      axiosSecure
        .put(`/post/update/${author.email}`, {
          posts: posts,
        })
        .then(() => {
          // console.log(res.data);
          setLikeCount(likeCount + 1);
        });
    } else {
      posts[idx] = {
        ...post,
        likes: (post.likeAccounts.length) - 1,
        likeAccounts: post.likeAccounts.filter(
          (account) => account !== currentUser.email
        ),
      };
      axiosSecure
        .put(`/post/update/${author.email}`, {
          posts: posts,
        })
        .then(() => {
          // console.log(res.data);
          setLikeCount(likeCount - 1);
        });
    }
  };
  // const [bookMarks, setBookMarks] =  useState(currentUser.bookMarks)
  const isMarked = currentUser.bookMarks.filter(
    (bookMark) =>
      bookMark.postId + bookMark.currentDate + bookMark.currentHours ===
      post.postId + post.currentDate + post.currentHours
  );
  const [bookMarked, setBookMarked] = useState(isMarked.length ? true : false);
  // console.log(bookMarked)
  const handleBookmark = () => {
    if (!bookMarked) {
      const markedPost = {
        ...post,
        author: author.email,
      };
      setBookMarked(true);
      axiosSecure.get(`/users/${currentUser.email}`).then((book) => {
        // console.log("current user",book.data)
        // setBookMarks([...book.data.bookMarks, markedPost])
        const newBookMarks = [...book.data.bookMarks, markedPost];
        axiosSecure
          .put(`/bookMark/${currentUser.email}`, { bookMarks: newBookMarks })
          .then(() => {
            // console.log(res)
          });
      });
    } else {
      setBookMarked(false);
      axiosSecure.get(`/users/${currentUser.email}`).then((book) => {
        const newBookMarks = book.data.bookMarks.filter(
          (bookMark) =>
            bookMark.postId + bookMark.currentDate + bookMark.currentHours !==
            post.postId + post.currentDate + post.currentHours
        );
        axiosSecure
          .put(`/bookMark/${currentUser.email}`, { bookMarks: newBookMarks })
          .then(() => {
            // console.log(res)
          });
      });
    }
  };
  
  // console.log("bookmarks", bookMarks)

  // Framer motion




  return (
    <div
    className="mt-20 md:max-w-md w-full ">
      {post.uploadImg ? (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 overflow-hidden rounded-full border-white border-[3px] hover:border-[#aabbff] duration-500">
                <img src={author.image} alt="" className="w-10 " />
              </div>
              <Link
                to={`/search/${author._id}`}
                className="ml-2 text-white font-semibold "
              >
                {author.fullName}
              </Link>
            </div>
            <div>
              <div className="dropdown dropdown-left">
                <div tabIndex={0} role="button" className="text-xl ">
                  <BsThreeDots />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content duration-500   z-[1]     mr-2"
                >
                  {bookMarked ? (
                    <li
                      onClick={handleBookmark}
                      className="bg-gray-500  px-2 py-1 text-white rounded-md border  overflow-hidden relative cursor-pointer flex items-center group gap-1"
                    >
                      <MdOutlineBookmarkRemove className="text-xl duration-500 group-hover:translate-x-7" />
                      <p
                        id="save-btn"
                        className="relative duration-500 group-hover:-translate-y-10  "
                      >
                        UnSave
                      </p>
                    </li>
                  ) : (
                    <li
                      onClick={handleBookmark}
                      className="bg-gray-500 group  px-2 py-1 text-white rounded-md border cursor-pointer flex items-center overflow-hidden gap-1"
                    >
                      <MdBookmarkAdd className="text-xl group-hover:translate-x-5 duration-500" />{" "}
                      <p className="group-hover:-translate-y-10 duration-500">
                        Save
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <Link to={`/post/${author.email}/${post.postId}`}>
            <img
              src={post.uploadImg}
              className="md:max-w-md w-full rounded-xl mt-4"
              alt=""
            />
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
              <Link
                to={`/post/${author.email}/${post.postId}`}
                className="w-full  flex justify-center"
              >
                <GoComment className=" text-white md:text-3xl text-2xl  cursor-pointer" />
                <p className="ml-2">{comments.length ? comments.length : ""}</p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="  gap-8 md:max-w-md w-full   border-gray-600 border py-4 px-12 rounded-btn    mx-auto"
        >
          <div className="flex items-center justify-between -mx-8">
          <div className="flex items-center">
              <div className="w-10 h-10 overflow-hidden rounded-full border-white border-[3px] hover:border-[#aabbff] duration-500">
                <img src={author.image} alt="" className="w-10 " />
              </div>
              <Link
                to={`/search/${author._id}`}
                className="ml-2 text-white font-semibold "
              >
                {author.fullName}
              </Link>
            </div>
            <div>
              <div className="dropdown dropdown-left">
                <div tabIndex={0} role="button" className="text-xl ">
                  <BsThreeDots />
                </div>
                <ul tabIndex={0} className="dropdown-content   z-[1]     mr-2">
                  {bookMarked ? (
                    <li
                      onClick={handleBookmark}
                      className="bg-gray-500  px-2 py-1 text-white rounded-md border cursor-pointer flex items-center  gap-1"
                    >
                      <MdOutlineBookmarkRemove className="text-xl" /> Unsave{" "}
                    </li>
                  ) : (
                    <li
                      onClick={handleBookmark}
                      className="bg-gray-500  px-2 py-1 text-white rounded-md border cursor-pointer flex items-center  gap-1"
                    >
                      <MdBookmarkAdd className="text-xl" /> Save{" "}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <Link
            to={`/post/${author.email}/${post.postId}`}
            className="text-left mt-6 cursor-pointer"
          >
            <p className="mt-4">{post.caption}</p>
          </Link>
          <div className="flex justify-around  border-t border-gray-500 mt-4 pt-4 ">
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
            <Link
              to={`/post/${author.email}/${post.postId}`}
              className="w-full  flex justify-center"
            >
              <GoComment className=" text-white md:text-3xl text-2xl  cursor-pointer" />
              <p className="ml-2">{comments.length ? comments.length : ""}</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowingPost;
