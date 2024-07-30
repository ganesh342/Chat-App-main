import "./chatList.css";
import {useState} from 'react';
import AddUser from './addUser/AddUser.jsx'
import { onSnapshot ,updateDoc} from "firebase/firestore";
import {useUserStore} from "../../../lib/userStore";
import {doc,getDoc} from "firebase/firestore";
import {db} from "../../../lib/firebase";
import {useEffect} from "react";
import {useChatStore} from "../../../lib/chatStore";

const ChatList = () => {
    const [chats,setChats] = useState([]);
    const [addMode,setAddMode] = useState(false);
    const {currentUser,isLoading,FetchUserInfo} = useUserStore();
    const {chatid,changeChat} = useChatStore();
    const [input,setInput] = useState("");
    
    useEffect(() =>{
        const unSub = onSnapshot(doc(db,"userchats",currentUser.id),async (res) =>{
            const items = res.data().chats;
            
            const promises = items.map( async(item)=>{
                const userDocRef = doc(db,"users",item.receiverId);
                const userDocSnap= await getDoc(userDocRef);
                const user = userDocSnap.data();
                return { ...item,user };
        });

            const chatData = await Promise.all(promises);

            setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt));

        });
     return ()=>{
        unSub();
     }
    },[currentUser.id]);
    const handleSelect = async (chat) =>{
         const userChats = chats.map((item) =>{
            const {user, ...rest} = item;
            return rest;
         });

        const chatIndex = userChats.findIndex((item)=> item.chatid === chat.chatid);
         userChats[chatIndex].isSeen = true;
         
         const userChatsRef = doc(db,"userchats",currentUser.id);

         try{
            await updateDoc(userChatsRef, {
                chats: userChats,
            });
            changeChat(chat.chatid,chat.user);
         }catch(err){
            console.log(err);
         }
    };

    const filteredChats = chats.filter(c=>c.user.username.toLowerCase().includes(input.toLowerCase()));
    return (
        <div className='chatList'>
            <div className='search'>
                <div className='searchBar'>
                    <img src={require('./search.png')} alt="" />
                    <input type="text" placeholder="Search" onChange={(e)=>setInput(e.target.value)}/>
                </div>
                <img src={addMode ? require('./minus.png') : require('./plus.png')} alt="" className="add" onClick={() => setAddMode((prev) => !prev)} />
            </div>
            {filteredChats.map((chat) =>(
            <div className="item" key={chat.chatid} onClick={()=>handleSelect(chat)} style ={{backgroundColor: chat?.isSeen?"transparent":"#5183fe",}}>
                <img src={chat.user.blocked.includes(currentUser.id) ? "./avatar.png" : (chat.user.avatar)?(chat.user.avatar):require('./avatar.png')} alt="" />
                <div className="texts">
                    <span>{chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username}</span>
                    <p>{chat.lastMessage}</p>
                </div>
            </div>
            ))}
            {
                addMode && <AddUser/>
            }
        </div>
    );
}

export default ChatList;