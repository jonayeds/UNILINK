import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { useLoaderData, useParams } from "react-router-dom";



const PostDetails = () => {
    const user = useLoaderData()
    const param = useParams()
    const postId = param.id
    const post = user.posts.find(post=> post.postId  === parseInt(postId))
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
            <div className="flex justify-around    pt-8 ">
            <CiHeart className="w-full border-r border-gray-600 text-4xl text-white "  />
            <GoComment className="w-full text-white text-3xl" />
            </div>
            </div>

        </div>
    );
};

export default PostDetails;