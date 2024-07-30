import "./login.css";
import {useState} from "react";
import {toast} from "react-toastify";
import {formdata} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc ,setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => 
{
    const [avatar,setAvatar]= useState({
        file: null,
        url:""
    })
    

    const [loading,setLoading] = useState(false);
    const handleAvatar = (e) =>{
        console.log(e.target.files);
        if(e.target.files[0]){
        setAvatar({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })
    }
    };
    const handleLogin = async (e) =>
        {
             e.preventDefault();
             setLoading(true);

             const formData =new FormData(e.target);
             const { email,password} = Object.fromEntries(formData);
             
             try{
                await signInWithEmailAndPassword(auth,email,password);
                toast.success("Account has signed Successfully")
             }catch(err){
                console.log(err);
                toast.error(err.message);
             }
             finally{
                setLoading(false);
             }
        }

    const handleRegister = async (e) =>{
           e.preventDefault();
           setLoading(true);
           const formData =new FormData(e.target);
           const { username,email,password} = Object.fromEntries(formData);
           

           try{
            const res= await createUserWithEmailAndPassword(auth,email,password);

            const imgUrl = await upload(avatar.file);
            await setDoc(doc(db, "users" , res.user.uid),{
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],
            });

            await setDoc(doc(db, "userchats" , res.user.uid),{
                chats: [],
            });

            toast.success("Account Created! You can login now")
           }catch(err)
           {
            console.log(err);
            toast.error(err.message);
           } finally{
            setLoading(false);
           }
           console.log(username);
    }
    return (
        <div className='login'>
       <div className='item'>
            <h2>Welcome back,</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button disabled={loading}>{loading ? "Loading" : "SignIn"}</button>
            </form>
        </div>
        <div className='seperator'></div>
        <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
            <label htmlFor="file">
            <img src={(avatar.url=="")?require('./avatar.jpg'):avatar.url
            } alt="" />
                Upload an Image</label>
            <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar}/>
                <input type="text" placeholder="Username" name="username" />
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button disabled={loading}>{loading ? "Loading" : "SignUp"}</button>
            </form>
        </div>
        </div>
    );
};

export default Login;