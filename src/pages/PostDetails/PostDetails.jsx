import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import useAuth from "../../custom hooks/useAuth";
import { BsThreeDots } from "react-icons/bs";
const PostDetails = () => {
  const author = useLoaderData();
  const { auth } = useAuth();
  const navigate  =  useNavigate()
  const { currentUser } = auth;
  const param = useParams();
  const postId = param.id;
  const post = author?.posts?.find((post) => post.postId === parseInt(postId));
  const liked = post.likeAccounts.filter(
    (liker) => liker === currentUser?.email
  );
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const axiosSecure = useAxiosSecure();
  const [comments, setComments] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({})
  useEffect(() => {
    setLike(liked.length ? true : false);
  
  }, [liked]);
  useEffect(() => {
    axiosSecure
      .get(`/comments/${author.email}/${postId}`)
      .then((commentsData) => {
        // console.log("comments", commentsData.data);
        setComments(commentsData.data);
      });
      axiosSecure.get(`/users/email/${currentUser?.email}`)
      .then(data=>{
        setCurrentProfile(data.data)
        console.log(data.data)
      })
  }, [author, postId, axiosSecure, currentUser]);
  const posts = author.posts;
  const idx = author.posts.indexOf(post);
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
        .then(() => {
          // console.log(res.data);
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
        .then(() => {
          // console.log(res.data);
          setLikeCount(likeCount - 1);
        });
    }
  };
  const handleComment = (e) => {
    e.preventDefault();
    const comment = {
      comment: e.target.comment.value,
      commentAccount: currentUser.email,
      commentImg: currentProfile.image,
      commentName: currentProfile.fullName,
      author: author.email,
      postId:  post.postId,
      commentId: author.email+ post.postId
    };
    axiosSecure.post("/comments", comment).then(() => {
      // console.log(res.data);
      window.location.reload();
    });
  };
  const handleDelete = ()=>{
    
    const deleted = posts.filter(singlePost=> singlePost.postId != post.postId )
    axiosSecure.put(`/users/upload/${currentUser.email}`, {
        posts: deleted,
        postsCount: deleted.length,
        idParam: author.idParam
    })
    .then(()=>{
        // console.log(res.data)
        axiosSecure.delete(`/comments/${ author.email+post.postId }`)
        .then(()=>{
            // console.log(data.data)
            axiosSecure.put(`/delete/bookMark/${currentUser.email}/${post.postId}`, {followerAccounts: author.followerAccounts,
              post: post
            })
            .then(()=>{
              // console.log(d.data)
            })
            navigate('/profile')
        })   
    })
  }
  return (
    <div className="flex flex-col md:w-max  mx-auto pt-16 px-4">
      <div className="flex items-center mb-8  justify-between">
        <div className="flex  items-center  gap-4  ">
          <img
            src={author.image}
            className="w-16 h-16 rounded-full border-2"
            alt=""
          />
          <Link to={currentUser?.email !== author.email? `/search/${author._id}` : `/profile`} className="text-white font-semibold text-xl">{author.fullName}</Link>
        </div>
        {
            currentUser?.email === author.email ? <div className="dropdown dropdown-left">
            <div tabIndex={0} role="button" className="text-xl"><BsThreeDots  /></div>
            <ul tabIndex={0} className="dropdown-content   z-[1]     mr-2">
              <li onClick={handleDelete} className="bg-red-500 px-2 text-white rounded-md cursor-pointer">Delete</li>
            </ul>
          </div> : ""
        }
      </div>
      <div>
        <img
          src={post.uploadImg}
          alt=""
          className="lg:max-w-xl w-full md:w-max mx-auto rounded-2xl "
        />
      </div>
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
          <div className="w-full  flex justify-center">
            <GoComment className=" text-white md:text-3xl text-2xl  cursor-pointer" />
            <p className="ml-2">{comments.length ? comments.length : ""}</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleComment} className="flex  items-center mb-8">
        <div className="relative z-0 w-full flex mt-8 group border-opacity-70  border-[#54608d] border-0 border-b-2  gap-2">
          <div className="w-full">
            <input
              type="text"
              name="comment"
              id="floating_first_name"
              className=" block py-2.5 px-0 w-full   text-sm text-white  bg-transparent  appearance-none   focus:outline-none focus:ring-0  peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-400  duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#aabbff]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Leave a comment
            </label>
          </div>
          <div className="">
            <button
              type="submit"
              className="relative   px-4 py-1 top-0 bg-[#8493cd] rounded-xl  text-white hover:bg-[#aabbff] duration-500 hover:-top-1"
            >
              post
            </button>
          </div>
        </div>
      </form>
      <div className="mt-10 space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment._id}>
            <div className="flex items-center gap-2 bg-gray-700 p-4 rounded-2xl">
              <img
                src={comment.commentImg}
                className="w-12 rounded-full"
                alt=""
              />
              <div>
                <p className="text-white font-semibold  ">
                  {comment.commentName}
                </p>
                <p className=" font-light text-gray-300">{comment.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
