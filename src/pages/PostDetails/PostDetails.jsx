import { useLoaderData } from "react-router-dom";



const PostDetails = () => {
    const post = useLoaderData()
    console.log(post) 
    return (
        <div>
            
        </div>
    );
};

export default PostDetails;