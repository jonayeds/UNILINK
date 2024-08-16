/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const FunctionalStatus = ({post, author }) => {
   
  return (
    <div  className="  gap-8 border-gray-600 border py-4 px-8 rounded-btn   max-w-max mx-auto">
           <div className="  flex items-center  gap-4 ">
           <img src={author.image} className="w-16 h-16   border rounded-full"  alt="" />
              <p className="text-white text-xl font-semibold">{author.fullName}</p>
           </div>
            <div className="text-left mt-6">
           <Link to={`/post/${author.email}/${post.postId}`}> <p className="">{post.caption}</p></Link>
            </div>
            {/* <div className="flex justify-around border-t  border-t-gray-600 mt-4 pt-4 ">
            <div className="cursor-pointer w-full border-r   flex justify-center  items-center border-gray-600">
            
              <CiHeart
                className=" cursor-pointer  text-2xl text-white "
                
              />
            </div>
            <div className="w-full  flex items-center  justify-center" >
            <GoComment className=" text-white text-2xl " />
            </div>
            </div> */}
          </div>
  )
}

export default FunctionalStatus