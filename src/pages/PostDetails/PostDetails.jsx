import { useLoaderData, useParams } from "react-router-dom";



const PostDetails = () => {
    const user = useLoaderData()
    const param = useParams()
    const postId = param.id
    const post = user.posts.find(post=> post.postId  === parseInt(postId))
    return (
        <div>
            <div>
                <img src={post.uploadImg} alt="" />
            </div>
        </div>
    );
};

export default PostDetails;