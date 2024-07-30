import { useUserStore } from "../../../lib/userStore";
import "./userinfo.css";
const UserInfo = () =>{
    const { currentUser } = useUserStore();
    return (
        <div className='userInfo'>
            <div className='user'>
                <img src={(currentUser.avatar)?currentUser.avatar:require('./avatar.png')} />
                <h2>{currentUser.username}</h2>
            </div>
            <div className='icons'>
                <img src={require('./more.png')} />
                <img src={require('./video.png')} />
                <img src={require('./edit.png')} />
            </div>
        </div>
    );
}
export default UserInfo;