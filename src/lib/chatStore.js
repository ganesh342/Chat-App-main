import { create } from "zustand";
import { doc,getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useUserStore } from "./userStore";

export const useChatStore = create ((set) =>({
    chatid:null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
    changeChat : (chatid,user)=>{
        const currentUser = useUserStore.getState().currentUser;

        if(user.blocked.includes(currentUser.id)){
            return set({
                chatid,
                user: null,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false,
            })
        }

        else if(currentUser.blocked.includes(user.id)){
            return set({
                chatid,
                user: user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true,
            });
        }

        else {
            return  set({
                chatid,
                user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: false,
            });
        }
    },
            changeBlock : ()=>{
            set((state)=>({...state,isReceiverBlocked:!state.isReceiverBlocked}));
            }
}));