/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import auth from '../firebase/firebase.config'
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
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

    // google signIn
    const googleProvider = new GoogleAuthProvider()
    const googleLogin = () =>{
        return signInWithPopup(auth, googleProvider)
    }

    // Github signIn
    const githubProvider = new GithubAuthProvider()
    const githubLogin = ()=>{
        return signInWithPopup(auth, githubProvider)
    }

    // Sign Out
    const userSignOut = ()=>{
        return signOut(auth)
    }


    // observer
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser(user)
            }
            return unsubscribe()
        })
    }, [])
    console.log(user)
    const authInfo = { 
        createUser,
        updateUser,
        emailSignIn,
        googleLogin,
        githubLogin,
        userSignOut,
        user,
        auth,
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