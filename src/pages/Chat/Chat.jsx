
import {useState } from "react";
import { IoSend } from "react-icons/io5";

const Chat = () => {
    const chatData = {
        user1: "1juunaayeed@gmail.com",
        user2: "jhatu@gorila.com",
        messages: [
            {
                from: "1juunaayeed@gmail.com",
                msg: "hi!!",
                time: 100,
            },
            {
                from: "jhatu@gorila.com",
                msg: "hey, How are you??",
                time: 101,
            },
            {
                from: "1juunaayeed@gmail.com",
                msg:  "I`m good",
                time: 102,
            },
            {
                from: "jhatu@gorila.com",
                msg:  "OK",
                time: 103,
            }
           
        ] ,
        chatId: "1juunaayeed@gmail.com"+ "jhatu@gorila.com"
    }
    const [chats, setChats] = useState(chatData.messages)

    const currentUser = "1juunaayeed@gmail.com"
    console.log(chats)   
    const handleSend = (e)=>{
        e.preventDefault()
        const msg= e.target.msg.value
        const data = {
            from: currentUser,  
            msg: msg,
        }
       if(msg.length){
        setChats([...chats, data])
    }
       }
       
    return (
        <div>
            <div className="h-[60px]">
            <div className="py-4 border-b px-4 text-white fixed w-full bg-black">
                <p className="text-lg">Buta Gorila</p>
            </div>
            </div>
            <div className="md:min-h-screen min-h-[calc(100vh-70px)]  flex flex-col justify-end items-center md:px-6 px-4 h-full mb-[142px] md:mb-[70px]">
            <div className="w-full md:max-w-4xl space-y-2  md:mb-10 mb-6">
                {
                    chats.map(message=>message.from === currentUser? <div key={message.time} className="flex flex-col items-end ">
                        <p className="bg-[#8e9ede] text-white px-4 py-1 rounded-l-full rounded-tr-full  ">{message.msg}</p>
                    </div>: <div key={message.time} className="flex flex-col items-start ">
                        <p  className="text-white px-4 py-1 bg-slate-500  rounded-r-full rounded-tl-full  ">{message.msg}</p>
                    </div>)
                }
            </div>
            <div className="w-full   fixed mb-[59px] 0 px-4 bg-black h-[72px] py-4">
            <form onSubmit={handleSend} className="  xl:max-w-4xl md:max-w-3xl mx-auto flex gap-3 h-full   items-center justify-center ">
                <input type="text" className="flex-1 h-full rounded-full outline-none border-gray-400 text-white  border px-4 bg-gray-600" name="msg" />
               <button type="submit"> <IoSend className="text-3xl hover:text-[#8e9ede] duration-500"  /></button>
            </form>
            </div>
        </div>
        </div>
    );
};

export default Chat;