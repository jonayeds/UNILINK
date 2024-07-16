import { RiGridFill } from "react-icons/ri";
import useAuth from "../../custom hooks/useAuth";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { TbLogs } from "react-icons/tb";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";


const Saved = () => {
    const {auth} = useAuth()
    const user = auth.currentUser
    const axiosSecure = useAxiosSecure()
    const [profile, setProfile] = useState({})
    useEffect(()=>{
        axiosSecure.get(`/users/${user?.email}`)
        .then(res=>{
            setProfile(res.data)
            console.log("current user", res.data)
        })
    },[axiosSecure, user])
    console.log(profile)
    return (
        <div className="pt-20">
            <div className=" w-full md:px-12 px-4">
      <Tabs id="controlled-tabs" className={'mx-auto  '} selectedTabClassName="selected-tab duration-500  border-0">
    <TabList className={' flex justify-center '}>
      <Tab ><RiGridFill className="text-4xl bg-black  " /></Tab>
      <Tab  ><TbLogs  className="text-4xl bg-black  " /></Tab>
    </TabList>

    <TabPanel>
      <hr className="border-gray-600 border   " />
    <div className="grid grid-cols-3 gap-2 mt-4 lg:w-[750px] md:w-[600px] w-[90vw] mx-auto "> 
        {
          profile?.bookMarks?.map(post=> !post.uploadImg ? <div key={post.postId} className="hidden"></div>  : <Link to={`/post/${post.author}/${post.postId}`} key={post.postId} className=" lg:w-[250px] lg:h-[250px] md:w-[200px] md:h-[200px] w-[30vw] h-[30vw] overflow-hidden  rounded-md border-gray-500 border-2  flex justify-center items-center">
            <img src={post.uploadImg} alt="" className=" w-full" />
          </Link>)
        }
      </div>
    </TabPanel>
    <TabPanel>
    <hr className="border-gray-600 border   " />
    <div className=" text-center mt-12 space-y-8 mx-auto mb-6"> 
        {
          profile?.bookMarks?.map(post=> post.uploadImg ? <div key={post.postId}></div> : <div key={post.postId} className="  gap-8 border-gray-600 border py-4 px-8 rounded-btn   max-w-max mx-auto">
           <div className="  flex items-center  gap-4 ">
           <img src={profile.image} className="w-16 h-16   border rounded-full"  alt="" />
              <p className="text-white text-xl font-semibold">{profile.fullName}</p>
           </div>
            <div className="text-left mt-6">
           <Link to={`/post/${post.author}/${post.postId}`}> <p className="">{post.caption}</p></Link>
            </div>
            <div className="flex justify-around border-t  border-t-gray-600 mt-4 pt-4 ">
            <CiHeart className="w-full border-r border-gray-600 text-2xl text-white "  />
            <GoComment className="w-full text-white text-xl" />
            </div>
          </div>)
        }
      </div>
    </TabPanel>
  </Tabs>
      
      </div>
        </div>
    );
};

export default Saved;