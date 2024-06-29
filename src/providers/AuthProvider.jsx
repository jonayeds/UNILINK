/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import auth from '../firebase/firebase.config'
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // create user
        const createUser = (email, password) =>{
            setLoading(true)
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
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google signIn
    const googleProvider = new GoogleAuthProvider()
    const googleLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // Github signIn
    const githubProvider = new GithubAuthProvider()
    const githubLogin = ()=>{
        setLoading(true)
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
                setLoading(false)
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
        setLoading,
        user,
        auth,
        loading,
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