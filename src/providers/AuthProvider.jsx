/* eslint-disable react/prop-types */
import { createContext } from "react";
import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const auth = getAuth(app)
        const createUser = (email, password) =>{
            return createUserWithEmailAndPassword(auth, email, password)
    }
    const authInfo = {
        createUser
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