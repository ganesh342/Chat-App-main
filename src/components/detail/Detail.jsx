import './detail.css';
import {auth} from "../../lib/firebase";
import { doc,arrayUnion,updateDoc,arrayRemove} from 'firebase/firestore';
import {db} from '../../lib/firebase';
import {useChatStore} from '../../lib/chatStore';
import {useUserStore} from '../../lib/userStore';
const Detail = () => {
    const {currentUser} = useUserStore();
    const {user,isCurrentUserBlocked,isReceiverBlocked,changeBlock} = useChatStore();
    const handleBlock = async () =>{
        if(!user) return;
           
            const userDocRef = doc(db,"users",currentUser.id)

        try{
           
           await updateDoc(userDocRef,{
            blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
           });
           changeBlock();
        }catch(err){
            console.log(err);
        }
    };
    return (
        <div className="detail">
            <div className="user">
                <img src={(user?.avatar)? (user?.avatar): require('./avatar.png')} alt="" />
                <h2>{user?.username}</h2>
                <p>LORN EHKL HAB ,MCKLHAKSDF ,ABNJ </p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src={require('./arrowUp.png')} alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy % help</span>
                        <img src={require('./arrowDown.png')} alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy % help</span>
                        <img src={require('./arrowDown.png')} alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                            <img src={require('./favicon.png')} alt="" />
                            <span>photo_2024_2.png</span>
                            </div>
                        <img src={require('./download.png')} alt="" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                            <img src={require('./favicon.png')} alt="" />
                            <span>photo_2024_2.png</span>
                            </div>
                        <img src={require('./download.png')} alt="" />
                        </div>
                </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src={require('./arrowUp.png')} alt="" />
                    </div>
                </div>
               <button onClick={handleBlock}>{
                    isCurrentUserBlocked ? "You are Blocked" : isReceiverBlocked ? "User Blocked" : "Block User"
                }
               </button>
               <button className="logout" onClick={()=>{
                auth.signOut()
               }}>Logout</button>
                </div>
                </div>
    );
}
export default Detail;