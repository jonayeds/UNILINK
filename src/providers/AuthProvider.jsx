/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app)
    // create user
        const createUser = (email, password) =>{
            return createUserWithEmailAndPassword(auth, email, password)
    }
    // update User
    const updateUser = (name, photo)=>{
        updateProfile(auth.currentUser, {
            displayName : name,
            photoURL: photo
        })
        .then(()=>{
            setUser({
                ...auth.currentUser,
                displayName: name,
                photoURL: photo
            })
        })
    }
    // email sign in 
    const emailSignIn = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }





    // observer
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser(user)
            }
            return unsubscribe()
        })
    }, [auth])
    console.log(user)
    const authInfo = {
        createUser,
        updateUser,
        emailSignIn,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;